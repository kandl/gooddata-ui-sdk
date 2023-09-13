import React from "react";
import { InsightCodeType } from "../types.js";
/**
 * @internal
 */
export interface IComponentTypeSelectProps {
    selectedComponentType: InsightCodeType;
    onComponentTypeChanged: (insightType: InsightCodeType) => void;
}
/**
 * @internal
 */
export declare const ComponentTypeSelect: React.VFC<IComponentTypeSelectProps>;
//# sourceMappingURL=ComponentTypeSelect.d.ts.map