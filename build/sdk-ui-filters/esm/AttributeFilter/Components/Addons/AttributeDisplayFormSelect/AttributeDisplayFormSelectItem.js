// (C) 2021-2023 GoodData Corporation
import React from "react";
import classNames from "classnames";
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
/**
 * @internal
 */
export const AttributeDisplayFormSelectItem = (props) => {
    const { displayForm, selected } = props;
    const { title, type } = displayForm;
    const className = classNames("gd-list-item", "gd-attribute-display-form", "s-attribute-display-form-name", `s-attribute-display-form-name-${stringUtils.simplifyText(title)}`, getDisplayFormIcon(type), {
        "is-selected": selected,
    });
    const handleOnClick = (e) => {
        const { displayForm, onClick } = props;
        onClick(displayForm.ref);
        e.preventDefault();
    };
    return (React.createElement("div", { className: className, onClick: handleOnClick },
        React.createElement(ShortenedText, { className: "gd-attribute-display-form-name", tooltipAlignPoints: tooltipAlignPoints }, title)));
};
//# sourceMappingURL=AttributeDisplayFormSelectItem.js.map