// (C) 2019-2022 GoodData Corporation
import React from "react";
import { newMeasureValueFilter, measureValueFilterCondition, isRangeCondition, isRangeConditionOperator, measureValueFilterOperator, isComparisonCondition, } from "@gooddata/sdk-model";
import { Dropdown } from "./Dropdown.js";
const getFilterValue = (filter) => {
    if (!filter) {
        return {};
    }
    const condition = measureValueFilterCondition(filter);
    if (!condition) {
        return {};
    }
    return isRangeCondition(condition)
        ? { from: condition.range.from, to: condition.range.to }
        : { value: condition.comparison.value };
};
const getTreatNullAsZeroValue = (filter, treatNullAsZeroDefaultValue) => {
    if (!filter || !measureValueFilterCondition(filter)) {
        return treatNullAsZeroDefaultValue !== undefined && treatNullAsZeroDefaultValue;
    }
    const condition = measureValueFilterCondition(filter);
    return ((isComparisonCondition(condition) && condition.comparison.treatNullValuesAs !== undefined) ||
        (isRangeCondition(condition) && condition.range.treatNullValuesAs !== undefined) ||
        false);
};
/**
 * @beta
 */
class MeasureValueFilterDropdown extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onApply = (operator, value, treatNullValuesAsZero) => {
            var _a, _b, _c;
            const { filter, measureIdentifier, onApply } = this.props;
            if (operator === null || operator === "ALL") {
                onApply(null);
            }
            else {
                if (isRangeConditionOperator(operator)) {
                    onApply(newMeasureValueFilter({ localIdentifier: measureIdentifier } || filter.measureValueFilter.measure, operator, (_a = value.from) !== null && _a !== void 0 ? _a : 0, (_b = value.to) !== null && _b !== void 0 ? _b : 0, treatNullValuesAsZero ? 0 : undefined));
                }
                else {
                    onApply(newMeasureValueFilter({ localIdentifier: measureIdentifier } || filter.measureValueFilter.measure, operator, (_c = value.value) !== null && _c !== void 0 ? _c : 0, treatNullValuesAsZero ? 0 : undefined));
                }
            }
        };
    }
    render() {
        const { filter, onCancel, usePercentage, warningMessage, locale, anchorEl, separators, displayTreatNullAsZeroOption, treatNullAsZeroDefaultValue, enableOperatorSelection, } = this.props;
        return (React.createElement(Dropdown, { onApply: this.onApply, onCancel: onCancel, operator: (filter && measureValueFilterOperator(filter)) || null, value: (filter && getFilterValue(filter)) || null, usePercentage: usePercentage, warningMessage: warningMessage, locale: locale, anchorEl: anchorEl, separators: separators, displayTreatNullAsZeroOption: displayTreatNullAsZeroOption, treatNullAsZeroValue: getTreatNullAsZeroValue(filter, treatNullAsZeroDefaultValue), enableOperatorSelection: enableOperatorSelection }));
    }
}
MeasureValueFilterDropdown.defaultProps = {
    displayTreatNullAsZeroOption: false,
    treatNullAsZeroDefaultValue: false,
    enableOperatorSelection: true,
};
export { MeasureValueFilterDropdown };
//# sourceMappingURL=MeasureValueFilterDropdown.js.map