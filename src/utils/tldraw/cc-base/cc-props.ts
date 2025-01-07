import { T } from '@tldraw/validate'

const baseShapeProps = {
    title: T.string,
    w: T.number,
    h: T.number,
    headerColor: T.string,
    isLocked: T.boolean,
  }
  
  export const ccShapeProps = {
    base: baseShapeProps,
  
    calendar: {
      ...baseShapeProps,
      date: T.string,
      selectedDate: T.string,
      view: T.string,
      events: T.arrayOf(T.object({
        id: T.string,
        title: T.string,
        start: T.string,
        end: T.string,
        groupId: T.string.optional(),
        extendedProps: T.object({
          subjectClass: T.string,
          color: T.string,
          periodCode: T.string,
          path: T.string.optional()
        })
      })),
    },
  
    liveTranscription: {
      ...baseShapeProps,
      isRecording: T.boolean,
      segments: T.arrayOf(T.object({
        id: T.string,
        text: T.string,
        completed: T.boolean,
        start: T.string,
        end: T.string,
      })),
      currentSegment: T.object({
        id: T.string,
        text: T.string,
        completed: T.boolean,
        start: T.string,
        end: T.string,
      }).optional(),
      lastProcessedSegment: T.string.optional(),
    },
  
    settings: {
      ...baseShapeProps,
      userEmail: T.string,
      userRole: T.string,
      isTeacher: T.boolean,
    },
  
    slideshow: {
      ...baseShapeProps,
      slides: T.arrayOf(T.string),
      currentSlideIndex: T.number,
      slidePattern: T.string,
    },
  
    slide: {
      ...baseShapeProps,
    },
  }
  
  export const ccBindingProps = {
    'cc-slide-layout': {
      placeholder: T.boolean,
      isMovingWithParent: T.boolean.optional(),
    },
  }