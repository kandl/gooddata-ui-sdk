// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreLineChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "line" }, this.props));
    }
}
//# sourceMappingURL=CoreLineChart.js.map