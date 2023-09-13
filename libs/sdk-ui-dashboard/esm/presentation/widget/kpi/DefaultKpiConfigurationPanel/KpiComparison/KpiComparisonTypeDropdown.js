// (C) 2022 GoodData Corporation
import React from "react";
import { defineMessage, useIntl } from "react-intl";
import { Dropdown, DropdownButton, DropdownList, SingleSelectListItem, } from "@gooddata/sdk-ui-kit";
import { CONFIG_PANEL_INNER_WIDTH } from "../constants.js";
const alignPoints = [{ align: "bl tl" }, { align: "tl bl" }];
const messages = {
    lastYear: defineMessage({ id: "configurationPanel.comparisonTypeItems.samePeriodInPreviousYear" }),
    none: defineMessage({ id: "configurationPanel.comparisonTypeItems.noComparison" }),
    previousPeriod: defineMessage({ id: "configurationPanel.comparisonTypeItems.previousPeriod" }),
};
const placeholderMessage = defineMessage({ id: "configurationPanel.selectComparisonPlaceholder" });
const directionOrder = ["previousPeriod", "lastYear", "none"];
export const KpiComparisonTypeDropdown = (props) => {
    const { comparisonType, onComparisonTypeChanged } = props;
    const intl = useIntl();
    const buttonValue = comparisonType
        ? intl.formatMessage(messages[comparisonType])
        : intl.formatMessage(placeholderMessage);
    return (React.createElement(Dropdown, { alignPoints: alignPoints, closeOnParentScroll: true, closeOnMouseDrag: true, className: "s-compare_with_select", renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(DropdownButton, { title: buttonValue, value: buttonValue, isOpen: isOpen, onClick: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "configuration-dropdown comparison-list", width: CONFIG_PANEL_INNER_WIDTH, items: directionOrder, renderItem: ({ item }) => {
                const selected = comparisonType === item;
                return (React.createElement(SingleSelectListItem, { title: intl.formatMessage(messages[item]), isSelected: selected, onClick: () => {
                        onComparisonTypeChanged(item);
                        closeDropdown();
                    } }));
            } })) }));
};
//# sourceMappingURL=KpiComparisonTypeDropdown.js.map