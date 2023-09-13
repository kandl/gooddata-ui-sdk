// (C) 2020-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import DefaultNativeListener from "react-native-listener";
import noop from "lodash/noop.js";
import { defaultImport } from "default-import";
import { ENUM_KEY_CODE } from "../typings/utilities.js";
import { runAutofocus } from "./focus.js";
const NativeListener = defaultImport(DefaultNativeListener);
/**
 * @internal
 */
class InputPure extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.autofocusDispatcher = noop;
        this.onChange = (e) => {
            this.props.onChange(e.target.value, e);
        };
        this.onKeyPress = (e) => {
            switch (e.keyCode) {
                case ENUM_KEY_CODE.KEY_CODE_ESCAPE:
                    if (this.props.clearOnEsc) {
                        this.onClear();
                    }
                    this.props.onEscKeyPress();
                    break;
                case ENUM_KEY_CODE.KEY_CODE_ENTER:
                    this.props.onEnterKeyPress();
                    break;
                default:
                    break;
            }
        };
        this.onClear = (e) => {
            this.props.onChange("", e);
        };
    }
    componentDidMount() {
        const { autofocus } = this.props;
        this.autofocusDispatcher = runAutofocus(this.inputNodeRef, autofocus);
    }
    componentWillUnmount() {
        this.autofocusDispatcher();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.autofocus !== this.props.autofocus) {
            this.autofocusDispatcher();
            this.autofocusDispatcher = runAutofocus(this.inputNodeRef, this.props.autofocus);
        }
    }
    getLabelClassNames(className) {
        return cx({
            "gd-input": true,
            "gd-input-small": this.props.isSmall,
            "gd-input-search": this.props.isSearch,
            "gd-input-with-prefix": !!this.props.prefix,
            "gd-input-with-suffix": !!this.props.suffix,
            "gd-input-with-label": !!this.props.label,
            "gd-input-label-top": this.props.labelPositionTop,
            "has-error": this.props.hasError,
            "has-warning": this.props.hasWarning,
            "is-disabled": this.props.disabled,
        }, className);
    }
    getInputClassNames() {
        return cx({
            "gd-input-field": true,
            "gd-input-field-small": this.props.isSmall,
        });
    }
    renderPrefix(prefix) {
        return prefix ? (React.createElement("span", { className: "gd-input-prefix", "aria-label": "Input prefix" }, prefix)) : (false);
    }
    renderSuffix(suffix) {
        return suffix ? (React.createElement("span", { className: "gd-input-suffix", "aria-label": "Input suffix" }, suffix)) : (false);
    }
    renderLabel(label) {
        return label ? React.createElement("span", { className: "gd-input-label" }, label) : false;
    }
    renderSearch(isSearch) {
        return isSearch ? React.createElement("span", { className: "gd-input-icon gd-icon-search" }) : false;
    }
    renderClearIcon(clearOnEsc) {
        return clearOnEsc && this.props.value.length > 0 ? (
        // react events use delegation and don't bubble, click on clear needs to be kept local
        // to avoid handling by overlay close handler and others
        React.createElement(NativeListener, { onClick: this.onClear },
            React.createElement("span", { className: "gd-input-icon-clear gd-icon-clear s-input-clear", "aria-label": "Input clear" }))) : (false);
    }
    render() {
        const { className, clearOnEsc, disabled, isSearch, placeholder, prefix, readonly, suffix, label, maxlength, value, onBlur, onFocus, } = this.props;
        return (React.createElement("label", { className: this.getLabelClassNames(className) },
            this.renderLabel(label),
            React.createElement("div", { className: "gd-input-wrapper" },
                React.createElement("input", { ref: (ref) => {
                        this.inputNodeRef = ref;
                    }, className: this.getInputClassNames(), disabled: disabled, maxLength: maxlength, onChange: this.onChange, onBlur: onBlur, onFocus: onFocus, onKeyDown: this.onKeyPress, placeholder: placeholder, readOnly: readonly, value: value }),
                this.renderSearch(isSearch),
                this.renderClearIcon(clearOnEsc),
                this.renderPrefix(prefix),
                this.renderSuffix(suffix))));
    }
    focus(options) {
        if (this.inputNodeRef) {
            this.inputNodeRef.focus(options);
        }
    }
}
InputPure.defaultProps = {
    autofocus: false,
    className: "",
    clearOnEsc: false,
    disabled: false,
    hasError: false,
    hasWarning: false,
    isSearch: false,
    isSmall: false,
    maxlength: 255,
    onChange: noop,
    onEscKeyPress: noop,
    onEnterKeyPress: noop,
    onBlur: noop,
    onFocus: noop,
    placeholder: "",
    prefix: "",
    readonly: false,
    suffix: "",
    label: "",
    labelPositionTop: false,
    value: "",
};
export { InputPure };
//# sourceMappingURL=InputPure.js.map