import React from "react";
import { ObjRef } from "@gooddata/sdk-model";
import { IAlignPoint } from "@gooddata/sdk-ui-kit";
/**
 * It is AttributeDisplayFormSelect
 * It represents selector for related Attribute display forms
 * @internal
 */
export interface IAttributeDisplayFormSelectProps {
    onSelect: (displayForm: ObjRef) => void;
    alignPoints?: IAlignPoint[];
}
/**
 * Component that render Attribute display forms selector as dropdown.
 * @internal
 */
export declare const AttributeDisplayFormSelect: React.FC<IAttributeDisplayFormSelectProps>;
