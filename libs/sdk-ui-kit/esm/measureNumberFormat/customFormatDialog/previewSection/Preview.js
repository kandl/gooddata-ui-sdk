// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { InputWithNumberFormat } from "../../../Form/index.js";
import { ExtendedPreview } from "./ExtendedPreview.js";
import { FormattedPreview } from "../shared/FormattedPreview.js";
const DEFAULT_PREVIEW_VALUE = -1234.5678;
export class Preview extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            preview: DEFAULT_PREVIEW_VALUE,
        };
        this.onPreviewChange = (value) => {
            this.setState({ preview: value });
        };
    }
    render() {
        const { format, separators, intl } = this.props;
        return (React.createElement("div", { className: "gd-measure-custom-format-dialog-section gd-measure-custom-format-dialog-section-preview" },
            React.createElement("span", { className: "gd-measure-custom-format-dialog-section-title" }, intl.formatMessage({ id: "measureNumberCustomFormatDialog.preview" })),
            React.createElement("div", { className: "gd-measure-custom-format-dialog-preview" },
                React.createElement(InputWithNumberFormat, { className: "s-custom-format-dialog-preview-input gd-measure-custom-format-dialog-preview-input", value: this.state.preview, isSmall: true, autofocus: false, onChange: this.onPreviewChange, separators: separators }),
                React.createElement(FormattedPreview, { previewNumber: this.state.preview, format: format, separators: separators, className: "s-custom-format-dialog-preview-formatted gd-measure-custom-format-dialog-preview-string" })),
            React.createElement(ExtendedPreview, { format: format, separators: separators })));
    }
}
export default injectIntl(Preview);
//# sourceMappingURL=Preview.js.map