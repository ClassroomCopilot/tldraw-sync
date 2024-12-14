export interface BaseRelationshipInterface {
    __relationshiptype__: string;
    source: string;
    target: string;
}

// General
export interface GeneralRelationshipInterface extends BaseRelationshipInterface {
    __relationshiptype__: string;
    source: string;
    target: string;
}
