import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IColorPalette } from "@gooddata/sdk-model";
import { IVisualizationProperties } from "../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../interfaces/ControlProperties.js";
interface IIndicatorSubSectionProps {
    sectionDisabled: boolean;
    showDisabledMessage?: boolean;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    colorPalette: IColorPalette;
    pushData: PushDataCallback;
}
declare const IndicatorSubSection: React.FC<IIndicatorSubSectionProps>;
export default IndicatorSubSection;
//# sourceMappingURL=IndicatorSubSection.d.ts.map