// (C) 2023 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreDependencyWheelChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "dependencywheel" }, this.props));
    }
}
//# sourceMappingURL=CoreDependencyWheelChart.js.map