import React from "react";
import BaseChartConfigurationPanel from "./BaseChartConfigurationPanel.js";
import { IConfigurationPanelContentProps } from "./ConfigurationPanelContent.js";
export interface ILineChartBasedConfigurationPanel extends IConfigurationPanelContentProps {
    dataLabelDefaultValue?: string | boolean;
}
export default class LineChartBasedConfigurationPanel extends BaseChartConfigurationPanel<ILineChartBasedConfigurationPanel> {
    protected renderConfigurationPanel(): React.ReactNode;
}
//# sourceMappingURL=LineChartBasedConfigurationPanel.d.ts.map