// (C) 2020-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop.js";
import { Button } from "../Button/index.js";
import { LoadingSpinner } from "../LoadingSpinner/index.js";
import { DialogBase } from "./DialogBase.js";
import { Bubble, BubbleHoverTrigger } from "../Bubble/index.js";
import { Typography } from "../Typography/index.js";
/**
 * @internal
 */
class ConfirmDialogBase extends DialogBase {
    render() {
        const { isPositive, displayCloseButton, headline, warning, children, cancelButtonText, submitButtonText, submitButtonTooltipText, submitButtonTooltipAlignPoints, submitButtonTooltipArrowOffsets, isSubmitDisabled, showProgressIndicator, onSubmit, onCancel, headerLeftButtonRenderer, footerLeftRenderer, titleRightIconRenderer, dialogHeaderClassName, } = this.props;
        const dialogClasses = cx({
            "gd-confirm": true,
        }, this.getDialogClasses());
        const submitButtonClasses = cx({
            "s-dialog-submit-button": true,
            "gd-button-action": isPositive,
            "gd-button-negative": !isPositive,
        });
        const headerClassNames = cx("gd-dialog-header", dialogHeaderClassName);
        return (React.createElement("div", { tabIndex: 0, onKeyDown: this.onKeyDown },
            React.createElement("div", { className: dialogClasses },
                displayCloseButton ? this.renderCloseButton() : null,
                React.createElement("div", { className: "gd-dialog-header-wrapper" }, headerLeftButtonRenderer === null || headerLeftButtonRenderer === void 0 ? void 0 :
                    headerLeftButtonRenderer(),
                    React.createElement("div", { className: headerClassNames },
                        React.createElement(Typography, { tagName: "h3", className: "gd-dialog-header-title" }, headline), titleRightIconRenderer === null || titleRightIconRenderer === void 0 ? void 0 :
                        titleRightIconRenderer())),
                !!warning && React.createElement("div", { className: "gd-dialog-warning" }, warning),
                React.createElement("div", { className: "gd-dialog-content" }, children),
                React.createElement("div", { className: "gd-dialog-footer" }, footerLeftRenderer === null || footerLeftRenderer === void 0 ? void 0 :
                    footerLeftRenderer(),
                    showProgressIndicator ? (React.createElement(LoadingSpinner, { className: "gd-dialog-spinner small" })) : null,
                    React.createElement(Button, { onClick: onCancel, className: "gd-button-secondary s-dialog-cancel-button", value: cancelButtonText }),
                    submitButtonText ? (React.createElement(BubbleHoverTrigger, { className: "gd-button", showDelay: 0, hideDelay: 0 },
                        React.createElement(Button, { onClick: onSubmit, className: submitButtonClasses, value: submitButtonText, disabled: isSubmitDisabled }),
                        submitButtonTooltipText ? (React.createElement(Bubble, { className: "bubble-primary", alignPoints: submitButtonTooltipAlignPoints || [{ align: "bc tc" }], arrowOffsets: submitButtonTooltipArrowOffsets || { "bc tc": [0, 15] } }, submitButtonTooltipText)) : null)) : null))));
    }
}
ConfirmDialogBase.defaultProps = {
    displayCloseButton: true,
    onCancel: noop,
    onSubmit: noop,
    isSubmitDisabled: false,
    headerLeftButtonRenderer: undefined,
};
export { ConfirmDialogBase };
//# sourceMappingURL=ConfirmDialogBase.js.map