import { createTLSchema, defaultShapeSchemas, defaultBindingSchemas } from '@tldraw/tlschema'
import { ccShapeProps } from '../utils/tldraw/cc-base/cc-props'
import { ccShapeMigrations } from '../utils/tldraw/cc-base/cc-migrations'
import { createTLSchemaFromUtils, defaultBindingUtils } from 'tldraw'
import {
  UserNodeShapeUtil,
  DeveloperNodeShapeUtil,
  TeacherNodeShapeUtil,
  CalendarNodeShapeUtil,
  CalendarYearNodeShapeUtil,
  CalendarMonthNodeShapeUtil,
  CalendarWeekNodeShapeUtil,
  CalendarDayNodeShapeUtil,
  CalendarTimeChunkNodeShapeUtil,
  TeacherTimetableNodeShapeUtil,
  TimetableLessonNodeShapeUtil,
  PlannedLessonNodeShapeUtil,
  PastoralStructureNodeShapeUtil,
  YearGroupNodeShapeUtil,
  CurriculumStructureNodeShapeUtil,
  KeyStageNodeShapeUtil,
  KeyStageSyllabusNodeShapeUtil,
  YearGroupSyllabusNodeShapeUtil,
  SubjectNodeShapeUtil,
  TopicNodeShapeUtil,
  TopicLessonNodeShapeUtil,
  LearningStatementNodeShapeUtil,
  ScienceLabNodeShapeUtil,
  SchoolTimetableNodeShapeUtil,
  AcademicYearNodeShapeUtil,
  AcademicTermNodeShapeUtil,
  AcademicWeekNodeShapeUtil,
  AcademicDayNodeShapeUtil,
  AcademicPeriodNodeShapeUtil,
  RegistrationPeriodNodeShapeUtil,
  SchoolNodeShapeUtil,
  DepartmentNodeShapeUtil,
  RoomNodeShapeUtil,
  SubjectClassNodeShapeUtil,
  GeneralRelationshipShapeUtil
} from '../utils/tldraw/graph/graphShapeUtil'
import { SlideLayoutBindingUtil } from '../utils/tldraw/slides/SlideLayoutBindingUtil'
import { YoutubeEmbedShapeUtil } from '../utils/tldraw/embeds/embedShapes'
import { CalendarShapeUtil } from '../utils/tldraw/calendarShapes/CalendarShapeUtil'
import { MicrophoneShapeUtil } from '../utils/tldraw/MicrophoneShape/MicrophoneShapeUtil'
import { TranscriptionTextShapeUtil } from '../utils/tldraw/MicrophoneShape/TranscriptionTextShapeUtil'
import { SlideShapeUtil, SlideShowShapeUtil } from '../utils/tldraw/slides/SlideShapeUtil'

const slide_layout_binding_schema = createTLSchemaFromUtils({
  bindingUtils: [
    SlideLayoutBindingUtil,
  ],
})

export const server_schema_default = createTLSchema({
  shapes: {
    ...defaultShapeSchemas,
    'youtube-embed': {
      props: YoutubeEmbedShapeUtil.props,
      migrations: YoutubeEmbedShapeUtil.migrations,
    },
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
    calendar: {
      props: CalendarShapeUtil.props,
      migrations: CalendarShapeUtil.migrations,
    },
    microphone: {
      props: MicrophoneShapeUtil.props,
      migrations: MicrophoneShapeUtil.migrations,
    },
    transcriptionText: {
      props: TranscriptionTextShapeUtil.props,
      migrations: TranscriptionTextShapeUtil.migrations,
    },
    slide: {
      props: SlideShapeUtil.props,
      migrations: SlideShapeUtil.migrations,
    },
    slideshow: {
      props: SlideShowShapeUtil.props,
      migrations: SlideShowShapeUtil.migrations,
    },
    user_node: {
      props: UserNodeShapeUtil.props,
      migrations: UserNodeShapeUtil.migrations,
    },
    developer_node: {
      props: DeveloperNodeShapeUtil.props,
      migrations: DeveloperNodeShapeUtil.migrations,
    },
    teacher_node: {
      props: TeacherNodeShapeUtil.props,
      migrations: TeacherNodeShapeUtil.migrations,
    },
    calendar_node: {
      props: CalendarNodeShapeUtil.props,
      migrations: CalendarNodeShapeUtil.migrations,
    },
    calendar_year_node: {
      props: CalendarYearNodeShapeUtil.props,
      migrations: CalendarYearNodeShapeUtil.migrations,
    },
    calendar_month_node: {
      props: CalendarMonthNodeShapeUtil.props,
      migrations: CalendarMonthNodeShapeUtil.migrations,
    },
    calendar_week_node: {
      props: CalendarWeekNodeShapeUtil.props,
      migrations: CalendarWeekNodeShapeUtil.migrations,
    },
    calendar_day_node: {
      props: CalendarDayNodeShapeUtil.props,
      migrations: CalendarDayNodeShapeUtil.migrations,
    },
    calendar_time_chunk_node: {
      props: CalendarTimeChunkNodeShapeUtil.props,
      migrations: CalendarTimeChunkNodeShapeUtil.migrations,
    },
    school_timetable_node: {
      props: SchoolTimetableNodeShapeUtil.props,
      migrations: SchoolTimetableNodeShapeUtil.migrations,
    },
    academic_year_node: {
      props: AcademicYearNodeShapeUtil.props,
      migrations: AcademicYearNodeShapeUtil.migrations,
    },
    academic_term_node: {
      props: AcademicTermNodeShapeUtil.props,
      migrations: AcademicTermNodeShapeUtil.migrations,
    },
    academic_week_node: {
      props: AcademicWeekNodeShapeUtil.props,
      migrations: AcademicWeekNodeShapeUtil.migrations,
    },
    academic_day_node: {
      props: AcademicDayNodeShapeUtil.props,
      migrations: AcademicDayNodeShapeUtil.migrations,
    },
    academic_period_node: {
      props: AcademicPeriodNodeShapeUtil.props,
      migrations: AcademicPeriodNodeShapeUtil.migrations,
    },
    registration_period_node: {
      props: RegistrationPeriodNodeShapeUtil.props,
      migrations: RegistrationPeriodNodeShapeUtil.migrations,
    },
    school_node: {
      props: SchoolNodeShapeUtil.props,
      migrations: SchoolNodeShapeUtil.migrations,
    },
    subject_class_node: {
      props: SubjectClassNodeShapeUtil.props,
      migrations: SubjectClassNodeShapeUtil.migrations,
    },
    department_node: {
      props: DepartmentNodeShapeUtil.props,
      migrations: DepartmentNodeShapeUtil.migrations,
    },
    room_node: {
      props: RoomNodeShapeUtil.props,
      migrations: RoomNodeShapeUtil.migrations,
    },
    pastoral_structure_node: {
      props: PastoralStructureNodeShapeUtil.props,
      migrations: PastoralStructureNodeShapeUtil.migrations,
    },
    curriculum_structure_node: {
      props: CurriculumStructureNodeShapeUtil.props,
      migrations: CurriculumStructureNodeShapeUtil.migrations,
    },
    key_stage_node: {
      props: KeyStageNodeShapeUtil.props,
      migrations: KeyStageNodeShapeUtil.migrations,
    },
    key_stage_syllabus_node: {
      props: KeyStageSyllabusNodeShapeUtil.props,
      migrations: KeyStageSyllabusNodeShapeUtil.migrations,
    },
    year_group_node: {
      props: YearGroupNodeShapeUtil.props,
      migrations: YearGroupNodeShapeUtil.migrations,
    },
    year_group_syllabus_node: {
      props: YearGroupSyllabusNodeShapeUtil.props,
      migrations: YearGroupSyllabusNodeShapeUtil.migrations,
    },
    subject_node: {
      props: SubjectNodeShapeUtil.props,
      migrations: SubjectNodeShapeUtil.migrations,
    },
    topic_node: {
      props: TopicNodeShapeUtil.props,
      migrations: TopicNodeShapeUtil.migrations,
    },
    topic_lesson_node: {
      props: TopicLessonNodeShapeUtil.props,
      migrations: TopicLessonNodeShapeUtil.migrations,
    },
    learning_statement_node: {
      props: LearningStatementNodeShapeUtil.props,
      migrations: LearningStatementNodeShapeUtil.migrations,
    },
    science_lab_node: {
      props: ScienceLabNodeShapeUtil.props,
      migrations: ScienceLabNodeShapeUtil.migrations,
    },
    teacher_timetable_node: {
      props: TeacherTimetableNodeShapeUtil.props,
      migrations: TeacherTimetableNodeShapeUtil.migrations,
    },
    timetable_lesson_node: {
      props: TimetableLessonNodeShapeUtil.props,
      migrations: TimetableLessonNodeShapeUtil.migrations,
    },
    planned_lesson_node: {
      props: PlannedLessonNodeShapeUtil.props,
      migrations: PlannedLessonNodeShapeUtil.migrations,
    },
    general_relationship: {
      props: GeneralRelationshipShapeUtil.props,
      migrations: GeneralRelationshipShapeUtil.migrations,
    },
  },
  bindings: {
    ...defaultBindingSchemas,
    'slide-layout': {
      props: SlideLayoutBindingUtil.props,
      migrations: SlideLayoutBindingUtil.migrations,
    }
  },
})