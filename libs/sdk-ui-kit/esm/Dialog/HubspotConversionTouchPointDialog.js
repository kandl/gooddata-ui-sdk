// (C) 2021 GoodData Corporation
import React from "react";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import { Dialog } from "./Dialog.js";
import { HubspotConversionTouchPointDialogBase, } from "./HubspotConversionTouchPointDialogBase.js";
/**
 * @public
 */
export const HubspotConversionTouchPointDialog = (props) => {
    const submitButtonClasses = `hs-button primary large ${props.submitButtonClass || "s-hs-submit"}`;
    const onDialogSubmit = () => {
        const submitBtn = document.getElementsByClassName(submitButtonClasses)[0];
        submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.click();
    };
    return (React.createElement(Dialog, { displayCloseButton: true, onCancel: props.onClose, submitOnEnterKey: true, onSubmit: onDialogSubmit, className: "conversion-touch-point-dialog s-conversion-touch-point-dialog" },
        React.createElement(HubspotProvider, null,
            React.createElement(HubspotConversionTouchPointDialogBase, Object.assign({}, props, { submitButtonClass: submitButtonClasses })))));
};
//# sourceMappingURL=HubspotConversionTouchPointDialog.js.map