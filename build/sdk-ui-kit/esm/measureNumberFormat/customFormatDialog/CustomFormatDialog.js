// (C) 2020-2022 GoodData Corporation
import React from "react";
import { SnapPoint } from "../../typings/positioning.js";
import { positioningToAlignPoints } from "../../utils/positioning.js";
import { Button } from "../../Button/index.js";
import { Overlay } from "../../Overlay/index.js";
import Preview from "./previewSection/Preview.js";
import FormatInput from "./FormatInput.js";
import DocumentationLink from "./DocumentationLink.js";
class CustomFormatDialog extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            format: this.props.formatString || "",
        };
        this.onApply = () => {
            this.props.onApply(this.state.format);
        };
        this.isApplyButtonDisabled = () => this.props.formatString === this.state.format || this.state.format === "";
        this.onFormatChange = (format) => {
            this.setState({ format });
        };
    }
    render() {
        const { anchorEl, positioning, onCancel, separators, templates, documentationLink, intl } = this.props;
        const { format } = this.state;
        return (React.createElement(Overlay, { closeOnParentScroll: true, closeOnMouseDrag: true, closeOnOutsideClick: true, alignTo: anchorEl, alignPoints: positioningToAlignPoints(positioning), onClose: onCancel },
            React.createElement("div", { className: "gd-dropdown overlay" },
                React.createElement("div", { className: "gd-measure-custom-format-dialog-body s-custom-format-dialog-body" },
                    React.createElement("div", { className: "gd-measure-custom-format-dialog-header" },
                        React.createElement("span", null, intl.formatMessage({ id: "measureNumberCustomFormatDialog.title" }))),
                    React.createElement("div", { className: "gd-measure-custom-format-dialog-content" },
                        React.createElement(FormatInput, { format: format, templates: templates, separators: separators, onFormatChange: this.onFormatChange }),
                        documentationLink ? React.createElement(DocumentationLink, { url: documentationLink }) : null,
                        React.createElement(Preview, { format: format, separators: separators })),
                    React.createElement("div", { className: "gd-measure-custom-format-dialog-footer" },
                        React.createElement(Button, { className: "gd-button-secondary gd-button-small s-custom-format-dialog-cancel", onClick: onCancel, value: intl.formatMessage({ id: "cancel" }) }),
                        React.createElement(Button, { className: "gd-button-action gd-button-small s-custom-format-dialog-apply", onClick: this.onApply, value: intl.formatMessage({ id: "apply" }), disabled: this.isApplyButtonDisabled() }))))));
    }
}
CustomFormatDialog.defaultProps = {
    positioning: [
        { snapPoints: { parent: SnapPoint.CenterRight, child: SnapPoint.CenterLeft } },
        { snapPoints: { parent: SnapPoint.TopRight, child: SnapPoint.TopLeft } },
        { snapPoints: { parent: SnapPoint.BottomRight, child: SnapPoint.BottomLeft } },
    ],
};
export { CustomFormatDialog };
//# sourceMappingURL=CustomFormatDialog.js.map