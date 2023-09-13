// (C) 2020 GoodData Corporation
import React from "react";
import { FormattedPreview } from "./FormattedPreview.js";
const PreviewNumberRow = ({ previewNumber, format, separators }) => (React.createElement("div", { className: "gd-measure-format-extended-preview-row" },
    React.createElement("div", { className: "gd-measure-format-extended-preview-number" },
        React.createElement("span", null, previewNumber)),
    React.createElement(FormattedPreview, { previewNumber: previewNumber, format: format, separators: separators, className: "s-number-format-preview-formatted gd-measure-format-extended-preview-formatted" })));
const PreviewRows = ({ previewNumbers = [0, 1.234, 1234.567, 1234567.891], format, separators, }) => (React.createElement(React.Fragment, null, previewNumbers.map((previewNumber) => (React.createElement(PreviewNumberRow, { previewNumber: previewNumber, separators: separators, key: previewNumber, format: format })))));
export default PreviewRows;
//# sourceMappingURL=PreviewRows.js.map