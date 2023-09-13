// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Overlay } from "../Overlay/index.js";
const dropdownAlignPoints = [{ align: "bl tl" }, { align: "br tr" }];
/**
 * @internal
 */
export const ChartSortingDropdownBody = ({ children, buttonNode, onClose, }) => {
    const getDialogClasses = () => {
        return cx([
            "overlay",
            "gd-dialog",
            "gd-dropdown",
            "gd-sort-charting-dropdown",
            "gd-sort-charting-dropdown-wide",
            "s-sort-charting-dropdown",
        ]);
    };
    return (React.createElement(Overlay, { alignTo: buttonNode, alignPoints: dropdownAlignPoints, closeOnOutsideClick: true, closeOnParentScroll: true, closeOnMouseDrag: true, ignoreClicksOnByClass: [
            ".gd-measure-sorting-dropdown-body",
            ".gd-attribute-sorting-dropdown-body",
        ], onClose: onClose },
        React.createElement("div", { className: getDialogClasses() }, children)));
};
//# sourceMappingURL=ChartSortingDropdownBody.js.map