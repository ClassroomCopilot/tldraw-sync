import { TLBinding, TLBaseShape, TLShapeId } from 'tldraw'
import { CCBaseShape } from './cc-types'
import { CCBaseProps } from './cc-props'
import { ccGraphShapeProps } from './cc-graph-props'

// Export type for graph shape types
export type GraphShapeType = keyof typeof ccGraphShapeProps

export interface ShapeState {
    parentId: TLShapeId | null
    isPageChild: boolean | null
    hasChildren: boolean | null
    bindings: TLBinding[] | null
}

export type CCGraphShapeProps = CCBaseProps & {
    __primarylabel__: string
    unique_id: string
    path: string
    created: string
    merged: string
    state: ShapeState | null
    defaultComponent: boolean | null
}

// Define the base shape type for graph shapes
export type CCGraphShape = CCBaseShape & TLBaseShape<GraphShapeType, {
  __primarylabel__: CCGraphShapeProps['__primarylabel__']
  unique_id: CCGraphShapeProps['unique_id']
  path: CCGraphShapeProps['path']
  created: CCGraphShapeProps['created']
  merged: CCGraphShapeProps['merged']
  state: CCGraphShapeProps['state']
  defaultComponent: CCGraphShapeProps['defaultComponent']
}>

export type CCUserNodeProps = CCGraphShapeProps & {
    user_name: string
    user_email: string
    user_type: string
    user_id: string
    worker_node_data: string
}

export type CCTeacherNodeProps = CCGraphShapeProps & {
    teacher_code: string
    teacher_name_formal: string
    teacher_email: string
    worker_db_name: string
}

export type CCStudentNodeProps = CCGraphShapeProps & {
    student_name_formal: string
    student_code: string
    student_email: string
}

export type CCCalendarNodeProps = CCGraphShapeProps & {
    title: string
    name: string
    calendar_type: string
    calendar_name: string
    start_date: string
    end_date: string
}

export type CCCalendarYearNodeProps = CCGraphShapeProps & {
    year: string
}

export type CCCalendarMonthNodeProps = CCGraphShapeProps & {
    year: string
    month: string
    month_name: string
}

export type CCCalendarWeekNodeProps = CCGraphShapeProps & {
    start_date: string
    week_number: string
    iso_week: string
}

export type CCCalendarDayNodeProps = CCGraphShapeProps & {
    date: string
    day_of_week: string
    iso_day: string
}

export type CCCalendarTimeChunkNodeProps = CCGraphShapeProps & {
    start_time: string
    end_time: string
}

export type CCSchoolNodeProps = CCGraphShapeProps & {
    school_uuid: string
    school_name: string
    school_website: string
}

export type CCDepartmentNodeProps = CCGraphShapeProps & {
    department_name: string
}

export type CCRoomNodeProps = CCGraphShapeProps & {
    room_code: string
    room_name: string
}

export type CCSubjectClassNodeProps = CCGraphShapeProps & {
    subject_class_code: string
    year_group: string
    subject: string
    subject_code: string
}

export type CCPastoralStructureNodeProps = CCGraphShapeProps & {
    pastoral_structure_type: string
}

export type CCYearGroupNodeProps = CCGraphShapeProps & {
    year_group: string
    year_group_name: string
}

export type CCCurriculumStructureNodeProps = CCGraphShapeProps & {
    curriculum_structure_type: string
}

export type CCKeyStageNodeProps = CCGraphShapeProps & {
    key_stage_name: string
    key_stage: string
}

export type CCKeyStageSyllabusNodeProps = CCGraphShapeProps & {
    ks_syllabus_id: string
    ks_syllabus_name: string
    ks_syllabus_key_stage: string
    ks_syllabus_subject: string
    ks_syllabus_subject_code: string
}

export type CCYearGroupSyllabusNodeProps = CCGraphShapeProps & {
    yr_syllabus_id: string
    yr_syllabus_name: string
    yr_syllabus_year_group: string
    yr_syllabus_subject: string
    yr_syllabus_subject_code: string
}

export type CCSubjectNodeProps = CCGraphShapeProps & {
    subject_code: string
    subject_name: string
}

export type CCTopicNodeProps = CCGraphShapeProps & {
    topic_id: string
    topic_title: string
    total_number_of_lessons_for_topic: string
    topic_type: string
    topic_assessment_type: string
}

export type CCTopicLessonNodeProps = CCGraphShapeProps & {
    topic_lesson_id: string
    topic_lesson_title: string
    topic_lesson_type: string
    topic_lesson_length: string
    topic_lesson_skills_learned: string
    topic_lesson_suggested_activities: string
    topic_lesson_weblinks: string
}

export type CCLearningStatementNodeProps = CCGraphShapeProps & {
    lesson_learning_statement_id: string
    lesson_learning_statement: string
    lesson_learning_statement_type: string
}

export type CCScienceLabNodeProps = CCGraphShapeProps & {
    science_lab_id: string
    science_lab_title: string
    science_lab_summary: string
    science_lab_requirements: string
    science_lab_procedure: string
    science_lab_safety: string
    science_lab_weblinks: string
}

export type CCTeacherTimetableNodeProps = CCGraphShapeProps & {
    teacher_id: string
    start_date: string
    end_date: string
}

export type CCTimetableLessonNodeProps = CCGraphShapeProps & {
    subject_class: string
    date: string
    start_time: string
    end_time: string
    period_code: string
}

export type CCPlannedLessonNodeProps = CCGraphShapeProps & {
    date: string
    start_time: string
    end_time: string
    period_code: string
    subject_class: string
    year_group: string
    subject: string
    teacher_code: string
    planning_status: string
    topic_code: string
    topic_name: string
    lesson_code: string
    lesson_name: string
    learning_statement_codes: string
    learning_statements: string
    learning_resource_codes: string
    learning_resources: string
}

export type CCSchoolTimetableNodeProps = CCGraphShapeProps & {
    start_date: string
    end_date: string
}

export type CCAcademicYearNodeProps = CCGraphShapeProps & {
    year: string
}

export type CCAcademicTermNodeProps = CCGraphShapeProps & {
    term_name: string
    term_number: string
    start_date: string
    end_date: string
}

export type CCAcademicWeekNodeProps = CCGraphShapeProps & {
    academic_week_number: string
    start_date: string
    week_type: string
}

export type CCAcademicDayNodeProps = CCGraphShapeProps & {
    academic_day: string
    date: string
    day_of_week: string
    day_type: string
}

export type CCAcademicPeriodNodeProps = CCGraphShapeProps & {
    name: string
    date: string
    start_time: string
    end_time: string
    period_code: string
}

export type CCRegistrationPeriodNodeProps = CCGraphShapeProps & {
    name: string
    date: string
    start_time: string
    end_time: string
    period_code: string
} 