// (C) 2021-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Overlay, ItemsWrapper, Item } from "@gooddata/sdk-ui-kit";
const overlayAlignPoints = [
    {
        align: "tc bc",
        offset: {
            x: -10,
            y: -5,
        },
    },
];
const DrillModalExportOptions = ({ showDropdown, toggleShowDropdown, exportXLSXEnabled, onExportXLSX, exportCSVEnabled, onExportCSV, }) => showDropdown ? (React.createElement(Overlay, { key: "DrillModalOptionsMenu", alignTo: ".export-drilled-insight", alignPoints: overlayAlignPoints, className: "gd-header-menu-overlay s-drill-modal-export-options", closeOnOutsideClick: true, onClose: toggleShowDropdown },
    React.createElement(ItemsWrapper, { smallItemsSpacing: true },
        exportXLSXEnabled ? (React.createElement(Item, { onClick: onExportXLSX, className: "options-menu-export-xlsx s-export-drilled-insight-xlsx" },
            React.createElement(FormattedMessage, { id: "widget.options.menu.exportToXLSX" }))) : null,
        exportCSVEnabled ? (React.createElement(Item, { onClick: onExportCSV, className: "options-menu-export-csv s-export-drilled-insight-csv" },
            React.createElement(FormattedMessage, { id: "widget.options.menu.exportToCSV" }))) : null))) : null;
export default DrillModalExportOptions;
//# sourceMappingURL=DrillModalExportOptions.js.map