// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CorePieChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "pie" }, this.props));
    }
}
//# sourceMappingURL=CorePieChart.js.map