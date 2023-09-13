// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import noop from "lodash/noop";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import cx from "classnames";
import DisabledBubbleMessage from "../DisabledBubbleMessage";
import { getTranslation } from "../../utils/translations";
const MAX_NUMBER_LENGTH = 15;
class InputControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            lastSentValue: props.value,
        };
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.triggerBlur = this.triggerBlur.bind(this);
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.value !== this.state.value) {
            this.setState({
                value: newProps.value,
                lastSentValue: newProps.value,
            });
        }
    }
    render() {
        const { disabled, labelText, placeholder, showDisabledMessage, intl, type } = this.props;
        return (React.createElement(DisabledBubbleMessage, { showDisabledMessage: showDisabledMessage },
            React.createElement("label", { className: "adi-bucket-inputfield gd-input gd-input-small" },
                React.createElement("span", { className: "input-label-text" }, getTranslation(labelText, intl)),
                React.createElement("input", { ref: (input) => (this.inputRef = input), className: this.getInputClassNames(), value: this.state.value, placeholder: getTranslation(placeholder, intl), disabled: disabled, onKeyPress: this.onKeyPress, onBlur: this.onBlur, onChange: this.onValueChanged, maxLength: type === "number" ? MAX_NUMBER_LENGTH : null }))));
    }
    getInputClassNames() {
        const { type, hasWarning } = this.props;
        return cx("gd-input-field", "gd-input-field-small", {
            "has-warning": hasWarning,
            number: type === "number",
        });
    }
    isValid(type, value) {
        if (type === "number") {
            // allow only numbers, `-` and string doesn't starts with `.`
            return !value.startsWith(".") && (!isNaN(Number(value)) || value === "-");
        }
        return true;
    }
    onValueChanged(event) {
        const { type } = this.props;
        const { value } = event.target;
        if (this.isValid(type, value)) {
            this.setState({ value });
        }
    }
    triggerBlur() {
        if (this.inputRef) {
            this.inputRef.blur();
        }
    }
    modifyDataForSending(value) {
        const { type } = this.props;
        if (type === "number") {
            return value.replace(/\.+$/, "");
        }
        return value;
    }
    emitData() {
        const { valuePath, properties, pushData } = this.props;
        const { value } = this.state;
        const modifiedData = this.modifyDataForSending(value);
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties, `controls.${valuePath}`, modifiedData);
        this.setState({ value: modifiedData });
        pushData({ properties: clonedProperties });
        return modifiedData;
    }
    onBlur() {
        const { value, lastSentValue } = this.state;
        if (lastSentValue !== value) {
            const validatedData = this.emitData();
            this.setState({ lastSentValue: validatedData });
        }
    }
    onKeyPress(event) {
        if (event.key === "Enter") {
            const { value, lastSentValue } = this.state;
            if (lastSentValue !== value) {
                const validatedData = this.emitData();
                this.setState({ lastSentValue: validatedData }, this.triggerBlur);
            }
            else {
                this.triggerBlur();
            }
        }
    }
}
InputControl.defaultProps = {
    value: "",
    type: "text",
    disabled: false,
    pushData: noop,
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    step: 1,
    showDisabledMessage: false,
    hasWarning: false,
    validateAndPushDataCallback: noop,
};
export { InputControl };
export default injectIntl(InputControl);
//# sourceMappingURL=InputControl.js.map