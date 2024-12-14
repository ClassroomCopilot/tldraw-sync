import { DefaultColorStyle, T, RecordProps } from 'tldraw'
import {
    GeneralRelationshipShape
} from './graph-relationship-types'

// Base node shape props
export const baseRelationshipShapeProps = {
    w: T.number,
    h: T.number,
    color: DefaultColorStyle,
    __relationshiptype__: T.string,
    source: T.string,
    target: T.string,
}

// General relationship shape props
export const generalRelationshipShapeProps: RecordProps<GeneralRelationshipShape> = {
    ...baseRelationshipShapeProps,
}

