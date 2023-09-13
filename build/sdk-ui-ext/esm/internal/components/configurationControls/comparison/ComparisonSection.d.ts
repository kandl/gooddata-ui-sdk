import React from "react";
import { PushDataCallback, ISeparators } from "@gooddata/sdk-ui";
import { CalculationType } from "@gooddata/sdk-ui-charts";
import { IColorPalette } from "@gooddata/sdk-model";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../interfaces/ControlProperties.js";
interface IComparisonSectionProps {
    controlDisabled: boolean;
    disabledByVisualization: boolean;
    defaultCalculationType: CalculationType;
    separators: ISeparators;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    propertiesMeta: Record<string, {
        collapsed: boolean;
    }>;
    colorPalette: IColorPalette;
    pushData: PushDataCallback;
}
declare const ComparisonSection: React.FC<IComparisonSectionProps>;
export default ComparisonSection;
//# sourceMappingURL=ComparisonSection.d.ts.map