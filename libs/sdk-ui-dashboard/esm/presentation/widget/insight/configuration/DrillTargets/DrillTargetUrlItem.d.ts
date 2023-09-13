import React from "react";
import { IAttributeDescriptor } from "@gooddata/sdk-model";
import { UrlDrillTarget } from "../../../../drill/types.js";
export interface DrillUrlItemProps {
    urlDrillTarget?: UrlDrillTarget;
    attributes: IAttributeDescriptor[];
    onSelect: (selectedTarget: UrlDrillTarget) => void;
}
export declare const DrillTargetUrlItem: React.FunctionComponent<DrillUrlItemProps>;
