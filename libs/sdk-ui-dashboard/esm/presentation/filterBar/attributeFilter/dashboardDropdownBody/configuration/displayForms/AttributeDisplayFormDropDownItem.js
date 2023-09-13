import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import { ShortenedText } from "@gooddata/sdk-ui-kit";
const getDisplayFormIcon = (type) => {
    switch (type) {
        case "GDC.link":
            return "gd-icon-hyperlink-warning";
        case "GDC.geo.pin":
        case "GDC.geo.pin_latitude":
        case "GDC.geo.pin_longitude":
            return "gd-icon-earth";
        default:
            return "gd-icon-label-warning";
    }
};
const tooltipAlignPoints = [
    { align: "cl cr", offset: { x: -10, y: 0 } },
    { align: "cr cl", offset: { x: 10, y: 0 } },
];
export const AttributeDisplayFormDropDownItem = ({ displayForm, onClick, selected, }) => {
    const { title } = displayForm;
    const className = cx("gd-list-item", "attribute-display-form-name", "s-attribute-display-form-name", `s-attribute-display-form-name-${stringUtils.simplifyText(title)}`, getDisplayFormIcon(displayForm.displayFormType), {
        "is-selected": selected,
    });
    const handleOnClick = () => {
        onClick(displayForm.ref);
    };
    return (React.createElement("div", { className: className, onClick: handleOnClick },
        React.createElement(ShortenedText, { tooltipAlignPoints: tooltipAlignPoints }, title)));
};
//# sourceMappingURL=AttributeDisplayFormDropDownItem.js.map