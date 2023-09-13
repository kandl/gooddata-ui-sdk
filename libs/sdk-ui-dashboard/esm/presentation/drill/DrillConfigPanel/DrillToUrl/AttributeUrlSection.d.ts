import React from "react";
import { ObjRef } from "@gooddata/sdk-model";
import { IAttributeWithDisplayForm } from "./types.js";
interface IAttributeUrlSectionOwnProps {
    attributeDisplayForms: IAttributeWithDisplayForm[];
    onSelect: (insightAttributeDisplayForm: ObjRef, drillToAttributeDisplayForm: ObjRef) => void;
    selected: ObjRef | false;
    loading?: boolean;
}
type AttributeUrlSectionProps = IAttributeUrlSectionOwnProps;
export declare const AttributeUrlSection: React.FC<AttributeUrlSectionProps>;
export {};
