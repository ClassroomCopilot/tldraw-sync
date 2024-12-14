import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

// Ensure each node type and its migrations are added separately
const userNodeVersions = createShapePropsMigrationIds(
    'user_node',
    {
        AddSomeProperty: 1,
    }
)

const developerNodeVersions = createShapePropsMigrationIds(
    'developer_node',
    {
        AddSomeProperty: 1,
    }
);

const teacherNodeVersions = createShapePropsMigrationIds(
    'teacher_node',
    {
        AddSomeProperty: 1,
    }
);

const studentNodeVersions = createShapePropsMigrationIds(
    'student_node',
    {
        AddSomeProperty: 1,
    }
);

export const userNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: userNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const developerNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: developerNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const teacherNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: teacherNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const studentNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: studentNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

// Calendar node shape migrations
const calendarNodeVersions = createShapePropsMigrationIds(
    'calendar_node',
    {
        AddSomeProperty: 1,
    }
)

const yearNodeVersions = createShapePropsMigrationIds(
    'calendar_year_node',
    {
        AddSomeProperty: 1,
    }
);

const monthNodeVersions = createShapePropsMigrationIds(
    'calendar_month_node',
    {
        AddSomeProperty: 1,
    }
);

const weekNodeVersions = createShapePropsMigrationIds(
    'calendar_week_node',
    {
        AddSomeProperty: 1,
    }
);

const dayNodeVersions = createShapePropsMigrationIds(
    'calendar_day_node',
    {
        AddSomeProperty: 1,
    }
);

const timeChunkNodeVersions = createShapePropsMigrationIds(
    'calendar_time_chunk_node',
    {
        AddSomeProperty: 1,
    }
);


export const calendarNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: calendarNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const yearNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: yearNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const monthNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: monthNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const weekNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: weekNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const dayNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: dayNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const timeChunkNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: timeChunkNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})


const schoolNodeVersions = createShapePropsMigrationIds(
    'school_node',
    {
        AddSomeProperty: 1,
    }
)

const departmentNodeVersions = createShapePropsMigrationIds(
    'department_node',
    {
        AddSomeProperty: 1,
    }
);

const roomNodeVersions = createShapePropsMigrationIds(
    'room_node',
    {
        AddSomeProperty: 1,
    }
);

const subjectClassNodeVersions = createShapePropsMigrationIds(
    'subject_class_node',
    {
        AddSomeProperty: 1,
    }
);

export const schoolNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: schoolNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const departmentNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: departmentNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const roomNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: roomNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const subjectClassNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: subjectClassNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})


const pastoralStructureNodeVersions = createShapePropsMigrationIds(
    'pastoral_structure_node',
    {
        AddSomeProperty: 1,
    }
)

const yearGroupNodeVersions = createShapePropsMigrationIds(
    'year_group_node',
    {
        AddSomeProperty: 1,
    }
);

const curriculumStructureNodeVersions = createShapePropsMigrationIds(
    'curriculum_structure_node',
    {
        AddSomeProperty: 1,
    }
);

const keyStageNodeVersions = createShapePropsMigrationIds(
    'key_stage_node',
    {
        AddSomeProperty: 1,
    }
);

const keyStageSyllabusNodeVersions = createShapePropsMigrationIds(
    'key_stage_syllabus_node',
    {
        AddSomeProperty: 1,
    }
);

const yearGroupSyllabusNodeVersions = createShapePropsMigrationIds(
    'year_group_syllabus_node',
    {
        AddSomeProperty: 1,
    }
);

const subjectNodeVersions = createShapePropsMigrationIds(
    'subject_node',
    {
        AddSomeProperty: 1,
    }
);

const topicNodeVersions = createShapePropsMigrationIds(
    'topic_node',
    {
        AddSomeProperty: 1,
    }
);

const topicLessonNodeVersions = createShapePropsMigrationIds(
    'topic_lesson_node',
    {
        AddSomeProperty: 1,
    }
);

const learningStatementNodeVersions = createShapePropsMigrationIds(
    'learning_statement_node',
    {
        AddSomeProperty: 1,
    }
);

const scienceLabNodeVersions = createShapePropsMigrationIds(
    'science_lab_node',
    {
        AddSomeProperty: 1,
    }
);

export const pastoralStructureNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: pastoralStructureNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const yearGroupNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: yearGroupNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const curriculumStructureNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: curriculumStructureNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const keyStageNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: keyStageNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const keyStageSyllabusNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: keyStageSyllabusNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const yearGroupSyllabusNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: yearGroupSyllabusNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const subjectNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: subjectNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const topicNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: topicNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const topicLessonNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: topicLessonNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})


export const learningStatementNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: learningStatementNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const scienceLabNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: scienceLabNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})




const schoolTimetableNodeVersions = createShapePropsMigrationIds(
    'school_timetable_node',
    {
        AddSomeProperty: 1,
    }
)

const academicYearNodeVersions = createShapePropsMigrationIds(
    'academic_year_node',
    {
        AddSomeProperty: 1,
    }
);

const academicTermNodeVersions = createShapePropsMigrationIds(
    'academic_term_node',
    {
        AddSomeProperty: 1,
    }
);

const academicWeekNodeVersions = createShapePropsMigrationIds(
    'academic_week_node',
    {
        AddSomeProperty: 1,
    }
);

const academicDayNodeVersions = createShapePropsMigrationIds(
    'academic_day_node',
    {
        AddSomeProperty: 1,
    }
);

const academicPeriodNodeVersions = createShapePropsMigrationIds(
    'academic_period_node',
    {
        AddSomeProperty: 1,
    }
);

const registrationPeriodNodeVersions = createShapePropsMigrationIds(
    'registration_period_node',
    {
        AddSomeProperty: 1,
    }
);

export const schoolTimetableNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: schoolTimetableNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const academicYearNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: academicYearNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const academicTermNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: academicTermNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const academicWeekNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: academicWeekNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const academicDayNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: academicDayNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const academicPeriodNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: academicPeriodNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const registrationPeriodNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: registrationPeriodNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})





const teacherTimetableNodeVersions = createShapePropsMigrationIds(
    'teacher_timetable_node',
    {
        AddSomeProperty: 1,
    }
)

const timetableLessonNodeVersions = createShapePropsMigrationIds(
    'timetable_lesson_node',
    {
        AddSomeProperty: 1,
    }
);

const plannedLessonNodeVersions = createShapePropsMigrationIds(
    'planned_lesson_node',
    {
        AddSomeProperty: 1,
    }
);

export const teacherTimetableNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: teacherTimetableNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const timetableLessonNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: timetableLessonNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})

export const plannedLessonNodeShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: plannedLessonNodeVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})