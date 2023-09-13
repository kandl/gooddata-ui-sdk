import { AxisType } from "./AxisType.js";
import { IVisualizationProperties } from "./Visualization.js";
import { IPushData, ISeparators } from "@gooddata/sdk-ui";
import { IColorPalette } from "@gooddata/sdk-model";
export interface IConfigItemSubsection {
    disabled: boolean;
    configPanelDisabled: boolean;
    axis: AxisType;
    properties: IVisualizationProperties;
    pushData(data: IPushData): void;
}
export interface IHeadlinePanelConfig {
    separators: ISeparators;
    comparisonColorPalette: IColorPalette;
}
//# sourceMappingURL=ConfigurationPanel.d.ts.map