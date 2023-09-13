// (C) 2007-2023 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import DefaultMeasure from "react-measure";
import { LoadingMask } from "../../LoadingMask/index.js";
import { AsyncList } from "../AsyncList.js";
import { useInvertableSelect } from "./useInvertableSelect.js";
import { InvertableSelectSearchBar } from "./InvertableSelectSearchBar.js";
import { InvertableSelectAllCheckbox } from "./InvertableSelectAllCheckbox.js";
import { InvertableSelectStatusBar } from "./InvertableSelectStatusBar.js";
import { InvertableSelectNoResultsMatch } from "./InvertableSelectNoResultsMatch.js";
import { ErrorComponent } from "@gooddata/sdk-ui";
import { InvertableSelectItem } from "./InvertableSelectItem.js";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(DefaultMeasure);
/**
 * @internal
 */
export function InvertableSelect(props) {
    const { className, width, height, adaptiveWidth, adaptiveHeight, isSingleSelect = false, items, totalItemsCount, itemHeight, getItemTitle, isInverted = true, selectedItems, selectedItemsLimit = Infinity, onSearch, searchString, searchPlaceholder, error, isLoading, nextPageItemPlaceholdersCount, isLoadingNextPage, onLoadNextPage, renderError = defaultError, renderLoading = defaultLoading, renderSearchBar = defaultSearchBar, renderNoData = defaultNoData, renderItem = defaultItem, renderStatusBar = defaultStatusBar, renderActions = defaultActions, } = props;
    const { onSelectAllCheckboxChange, onSelectAllCheckboxToggle, selectOnly, selectItems, deselectItems, selectionState, getIsItemSelected, } = useInvertableSelect(props);
    const itemRenderer = useCallback(({ item }) => {
        return renderItem({
            onSelect: () => {
                selectItems([item]);
            },
            onDeselect: () => {
                deselectItems([item]);
            },
            onSelectOnly: () => selectOnly(item),
            item,
            isSelected: getIsItemSelected(item),
        });
    }, [renderItem, getIsItemSelected, selectItems, deselectItems, selectOnly]);
    return (React.createElement("div", { className: "gd-invertable-select" },
        React.createElement("div", { className: "gd-invertable-select-search-bar" }, renderSearchBar({ onSearch, searchPlaceholder, searchString })),
        isLoading ? (React.createElement("div", { className: "gd-invertable-select-loading" }, renderLoading({ height }))) : error ? (React.createElement("div", { className: "gd-invertable-select-error" }, renderError({ height, error }))) : (React.createElement(React.Fragment, null,
            renderActions({
                isVisible: items.length > 0,
                checked: selectionState !== "none",
                onToggle: onSelectAllCheckboxToggle,
                onChange: onSelectAllCheckboxChange,
                isFiltered: (searchString === null || searchString === void 0 ? void 0 : searchString.length) > 0,
                totalItemsCount,
                isPartialSelection: selectionState === "partial",
            }),
            items.length > 0 && (React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
                return (React.createElement("div", { className: "gd-invertable-select-list", ref: measureRef },
                    React.createElement(AsyncList, { className: cx(className, {
                            "is-multiselect": !isSingleSelect,
                        }), width: adaptiveWidth ? contentRect === null || contentRect === void 0 ? void 0 : contentRect.client.width : width, height: adaptiveHeight
                            ? contentRect === null || contentRect === void 0 ? void 0 : contentRect.client.height
                            : Math.min(items.length, 10) * itemHeight, items: items, itemHeight: itemHeight, renderItem: itemRenderer, nextPageItemPlaceholdersCount: nextPageItemPlaceholdersCount, isLoadingNextPage: isLoadingNextPage, onLoadNextPage: onLoadNextPage })));
            })),
            items.length === 0 && (React.createElement("div", { className: "gd-invertable-select-no-data" }, renderNoData === null || renderNoData === void 0 ? void 0 : renderNoData({ height }))))),
        React.createElement("div", { className: "gd-invertable-select-status-bar" }, renderStatusBar({ getItemTitle, isInverted, selectedItems, selectedItemsLimit }))));
}
function defaultError(props) {
    const { error } = props;
    return React.createElement(ErrorComponent, { message: error === null || error === void 0 ? void 0 : error.message });
}
function defaultLoading(props) {
    const { height } = props;
    return React.createElement(LoadingMask, { height: height });
}
function defaultSearchBar(props) {
    const { onSearch, searchPlaceholder, searchString } = props;
    return (React.createElement(InvertableSelectSearchBar, { searchPlaceholder: searchPlaceholder, onSearch: onSearch, searchString: searchString }));
}
function defaultNoData() {
    return React.createElement(InvertableSelectNoResultsMatch, null);
}
function defaultItem(props) {
    return React.createElement(InvertableSelectItem, Object.assign({}, props));
}
function defaultStatusBar(props) {
    const { isInverted, selectedItems, getItemTitle, selectedItemsLimit } = props;
    return (React.createElement(InvertableSelectStatusBar, { isInverted: isInverted, selectedItems: selectedItems, getItemTitle: getItemTitle, selectedItemsLimit: selectedItemsLimit }));
}
function defaultActions(props) {
    const { checked, onToggle, onChange, isFiltered, totalItemsCount, isPartialSelection, isVisible } = props;
    return (React.createElement(InvertableSelectAllCheckbox, { isVisible: isVisible, checked: checked, onChange: onChange, onToggle: onToggle, isFiltered: isFiltered, totalItemsCount: totalItemsCount, isPartialSelection: isPartialSelection }));
}
//# sourceMappingURL=InvertableSelect.js.map