// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreTreemap extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "treemap" }, this.props));
    }
}
//# sourceMappingURL=CoreTreemap.js.map