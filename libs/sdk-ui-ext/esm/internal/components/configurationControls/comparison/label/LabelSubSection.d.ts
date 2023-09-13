import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../interfaces/ControlProperties.js";
export interface ILabelSubSectionProps {
    sectionDisabled: boolean;
    showDisabledMessage?: boolean;
    defaultLabelKey: string;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const LabelSubSection: React.FC<ILabelSubSectionProps>;
export default LabelSubSection;
//# sourceMappingURL=LabelSubSection.d.ts.map