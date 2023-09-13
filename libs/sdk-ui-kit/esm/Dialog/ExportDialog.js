// (C) 2020-2023 GoodData Corporation
import React from "react";
import { Overlay } from "../Overlay/index.js";
import { ExportDialogBase } from "./ExportDialogBase.js";
const alignPoints = [{ align: "cc cc" }];
/**
 * @internal
 */
export const ExportDialog = (props) => {
    const { className, displayCloseButton, isPositive, isSubmitDisabled, containerClassName, headline, cancelButtonText, submitButtonText, filterContextText, filterContextTitle, filterContextVisible, includeFilterContext, mergeHeaders, mergeHeadersDisabled, mergeHeadersText, mergeHeadersTitle, onCancel, onSubmit, } = props;
    return (React.createElement(Overlay, { alignPoints: alignPoints, isModal: true, positionType: "fixed", containerClassName: containerClassName },
        React.createElement(ExportDialogBase, { className: className, displayCloseButton: displayCloseButton, isPositive: isPositive, isSubmitDisabled: isSubmitDisabled, headline: headline, cancelButtonText: cancelButtonText, submitButtonText: submitButtonText, filterContextText: filterContextText, filterContextTitle: filterContextTitle, filterContextVisible: filterContextVisible, includeFilterContext: includeFilterContext, mergeHeaders: mergeHeaders, mergeHeadersDisabled: mergeHeadersDisabled, mergeHeadersText: mergeHeadersText, mergeHeadersTitle: mergeHeadersTitle, onCancel: onCancel, onSubmit: onSubmit })));
};
ExportDialog.defaultProps = ExportDialogBase.defaultProps;
//# sourceMappingURL=ExportDialog.js.map