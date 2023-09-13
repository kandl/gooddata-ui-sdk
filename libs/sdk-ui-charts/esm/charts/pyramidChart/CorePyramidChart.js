// (C) 2007-2023 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CorePyramidChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "pyramid" }, this.props));
    }
}
//# sourceMappingURL=CorePyramidChart.js.map