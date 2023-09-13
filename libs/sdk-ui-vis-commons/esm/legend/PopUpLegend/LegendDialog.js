// (C) 2007-2022 GoodData Corporation
import React from "react";
import { Overlay, useMediaQuery } from "@gooddata/sdk-ui-kit";
import { legendDialogAlignPoints, legendMobileDialogAlignPoints } from "./alignPoints.js";
const LegendDialogWrapper = ({ children }) => {
    const isMobile = useMediaQuery("<sm");
    return children(isMobile);
};
const LegendDialogContent = (props) => {
    const { title, onCloseDialog, children } = props;
    const onClose = (e) => {
        e.preventDefault();
        onCloseDialog();
    };
    return (React.createElement("div", { className: "legend-popup-dialog legend-popup-dialog-content" },
        React.createElement("div", { className: "legend-header" },
            React.createElement("div", { className: "legend-header-title" }, title),
            React.createElement("div", { className: "s-legend-close legend-close gd-icon-cross gd-button-link gd-button-icon-only", onClick: onClose })),
        React.createElement("div", { className: "legend-content" }, children)));
};
export const LegendDialog = (props) => {
    const { name, children, isOpen, alignTo, onCloseDialog } = props;
    if (!isOpen) {
        return null;
    }
    return (React.createElement(LegendDialogWrapper, null, (isMobile) => {
        return (React.createElement(Overlay, { alignTo: alignTo, alignPoints: isMobile ? legendMobileDialogAlignPoints : legendDialogAlignPoints, closeOnOutsideClick: !isMobile, onClose: onCloseDialog, className: "kpi-alert-dialog-overlay" },
            React.createElement(LegendDialogContent, { title: name, onCloseDialog: onCloseDialog }, children)));
    }));
};
//# sourceMappingURL=LegendDialog.js.map