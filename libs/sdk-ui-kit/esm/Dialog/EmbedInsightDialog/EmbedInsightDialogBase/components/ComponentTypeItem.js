// (C) 2022-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { Bubble, BubbleHoverTrigger } from "../../../../Bubble/index.js";
const HEADER_TOOLTIP_ALIGN_POINTS = [{ align: "cr tl" }];
/**
 * @internal
 */
export const ComponentTypeItem = (props) => {
    const { checked, onChange, questionMarkMessage, itemValue, itemText, className } = props;
    return (React.createElement("label", { className: cx("input-radio-label bottom-space", className) },
        React.createElement("input", { type: "radio", className: "input-radio", value: itemValue, checked: checked, onChange: onChange }),
        React.createElement("span", { className: "input-label-text" }, itemText),
        questionMarkMessage ? (React.createElement(BubbleHoverTrigger, null,
            React.createElement("span", { className: "gd-icon-circle-question embed-component-type-help s-circle_question" }),
            React.createElement(Bubble, { className: "bubble-primary", alignPoints: HEADER_TOOLTIP_ALIGN_POINTS },
                React.createElement(FormattedMessage, { id: questionMarkMessage })))) : null));
};
//# sourceMappingURL=ComponentTypeItem.js.map