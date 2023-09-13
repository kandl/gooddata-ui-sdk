import React from "react";
import { ISeparators, PushDataCallback } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../interfaces/ControlProperties.js";
interface IValueSubSectionProps {
    sectionDisabled: boolean;
    showDisabledMessage?: boolean;
    defaultFormat: string;
    separators: ISeparators;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const ValueSubSection: React.FC<IValueSubSectionProps>;
export default ValueSubSection;
//# sourceMappingURL=ValueSubSection.d.ts.map