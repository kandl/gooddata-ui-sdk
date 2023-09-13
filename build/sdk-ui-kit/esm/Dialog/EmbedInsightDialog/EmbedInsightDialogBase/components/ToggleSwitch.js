// (C) 2022-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Bubble, BubbleHoverTrigger } from "../../../../Bubble/index.js";
const alignPoints = [{ align: "cr cl" }];
export const ToggleSwitch = (props) => {
    const { id, label, checked, disabled, questionMarkMessage, className, onChange } = props;
    const css = cx("toggle-wrapper-revers-label", className);
    return (React.createElement("div", { className: css },
        React.createElement("label", { className: "input-checkbox-toggle s-checkbox-toggle-label" },
            React.createElement("input", { type: "checkbox", className: className, id: id, name: id, checked: checked, onChange: onChange, disabled: disabled }),
            React.createElement("span", { className: "input-label-text toggle-switch" })),
        React.createElement("label", { className: "toggle-switch-title", htmlFor: label }, label),
        questionMarkMessage ? (React.createElement(BubbleHoverTrigger, null,
            React.createElement("span", { className: "gd-icon-circle-question s-circle_question toggle-switch-icon" }),
            React.createElement(Bubble, { alignPoints: alignPoints }, questionMarkMessage))) : null));
};
//# sourceMappingURL=ToggleSwitch.js.map