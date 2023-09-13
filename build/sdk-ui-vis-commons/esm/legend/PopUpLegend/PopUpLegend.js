// (C) 2007-2023 GoodData Corporation
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { StaticLegend } from "../StaticLegend.js";
import { LegendDialog } from "./LegendDialog.js";
import { RowLegend } from "./RowLegend.js";
const PAGINATION_HEIGHT = 34;
/**
 * @internal
 */
export const PopUpLegend = (props) => {
    const { name, maxRows, enableBorderRadius, series, onLegendItemClick, containerId, customComponent, customComponentName, } = props;
    const intl = useIntl();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(1);
    const dialogTitle = (page === 1 && customComponentName) || name || intl.formatMessage({ id: "properties.legend.title" });
    const onCloseDialog = () => {
        setDialogOpen(false);
        setPage(1);
    };
    return (React.createElement("div", { "aria-label": "Pop up legend" },
        React.createElement(RowLegend, { legendLabel: name, maxRowsCount: maxRows, series: [...series], onDialogIconClick: () => {
                setDialogOpen((prevState) => !prevState);
            }, onLegendItemClick: onLegendItemClick, enableBorderRadius: enableBorderRadius, isActive: isDialogOpen }),
        React.createElement(LegendDialog, { name: dialogTitle, alignTo: `.${containerId}`, isOpen: isDialogOpen, onCloseDialog: onCloseDialog },
            React.createElement(StaticLegend, { containerHeight: 260, series: [...series], position: "dialog", buttonOrientation: "leftRight", onItemClick: onLegendItemClick, shouldFillAvailableSpace: false, enableBorderRadius: enableBorderRadius, paginationHeight: PAGINATION_HEIGHT, customComponent: customComponent, onPageChanged: setPage }))));
};
//# sourceMappingURL=PopUpLegend.js.map