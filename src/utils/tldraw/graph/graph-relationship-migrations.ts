import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

// Ensure each node type and its migrations are added separately
const generalRelationshipVersions = createShapePropsMigrationIds(
    'general_relationship',
    {
        AddSomeProperty: 1,
    }
);

export const generalRelationshipShapeMigrations = createShapePropsMigrationSequence({
    sequence: [
        {
            id: generalRelationshipVersions.AddSomeProperty,
            up(props) {
                props.someProperty = 'some value'
            },
            down(props) {
                delete props.someProperty
            },
        }
    ],
})
