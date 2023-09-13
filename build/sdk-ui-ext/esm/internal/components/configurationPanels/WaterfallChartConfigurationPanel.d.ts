import React from "react";
import { IAxisProperties } from "../../interfaces/AxisType.js";
import BaseChartConfigurationPanel from "./BaseChartConfigurationPanel.js";
import { IConfigurationPanelContentProps } from "./ConfigurationPanelContent.js";
export interface IWaterfallChartConfigurationPanel extends IConfigurationPanelContentProps {
    dataLabelDefaultValue?: string | boolean;
}
export default class WaterfallChartConfigurationPanel extends BaseChartConfigurationPanel<IWaterfallChartConfigurationPanel> {
    protected renderConfigurationPanel(): React.ReactNode;
    protected renderLegendSection(): React.ReactNode;
    protected getBaseChartAxisSection(axes: IAxisProperties[]): JSX.Element[];
}
//# sourceMappingURL=WaterfallChartConfigurationPanel.d.ts.map