// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import identity from "lodash/identity.js";
import ReactTextareaAutosize from "react-textarea-autosize";
import cx from "classnames";
import { defaultImport } from "default-import";
import { Overlay } from "../Overlay/index.js";
import { ENUM_KEY_CODE } from "../typings/utilities.js";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const TextareaAutosize = defaultImport(ReactTextareaAutosize);
/**
 * @internal
 */
class EditableLabelInner extends Component {
    constructor(props) {
        super(props);
        this.focusTimeout = 0;
        this.onDocumentClick = (e) => {
            if (this.isClickOutsideTextarea(e.target)) {
                const textAreaNode = this.textarea.current;
                textAreaNode.blur();
            }
        };
        this.onKeyDown = (e) => {
            const isSubmit = e.keyCode === ENUM_KEY_CODE.KEY_CODE_ENTER;
            const isCancel = e.keyCode === ENUM_KEY_CODE.KEY_CODE_ESCAPE;
            if (isSubmit || isCancel) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (isSubmit) {
                this.onSubmit();
            }
            if (isCancel) {
                this.onCancel();
            }
        };
        this.onSubmit = () => {
            const oldValue = this.props.value;
            const newTrimmedValue = this.state.value.trim();
            if (newTrimmedValue === "") {
                this.setState({
                    value: "",
                });
            }
            if (oldValue !== newTrimmedValue) {
                this.props.onSubmit(newTrimmedValue);
            }
            else {
                this.props.onCancel(oldValue);
            }
            this.setState({
                value: newTrimmedValue,
                isEditing: false,
            });
            this.removeListeners();
        };
        this.onCancel = () => {
            const { value } = this.props;
            this.props.onCancel(value);
            this.setState({
                value,
                isEditing: false,
            });
            this.removeListeners();
        };
        this.onChange = (e) => {
            const { value } = e.target;
            this.setState({ value }, () => {
                this.props.onChange(value);
            });
        };
        this.edit = (_e) => {
            if (!this.state.isEditing) {
                this.setState({
                    isEditing: true,
                }, () => {
                    this.selectAndFocus();
                    document.addEventListener("mousedown", this.onDocumentClick);
                });
                this.props.onEditingStart();
            }
        };
        this.selectAndFocus = () => {
            const componentElement = this.textarea.current;
            const { scrollToEndOnEditingStart, textareaInOverlay } = this.props;
            if (componentElement) {
                window.clearTimeout(this.focusTimeout);
                // without the timeout the focus sometimes got stolen by the previously active item for some reason
                this.focusTimeout = window.setTimeout(() => {
                    componentElement.focus();
                    if (scrollToEndOnEditingStart && this.isMultiLine()) {
                        componentElement.scrollTop = componentElement.scrollHeight;
                    }
                    componentElement.select();
                    if (textareaInOverlay) {
                        this.measureRootDimensions();
                    }
                }, 1);
            }
        };
        this.state = {
            value: props.value,
            isEditing: false,
            textareaWidth: 100,
        };
        this.root = React.createRef();
        this.textarea = React.createRef();
    }
    componentDidMount() {
        const rootNode = this.root.current;
        rootNode.addEventListener("dragstart", this.onSelectStart);
        rootNode.addEventListener("selectstart", this.onSelectStart);
        if (this.props.autofocus) {
            this.edit();
        }
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.value !== newProps.value) {
            this.setState({
                value: newProps.value,
            });
        }
    }
    componentWillUnmount() {
        const rootNode = this.root.current;
        rootNode.removeEventListener("dragstart", this.onSelectStart);
        rootNode.removeEventListener("selectstart", this.onSelectStart);
        this.removeListeners();
        clearTimeout(this.focusTimeout);
    }
    onSelectStart(e) {
        e.stopPropagation();
    }
    isClickOutsideTextarea(clickedTarget) {
        return this.textarea.current && !this.textarea.current.contains(clickedTarget);
    }
    isMultiLine() {
        return this.props.maxRows > 1;
    }
    removeListeners() {
        document.removeEventListener("mousedown", this.onDocumentClick);
    }
    measureRootDimensions() {
        const rootElement = this.root.current;
        const rootElementFontSize = getComputedStyle(rootElement).fontSize;
        this.setState({
            textareaWidth: rootElement.offsetWidth,
            textareaFontSize: Math.floor(parseInt(rootElementFontSize, 10)),
        });
    }
    renderTextAreaInOverlay() {
        const alignId = `gd-editable-label-${uuid()}`;
        const style = {
            width: this.state.textareaWidth,
            fontSize: `${this.state.textareaFontSize}px`,
            // http://stackoverflow.com/a/6295222
            lineHeight: `${this.state.textareaFontSize * 1.25}px`,
        };
        return (React.createElement("div", { role: "textarea-wrapper", className: `${alignId} gd-editable-label-textarea-wrapper` },
            React.createElement(Overlay, { alignTo: `.${alignId}`, alignPoints: [
                    {
                        align: "cr cr",
                    },
                ] },
                React.createElement("div", { className: "gd-editable-label-overlay" }, this.renderTextarea(style)))));
    }
    renderTextarea(style = {}) {
        return (React.createElement(TextareaAutosize, { style: style, rows: 1, maxRows: this.props.maxRows, maxLength: this.props.maxLength, onKeyDown: this.onKeyDown, onBlur: this.onSubmit, onChange: this.onChange, defaultValue: this.props.value, placeholder: this.props.placeholder, ref: this.textarea }));
    }
    renderEditableLabelEdit() {
        return this.props.textareaInOverlay
            ? this.renderTextAreaInOverlay()
            : this.renderTextarea(this.root.current && this.props.isEditableLabelWidthBasedOnText
                ? { width: this.root.current.getBoundingClientRect().width }
                : {});
    }
    render() {
        const editableLabelClasses = cx({
            "gd-editable-label": true,
            "s-editable-label": true,
            "is-editing": this.state.isEditing,
            placeholder: this.state.value === "",
        }, this.props.className);
        const displayValue = this.props.children || this.state.value || this.props.placeholder;
        return (React.createElement("div", { role: "editable-label", ref: this.props.innerRef, className: editableLabelClasses, onClick: this.edit },
            React.createElement("div", { className: "gd-editable-label-inner", ref: this.root }, this.state.isEditing ? this.renderEditableLabelEdit() : displayValue)));
    }
}
EditableLabelInner.defaultProps = {
    children: false,
    className: "",
    maxLength: 100000,
    maxRows: 1,
    onCancel: identity,
    onEditingStart: identity,
    onChange: identity,
    placeholder: "",
    scrollToEndOnEditingStart: true,
    textareaInOverlay: false,
    autofocus: false,
    isEditableLabelWidthBasedOnText: false,
};
export { EditableLabelInner };
/**
 * @internal
 */
export const EditableLabel = React.forwardRef((props, ref) => {
    return React.createElement(EditableLabelInner, Object.assign({}, props, { innerRef: ref }));
});
//# sourceMappingURL=EditableLabel.js.map