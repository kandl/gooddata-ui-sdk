// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop.js";
import isNil from "lodash/isNil.js";
import { LegendList } from "./LegendList.js";
import { Paging } from "./Paging.js";
import { BOTTOM, TOP } from "./PositionTypes.js";
import { calculateStaticLegend, ITEM_HEIGHT, STATIC_PAGING_HEIGHT } from "./helpers.js";
import { LegendLabelItem } from "./LegendLabelItem.js";
/**
 * @internal
 */
class StaticLegend extends React.PureComponent {
    static defaultProps = {
        buttonOrientation: "upDown",
        paginationHeight: STATIC_PAGING_HEIGHT,
        onPageChanged: noop,
    };
    state = {
        page: 1,
    };
    showNextPage = () => {
        const updatedPage = this.state.page + 1;
        this.props.onPageChanged(updatedPage);
        this.setState({ page: updatedPage });
    };
    showPrevPage = () => {
        const updatedPage = this.state.page - 1;
        this.props.onPageChanged(updatedPage);
        this.setState({ page: updatedPage });
    };
    renderPaging = (pagesCount) => {
        const { page } = this.state;
        const { buttonOrientation } = this.props;
        return (React.createElement(Paging, { page: page, pagesCount: pagesCount, showNextPage: this.showNextPage, showPrevPage: this.showPrevPage, buttonsOrientation: buttonOrientation }));
    };
    render() {
        const { enableBorderRadius, containerHeight, onItemClick = noop, position, series, shouldFillAvailableSpace = true, label, paginationHeight, customComponent, } = this.props;
        const { page } = this.state;
        const classNames = cx("viz-legend", "static", `position-${position}`);
        // Without paging
        if (position === TOP || position === BOTTOM) {
            return (React.createElement("div", { className: classNames },
                React.createElement("div", { className: "series" },
                    React.createElement(LegendList, { enableBorderRadius: enableBorderRadius, series: series, onItemClick: onItemClick }))));
        }
        const columnNum = position === "dialog" ? 2 : 1;
        const labelHeight = label ? ITEM_HEIGHT : 0;
        const labelComponent = label ? React.createElement(LegendLabelItem, { label: label }) : null;
        const contentHeight = containerHeight - labelHeight;
        const seriesCount = series.length;
        const { hasPaging, visibleItemsCount } = calculateStaticLegend(seriesCount, contentHeight, columnNum, paginationHeight);
        const usePaging = hasPaging || customComponent;
        const heightOfAvailableSpace = (visibleItemsCount / columnNum) * ITEM_HEIGHT;
        const heightOfVisibleItems = Math.min(visibleItemsCount / columnNum, seriesCount) * ITEM_HEIGHT;
        const seriesHeight = (shouldFillAvailableSpace ? heightOfAvailableSpace : heightOfVisibleItems) + labelHeight;
        const shouldDisplayCustomComponent = page === 1 && this.hasCustomComponent();
        const pagesCount = this.getPagesCount(series.length, visibleItemsCount);
        if (shouldDisplayCustomComponent) {
            return (React.createElement("div", { className: classNames },
                React.createElement("div", { className: "series", style: { height: seriesHeight } },
                    labelComponent,
                    customComponent),
                usePaging ? this.renderPaging(pagesCount) : null));
        }
        const [start, end] = getPagingValues(page, visibleItemsCount, series.length, this.hasCustomComponent());
        const pagedSeries = series.slice(start, end);
        const visibleItemsFitOneColumn = shouldItemsFitOneColumn(visibleItemsCount, columnNum, pagedSeries.length);
        const fullClassNames = cx(classNames, {
            "no-width": visibleItemsFitOneColumn,
        });
        return (React.createElement("div", { className: fullClassNames },
            React.createElement("div", { className: "series", style: { height: seriesHeight } },
                labelComponent,
                React.createElement(LegendList, { enableBorderRadius: enableBorderRadius, series: pagedSeries, onItemClick: onItemClick })),
            usePaging ? this.renderPaging(pagesCount) : null));
    }
    getPagesCount(seriesLength, visibleItemsCount) {
        const defaultPagesCount = Math.ceil(seriesLength / visibleItemsCount);
        return this.hasCustomComponent() ? defaultPagesCount + 1 : defaultPagesCount;
    }
    hasCustomComponent() {
        return !isNil(this.props.customComponent);
    }
}
export { StaticLegend };
export const getPagingValues = (page, visibleItemsCount, seriesLength, hasCustomComponent) => {
    const start = hasCustomComponent ? (page - 2) * visibleItemsCount : (page - 1) * visibleItemsCount;
    const end = hasCustomComponent
        ? Math.min(visibleItemsCount * (page - 1), seriesLength)
        : Math.min(visibleItemsCount * page, seriesLength);
    return [start, end];
};
const shouldItemsFitOneColumn = (visibleItemsCount, columnNum, pagedSeriesLength) => visibleItemsCount / columnNum >= pagedSeriesLength;
//# sourceMappingURL=StaticLegend.js.map