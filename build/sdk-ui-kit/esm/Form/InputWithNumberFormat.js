// (C) 2007-2022 GoodData Corporation
import React from "react";
import memoize from "lodash/memoize.js";
import { InputPure } from "./InputPure.js";
// Highest number (BIGINT) according to gooddata documentation help.gooddata.com object-datatypes
export const MAX_NUMBER = 10 ** 15;
// Max number of digits right to decimal point according to gooddata documentation help.gooddata.com object-datatypes
const MAX_DECIMAL_POINT_NUMBERS = 6;
export const DEFAULT_SEPARATORS = {
    thousand: ",",
    decimal: ".",
};
const getDanglingDecimalPointRegExp = memoize((decimal) => new RegExp(`\\${decimal}$`));
const getFormatValidationRegExp = memoize(({ thousand, decimal }) => new RegExp(`^-?(\\d|\\${thousand})*(\\${decimal}\\d*)?$`));
const parseStandardNumberString = (numberString) => {
    const belowDecimal = numberString.split(".")[1];
    const roundedNumberString = belowDecimal && belowDecimal.length >= MAX_DECIMAL_POINT_NUMBERS
        ? parseFloat(numberString).toFixed(MAX_DECIMAL_POINT_NUMBERS)
        : numberString;
    const number = parseFloat(roundedNumberString);
    return number === 0 ? 0 : number;
};
const convertFormattedStringToStandard = (formattedString, { thousand, decimal }) => {
    const withoutThousandSeparators = formattedString.toString().split(thousand).join("");
    const withoutDanglingDecimalPoint = withoutThousandSeparators.replace(getDanglingDecimalPointRegExp(decimal), "");
    const withStandardDecimalPoint = withoutDanglingDecimalPoint.split(decimal).join(".");
    return withStandardDecimalPoint.length > 0 ? withStandardDecimalPoint : null;
};
const parse = (value, separators) => {
    if (value === null || value === "" || value === "-") {
        return null;
    }
    const numberString = convertFormattedStringToStandard(value, separators);
    if (numberString === null) {
        return null;
    }
    return parseStandardNumberString(numberString);
};
const isValid = (value, separators) => {
    return (getFormatValidationRegExp(separators).test(value) && Math.abs(parse(value, separators)) <= MAX_NUMBER);
};
const format = (value, { thousand, decimal }) => {
    if (value === null) {
        return "";
    }
    const [aboveDecimal, belowDecimal] = value.toString().split(".");
    const aboveDecimalFormatted = aboveDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousand}`);
    return belowDecimal ? `${aboveDecimalFormatted}${decimal}${belowDecimal}` : aboveDecimalFormatted;
};
/**
 * @internal
 */
class InputWithNumberFormat extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = (value, e) => {
            const { separators, onChange } = this.props;
            if (this.state.value === value) {
                return;
            }
            if (!isValid(value, separators)) {
                this.handleCaretShift(e);
                return;
            }
            this.setState({ value });
            onChange(parse(value, separators));
        };
        this.onFocus = (e) => {
            this.setState({ isFocused: true });
            this.props.onFocus(e);
        };
        this.onBlur = (e) => {
            const { separators, onBlur } = this.props;
            const { value } = this.state;
            this.setState({
                value: format(parse(value, separators), separators),
                isFocused: false,
            });
            onBlur(e);
        };
        this.state = {
            value: format(props.value, props.separators),
            isFocused: false,
        };
    }
    UNSAFE_componentWillReceiveProps({ value: newValue }) {
        const { value, separators } = this.props;
        const { isFocused } = this.state;
        if (value !== newValue && !isFocused) {
            this.setState({ value: format(newValue, separators) });
        }
    }
    handleCaretShift(e) {
        const caretPosition = e.target.selectionStart - 1;
        this.setState({}, () => {
            this.input.inputNodeRef.setSelectionRange(caretPosition, caretPosition);
        });
    }
    render() {
        return (React.createElement(InputPure, Object.assign({}, this.props, { ref: (ref) => {
                this.input = ref;
            }, onFocus: this.onFocus, onChange: this.onChange, onBlur: this.onBlur, value: this.state.value })));
    }
}
InputWithNumberFormat.defaultProps = Object.assign(Object.assign({}, InputPure.defaultProps), { separators: DEFAULT_SEPARATORS });
export { InputWithNumberFormat };
//# sourceMappingURL=InputWithNumberFormat.js.map