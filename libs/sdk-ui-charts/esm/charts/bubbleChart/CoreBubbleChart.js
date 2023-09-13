// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreBubbleChart extends React.Component {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "bubble" }, this.props));
    }
}
//# sourceMappingURL=CoreBubbleChart.js.map