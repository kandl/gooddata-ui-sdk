// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { useIntl } from "react-intl";
/**
 * @internal
 */
export function AddAttributeFilterButton({ className, isOpen, title }) {
    const intl = useIntl();
    title = title !== null && title !== void 0 ? title : intl.formatMessage({ id: "addPanel.attributeFilter" });
    const rootClassNames = cx(className, "is-loaded", {
        "is-active": isOpen,
    });
    return (React.createElement("div", { className: rootClassNames },
        React.createElement("div", { className: "button-content" },
            React.createElement("div", { className: "button-title" }, title))));
}
//# sourceMappingURL=AddAttributeFilterButton.js.map