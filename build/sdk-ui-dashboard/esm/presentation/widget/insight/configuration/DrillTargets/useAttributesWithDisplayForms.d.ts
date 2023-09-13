import { IAttributeDescriptor } from "@gooddata/sdk-model";
import { IAttributeWithDisplayForm } from "../../../../drill/DrillConfigPanel/DrillToUrl/types.js";
export interface IUseAttributesWithDisplayFormsResult {
    linkDisplayForms: IAttributeWithDisplayForm[];
    allDisplayForms: IAttributeWithDisplayForm[];
}
export declare function useAttributesWithDisplayForms(attributes: IAttributeDescriptor[]): IUseAttributesWithDisplayFormsResult;
