// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
/**
 * AttributeFilter error component that display error,
 * It does not distinguish different errors, instead it renders a generic error message.
 * @beta
 */
export const AttributeFilterError = (props) => {
    const { isOpen, isDraggable } = props;
    return (React.createElement("div", { className: cx("gd-attribute-filter-dropdown-button__next", "s-attribute-filter", "gd-message error s-button-error", {
            "gd-is-active": isOpen,
            "gd-is-draggable": isDraggable,
        }) },
        React.createElement(FormattedMessage, { id: "gs.filter.error" })));
};
//# sourceMappingURL=AttributeFilterError.js.map