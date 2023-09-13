// (C) 2022-2023 GoodData Corporation
import React, { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import noop from "lodash/noop.js";
import { IntlWrapper } from "@gooddata/sdk-ui";
import { StylingExample } from "./StylingExample.js";
import { BubbleHeaderSeparator } from "./BubbleHeaderSeparator.js";
import { Button } from "../../Button/index.js";
import { Dialog } from "../Dialog.js";
import { Typography } from "../../Typography/index.js";
import { StylingEditorDialogFooter } from "./StylingEditorDialogFooter.js";
/**
 * @internal
 */
export const StylingEditorDialog = (props) => {
    return (React.createElement(IntlWrapper, { locale: props.locale },
        React.createElement(StylingEditorDialogCore, Object.assign({}, props))));
};
const StylingEditorDialogCore = (props) => {
    var _a;
    const { title, tooltip, link, stylingItem, examples, exampleToColorPreview, onClose, onSubmit, onCancel, disableSubmit, showProgressIndicator, showBackButton, onHelpClick, onExit = noop, className, onInvalidDefinition = noop, } = props;
    const intl = useIntl();
    const providedExamples = !!examples && examples.length !== 0 && !!exampleToColorPreview;
    const initialNameField = (_a = stylingItem === null || stylingItem === void 0 ? void 0 : stylingItem.name) !== null && _a !== void 0 ? _a : "";
    const initialDefinitionField = (stylingItem === null || stylingItem === void 0 ? void 0 : stylingItem.content) ? JSON.stringify(stylingItem === null || stylingItem === void 0 ? void 0 : stylingItem.content, null, 4) : "";
    const [nameField, setNameField] = useState(initialNameField);
    const [definitionField, setDefinitionField] = useState(initialDefinitionField);
    const fieldsChanged = useMemo(() => {
        try {
            const parsedDefinition = JSON.parse(definitionField);
            const formattedDefinition = JSON.stringify(parsedDefinition, null, 4);
            return nameField !== initialNameField || formattedDefinition !== initialDefinitionField;
        }
        catch (e) {
            // initial state of the fields is presumed to be valid,
            // so if JSON throws error, definition was changed
            return true;
        }
    }, [nameField, initialNameField, definitionField, initialDefinitionField]);
    const validName = useMemo(() => nameField !== "", [nameField]);
    const validDefinition = useMemo(() => {
        try {
            JSON.parse(definitionField);
            return true;
        }
        catch (e) {
            return false;
        }
    }, [definitionField]);
    const validFields = useMemo(() => validName && validDefinition, [validName, validDefinition]);
    const isSubmitDisabled = useMemo(() => !validFields || !fieldsChanged || disableSubmit, [validFields, fieldsChanged, disableSubmit]);
    const emptyDefinition = useMemo(() => definitionField === "", [definitionField]);
    const errorMessage = useMemo(() => {
        if (!validName) {
            return intl.formatMessage({ id: "stylingEditor.dialog.name.required" });
        }
        if (emptyDefinition) {
            return intl.formatMessage({ id: "stylingEditor.dialog.definition.required" });
        }
        if (!validDefinition) {
            onInvalidDefinition(stylingItem === null || stylingItem === void 0 ? void 0 : stylingItem.ref);
            return intl.formatMessage({ id: "stylingEditor.dialog.definition.invalid" });
        }
        return undefined;
    }, [validName, emptyDefinition, validDefinition, onInvalidDefinition, stylingItem === null || stylingItem === void 0 ? void 0 : stylingItem.ref, intl]);
    const getFinalStylingItem = (original, definition, name) => {
        return Object.assign(Object.assign({}, (original ? original : {})), { content: JSON.parse(definition), name });
    };
    return (React.createElement(Dialog, { className: cx("gd-styling-editor-dialog", {
            "gd-styling-editor-dialog-create": providedExamples,
        }, className), onClose: () => {
            onExit(nameField, definitionField);
            onClose();
        }, displayCloseButton: true, submitOnEnterKey: false },
        React.createElement("div", { className: "gd-styling-editor-dialog-header" },
            showBackButton ? (React.createElement("div", { className: "gd-styling-editor-dialog-header-back-button" },
                React.createElement(Button, { className: "gd-button-primary gd-button-icon-only gd-icon-navigateleft s-navigate-back-button", onClick: () => {
                        onExit(nameField, definitionField);
                        onClose();
                    } }))) : null,
            React.createElement(Typography, { tagName: "h2", className: "gd-styling-editor-dialog-header-title" }, title)),
        React.createElement("div", { className: "gd-styling-editor-dialog-content" },
            React.createElement("form", { className: "gd-styling-editor-dialog-content-form", onSubmit: (e) => e.preventDefault() },
                React.createElement("label", { className: "gd-styling-editor-dialog-content-form-input" },
                    intl.formatMessage({ id: "stylingEditor.dialog.name" }),
                    React.createElement("input", { "aria-label": "Styling item name", className: "gd-input-field s-input-field", type: "text", value: nameField, onChange: (e) => setNameField(e.target.value) })),
                React.createElement("label", { className: "gd-styling-editor-dialog-content-form-textarea" },
                    intl.formatMessage({ id: "stylingEditor.dialog.definition" }),
                    React.createElement("textarea", { "aria-label": "Styling item definition", className: "gd-input-field s-textarea-field", wrap: "off", value: definitionField, onChange: (e) => setDefinitionField(e.target.value) }))),
            providedExamples ? (React.createElement("div", { className: cx("gd-styling-editor-dialog-content-examples", "s-gd-styling-editor-dialog-content-examples") },
                React.createElement(BubbleHeaderSeparator, { title: intl.formatMessage({ id: "stylingEditor.dialog.examples" }), message: tooltip }),
                React.createElement("div", { className: "gd-styling-editor-dialog-content-examples-list" }, examples.map((example, index) => (React.createElement(StylingExample, { key: index, name: example.name, colors: exampleToColorPreview(example.content), onClick: () => {
                        setNameField(example.name);
                        setDefinitionField(JSON.stringify(example.content, null, 4));
                    } })))))) : null),
        React.createElement(StylingEditorDialogFooter, { disableSubmit: isSubmitDisabled, showProgressIndicator: showProgressIndicator, link: link, errorMessage: errorMessage, onSubmit: () => onSubmit(getFinalStylingItem(stylingItem, definitionField, nameField)), onCancel: () => {
                onExit(nameField, definitionField);
                onCancel();
            }, onHelpClick: onHelpClick })));
};
//# sourceMappingURL=StylingEditorDialog.js.map