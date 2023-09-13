// (C) 2022 GoodData Corporation
import React from "react";
import { defineMessage, FormattedMessage, useIntl } from "react-intl";
import { Dropdown, DropdownButton, DropdownList, SingleSelectListItem, } from "@gooddata/sdk-ui-kit";
import { CONFIG_PANEL_INNER_WIDTH } from "../constants.js";
const alignPoints = [{ align: "bl tl" }, { align: "tl bl" }];
const messages = {
    growIsBad: defineMessage({ id: "configurationPanel.comparisonDirectionItems.red" }),
    growIsGood: defineMessage({ id: "configurationPanel.comparisonDirectionItems.green" }),
};
const placeholderMessage = defineMessage({ id: "configurationPanel.selectComparisonDirectionPlaceholder" });
const directionOrder = ["growIsGood", "growIsBad"];
export const KpiComparisonDirectionDropdown = (props) => {
    const { comparisonDirection, onComparisonDirectionChanged } = props;
    const intl = useIntl();
    const buttonValue = comparisonDirection
        ? intl.formatMessage(messages[comparisonDirection])
        : intl.formatMessage(placeholderMessage);
    return (React.createElement("div", null,
        React.createElement(FormattedMessage, { id: "configurationPanel.increasingNumberIs", tagName: "label" }),
        React.createElement(Dropdown, { alignPoints: alignPoints, className: "s-growing_number_is", renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(DropdownButton, { title: buttonValue, value: buttonValue, className: comparisonDirection ? `type-${comparisonDirection}` : "", isOpen: isOpen, onClick: toggleDropdown })), closeOnParentScroll: true, closeOnMouseDrag: true, renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { className: "configuration-dropdown growing-number-is-list", width: CONFIG_PANEL_INNER_WIDTH, items: directionOrder, renderItem: ({ item }) => {
                    const selected = comparisonDirection === item;
                    return (React.createElement(SingleSelectListItem, { title: intl.formatMessage(messages[item]), isSelected: selected, onClick: () => {
                            onComparisonDirectionChanged(item);
                            closeDropdown();
                        } }));
                } })) })));
};
//# sourceMappingURL=KpiComparisonDirectionDropdown.js.map