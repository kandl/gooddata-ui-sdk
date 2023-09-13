// (C) 2022-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Button } from "../Button/index.js";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
const DEFAULT_ALIGN_POINT_TITLE_TOOLTIP = [{ align: "cr cl" }, { align: "bl tl" }, { align: "bc tc" }];
const DEFAULT_ALIGN_POINT_ACTION_TOOLTIP = [{ align: "cl cr" }, { align: "bc tc" }];
const getActionElement = (actionType, value, isDisableAction, onActionCallback) => {
    switch (actionType) {
        case "LinkButton":
            return (React.createElement(Button, { className: "gd-button-link-dimmed", value: value, disabled: isDisableAction, onClick: onActionCallback }));
        case "Switcher":
            return (React.createElement("label", { className: "input-checkbox-toggle" },
                React.createElement("input", { type: "checkbox", checked: value, disabled: isDisableAction, onChange: onActionCallback, className: `s-checkbox-toggle ${isDisableAction ? "s-disabled" : "s-enabled"}` }),
                React.createElement("span", { className: "input-label-text" })));
        default:
            return (React.createElement(Button, { className: "gd-button-secondary gd-button-small", value: value, disabled: isDisableAction, onClick: onActionCallback }));
    }
};
/**
 * @internal
 */
export const SettingItem = ({ className, title, titleTooltipText, alignPointTitleTooltip, value, actionType, actionValue, hasDivider, isLoading, isDisableAction, actionTooltipText, alignPointActionTooltip, onAction, }) => {
    return (React.createElement("div", { className: cx(className, "gd-setting-item-container", { divider: hasDivider }) },
        React.createElement("div", { className: "gd-setting-item-title" },
            React.createElement("span", { className: "title" }, title),
            titleTooltipText ? (React.createElement(BubbleHoverTrigger, null,
                React.createElement("span", { className: "icon-circle-question gd-icon-circle-question" }),
                React.createElement(Bubble, { className: cx(className, "bubble-primary"), alignPoints: alignPointTitleTooltip || DEFAULT_ALIGN_POINT_TITLE_TOOLTIP }, titleTooltipText))) : null),
        React.createElement("div", { className: "gd-setting-item-state" },
            isLoading ? React.createElement("span", { className: cx("gd-spinner middle") }) : null,
            !isLoading && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "gd-setting-item-value" }, value),
                React.createElement("div", { className: "gd-setting-item-action" },
                    React.createElement(BubbleHoverTrigger, null,
                        getActionElement(actionType, actionValue, isDisableAction, onAction),
                        actionTooltipText ? (React.createElement(Bubble, { className: cx(className, "bubble-primary"), alignPoints: alignPointActionTooltip || DEFAULT_ALIGN_POINT_ACTION_TOOLTIP }, actionTooltipText)) : null)))))));
};
//# sourceMappingURL=SettingItem.js.map