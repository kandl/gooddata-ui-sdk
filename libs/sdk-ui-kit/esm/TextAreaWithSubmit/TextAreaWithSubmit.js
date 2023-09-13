// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import identity from "lodash/identity.js";
/**
 * @internal
 */
class TextAreaWithSubmit extends Component {
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
            const isSubmit = e.key === "Enter" && !e.shiftKey;
            const isCancel = e.key === "Escape";
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
            const oldValue = this.props.defaultValue;
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
            const { defaultValue } = this.props;
            this.props.onCancel(defaultValue);
            this.setState({
                value: defaultValue,
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
            const { scrollToEndOnEditingStart } = this.props;
            if (componentElement) {
                window.clearTimeout(this.focusTimeout);
                // without the timeout the focus sometimes got stolen by the previously active item for some reason
                this.focusTimeout = window.setTimeout(() => {
                    componentElement.focus();
                    if (scrollToEndOnEditingStart && this.isMultiLine()) {
                        componentElement.scrollTop = componentElement.scrollHeight;
                    }
                    componentElement.select();
                }, 1);
            }
        };
        this.state = {
            value: props.defaultValue,
            isEditing: false,
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
        if (this.props.defaultValue !== newProps.defaultValue) {
            this.setState({
                value: newProps.defaultValue,
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
        return this.props.rows > 1;
    }
    removeListeners() {
        document.removeEventListener("mousedown", this.onDocumentClick);
    }
    renderTextarea(style = {}) {
        const { rows, disabled, maxLength, placeholder, className } = this.props;
        const { value } = this.state;
        return (React.createElement("textarea", { className: className, style: style, rows: rows, maxLength: maxLength, onKeyDown: this.onKeyDown, onBlur: this.onSubmit, onChange: this.onChange, value: value, placeholder: placeholder, ref: this.textarea, disabled: disabled }));
    }
    renderTextAreaWithSubmitEdit() {
        return this.renderTextarea({});
    }
    render() {
        return (React.createElement("div", { role: "editable-label", onClick: this.edit },
            React.createElement("div", { ref: this.root }, this.renderTextAreaWithSubmitEdit())));
    }
}
TextAreaWithSubmit.defaultProps = {
    className: "",
    maxLength: 100000,
    rows: 1,
    onCancel: identity,
    onEditingStart: identity,
    onChange: identity,
    placeholder: "",
    scrollToEndOnEditingStart: true,
    autofocus: false,
    disabled: false,
};
export { TextAreaWithSubmit };
//# sourceMappingURL=TextAreaWithSubmit.js.map