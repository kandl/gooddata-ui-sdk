// (C) 2020-2022 GoodData Corporation
import React, { useState, useCallback } from "react";
import { Button, BubbleHoverTrigger, Bubble } from "@gooddata/sdk-ui-kit";
import { newRankingFilter, areObjRefsEqual } from "@gooddata/sdk-model";
import { injectIntl, FormattedMessage } from "react-intl";
import { OperatorDropdown } from "./OperatorDropdown/OperatorDropdown.js";
import { ValueDropdown } from "./ValueDropdown/ValueDropdown.js";
import { AttributeDropdown } from "./AttributeDropdown/AttributeDropdown.js";
import { MeasureDropdown } from "./MeasureDropdown/MeasureDropdown.js";
import isEqual from "lodash/isEqual.js";
import xorWith from "lodash/xorWith.js";
import isEmpty from "lodash/isEmpty.js";
import noop from "lodash/noop.js";
import { Preview } from "./Preview.js";
const isApplyButtonDisabled = (filter, filterState) => {
    const rankingFilter = filter.rankingFilter;
    const rankingFilterState = filterState.rankingFilter;
    const operatorNotChanged = rankingFilter.operator === rankingFilterState.operator;
    const valueNotChanged = rankingFilter.value === rankingFilterState.value;
    const attributesNotChanged = isEmpty(xorWith(rankingFilter.attributes, rankingFilterState.attributes, isEqual));
    const measureNotChanged = isEqual(rankingFilter.measure, rankingFilterState.measure);
    return operatorNotChanged && valueNotChanged && attributesNotChanged && measureNotChanged;
};
const RankingFilterDropdownBodyComponent = ({ measureItems, attributeItems, filter, onApply, onCancel, onDropDownItemMouseOver, onDropDownItemMouseOut, customGranularitySelection, intl, enableRenamingMeasureToMetric, }) => {
    var _a;
    const rankingFilter = filter.rankingFilter;
    const [value, setValue] = useState(rankingFilter.value);
    const [operator, setOperator] = useState(rankingFilter.operator);
    const [measure, setMeasureIdentifier] = useState(rankingFilter.measure);
    const [attribute, setAttributeIdentifier] = useState((_a = rankingFilter.attributes) === null || _a === void 0 ? void 0 : _a[0]);
    const selectedMeasure = measureItems.find((item) => areObjRefsEqual(item.ref, measure));
    const selectedAttribute = attributeItems.find((item) => areObjRefsEqual(item.ref, attribute));
    const getFilterState = useCallback(() => {
        return attribute
            ? newRankingFilter(measure, [attribute], operator, value)
            : newRankingFilter(measure, operator, value);
    }, [measure, attribute, operator, value]);
    const applyHandler = () => {
        const filterState = getFilterState();
        onApply(filterState);
    };
    return (React.createElement("div", { className: "gd-dialog gd-dropdown overlay gd-rf-dropdown-body s-rf-dropdown-body" },
        React.createElement("div", { className: "gd-rf-dropdown-header" },
            React.createElement(FormattedMessage, { id: "rankingFilter.topBottom" })),
        React.createElement("div", { className: "gd-rf-dropdown-section" },
            React.createElement("div", { className: "gd-rf-value-section" },
                React.createElement(OperatorDropdown, { selectedValue: operator, onSelect: setOperator }),
                React.createElement(ValueDropdown, { selectedValue: value, onSelect: setValue }),
                React.createElement(BubbleHoverTrigger, { showDelay: 0, hideDelay: 0 },
                    React.createElement("span", { className: "gd-icon-circle-question gd-rf-value-tooltip-icon s-rf-value-tooltip-icon" }),
                    React.createElement(Bubble, { className: `bubble-primary gd-rf-tooltip-bubble s-rf-value-tooltip`, alignPoints: [{ align: "cr cl" }, { align: "cl cr" }] },
                        React.createElement(FormattedMessage, { id: "rankingFilter.valueTooltip" })))),
            React.createElement("div", { className: "gd-rf-dropdown-section-title" },
                React.createElement(FormattedMessage, { id: "rankingFilter.outOf" })),
            React.createElement(AttributeDropdown, { items: attributeItems, selectedItemRef: attribute, onSelect: setAttributeIdentifier, onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, customGranularitySelection: customGranularitySelection }),
            React.createElement("div", { className: "gd-rf-dropdown-section-title" },
                React.createElement(FormattedMessage, { id: "rankingFilter.basedOn" })),
            React.createElement(MeasureDropdown, { items: measureItems, selectedItemRef: measure, onSelect: setMeasureIdentifier, onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric }),
            React.createElement("div", { className: "gd-rf-dropdown-section-title" },
                React.createElement(FormattedMessage, { id: "rankingFilter.preview" })),
            React.createElement(Preview, { measure: selectedMeasure, attribute: selectedAttribute, operator: operator, value: value })),
        React.createElement("div", { className: "gd-rf-dropdown-footer" },
            React.createElement(Button, { className: "gd-button-secondary gd-button-small s-rf-dropdown-cancel", onClick: () => onCancel(), value: intl.formatMessage({ id: "cancel" }) }),
            React.createElement(Button, { className: "gd-button-action gd-button-small s-rf-dropdown-apply", onClick: applyHandler, value: intl.formatMessage({ id: "apply" }), disabled: isApplyButtonDisabled(filter, getFilterState()) }))));
};
RankingFilterDropdownBodyComponent.defaultProps = {
    onCancel: noop,
};
export const RankingFilterDropdownBody = injectIntl(RankingFilterDropdownBodyComponent);
//# sourceMappingURL=RankingFilterDropdownBody.js.map