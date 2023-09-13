// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop.js";
import { LegendList } from "./LegendList.js";
import { calculateFluidLegend } from "./helpers.js";
/**
 * @internal
 */
export class FluidLegend extends React.PureComponent {
    state = {
        showAll: false,
    };
    toggleShowAll = () => {
        this.setState({
            showAll: !this.state.showAll,
        });
    };
    renderSeries = (itemWidth, visibleItemsCount) => {
        const { series, onItemClick = noop, enableBorderRadius } = this.props;
        const limit = this.state.showAll ? series.length : visibleItemsCount;
        const pagedSeries = series.slice(0, limit);
        return (React.createElement("div", { className: "series" },
            React.createElement(LegendList, { enableBorderRadius: enableBorderRadius, series: pagedSeries, onItemClick: onItemClick, width: itemWidth })));
    };
    renderPaging = () => {
        const classes = cx("gd-button-link", "gd-button-icon-only", "paging-button", {
            "gd-icon-chevron-up": this.state.showAll,
            "gd-icon-chevron-down": !this.state.showAll,
        });
        return (React.createElement("div", { className: "paging" },
            React.createElement("button", { className: classes, onClick: this.toggleShowAll })));
    };
    render() {
        const { series, containerWidth } = this.props;
        const { itemWidth, hasPaging, visibleItemsCount } = calculateFluidLegend(series.length, containerWidth);
        return (React.createElement("div", { className: "viz-legend fluid" },
            this.renderSeries(itemWidth, visibleItemsCount),
            hasPaging ? this.renderPaging() : null));
    }
}
//# sourceMappingURL=FluidLegend.js.map