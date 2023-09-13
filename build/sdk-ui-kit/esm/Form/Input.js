// (C) 2020-2022 GoodData Corporation
import React from "react";
import isNumber from "lodash/isNumber.js";
import isString from "lodash/isString.js";
import isNaN from "lodash/isNaN.js";
import { InputPure } from "./InputPure.js";
const isValidNumber = (value) => isNumber(value) && !isNaN(value);
const isNumberOrString = (value) => isValidNumber(value) || (isString(value) && value.length);
const toValidValue = (value) => (isNumberOrString(value) ? value : "");
/**
 * @internal
 */
class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = (value) => {
            this.valueChanged(value);
        };
        const { value } = props;
        this.state = {
            value: toValidValue(value),
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const validValue = toValidValue(nextProps.value);
        if (this.props.value !== validValue) {
            this.valueChanged(validValue);
        }
    }
    valueChanged(value) {
        if (this.state.value !== value) {
            this.setState({
                value,
            });
            this.props.onChange(value);
        }
    }
    render() {
        return (React.createElement(InputPure, Object.assign({}, this.props, { ref: (ref) => {
                this.inputNodeRef = ref;
            }, onChange: this.onChange, value: this.state.value })));
    }
}
Input.defaultProps = Object.assign({}, InputPure.defaultProps);
export { Input };
//# sourceMappingURL=Input.js.map