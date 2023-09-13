// (C) 2022 GoodData Corporation
import React from "react";
import noop from "lodash/noop.js";
import { Button } from "../../Button/index.js";
import { useIntl } from "react-intl";
import { LoadingSpinner } from "../../LoadingSpinner/index.js";
import { Bubble, BubbleHoverTrigger } from "../../Bubble/index.js";
import { Hyperlink } from "../../Hyperlink/index.js";
import { Footer } from "../Footer.js";
import { FooterButtons } from "../FooterButtons.js";
/**
 * @internal
 */
export const StylingEditorDialogFooter = (props) => {
    const { link, disableSubmit = false, showProgressIndicator = false, errorMessage, onSubmit, onCancel, onHelpClick = noop, } = props;
    const intl = useIntl();
    return (React.createElement(Footer, null,
        React.createElement(Hyperlink, { text: link.text, href: link.url, onClick: () => onHelpClick(), iconClass: "gd-icon-circle-question" }),
        React.createElement(FooterButtons, null,
            showProgressIndicator ? (React.createElement(LoadingSpinner, { className: "gd-loading-equalizer-spinner small s-gd-styling-editor-spinner" })) : null,
            React.createElement(Button, { className: "gd-button-secondary s-dialog-cancel-button", value: intl.formatMessage({ id: "cancel" }), onClick: () => onCancel() }),
            React.createElement(BubbleHoverTrigger, { className: "gd-button", showDelay: 0, hideDelay: 0 },
                React.createElement(Button, { className: "gd-button-action s-dialog-submit-button", value: intl.formatMessage({ id: "save" }), onClick: () => onSubmit(), disabled: disableSubmit }),
                errorMessage && disableSubmit ? (React.createElement(Bubble, { className: "bubble-negative", alignPoints: [{ align: "tc br" }] }, errorMessage)) : null))));
};
//# sourceMappingURL=StylingEditorDialogFooter.js.map