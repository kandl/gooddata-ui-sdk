// (C) 2019-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Button, Bubble, BubbleHoverTrigger, ShortenedText } from "@gooddata/sdk-ui-kit";
import { selectCanExportTabular, selectSettings, useDashboardSelector } from "../../../../../model/index.js";
import { PoweredByGDLogo } from "./PoweredByGDLogo.js";
import { DrillModalFooter } from "./DrillModalFooter.js";
import { getTitleWithBreadcrumbs } from "./getTitleWithBreadcrumbs.js";
const tooltipAlignPoints = [{ align: "cc tc", offset: { x: -20, y: 10 } }];
const bubbleAlignPoints = [{ align: "bc tc", offset: { x: -5, y: -5 } }];
export const DrillDialog = ({ insightTitle, breadcrumbs, onCloseDialog, onBackButtonClick, isBackButtonVisible, children, exportAvailable, exportXLSXEnabled, exportCSVEnabled, onExportCSV, onExportXLSX, isLoading, }) => {
    const settings = useDashboardSelector(selectSettings);
    const canExport = useDashboardSelector(selectCanExportTabular);
    const shouldShowDrilledInsightExport = (settings === null || settings === void 0 ? void 0 : settings.enableDrilledInsightExport) && canExport;
    const titleWithBreadcrumbs = getTitleWithBreadcrumbs(insightTitle, breadcrumbs);
    return (React.createElement("div", { className: "gd-dialog gd-drill-modal-dialog s-drill-modal-dialog" },
        React.createElement("div", { className: "gd-dialog-header gd-dialog-header-with-border gd-drill-modal-dialog-header" },
            isBackButtonVisible ? (React.createElement(BubbleHoverTrigger, null,
                React.createElement(Button, { className: "gd-button-primary gd-button-icon-only gd-icon-navigateleft s-drill-reset-button gd-drill-reset-button", onClick: onBackButtonClick }),
                React.createElement(Bubble, { className: "bubble-primary", alignPoints: bubbleAlignPoints },
                    React.createElement(FormattedMessage, { id: "drillModal.backToTop", tagName: "span" })))) : null,
            React.createElement("div", { className: "gd-drill-title s-drill-title" },
                React.createElement(ShortenedText, { tagName: "div", tooltipAlignPoints: tooltipAlignPoints, tooltipVisibleOnMouseOver: false }, titleWithBreadcrumbs)),
            React.createElement(Button, { className: "gd-button-link gd-button-icon-only gd-icon-cross gd-drill-close-button s-drill-close-button", onClick: onCloseDialog })),
        React.createElement("div", { className: "gd-drill-modal-dialog-content visualization" },
            React.createElement("div", { className: "gd-drill-modal-dialog-content-base" }, children)),
        shouldShowDrilledInsightExport ? (React.createElement("div", { className: "gd-drill-modal-dialog-footer gd-drill-modal-dialog-footer-with-border s-drill-modal-dialog-footer" },
            React.createElement(DrillModalFooter, { exportAvailable: exportAvailable, exportXLSXEnabled: exportXLSXEnabled, exportCSVEnabled: exportCSVEnabled, onExportXLSX: onExportXLSX, onExportCSV: onExportCSV, isLoading: isLoading }))) : null,
        React.createElement(PoweredByGDLogo, { isSmall: true })));
};
//# sourceMappingURL=DrillDialog.js.map