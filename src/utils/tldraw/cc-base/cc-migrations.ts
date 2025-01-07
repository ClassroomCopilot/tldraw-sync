import { createShapeId, createShapePropsMigrationIds, createShapePropsMigrationSequence, createBindingPropsMigrationIds, createBindingPropsMigrationSequence } from 'tldraw'

const baseVersions = createShapePropsMigrationIds('cc-base', { Initial: 1 })
const calendarVersions = createShapePropsMigrationIds('cc-calendar', { Initial: 1 })
const transcriptionVersions = createShapePropsMigrationIds('cc-live-transcription', { Initial: 1 })
const settingsVersions = createShapePropsMigrationIds('cc-settings', { Initial: 1 })
const slideshowVersions = createShapePropsMigrationIds('cc-slideshow', { Initial: 1 })
const slideVersions = createShapePropsMigrationIds('cc-slide', { Initial: 1 })
const slideLayoutBindingVersions = createBindingPropsMigrationIds('cc-slide-layout', { Initial: 1 })

export const ccBindingMigrations = {
  'cc-slide-layout': createBindingPropsMigrationSequence({
    sequence: [
      {
        id: slideLayoutBindingVersions.Initial,
        up: (props) => {
          if (typeof props.placeholder !== 'boolean') {
            props.placeholder = false
          }
          if (typeof props.isMovingWithParent !== 'boolean' && props.isMovingWithParent !== undefined) {
            props.isMovingWithParent = false
          }
          return props
        },
      },
    ],
  }),
}

export const ccShapeMigrations = {
  base: createShapePropsMigrationSequence({
    sequence: [
      {
        id: baseVersions.Initial,
        up: (props) => props,
      },
    ],
  }),

  calendar: createShapePropsMigrationSequence({
    sequence: [
      {
        id: calendarVersions.Initial,
        up: (props) => {
          if (!Array.isArray(props.events)) {
            props.events = []
          }
          if (typeof props.date !== 'string') {
            props.date = new Date().toISOString()
          }
          if (typeof props.selectedDate !== 'string') {
            props.selectedDate = props.date
          }
          if (!props.view) {
            props.view = 'timeGridWeek'
          }
        },
      },
    ],
  }),

  liveTranscription: createShapePropsMigrationSequence({
    sequence: [
      {
        id: transcriptionVersions.Initial,
        up: (props) => {
          if (!Array.isArray(props.segments)) {
            props.segments = []
          }
          if (props.segments.length > 0) {
            props.segments = props.segments.map((segment: { id?: string }) => ({
              ...segment,
              id: segment.id || createShapeId(),
            }))
          }
        },
      },
    ],
  }),

  settings: createShapePropsMigrationSequence({
    sequence: [
      {
        id: settingsVersions.Initial,
        up: (props) => {
          if (typeof props.userEmail !== 'string') {
            props.userEmail = ''
          }
          if (typeof props.userRole !== 'string') {
            props.userRole = ''
          }
          if (typeof props.isTeacher !== 'boolean') {
            props.isTeacher = false
          }
        },
      },
    ],
  }),

  slideshow: createShapePropsMigrationSequence({
    sequence: [
      {
        id: slideshowVersions.Initial,
        up: (props) => {
          if (!Array.isArray(props.slides)) {
            props.slides = []
          }
          if (typeof props.currentSlideIndex !== 'number') {
            props.currentSlideIndex = 0
          }
          if (typeof props.slidePattern !== 'string') {
            props.slidePattern = 'horizontal'
          }
        },
      },
    ],
  }),

  slide: createShapePropsMigrationSequence({
    sequence: [
      {
        id: slideVersions.Initial,
        up: (props) => props,
      },
    ],
  }),
} 