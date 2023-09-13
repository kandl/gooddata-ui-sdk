import React from "react";
import { IWidget, ObjRef } from "@gooddata/sdk-model";
interface IAttributeFilterConfigurationItemProps {
    widget: IWidget;
    displayFormRef: ObjRef;
    title: string;
}
export declare const AttributeFilterConfigurationItem: React.FC<IAttributeFilterConfigurationItemProps>;
export {};
