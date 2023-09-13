// (C) 2019-2022 GoodData Corporation
import BaseChartConfigurationPanel from "./BaseChartConfigurationPanel.js";
import { BAR_CHART_AXIS_CONFIG } from "../../constants/axis.js";
export default class BarChartConfigurationPanel extends BaseChartConfigurationPanel {
    getAxesConfiguration(type) {
        return BAR_CHART_AXIS_CONFIG[type];
    }
}
//# sourceMappingURL=BarChartConfigurationPanel.js.map