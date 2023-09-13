// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Bubble } from "@gooddata/sdk-ui-kit";
const alignPoints = [
    { align: "tr tl" },
    { align: "br bl" },
    { align: "tl tr" },
    { align: "tr tr" },
    { align: "br br" },
];
const arrowOffsets = {
    "tr tl": [7, 28],
    "br bl": [7, -28],
    "tl tr": [-7, 28],
    "tr tr": [-76, 28],
    "br br": [-76, -28],
};
const arrowDirections = {
    "tr tr": "right",
    "br br": "right",
};
const alignTo = ".s-dash-item.is-selected";
const ignoreClicksOnByClass = [alignTo]; // do not close on click to the widget
export const ConfigurationBubble = (props) => {
    const { children, classNames, onClose } = props;
    return (React.createElement(Bubble, { className: cx("bubble-light gd-configuration-bubble s-gd-configuration-bubble", classNames), overlayClassName: "gd-configuration-bubble-wrapper sdk-edit-mode-on", alignTo: alignTo, alignPoints: alignPoints, arrowOffsets: arrowOffsets, arrowDirections: arrowDirections, closeOnOutsideClick: true, closeOnParentScroll: false, ignoreClicksOnByClass: ignoreClicksOnByClass, onClose: onClose }, children));
};
//# sourceMappingURL=ConfigurationBubble.js.map