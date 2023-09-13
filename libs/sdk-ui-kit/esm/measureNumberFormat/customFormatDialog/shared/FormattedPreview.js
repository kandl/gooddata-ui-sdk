// (C) 2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { ClientFormatterFacade } from "@gooddata/number-formatter";
export const Label = ({ value, style, className, }) => (React.createElement("div", { className: cx("gd-measure-format-preview-formatted", className) },
    React.createElement("span", { style: style }, value)));
function getFormattedNumber(value, format, separators) {
    return ClientFormatterFacade.formatValue(value, format, separators);
}
export const FormattedPreview = ({ previewNumber, format, colors = true, separators, className: customClassName, }) => {
    if (format === "") {
        return React.createElement(Label, null);
    }
    const style = { color: "", backgroundColor: "" };
    const { formattedValue, colors: formattedColors } = getFormattedNumber(previewNumber, format, separators);
    if (colors) {
        style.color = formattedColors.color;
        style.backgroundColor = formattedColors.backgroundColor;
    }
    return React.createElement(Label, { value: formattedValue, className: customClassName, style: style });
};
//# sourceMappingURL=FormattedPreview.js.map