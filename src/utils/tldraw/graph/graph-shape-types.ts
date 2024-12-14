import { TLBaseShape, TLDefaultColorStyle } from 'tldraw'
import {
    UserNodeInterface,
    DeveloperNodeInterface,
    TeacherNodeInterface,
    StudentNodeInterface,
    CalendarNodeInterface,
    CalendarYearNodeInterface,
    CalendarMonthNodeInterface,
    CalendarWeekNodeInterface,
    CalendarDayNodeInterface,
    CalendarTimeChunkNodeInterface,
    SchoolNodeInterface,
    DepartmentNodeInterface,
    RoomNodeInterface,
    SubjectClassNodeInterface,
    PastoralStructureNodeInterface,
    YearGroupNodeInterface,
    CurriculumStructureNodeInterface,
    KeyStageNodeInterface,
    KeyStageSyllabusNodeInterface,
    YearGroupSyllabusNodeInterface,
    SubjectNodeInterface,
    TopicNodeInterface,
    TopicLessonNodeInterface,
    LearningStatementNodeInterface,
    ScienceLabNodeInterface,
    SchoolTimetableNodeInterface,
    AcademicYearNodeInterface,
    AcademicTermNodeInterface,
    AcademicWeekNodeInterface,
    AcademicDayNodeInterface,
    AcademicPeriodNodeInterface,
    RegistrationPeriodNodeInterface,
    TeacherTimetableNodeInterface,
    TimetableLessonNodeInterface,
    PlannedLessonNodeInterface
} from '../../../types/graph_node_types';

export type BaseNodeShape<T extends string, U> = TLBaseShape<T, {
    w: number
    h: number
    color: TLDefaultColorStyle
} & U>;

export type AllNodeShapes = UserNodeShape | DeveloperNodeShape | TeacherNodeShape | StudentNodeShape | CalendarNodeShape | CalendarYearNodeShape | CalendarMonthNodeShape | CalendarWeekNodeShape | CalendarDayNodeShape | CalendarTimeChunkNodeShape | ScienceLabNodeShape | KeyStageSyllabusNodeShape | YearGroupNodeShape | YearGroupSyllabusNodeShape | CurriculumStructureNodeShape | TopicNodeShape | TopicLessonNodeShape | LearningStatementNodeShape | SchoolNodeShape | TeacherTimetableNodeShape | TimetableLessonNodeShape | PlannedLessonNodeShape | SchoolTimetableNodeShape | SubjectClassNodeShape | SubjectNodeShape | AcademicDayNodeShape | AcademicWeekNodeShape | AcademicYearNodeShape | AcademicTermNodeShape | AcademicPeriodNodeShape | RegistrationPeriodNodeShape | PastoralStructureNodeShape | KeyStageNodeShape | RoomNodeShape | DepartmentNodeShape;

// User entity node shapes
export type UserNodeShape = BaseNodeShape<"user_node", UserNodeInterface>;
export type DeveloperNodeShape = BaseNodeShape<"developer_node", DeveloperNodeInterface>;
export type TeacherNodeShape = BaseNodeShape<"teacher_node", TeacherNodeInterface>;
export type StudentNodeShape = BaseNodeShape<"student_node", StudentNodeInterface>;

// Calendar node shapes
export type CalendarNodeShape = BaseNodeShape<"calendar_node", CalendarNodeInterface>;
export type CalendarYearNodeShape = BaseNodeShape<"calendar_year_node", CalendarYearNodeInterface>;
export type CalendarMonthNodeShape = BaseNodeShape<"calendar_month_node", CalendarMonthNodeInterface>;
export type CalendarWeekNodeShape = BaseNodeShape<"calendar_week_node", CalendarWeekNodeInterface>;
export type CalendarDayNodeShape = BaseNodeShape<"calendar_day_node", CalendarDayNodeInterface>;
export type CalendarTimeChunkNodeShape = BaseNodeShape<"calendar_time_chunk_node", CalendarTimeChunkNodeInterface>;

// School entity node shapes
export type SchoolNodeShape = BaseNodeShape<"school_node", SchoolNodeInterface>;
export type DepartmentNodeShape = BaseNodeShape<"department_node", DepartmentNodeInterface>;
export type RoomNodeShape = BaseNodeShape<"room_node", RoomNodeInterface>;
export type SubjectClassNodeShape = BaseNodeShape<"subject_class_node", SubjectClassNodeInterface>;

// Curriculum entity node shapes
export type PastoralStructureNodeShape = BaseNodeShape<"pastoral_structure_node", PastoralStructureNodeInterface>;
export type YearGroupNodeShape = BaseNodeShape<"year_group_node", YearGroupNodeInterface>;
export type CurriculumStructureNodeShape = BaseNodeShape<"curriculum_structure_node", CurriculumStructureNodeInterface>;
export type KeyStageNodeShape = BaseNodeShape<"key_stage_node", KeyStageNodeInterface>;
export type KeyStageSyllabusNodeShape = BaseNodeShape<"key_stage_syllabus_node", KeyStageSyllabusNodeInterface>;
export type YearGroupSyllabusNodeShape = BaseNodeShape<"year_group_syllabus_node", YearGroupSyllabusNodeInterface>;
export type SubjectNodeShape = BaseNodeShape<"subject_node", SubjectNodeInterface>;
export type TopicNodeShape = BaseNodeShape<"topic_node", TopicNodeInterface>;
export type TopicLessonNodeShape = BaseNodeShape<"topic_lesson_node", TopicLessonNodeInterface>;
export type LearningStatementNodeShape = BaseNodeShape<"learning_statement_node", LearningStatementNodeInterface>;
export type ScienceLabNodeShape = BaseNodeShape<"science_lab_node", ScienceLabNodeInterface>;

// School timetable entity node shapes
export type SchoolTimetableNodeShape = BaseNodeShape<"school_timetable_node", SchoolTimetableNodeInterface>;
export type AcademicYearNodeShape = BaseNodeShape<"academic_year_node", AcademicYearNodeInterface>;
export type AcademicTermNodeShape = BaseNodeShape<"academic_term_node", AcademicTermNodeInterface>;
export type AcademicWeekNodeShape = BaseNodeShape<"academic_week_node", AcademicWeekNodeInterface>;
export type AcademicDayNodeShape = BaseNodeShape<"academic_day_node", AcademicDayNodeInterface>;
export type AcademicPeriodNodeShape = BaseNodeShape<"academic_period_node", AcademicPeriodNodeInterface>;
export type RegistrationPeriodNodeShape = BaseNodeShape<"registration_period_node", RegistrationPeriodNodeInterface>;

// Teacher timetable entity node shapes
export type TeacherTimetableNodeShape = BaseNodeShape<"teacher_timetable_node", TeacherTimetableNodeInterface>;
export type TimetableLessonNodeShape = BaseNodeShape<"timetable_lesson_node", TimetableLessonNodeInterface>;
export type PlannedLessonNodeShape = BaseNodeShape<"planned_lesson_node", PlannedLessonNodeInterface>;

