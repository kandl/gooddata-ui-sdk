import React from "react";
import { AttributeDisplayFormType, ObjRef } from "@gooddata/sdk-model";
interface IAttributeDisplayFormParameterDetailProps {
    title: string;
    label: string;
    type: AttributeDisplayFormType | undefined;
    projectId: string;
    displayFormRef: ObjRef;
    showValues: boolean;
}
export declare const AttributeDisplayFormParameterDetail: React.FC<IAttributeDisplayFormParameterDetailProps>;
export {};
