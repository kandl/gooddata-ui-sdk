// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import { FormattedMessage } from "react-intl";
import { ParentFiltersDisabledItem } from "./ParentFiltersDisabledItem.js";
import { stringUtils } from "@gooddata/util";
import { useDashboardSelector, selectIsCircularDependency, } from "../../../../../../model/index.js";
import { ConnectingAttributeDropdown } from "../connectingAttribute/ConnectingAttributeDropdown.js";
export const ParentFiltersListItem = (props) => {
    const { item: { isSelected, localIdentifier, selectedConnectingAttribute }, onClick, currentFilterLocalId, connectingAttributes, onConnectingAttributeSelect, title, disabled, } = props;
    const isCircularDependency = useDashboardSelector(selectIsCircularDependency(currentFilterLocalId, localIdentifier));
    const isDisabled = isCircularDependency || !connectingAttributes.length;
    const showConnectingAttributeSelect = isSelected && connectingAttributes.length > 1;
    const activeItemClasses = useMemo(() => {
        return cx("gd-list-item attribute-filter-item s-attribute-filter-dropdown-configuration-item", `s-${stringUtils.simplifyText(title)}`, {
            "is-selected": isSelected,
        });
    }, [isSelected, title]);
    const onSelect = useCallback(() => {
        const connectingAttributeRefs = connectingAttributes.map((attr) => attr.ref);
        onClick(localIdentifier, !isSelected, connectingAttributeRefs);
    }, [isSelected, localIdentifier, onClick, connectingAttributes]);
    if (isDisabled) {
        return (React.createElement(ParentFiltersDisabledItem, { hasConnectingAttributes: !!connectingAttributes.length, itemTitle: title, itemLocalId: currentFilterLocalId }));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: activeItemClasses, onClick: () => !disabled && onSelect(), title: title },
            React.createElement("label", { className: "input-checkbox-label configuration-item-title" },
                React.createElement("input", { type: "checkbox", className: "input-checkbox s-checkbox", checked: isSelected, disabled: disabled, readOnly: true }),
                React.createElement("span", { className: "input-label-text" }, title),
                showConnectingAttributeSelect ? (React.createElement("span", { className: "addon" },
                    "\u00A0",
                    React.createElement(FormattedMessage, { id: "attributesDropdown.attributeNameWithData" }))) : null)),
        showConnectingAttributeSelect ? (React.createElement(ConnectingAttributeDropdown, { itemLocalId: localIdentifier, connectingAttributes: connectingAttributes, selectedConnectingAttributeRef: selectedConnectingAttribute || connectingAttributes[0].ref, onSelect: onConnectingAttributeSelect })) : null));
};
//# sourceMappingURL=ParentFiltersListItem.js.map