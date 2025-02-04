import { createTLSchema, defaultShapeSchemas, defaultBindingSchemas } from '@tldraw/tlschema'
import { ccBindingProps, ccShapeProps } from '../utils/tldraw/cc-base/cc-props'
import { ccBindingMigrations, ccShapeMigrations } from '../utils/tldraw/cc-base/cc-migrations'
import { ccGraphShapeProps } from '../utils/tldraw/cc-base/cc-graph-props'
import { ccGraphMigrations } from '../utils/tldraw/cc-base/cc-graph-migrations'

export const server_schema_default = createTLSchema({
  shapes: {
    ...defaultShapeSchemas,
    'cc-live-transcription': {
      props: ccShapeProps.liveTranscription,
      migrations: ccShapeMigrations.liveTranscription,
    },
    'cc-calendar': {
      props: ccShapeProps.calendar,
      migrations: ccShapeMigrations.calendar,
    },
    'cc-settings': {
      props: ccShapeProps.settings,
      migrations: ccShapeMigrations.settings,
    },
    'cc-slideshow': {
      props: ccShapeProps.slideshow,
      migrations: ccShapeMigrations.slideshow,
    },
    'cc-slide': {
      props: ccShapeProps.slide,
      migrations: ccShapeMigrations.slide,
    },
    'cc-youtube-embed': {
      props: ccShapeProps['cc-youtube-embed'],
      migrations: ccShapeMigrations['cc-youtube-embed'],
    },
    // Graph shapes
    'cc-user-node': {
      props: ccGraphShapeProps['cc-user-node'],
      migrations: ccGraphMigrations['cc-user-node'],
    },
    'cc-teacher-node': {
      props: ccGraphShapeProps['cc-teacher-node'],
      migrations: ccGraphMigrations['cc-teacher-node'],
    },
    'cc-student-node': {
      props: ccGraphShapeProps['cc-student-node'],
      migrations: ccGraphMigrations['cc-student-node'],
    },
    'cc-calendar-node': {
      props: ccGraphShapeProps['cc-calendar-node'],
      migrations: ccGraphMigrations['cc-calendar-node'],
    },
    'cc-calendar-year-node': {
      props: ccGraphShapeProps['cc-calendar-year-node'],
      migrations: ccGraphMigrations['cc-calendar-year-node'],
    },
    'cc-calendar-month-node': {
      props: ccGraphShapeProps['cc-calendar-month-node'],
      migrations: ccGraphMigrations['cc-calendar-month-node'],
    },
    'cc-calendar-week-node': {
      props: ccGraphShapeProps['cc-calendar-week-node'],
      migrations: ccGraphMigrations['cc-calendar-week-node'],
    },
    'cc-calendar-day-node': {
      props: ccGraphShapeProps['cc-calendar-day-node'],
      migrations: ccGraphMigrations['cc-calendar-day-node'],
    },
    'cc-calendar-time-chunk-node': {
      props: ccGraphShapeProps['cc-calendar-time-chunk-node'],
      migrations: ccGraphMigrations['cc-calendar-time-chunk-node'],
    },
    'cc-school-node': {
      props: ccGraphShapeProps['cc-school-node'],
      migrations: ccGraphMigrations['cc-school-node'],
    },
    'cc-department-node': {
      props: ccGraphShapeProps['cc-department-node'],
      migrations: ccGraphMigrations['cc-department-node'],
    },
    'cc-room-node': {
      props: ccGraphShapeProps['cc-room-node'],
      migrations: ccGraphMigrations['cc-room-node'],
    },
    'cc-subject-class-node': {
      props: ccGraphShapeProps['cc-subject-class-node'],
      migrations: ccGraphMigrations['cc-subject-class-node'],
    },
    'cc-pastoral-structure-node': {
      props: ccGraphShapeProps['cc-pastoral-structure-node'],
      migrations: ccGraphMigrations['cc-pastoral-structure-node'],
    },
    'cc-year-group-node': {
      props: ccGraphShapeProps['cc-year-group-node'],
      migrations: ccGraphMigrations['cc-year-group-node'],
    },
    'cc-curriculum-structure-node': {
      props: ccGraphShapeProps['cc-curriculum-structure-node'],
      migrations: ccGraphMigrations['cc-curriculum-structure-node'],
    },
    'cc-key-stage-node': {
      props: ccGraphShapeProps['cc-key-stage-node'],
      migrations: ccGraphMigrations['cc-key-stage-node'],
    },
    'cc-key-stage-syllabus-node': {
      props: ccGraphShapeProps['cc-key-stage-syllabus-node'],
      migrations: ccGraphMigrations['cc-key-stage-syllabus-node'],
    },
    'cc-year-group-syllabus-node': {
      props: ccGraphShapeProps['cc-year-group-syllabus-node'],
      migrations: ccGraphMigrations['cc-year-group-syllabus-node'],
    },
    'cc-subject-node': {
      props: ccGraphShapeProps['cc-subject-node'],
      migrations: ccGraphMigrations['cc-subject-node'],
    },
    'cc-topic-node': {
      props: ccGraphShapeProps['cc-topic-node'],
      migrations: ccGraphMigrations['cc-topic-node'],
    },
    'cc-topic-lesson-node': {
      props: ccGraphShapeProps['cc-topic-lesson-node'],
      migrations: ccGraphMigrations['cc-topic-lesson-node'],
    },
    'cc-learning-statement-node': {
      props: ccGraphShapeProps['cc-learning-statement-node'],
      migrations: ccGraphMigrations['cc-learning-statement-node'],
    },
    'cc-science-lab-node': {
      props: ccGraphShapeProps['cc-science-lab-node'],
      migrations: ccGraphMigrations['cc-science-lab-node'],
    },
    'cc-teacher-timetable-node': {
      props: ccGraphShapeProps['cc-teacher-timetable-node'],
      migrations: ccGraphMigrations['cc-teacher-timetable-node'],
    },
    'cc-timetable-lesson-node': {
      props: ccGraphShapeProps['cc-timetable-lesson-node'],
      migrations: ccGraphMigrations['cc-timetable-lesson-node'],
    },
    'cc-planned-lesson-node': {
      props: ccGraphShapeProps['cc-planned-lesson-node'],
      migrations: ccGraphMigrations['cc-planned-lesson-node'],
    },
    'cc-school-timetable-node': {
      props: ccGraphShapeProps['cc-school-timetable-node'],
      migrations: ccGraphMigrations['cc-school-timetable-node'],
    },
    'cc-academic-year-node': {
      props: ccGraphShapeProps['cc-academic-year-node'],
      migrations: ccGraphMigrations['cc-academic-year-node'],
    },
    'cc-academic-term-node': {
      props: ccGraphShapeProps['cc-academic-term-node'],
      migrations: ccGraphMigrations['cc-academic-term-node'],
    },
    'cc-academic-week-node': {
      props: ccGraphShapeProps['cc-academic-week-node'],
      migrations: ccGraphMigrations['cc-academic-week-node'],
    },
    'cc-academic-day-node': {
      props: ccGraphShapeProps['cc-academic-day-node'],
      migrations: ccGraphMigrations['cc-academic-day-node'],
    },
    'cc-academic-period-node': {
      props: ccGraphShapeProps['cc-academic-period-node'],
      migrations: ccGraphMigrations['cc-academic-period-node'],
    },
    'cc-registration-period-node': {
      props: ccGraphShapeProps['cc-registration-period-node'],
      migrations: ccGraphMigrations['cc-registration-period-node'],
    },
    'cc-user-teacher-timetable-node': {
      props: ccGraphShapeProps['cc-user-teacher-timetable-node'],
      migrations: ccGraphMigrations['cc-user-teacher-timetable-node'],
    },
    'cc-user-timetable-lesson-node': {
      props: ccGraphShapeProps['cc-user-timetable-lesson-node'],
      migrations: ccGraphMigrations['cc-user-timetable-lesson-node'],
    },
  },
  bindings: {
    ...defaultBindingSchemas,
    'cc-slide-layout': {
      props: ccBindingProps['cc-slide-layout'],
      migrations: ccBindingMigrations['cc-slide-layout'],
    },
  },
})
