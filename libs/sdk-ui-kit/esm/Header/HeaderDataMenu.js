// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { v4 as uuid } from "uuid";
import cx from "classnames";
import { Button } from "../Button/index.js";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
export const CoreHeaderDataMenu = ({ intl, onMenuItemClick, dataMenuItems, className, }) => {
    const renderSection = (items) => {
        return items.map((item) => {
            const { isDisable, tooltipText, isActive, className, key, onClick } = item;
            const classNames = cx(`gd-button-primary ${className}`, {
                "is-active": !isDisable && isActive,
                "is-normal": !isDisable && !isActive,
            });
            const clickHandler = onClick ? onClick : () => onMenuItemClick(item);
            return (React.createElement("li", { key: key },
                React.createElement(BubbleHoverTrigger, { tagName: "div", hideDelay: 100, showDelay: 100, className: "gd-bubble-trigger-data-menu" },
                    React.createElement(Button, { onClick: clickHandler, className: classNames, value: intl.formatMessage({ id: `${key}` }), disabled: isDisable }),
                    tooltipText && isDisable ? (React.createElement(Bubble, { alignPoints: [{ align: "bc tc" }, { align: "bc tl" }, { align: "bc tr" }] }, tooltipText)) : null)));
        });
    };
    const dataMenuClassName = cx("gd-data-header-menu-section", className);
    return (React.createElement("div", { className: "gd-data-header-menu-wrapper" },
        React.createElement("ul", { key: `section-${uuid()}`, className: dataMenuClassName }, renderSection(dataMenuItems))));
};
/**
 * @internal
 */
export const HeaderDataMenu = injectIntl(CoreHeaderDataMenu);
//# sourceMappingURL=HeaderDataMenu.js.map