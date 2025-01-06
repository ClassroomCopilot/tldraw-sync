import { createShapeId, createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

const baseVersions = createShapePropsMigrationIds('cc-base', { Initial: 1 })
const calendarVersions = createShapePropsMigrationIds('cc-calendar', { Initial: 1 })
const transcriptionVersions = createShapePropsMigrationIds('cc-live-transcription', { Initial: 1 })
const settingsVersions = createShapePropsMigrationIds('cc-settings', { Initial: 1 })

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
} 