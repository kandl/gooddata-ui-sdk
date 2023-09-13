// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreBulletChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "bullet" }, this.props));
    }
}
//# sourceMappingURL=CoreBulletChart.js.map