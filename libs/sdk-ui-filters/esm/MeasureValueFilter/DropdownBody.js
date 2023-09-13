// (C) 2019-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
import { IntlWrapper } from "@gooddata/sdk-ui";
import OperatorDropdown from "./OperatorDropdown.js";
import RangeInput from "./RangeInput.js";
import ComparisonInput from "./ComparisonInput.js";
import { isComparisonConditionOperator, isRangeConditionOperator } from "@gooddata/sdk-model";
import TreatNullValuesAsZeroCheckbox from "./TreatNullValuesAsZeroCheckbox.js";
import { WarningMessageComponent } from "./WarningMessage.js";
const DefaultValuePrecision = 6;
class DropdownBodyWrapped extends React.PureComponent {
    constructor(props) {
        super(props);
        this.renderInputSection = () => {
            const { usePercentage, disableAutofocus, separators } = this.props;
            const { operator, value: { value = null, from = null, to = null }, } = this.state;
            if (isComparisonConditionOperator(operator)) {
                return (React.createElement(ComparisonInput, { value: value, usePercentage: usePercentage, onValueChange: this.handleValueChange, onEnterKeyPress: this.onApply, disableAutofocus: disableAutofocus, separators: separators }));
            }
            else if (isRangeConditionOperator(operator)) {
                return (React.createElement(RangeInput, { from: from, to: to, usePercentage: usePercentage, onFromChange: this.handleFromChange, onToChange: this.handleToChange, onEnterKeyPress: this.onApply, disableAutofocus: disableAutofocus, separators: separators }));
            }
            return null;
        };
        this.isChanged = () => this.state.operator !== this.props.operator ||
            this.state.enabledTreatNullValuesAsZero !== this.props.treatNullAsZeroValue;
        this.isApplyButtonDisabled = () => {
            const { operator } = this.state;
            if (isComparisonConditionOperator(operator)) {
                return this.isApplyButtonDisabledForComparison();
            }
            if (isRangeConditionOperator(operator)) {
                return this.isApplyButtonDisabledForRange();
            }
            return this.isApplyButtonDisabledForAll();
        };
        this.handleOperatorSelection = (operator) => this.setState({ operator });
        this.handleValueChange = (value) => {
            this.setState({ value: Object.assign(Object.assign({}, this.state.value), { value }) });
        };
        this.handleFromChange = (from) => {
            this.setState({ value: Object.assign(Object.assign({}, this.state.value), { from }) });
        };
        this.handleToChange = (to) => {
            this.setState({ value: Object.assign(Object.assign({}, this.state.value), { to }) });
        };
        this.handleTreatNullAsZeroClicked = (checked) => {
            this.setState({ enabledTreatNullValuesAsZero: checked });
        };
        this.trimToPrecision = (n) => {
            const { valuePrecision = DefaultValuePrecision } = this.props;
            if (!n) {
                return n;
            }
            return parseFloat(n.toFixed(valuePrecision));
        };
        this.fromPercentToDecimal = (n) => (n ? n / 100 : n);
        this.fromDecimalToPercent = (n) => (n ? n * 100 : n);
        this.convertToRawValue = (value, operator) => {
            if (!value) {
                return value;
            }
            return isComparisonConditionOperator(operator)
                ? { value: this.trimToPrecision(this.fromPercentToDecimal(value.value)) }
                : {
                    from: this.trimToPrecision(this.fromPercentToDecimal(value.from)),
                    to: this.trimToPrecision(this.fromPercentToDecimal(value.to)),
                };
        };
        this.convertToPercentageValue = (value, operator) => {
            if (!value) {
                return value;
            }
            return isComparisonConditionOperator(operator)
                ? { value: this.trimToPrecision(this.fromDecimalToPercent(value.value)) }
                : {
                    from: this.trimToPrecision(this.fromDecimalToPercent(value.from)),
                    to: this.trimToPrecision(this.fromDecimalToPercent(value.to)),
                };
        };
        this.onApply = () => {
            if (this.isApplyButtonDisabled()) {
                return;
            }
            const { enabledTreatNullValuesAsZero, operator: stateOperator, value: stateValue } = this.state;
            const { usePercentage } = this.props;
            const operator = stateOperator === "ALL" ? null : stateOperator;
            const value = usePercentage ? this.convertToRawValue(stateValue, stateOperator) : stateValue;
            this.props.onApply(operator, value, enabledTreatNullValuesAsZero);
        };
        const { operator, value, usePercentage, treatNullAsZeroValue } = props;
        this.state = {
            operator: operator || "ALL",
            value: (usePercentage ? this.convertToPercentageValue(value, operator) : value) || {},
            enabledTreatNullValuesAsZero: treatNullAsZeroValue,
        };
    }
    render() {
        const { onCancel, warningMessage, displayTreatNullAsZeroOption, enableOperatorSelection, intl } = this.props;
        const { operator, enabledTreatNullValuesAsZero } = this.state;
        return (React.createElement("div", { className: "gd-mvf-dropdown-body gd-dialog gd-dropdown overlay s-mvf-dropdown-body" },
            React.createElement("div", { className: "gd-mvf-dropdown-content" },
                warningMessage ? (React.createElement("div", { className: "gd-mvf-dropdown-section" },
                    React.createElement(WarningMessageComponent, { warningMessage: warningMessage }))) : null,
                React.createElement("div", { className: "gd-mvf-dropdown-section" },
                    React.createElement(OperatorDropdown, { onSelect: this.handleOperatorSelection, operator: operator, isDisabled: !enableOperatorSelection })),
                operator !== "ALL" ? (React.createElement("div", { className: "gd-mvf-dropdown-section" },
                    this.renderInputSection(),
                    " ",
                    displayTreatNullAsZeroOption ? (React.createElement(TreatNullValuesAsZeroCheckbox, { onChange: this.handleTreatNullAsZeroClicked, checked: enabledTreatNullValuesAsZero, intl: intl })) : null)) : null),
            React.createElement("div", { className: "gd-mvf-dropdown-footer" },
                React.createElement(Button, { className: "gd-button-secondary gd-button-small s-mvf-dropdown-cancel", onClick: onCancel, value: intl.formatMessage({ id: "cancel" }) }),
                React.createElement(Button, { className: "gd-button-action gd-button-small s-mvf-dropdown-apply", onClick: this.onApply, value: intl.formatMessage({ id: "apply" }), disabled: this.isApplyButtonDisabled() }))));
    }
    isApplyButtonDisabledForComparison() {
        const { value = null } = this.state.value;
        if (value === null) {
            return true;
        }
        if (this.props.value === null || this.isChanged()) {
            return false;
        }
        if (this.props.usePercentage) {
            return this.trimToPrecision(this.fromPercentToDecimal(value)) === this.props.value.value;
        }
        return value === this.props.value.value;
    }
    isApplyButtonDisabledForRange() {
        const { from = null, to = null } = this.state.value;
        if (from === null || to === null) {
            return true;
        }
        if (this.props.value === null || this.isChanged()) {
            return false;
        }
        if (this.props.usePercentage) {
            return (this.trimToPrecision(this.fromPercentToDecimal(from)) === this.props.value.from &&
                this.trimToPrecision(this.fromPercentToDecimal(to)) === this.props.value.to);
        }
        return from === this.props.value.from && to === this.props.value.to;
    }
    isApplyButtonDisabledForAll() {
        return this.props.operator === "ALL";
    }
}
export const DropdownBodyWithIntl = injectIntl(DropdownBodyWrapped);
export class DropdownBody extends React.PureComponent {
    render() {
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(DropdownBodyWithIntl, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=DropdownBody.js.map