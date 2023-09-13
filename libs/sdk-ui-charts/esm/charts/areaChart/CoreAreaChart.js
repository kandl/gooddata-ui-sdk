// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreAreaChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "area" }, this.props));
    }
}
//# sourceMappingURL=CoreAreaChart.js.map