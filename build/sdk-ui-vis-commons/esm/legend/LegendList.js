// (C) 2007-2023 GoodData Corporation
import React from "react";
import LegendItem from "./LegendItem.js";
import { LegendAxisIndicator } from "./LegendAxisIndicator.js";
import { LEGEND_AXIS_INDICATOR, LEGEND_SEPARATOR } from "./helpers.js";
export const LegendSeparator = () => (React.createElement("div", { className: "legend-separator", "aria-label": "Legend separator" }));
export class LegendList extends React.PureComponent {
    render() {
        const { series, enableBorderRadius, onItemClick, width } = this.props;
        return series.map((item, index) => {
            const { type, labelKey, data } = item;
            const borderRadius = shouldItemHaveBorderRadius(item, enableBorderRadius);
            if (type === LEGEND_AXIS_INDICATOR) {
                return React.createElement(LegendAxisIndicator, { key: index, labelKey: labelKey, data: data, width: width });
            }
            else if (type === LEGEND_SEPARATOR) {
                return React.createElement(LegendSeparator, { key: index });
            }
            else {
                return (React.createElement(LegendItem, { enableBorderRadius: borderRadius, key: index, item: item, width: width, onItemClick: onItemClick }));
            }
        });
    }
}
function shouldItemHaveBorderRadius(item, enableBorderRadius = false) {
    if (typeof enableBorderRadius === "function") {
        return enableBorderRadius(item);
    }
    return enableBorderRadius;
}
//# sourceMappingURL=LegendList.js.map