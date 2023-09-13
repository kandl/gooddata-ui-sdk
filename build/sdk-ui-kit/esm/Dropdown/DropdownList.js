import { __rest } from "tslib";
// (C) 2007-2022 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import { injectIntl } from "react-intl";
import { Input } from "../Form/index.js";
import { DropdownTabs } from "./DropdownTabs.js";
import { List } from "../List/index.js";
import { LoadingMask } from "../LoadingMask/index.js";
import { NoData } from "../NoData/index.js";
import { AutoSize } from "../AutoSize/index.js";
/**
 * @internal
 */
export const LOADING_HEIGHT = 100;
/**
 * @internal
 */
export const DEFAULT_ITEM_HEIGHT = 28;
/**
 * @internal
 */
export const DEFAULT_MOBILE_ITEM_HEIGHT = 40;
const defaultNoData = injectIntl(({ hasNoMatchingData, intl }) => (React.createElement(NoData, { hasNoMatchingData: hasNoMatchingData, notFoundLabel: intl.formatMessage({ id: "gs.noData.noMatchingData" }), noDataLabel: intl.formatMessage({ id: "gs.noData.noDataAvailable" }) })));
/**
 * @internal
 */
export function DropdownList(props) {
    const { className = "", width, height, isMobile, isLoading, items = [], itemsCount = items.length, itemHeight = DEFAULT_ITEM_HEIGHT, mobileItemHeight = DEFAULT_MOBILE_ITEM_HEIGHT, showSearch, disableAutofocus, searchString, searchPlaceholder, searchFieldSize, onSearch, showTabs, tabs, selectedTabId, onTabSelect, renderNoData = defaultNoData, scrollToItem } = props, listProps = __rest(props, ["className", "width", "height", "isMobile", "isLoading", "items", "itemsCount", "itemHeight", "mobileItemHeight", "showSearch", "disableAutofocus", "searchString", "searchPlaceholder", "searchFieldSize", "onSearch", "showTabs", "tabs", "selectedTabId", "onTabSelect", "renderNoData", "scrollToItem"]);
    const hasNoData = !isLoading && itemsCount === 0;
    const hasNoMatchingData = hasNoData && !!searchString;
    const listClassNames = cx("gd-infinite-list", className);
    const searchFieldClassNames = cx("gd-list-searchfield", "gd-flex-item");
    const renderFooter = () => {
        const { footer, closeDropdown } = props;
        if (!footer) {
            return null;
        }
        if (typeof footer === "function") {
            return footer(closeDropdown);
        }
        return footer;
    };
    const onChange = useCallback((search) => onSearch(search.toString()), [onSearch]);
    return (React.createElement(React.Fragment, null,
        showSearch ? (React.createElement(Input, { className: searchFieldClassNames, value: searchString, onChange: onChange, isSmall: searchFieldSize === "small", placeholder: searchPlaceholder, clearOnEsc: true, isSearch: true, autofocus: !disableAutofocus })) : null,
        showTabs ? (React.createElement(DropdownTabs, { tabs: tabs, selectedTabId: selectedTabId, onTabSelect: onTabSelect })) : null,
        hasNoData ? (React.createElement("div", { style: { width: isMobile ? "auto" : width } }, renderNoData({ hasNoMatchingData }))) : null,
        isLoading ? React.createElement(LoadingMask, { width: isMobile ? "100%" : width, height: LOADING_HEIGHT }) : null,
        !isLoading && itemsCount > 0 ? (React.createElement(AutoSize, null, (autoSize) => {
            const listWidth = isMobile ? autoSize.width : width;
            const listHeight = isMobile ? autoSize.height : height;
            return (React.createElement(List, Object.assign({ className: listClassNames, width: listWidth, height: listHeight, items: items, itemsCount: itemsCount, itemHeight: isMobile ? Math.max(mobileItemHeight, itemHeight) : itemHeight, scrollToItem: scrollToItem }, listProps)));
        })) : null,
        renderFooter()));
}
//# sourceMappingURL=DropdownList.js.map