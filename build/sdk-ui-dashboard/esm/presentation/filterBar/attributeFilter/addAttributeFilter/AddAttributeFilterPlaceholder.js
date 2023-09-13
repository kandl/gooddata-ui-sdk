// (C) 2007-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
/**
 * @internal
 */
export function AddAttributeFilterPlaceholder({ disabled }) {
    const className = cx("add-item-placeholder", "add-attribute-filter-placeholder", "s-add-attribute-filter", {
        disabled,
    });
    return (React.createElement("div", { className: className },
        React.createElement(FormattedMessage, { id: "addPanel.attributeFilter" })));
}
//# sourceMappingURL=AddAttributeFilterPlaceholder.js.map