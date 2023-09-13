// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
export class CoreComboChart extends React.PureComponent {
    render() {
        return React.createElement(BaseChart, Object.assign({ type: "combo" }, this.props));
    }
}
//# sourceMappingURL=CoreComboChart.js.map