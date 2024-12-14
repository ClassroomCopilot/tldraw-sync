import {
  HTMLContainer,
  useEditor,
  ShapeUtil,
  useValue,
  TLBaseShape,
  Rectangle2d
} from 'tldraw'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { CalendarShape } from './calendar-shape-types'
import { useAuth } from '../../../utils/userContext'

// Component definitions
const ViewMenu: React.FC<{
  onSelect: (view: string) => void;
  onClose: () => void;
  optionButtonStyle: React.CSSProperties;
  applicationButtonStyle: React.CSSProperties;
}> = ({ onSelect, onClose, optionButtonStyle, applicationButtonStyle }) => {
  const views = [
    { name: 'Day', view: 'timeGridDay' },
    { name: 'Week', view: 'timeGridWeek' },
    { name: 'Month', view: 'dayGridMonth' },
    { name: 'Year', view: 'dayGridYear' },
    { name: 'List Day', view: 'listDay' },
    { name: 'List Week', view: 'listWeek' },
    { name: 'List Month', view: 'listMonth' },
    { name: 'List Year', view: 'listYear' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {views.map(({name, view}) => (
        <button key={view} onClick={() => onSelect(view)} style={optionButtonStyle}>
          {name}
        </button>
      ))}
      <button onClick={onClose} style={applicationButtonStyle}>Close</button>
    </div>
  );
};

// CalendarShapeUtil
export class CalendarShapeUtil extends ShapeUtil<CalendarShape> {
  static override type = 'calendar' as const

  getDefaultProps(): CalendarShape['props'] {
    return {
      w: 600,
      h: 600,
      view: 'timeGridWeek',
      selectedDate: new Date().toISOString(),
      events: [],
    }
  }

  // TLShapeComponent
  component(shape: CalendarShape) {
    const editor = useEditor()
    const [events, setEvents] = useState<CalendarEvent[]>(shape.props.events)
    const { getIdToken } = useAuth()
    const calendarRef = useRef<FullCalendar>(null)
    const lastFetchRef = useRef<number>(0)
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjectClasses, setSubjectClasses] = useState<string[]>([]);
    const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const navigate = useNavigate();
    
    const shapeProps = useValue('shape props', () => {
      const currentShape = editor.getShape(shape.id)
      return currentShape ? (currentShape as CalendarShape).props : null
    }, [shape.id])

    // Utility functions
    const debouncedUpdateSize = useCallback(
      (() => {
        let timeoutId: NodeJS.Timeout;
        return () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            if (calendarRef.current) {
              calendarRef.current.getApi().updateSize();
            }
          }, 200);
        };
      })(),
      []
    );

    const loadEvents = useCallback(async () => {
      const now = Date.now()
      if (now - lastFetchRef.current < 60000) return;
      lastFetchRef.current = now
    
      try {
        const token = await getIdToken()
        const fetchedEvents = await fetchCalendarEvents(token)
        setEvents(fetchedEvents)
        
        const range = getEventRange(fetchedEvents)
        if (calendarRef.current) {
          const api = calendarRef.current.getApi();
          if (range.start && range.end) {
            api.setOption('validRange', {
              start: range.start,
              end: range.end
            });
          } else {
            api.setOption('validRange', undefined);
          }
        }
    
        editor.updateShape<CalendarShape>({
          id: shape.id,
          type: 'calendar',
          props: { ...shape.props, events: fetchedEvents }
        })
      } catch (error) {
        console.error('Error fetching calendar events:', error)
      }
    }, [getIdToken, editor, shape.id, shape.props])

    // Effect hooks
    useEffect(() => {
      debouncedUpdateSize();
    }, [shapeProps?.w, shapeProps?.h, debouncedUpdateSize]);

    useEffect(() => {
      loadEvents();
    }, [loadEvents]);

    // Event handlers
    const handleDateSelect = useCallback((arg: DateSelectArg) => {
      editor.updateShape<CalendarShape>({
        id: shape.id,
        type: 'calendar',
        props: { ...shape.props, selectedDate: arg.start.toISOString() }
      })
    }, [editor, shape.id, shape.props])

    const handleViewChange = useCallback((mountArg: ViewMountArg) => {
      const newView = mountArg.view.type as CalendarShape['props']['view']
      editor.updateShape<CalendarShape>({
        id: shape.id,
        type: 'calendar',
        props: { ...shape.props, view: newView }
      })
    }, [editor, shape.id, shape.props])

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
      e.stopPropagation()
    }, [])

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
      e.stopPropagation()
    }, [])

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
      e.stopPropagation()
    }, [])

    const handleWheel = useCallback((e: React.WheelEvent) => {
      e.stopPropagation()
    }, [])

    const toggleClassFilterModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleClassToggle = (subjectClass: string) => {
      setSelectedClasses(prev => 
        prev.includes(subjectClass)
          ? prev.filter(c => c !== subjectClass)
          : [...prev, subjectClass]
      );
    };

    useEffect(() => {
      const classes = Array.from(new Set(events.map(event => event.extendedProps?.subjectClass || '')));
      setSubjectClasses(classes);
      setSelectedClasses(classes);
    }, [events]);

    const filteredEvents = events.filter(event => 
      selectedClasses.includes(event.extendedProps?.subjectClass || '')
    );

    const commonButtonStyle: React.CSSProperties = {
      border: 'none',
      borderRadius: '5px',
      padding: '0.4em 1em',
      fontSize: '0.95em',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const applicationButtonStyle: React.CSSProperties = {
      ...commonButtonStyle,
      backgroundColor: '#4f80ff',
      color: '#fff',
    };

    const optionButtonStyle: React.CSSProperties = {
      ...commonButtonStyle,
      backgroundColor: '#f0f4f9',
      color: '#2c3e50',
      border: '1px solid #ddd',
    };

    const calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      views: {
        timeGridDay: {
          type: 'timeGrid',
          buttonText: 'Day (Grid)',
          titleFormat: (arg) => formatDate(arg.date.marker, { weekday: 'long', month: 'long', year: 'numeric' }),
          duration: { days: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            };
          },
        },
        timeGridWeek: {
          type: 'timeGrid',
          buttonText: 'Week (Grid)',
          titleFormat: (arg) => formatDate(arg.date.marker, { week: 'long' }),
          duration: { weeks: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            };
          },
        },
        dayGridMonth: {
          type: 'dayGrid',
          buttonText: 'Month (Grid)',
          titleFormat: (arg) => formatDate(arg.date.marker, { month: 'long', year: 'numeric' }),
          duration: { months: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            };
          },
        },
        dayGridYear: {
          type: 'dayGrid',
          buttonText: 'Year (Grid)',
          titleFormat: (arg) => formatDate(arg.date.marker, { year: 'numeric' }),
          duration: { years: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), 11, 31)
            };
          },
        },
        listDay: {
          type: 'list',
          buttonText: 'Day (List)',
          titleFormat: (arg) => formatDate(arg.date.marker, { weekday: 'long', month: 'long', year: 'numeric' }),
          duration: { days: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            };
          },
        },
        listWeek: {
          type: 'list',
          buttonText: 'Week (List)',
          titleFormat: (arg) => formatDate(arg.date.marker, { week: 'long' }),
          duration: { weeks: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            };
          },
        },
        listMonth: {
          type: 'list',
          buttonText: 'Month (List)',
          titleFormat: (arg) => formatDate(arg.date.marker, { month: 'long', year: 'numeric' }),
          duration: { months: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
            };
          },
        },
        listYear: {
          type: 'list',
          buttonText: 'Year (List)',
          titleFormat: (arg) => formatDate(arg.date.marker, { year: 'numeric' }),
          duration: { years: 1 },
          validRange: (currentDate: Date) => {
            const range = getEventRange(events);
            return {
              start: range.start || currentDate,
              end: range.end || new Date(currentDate.getFullYear(), 11, 31)
            };
          },
        },
      },
      viewDidMount: handleViewChange,
      initialView: shape.props.view,
      events: filteredEvents,
      select: handleDateSelect,
      height: shape.props.h,
      contentHeight: shape.props.h - 0,
      aspectRatio: undefined,
      expandRows: true,
      stickyHeaderDates: true,
      stickyFooterScrollbar: false,
      dayHeaders: true,
      headerToolbar: {
        left: 'prev,next today viewToggle',
        center: 'title',
        right: 'filterClasses'
      },
      dayHeaderFormat(arg) {
        return formatDate(arg.date.marker, { weekday: 'long' });
      },
      titleFormat: (arg) => {
        return formatDate(arg.date.marker, { weekday: 'long' });
      },
      dayMaxEvents: 3,
      selectable: true,
      eventMinHeight: 20,
      navLinks: true,
      eventContent: function(arg: EventContentArg) {
        const formatEventTime = (date: Date | null) => {
          if (!date) return '';
          return formatDate(date, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'local'
          });
        };
        const formattedStartTime = formatEventTime(arg.event.start);
        const formattedEndTime = formatEventTime(arg.event.end);
        const timeAndPeriodCodeString = `${arg.event.extendedProps?.periodCode || ''} (${formattedStartTime} - ${formattedEndTime})`;
        const backgroundColor = lightenColor(arg.event.extendedProps?.color || '#000000', 100);
        const textColor = getContrastColor(backgroundColor);
        return {
          html:
          `
          <div class="fc-event-main-frame" style="background-color: transparent; color: ${textColor};">
            <div class="fc-event-time" style="color: ${textColor}; font-size: 0.8em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: none;">${timeAndPeriodCodeString}</div>
            <div class="fc-event-title-container">
              <div class="fc-event-title fc-sticky" style="color: ${textColor}; font-size: 1em; font-weight: bold; margin-right: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; opacity: 0.8;">${arg.event.title}</div>
            </div>
          </div>
        `
        };
      },
      hiddenDays: [1],
      weekends: false,
      slotMinTime: '08:00:00',
      slotMaxTime: '16:00:00',
      slotDuration: '00:30:00',
      slotLabelInterval: '00:30',
      allDaySlot: false,
      slotEventOverlap: true,
      dayMaxEventRows: 1,
      eventMaxStack: 1,
      slotLabelFormat: [
        {
          formatMatcher: 'best fit',
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: true,
          meridiem: 'narrow',
          hour12: false,
        }
      ],
      eventClassNames: (arg: { event: { extendedProps?: { subjectClass?: string; color?: string } } }) => {
        const classes = [arg.event.extendedProps?.subjectClass || ''];
        return classes;
      },
      eventDidMount: (arg: { event: { extendedProps?: { color?: string }; id: string }; el: HTMLElement }) => {
        if (arg.event.extendedProps?.color) {
          const originalColor = arg.event.extendedProps.color;
          const lightenedColor = lightenColor(originalColor, 100);
          arg.el.style.backgroundColor = lightenedColor;
          arg.el.style.borderColor = originalColor;
          arg.el.style.color = getContrastColor(lightenedColor);
        }
      },
      validRange: (currentDate: Date) => {
        const range = getEventRange(events);
        return {
          start: range.start || currentDate,
          end: range.end || new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        };
      },
      eventClick: (info) => {
        setSelectedEvent(info.event.toPlainObject() as CalendarEvent);
        setIsEventModalOpen(true);
      },
      dateClick: (info) => {
        console.log('Date clicked:', info.dateStr)
      },
      customButtons: {
        filterClasses: {
          text: 'Classes',
          click: toggleClassFilterModal,
        },
        viewToggle: {
          text: 'View',
          click: () => setIsViewMenuOpen(true),
        },
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List',
      },
      buttonIcons: {
        prev: 'chevron-left',
        next: 'chevron-right',
        prevYear: 'chevrons-left',
        nextYear: 'chevrons-right',
      },
      themeSystem: 'standard',
    };

    /***************
    * Modal content
    ***************/

    // Render class filter buttons
    const renderClassFilterButton = (subjectClass: string) => {
      const isSelected = selectedClasses.includes(subjectClass);
      const color = events.find(e => e.extendedProps?.subjectClass === subjectClass)?.extendedProps?.color || '#000000';
      const buttonStyle: React.CSSProperties = {
        ...optionButtonStyle,
        backgroundColor: isSelected ? color : '#ffffff',
        color: isSelected ? '#ffffff' : '#000000',
        border: `2px solid ${color}`,
      };

      return (
        <button
          key={subjectClass}
          style={buttonStyle}
          onClick={() => handleClassToggle(subjectClass)}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '8px' }}>
              {isSelected && <FaCheck />}
            </div>
            <span>{subjectClass}</span>
          </div>
        </button>
      );
    };

    // Open Tldraw file
    const handleOpenTldrawFile = (path: string) => {
      navigate(`/multiplayer?path=${encodeURIComponent(path)}`);
    };

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          width: `${shape.props.w}px`,
          height: `${shape.props.h}px`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'white',
          color: 'black',
          pointerEvents: 'all',
          display: 'flex',
          flexDirection: 'column',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleWheel}
      >
        <FullCalendar ref={calendarRef} {...calendarOptions} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleClassFilterModal}
          contentLabel="Filter Classes"
          className="class-filter-modal"
          overlayClassName="class-filter-modal-overlay"
        >
          <h2>Filter Classes</h2>
          <div className="class-filter-list">
            {subjectClasses.map(renderClassFilterButton)}
          </div>
          <div className="close-button-container">
            <button className="close-button" onClick={toggleClassFilterModal}>Close</button>
          </div>
        </Modal>
        <Modal
          isOpen={isViewMenuOpen}
          onRequestClose={() => setIsViewMenuOpen(false)}
          contentLabel="Change View"
          className="view-toggle-modal"
          overlayClassName="view-toggle-modal-overlay"
        >
          <h2>Select Calendar View</h2>
          <ViewMenu 
            onSelect={(view) => {
              calendarRef.current?.getApi().changeView(view);
              setIsViewMenuOpen(false);
            }}
            onClose={() => setIsViewMenuOpen(false)}
            optionButtonStyle={optionButtonStyle}
            applicationButtonStyle={applicationButtonStyle}
          />
        </Modal>
        <Modal
          isOpen={isEventModalOpen}
          onRequestClose={() => setIsEventModalOpen(false)}
          contentLabel="Event Details"
          className="event-details-modal"
          overlayClassName="event-details-modal-overlay"
        >
          {selectedEvent && (
            <>
              <h2>{selectedEvent.title}</h2>
              <div className="event-details">
                <p><strong>Start Time:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                <p><strong>Class:</strong> {selectedEvent.extendedProps?.subjectClass}</p>
                <p><strong>Period:</strong> {selectedEvent.extendedProps?.periodCode}</p>
                {selectedEvent.extendedProps?.path && (
                  <button 
                    style={applicationButtonStyle}
                    onClick={() => handleOpenTldrawFile(selectedEvent.extendedProps.path!)}
                  >
                    Open Tldraw File <FaExternalLinkAlt style={{ marginLeft: '8px' }} />
                  </button>
                )}
              </div>
              <button style={applicationButtonStyle} onClick={() => setIsEventModalOpen(false)}>Close</button>
            </>
          )}
        </Modal>
      </HTMLContainer>
    )
  }

  // Indicator
  indicator(shape: CalendarShape) {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        fill="none"
        stroke="lightgray"
        strokeWidth={1}
      />
    )
  }

  onCreate = (shape: TLBaseShape<'calendar', CalendarShape['props']>) => {
    return {
      ...shape,
      props: this.getDefaultProps(),
    }
  }

  getGeometry(shape: CalendarShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  isAspectRatioLocked = () => false

  canResize = () => true
  
  canBind = () => false

  onResize: (
    shape: CalendarShape,
    info: { initialShape: CalendarShape; scaleX: number; scaleY: number }
  ) => Partial<CalendarShape> | undefined = (shape, info) => {
    const { initialShape, scaleX, scaleY } = info

    const newW = Math.max(300, Math.round(initialShape.props.w * scaleX))
    const newH = Math.max(200, Math.round(initialShape.props.h * scaleY))

    return {
      props: {
        ...shape.props,
        w: newW,
        h: newH,
      },
    }
  }
}

