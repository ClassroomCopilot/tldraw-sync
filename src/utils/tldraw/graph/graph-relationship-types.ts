import { TLBaseShape, TLDefaultColorStyle } from 'tldraw'
import {
    GeneralRelationshipInterface
} from '../../../types/graph_relationship_types'

export type BaseRelationshipShape<T extends string, U> = TLBaseShape<T, {
    w: number
    h: number
    color: TLDefaultColorStyle
} & U>;

export type AllRelationshipShapes = GeneralRelationshipShape;

export type GeneralRelationshipShape = BaseRelationshipShape<"general_relationship", GeneralRelationshipInterface>;