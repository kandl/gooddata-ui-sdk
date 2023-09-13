// (C) 2007-2022 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
/**
 * @internal
 */
export function InvertableSelectItem(props) {
    const { title, onClick, onMouseOver, onMouseOut, isSelected, onOnly } = props;
    const handleOnly = useCallback((e) => {
        e.stopPropagation();
        onOnly === null || onOnly === void 0 ? void 0 : onOnly();
    }, [onOnly]);
    return (React.createElement("div", { className: cx({
            "gd-list-item": true,
            [`s-${stringUtils.simplifyText(title)}`]: true,
            "has-only-visible": true,
            "is-selected": isSelected,
        }), onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut },
        React.createElement("label", { className: "input-checkbox-label" },
            React.createElement("input", { type: "checkbox", className: "input-checkbox", readOnly: true, checked: isSelected }),
            React.createElement("span", { className: "input-label-text" }, title)),
        React.createElement("span", { className: "gd-list-item-only", onClick: handleOnly },
            React.createElement(FormattedMessage, { id: "gs.list.only" }))));
}
//# sourceMappingURL=InvertableSelectItem.js.map