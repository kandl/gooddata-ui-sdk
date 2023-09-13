// (C) 2021 GoodData Corporation
import React, { useState, useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
import DrillModalExportOptions from "./DrillModalExportOptions.js";
const bubbleAlignPoints = [{ align: "tc bc" }];
export const DrillModalFooter = ({ exportAvailable, exportXLSXEnabled, onExportXLSX, exportCSVEnabled, onExportCSV, isLoading, }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleShowDropdown = useCallback(() => setShowDropdown((oldValue) => !oldValue), []);
    const handleOnExportXLSX = useCallback(() => {
        onExportXLSX();
        setShowDropdown(false);
    }, [onExportXLSX]);
    const handleOnExportCSV = useCallback(() => {
        onExportCSV();
        setShowDropdown(false);
    }, [onExportCSV]);
    const exportDisabled = !exportAvailable || (!exportXLSXEnabled && !exportCSVEnabled);
    const toggleButton = useMemo(() => (React.createElement("button", { onClick: toggleShowDropdown, className: cx("gd-button-link-dimmed gd-button gd-icon-download export-menu-toggle-button", {
            disabled: exportDisabled,
        }), type: "button" },
        React.createElement("span", { className: "gd-button-text" },
            React.createElement(FormattedMessage, { id: "dialogs.export.submit" })))), [exportDisabled, toggleShowDropdown]);
    return (React.createElement("div", { className: cx("s-export-drilled-insight export-drilled-insight", {
            "is-disabled": exportDisabled,
        }) }, exportDisabled && !isLoading ? (React.createElement(BubbleHoverTrigger, null,
        toggleButton,
        React.createElement(Bubble, { className: "bubble-primary", alignPoints: bubbleAlignPoints },
            React.createElement(FormattedMessage, { id: "export_unsupported.disabled" })))) : (React.createElement(React.Fragment, null,
        toggleButton,
        React.createElement(DrillModalExportOptions, { showDropdown: showDropdown, toggleShowDropdown: toggleShowDropdown, exportXLSXEnabled: exportXLSXEnabled, exportCSVEnabled: exportCSVEnabled, onExportXLSX: handleOnExportXLSX, onExportCSV: handleOnExportCSV })))));
};
//# sourceMappingURL=DrillModalFooter.js.map