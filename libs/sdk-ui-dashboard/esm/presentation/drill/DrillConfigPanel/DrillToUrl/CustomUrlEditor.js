// (C) 2020-2022 GoodData Corporation
import React, { useState, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { SyntaxHighlightingInput, ConfirmDialogBase, useMediaQuery, FullScreenOverlay, Overlay, OverlayControllerProvider, OverlayController, } from "@gooddata/sdk-ui-kit";
import { ParametersPanel } from "./CustomUrlEditorParameters.js";
import { isDrillToCustomUrlConfig } from "../../types.js";
import { selectIsWhiteLabeled, useDashboardSelector } from "../../../../model/index.js";
import { DASHBOARD_HEADER_OVERLAYS_Z_INDEX } from "../../../constants/index.js";
export const UrlInput = (props) => {
    const { onChange, onCursor, currentUrlValue, intl, syntaxHighlightingRules } = props;
    const placeholder = intl.formatMessage({
        id: "configurationPanel.drillIntoUrl.editor.textAreaPlaceholder",
    });
    return (React.createElement(SyntaxHighlightingInput, { onChange: onChange, onCursor: onCursor, value: currentUrlValue, customOptions: { placeholder }, className: "gd-input-syntax-highlighting-input", formatting: syntaxHighlightingRules }));
};
const HelpLink = ({ link }) => {
    return (React.createElement("a", { className: "gd-button-link gd-drill-to-custom-url-help", target: "_blank", href: link, rel: "noopener noreferrer" },
        React.createElement("span", { className: "gd-icon-circle-question" }),
        React.createElement("span", { className: "gd-button-link-text" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.helpButtonLabel" }))));
};
const buildValidDisplayFormsFormattingRule = (attributeDisplayForms) => {
    if (attributeDisplayForms.length === 0) {
        return undefined;
    }
    const validAttributePlaceholders = attributeDisplayForms
        .map(({ displayForm }) => `{attribute_title\\(${displayForm.id}\\)}`)
        .join("|");
    return { regex: new RegExp(validAttributePlaceholders), token: "attribute" };
};
const IDENTIFIER_RULE = {
    regex: /\{workspace_id\}|\{project_id\}|\{insight_id\}|\{widget_id\}|\{dashboard_id\}|\{client_id\}|\{data_product_id\}/,
    token: "identifier",
};
const INVALID_IDENTIFIER_RULE = { regex: /\{[^}{]*\}/, token: "invalid-identifier" };
const INVALID_DISPLAY_FORMS_RULE = {
    regex: /\{attribute_title\(.*?\)\}/,
    token: "invalid-attribute",
};
const DEFAULT_RULES = [
    INVALID_DISPLAY_FORMS_RULE,
    IDENTIFIER_RULE,
    INVALID_IDENTIFIER_RULE,
];
const buildFormattingRules = (attributeDisplayForms) => {
    const validDisplayFormsRule = buildValidDisplayFormsFormattingRule(attributeDisplayForms);
    return {
        start: validDisplayFormsRule ? [validDisplayFormsRule, ...DEFAULT_RULES] : DEFAULT_RULES,
    };
};
const UrlInputPanel = (props) => {
    const { currentUrlValue, onChange, onCursor, documentationLink, attributeDisplayForms, intl } = props;
    const isWhiteLabeled = useDashboardSelector(selectIsWhiteLabeled);
    const syntaxHighlightingRules = useMemo(() => attributeDisplayForms && buildFormattingRules(attributeDisplayForms), [attributeDisplayForms]);
    return (React.createElement("div", null,
        React.createElement("label", { className: "gd-label" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.textAreaLabel" })),
        React.createElement(UrlInput, { onChange: onChange, onCursor: onCursor, currentUrlValue: currentUrlValue, syntaxHighlightingRules: syntaxHighlightingRules, intl: intl }),
        !isWhiteLabeled && documentationLink ? React.createElement(HelpLink, { link: documentationLink }) : null));
};
const initialCursorPosition = {
    from: 0,
    to: 0,
};
const insertPlaceholderAtCursor = (text, placeholder, cursor) => `${text.substring(0, cursor.from)}${placeholder}${text.substring(cursor.to)}`;
const assertValidUrl = (url) => /^[A-Za-z0-9.\-+]+:|^\{attribute_title\(/.test(url) ? url : `https://${url}`;
const getWarningTextForInvalidParameters = (parameters) => {
    const invalidParameters = parameters.map((parameter) => `"${parameter}"`).join(", ");
    return (React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.invalidAttributeDisplayForms", values: { invalidParameters } }));
};
const CustomUrlEditorDialog = (props) => {
    const { urlDrillTarget, documentationLink, onSelect, onClose, attributeDisplayForms, loadingAttributeDisplayForms = false, invalidAttributeDisplayFormIdentifiers, enableClientIdParameter, enableDataProductIdParameter, enableWidgetIdParameter, } = props;
    const intl = useIntl();
    const previousValue = urlDrillTarget
        ? (isDrillToCustomUrlConfig(urlDrillTarget) && urlDrillTarget.customUrl) || ""
        : "";
    const [currentValue, setCurrentValue] = useState(previousValue);
    const apply = () => onSelect(assertValidUrl(currentValue));
    const handleOnChange = (value) => setCurrentValue(value.trim());
    const isApplyEnabled = currentValue && currentValue.localeCompare(previousValue) !== 0;
    const [cursorPosition, setCursorPosition] = useState(initialCursorPosition);
    const handleCursorPosition = (from, to) => setCursorPosition({ from, to });
    const handleOnAdd = (parameterPlaceholder) => setCurrentValue(insertPlaceholderAtCursor(currentValue, parameterPlaceholder, cursorPosition));
    const editorWarningText = invalidAttributeDisplayFormIdentifiers.length > 0
        ? getWarningTextForInvalidParameters(invalidAttributeDisplayFormIdentifiers)
        : undefined;
    return (React.createElement(ConfirmDialogBase, { className: "gd-drill-custom-url-editor s-gd-drill-custom-url-editor", isPositive: true, headline: previousValue
            ? intl.formatMessage({ id: "configurationPanel.drillIntoUrl.editor.editUrlTitle" })
            : intl.formatMessage({ id: "configurationPanel.drillIntoUrl.editor.addUrlTitle" }), cancelButtonText: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.cancelButtonLabel",
        }), submitButtonText: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.applyButtonLabel",
        }), isSubmitDisabled: !isApplyEnabled, submitOnEnterKey: false, onCancel: onClose, onSubmit: apply, warning: editorWarningText },
        React.createElement(UrlInputPanel, { onChange: handleOnChange, onCursor: handleCursorPosition, documentationLink: documentationLink, currentUrlValue: currentValue, attributeDisplayForms: attributeDisplayForms, intl: intl }),
        React.createElement(ParametersPanel, { attributeDisplayForms: attributeDisplayForms, loadingAttributeDisplayForms: loadingAttributeDisplayForms, enableClientIdParameter: enableClientIdParameter, enableDataProductIdParameter: enableDataProductIdParameter, enableWidgetIdParameter: enableWidgetIdParameter, onAdd: handleOnAdd, intl: intl })));
};
const overlayController = OverlayController.getInstance(DASHBOARD_HEADER_OVERLAYS_Z_INDEX);
export const CustomUrlEditor = (props) => {
    const isMobileDevice = useMediaQuery("mobileDevice");
    const SelectedOverlay = isMobileDevice ? FullScreenOverlay : Overlay;
    return (React.createElement(OverlayControllerProvider, { overlayController: overlayController },
        React.createElement(SelectedOverlay, { onClose: props.onClose, isModal: true, closeOnOutsideClick: false, closeOnEscape: true, positionType: "fixed", className: "gd-modal-overlay" },
            React.createElement(CustomUrlEditorDialog, Object.assign({}, props)))));
};
//# sourceMappingURL=CustomUrlEditor.js.map