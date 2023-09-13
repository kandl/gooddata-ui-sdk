// (C) 2021-2023 GoodData Corporation
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";
import { LoadingComponent } from "@gooddata/sdk-ui";
import { Button } from "../Button/index.js";
import { Typography } from "../Typography/index.js";
/**
 * @internal
 */
export const HubspotConversionTouchPointDialogBase = (props) => {
    const { targetId, hubspotPortalId, hubspotFormId, selectedValue, cancelButtonText, dialogTitle, showCancelButton, submitButtonClass, values = {}, onClose, onFormSubmitted, } = props;
    const intl = useIntl();
    const [isFormReady, setIsFormReady] = useState(false);
    const hubspotFormTargetId = targetId || "conversion-touch-point-hubspot";
    useEffect(() => {
        var _a;
        // the Hubspot form requires jQuery object, we need to create a fake jQuery object to bypass this.
        window.jQuery =
            window.jQuery ||
                function (nodeOrSelector) {
                    if (typeof nodeOrSelector == "string") {
                        return document.querySelector(nodeOrSelector);
                    }
                    return nodeOrSelector;
                };
        if ((_a = window.hbspt) === null || _a === void 0 ? void 0 : _a.isSuccessMessageShow) {
            window.hbspt.isSuccessMessageShow = false;
        }
    }, []);
    const onHubspotFormSubmitted = () => {
        if (!window.hbspt.isSuccessMessageShow) {
            onFormSubmitted === null || onFormSubmitted === void 0 ? void 0 : onFormSubmitted();
            onClose();
            window.hbspt.isSuccessMessageShow = true;
        }
    };
    const { formCreated } = useHubspotForm({
        portalId: hubspotPortalId,
        formId: hubspotFormId,
        target: `#${hubspotFormTargetId}`,
        locale: intl.locale.split("-").shift(),
        submitButtonClass,
        onFormSubmitted: onHubspotFormSubmitted,
        onFormReady: ($form) => {
            var _a;
            setIsFormReady(true);
            let fields = $form;
            if (fields["jquery"] && ((_a = fields[0]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                fields = fields[0];
            }
            // populating the values for hidden fields
            for (let i = 0; i < fields.length; i += 1) {
                const inputField = fields[i];
                if (!inputField) {
                    continue;
                }
                const populatedValue = values[inputField.name];
                if (populatedValue) {
                    inputField.value = populatedValue;
                }
                if (selectedValue && inputField.value.indexOf(selectedValue) !== -1) {
                    // Call click event to check the radio button on Hubspot form
                    inputField.click();
                }
            }
        },
    });
    return (React.createElement(React.Fragment, null,
        !formCreated ? React.createElement(LoadingComponent, null) : null,
        formCreated ? (React.createElement("div", { className: "conversion-touch-point-dialog-wrapper" },
            isFormReady && dialogTitle ? React.createElement(Typography, { tagName: "h3" }, dialogTitle) : null,
            React.createElement("div", { id: hubspotFormTargetId, className: "hubspot-form" }),
            isFormReady && showCancelButton ? (React.createElement(Button, { className: "gd-button-secondary", onClick: onClose, value: cancelButtonText })) : null)) : null));
};
//# sourceMappingURL=HubspotConversionTouchPointDialogBase.js.map