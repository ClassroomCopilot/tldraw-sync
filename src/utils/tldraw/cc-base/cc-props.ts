import { T } from '@tldraw/validate'

const baseProps = {
  w: T.number,
  h: T.number,
  title: T.string,
  headerColor: T.string,
  isLocked: T.boolean,
}

export const ccShapeProps = {
  base: baseProps,

  liveTranscription: {
    ...baseProps,
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

  calendar: {
    ...baseProps,
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
        path: T.string.optional(),
      }),
    })),
  },

  settings: {
    ...baseProps,
    userEmail: T.string,
    userRole: T.string,
    isTeacher: T.boolean,
  },
} 