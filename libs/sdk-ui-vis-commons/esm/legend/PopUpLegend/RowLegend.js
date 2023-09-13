// (C) 2007-2022 GoodData Corporation
import React, { useState } from "react";
import { Icon } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import { LegendLabelItem } from "../LegendLabelItem.js";
import { LegendList } from "../LegendList.js";
const LEGEND_ROW_HEIGHT = 20;
const LEGEND_TOP_BOTTOM_PADDING = 10;
const useCheckOverflow = () => {
    const [isOverflow, setOverFlow] = useState(false);
    const [numOfUsedRow, setNumOfUsedRow] = useState(1);
    const getNumberOfRows = (clientHeight) => {
        return Math.ceil((clientHeight - LEGEND_TOP_BOTTOM_PADDING) / LEGEND_ROW_HEIGHT);
    };
    const checkOverFlow = (element) => {
        if (!element)
            return;
        const { clientHeight, scrollHeight } = element;
        setOverFlow(scrollHeight > clientHeight);
        const numberOfRows = getNumberOfRows(clientHeight);
        setNumOfUsedRow(numberOfRows);
    };
    return [isOverflow, numOfUsedRow, checkOverFlow];
};
export const RowLegendIcoButton = (props) => {
    const { isVisible, isActive, onIconClick } = props;
    if (!isVisible) {
        return null;
    }
    const handleOnClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onIconClick();
    };
    const iconClasses = cx("legend-popup-icon s-legend-popup-icon", {
        "legend-popup-icon-active": isActive,
    });
    return (React.createElement("div", { className: "legend-popup-button" },
        React.createElement("div", { onClick: handleOnClick, className: iconClasses },
            React.createElement(Icon.LegendMenu, null))));
};
export const RowLegend = (props) => {
    const { series, maxRowsCount = 1, legendLabel, enableBorderRadius, onDialogIconClick, onLegendItemClick, isActive = false, } = props;
    const [isOverflow, numOfUsedRow, checkOverFlow] = useCheckOverflow();
    const LEGEND_HEIGHT = maxRowsCount * LEGEND_ROW_HEIGHT + LEGEND_TOP_BOTTOM_PADDING;
    const itemsAlign = numOfUsedRow === 1 ? "flex-end" : "flex-start";
    return (React.createElement("div", { className: "legend-popup-row", style: { maxHeight: LEGEND_HEIGHT } },
        React.createElement("div", { className: "viz-legend static position-row" },
            React.createElement("div", { className: "series", style: {
                    justifyContent: itemsAlign,
                }, ref: (element) => {
                    checkOverFlow(element);
                } },
                React.createElement(LegendLabelItem, { label: legendLabel }),
                React.createElement(LegendList, { enableBorderRadius: enableBorderRadius, series: series, onItemClick: onLegendItemClick }))),
        React.createElement(RowLegendIcoButton, { isActive: isActive, isVisible: isOverflow, onIconClick: onDialogIconClick })));
};
//# sourceMappingURL=RowLegend.js.map