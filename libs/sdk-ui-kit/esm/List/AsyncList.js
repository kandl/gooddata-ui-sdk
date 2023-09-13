// (C) 2007-2022 GoodData Corporation
import React, { useCallback } from "react";
import cx from "classnames";
import ReactContentLoader from "react-content-loader";
import { defaultImport } from "default-import";
import { LoadingMask } from "../LoadingMask/index.js";
import { List } from "./List.js";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const ContentLoader = defaultImport(ReactContentLoader);
/**
 * @internal
 */
export function AsyncList(props) {
    const { className, width, height, items, itemHeight, renderItem, isLoading, nextPageItemPlaceholdersCount = 0, isLoadingNextPage, onLoadNextPage, } = props;
    const itemRenderer = useCallback((renderItemProps) => {
        if (renderItemProps.rowIndex + 1 > items.length) {
            return React.createElement(LoadingPlaceholder, null);
        }
        return renderItem(renderItemProps);
    }, [items, renderItem]);
    const handleScrollEnd = useCallback((_, endRowIndex) => {
        if (endRowIndex > items.length && !isLoadingNextPage) {
            onLoadNextPage === null || onLoadNextPage === void 0 ? void 0 : onLoadNextPage();
        }
    }, [items, isLoadingNextPage, onLoadNextPage]);
    return isLoading ? (React.createElement(LoadingMask, { height: props.height })) : (React.createElement(List, { className: cx("gd-async-list", className ? className : ""), width: width, height: height, items: items, itemHeight: itemHeight, itemsCount: items.length + nextPageItemPlaceholdersCount, renderItem: itemRenderer, onScrollEnd: handleScrollEnd }));
}
function LoadingPlaceholder() {
    return (React.createElement("div", { className: "gd-list-item gd-list-item-not-loaded" },
        React.createElement(ContentLoader, { viewBox: "0 0 250 28" },
            React.createElement("rect", { x: "0", y: "7", rx: "3", ry: "3", width: "13", height: "13" }),
            React.createElement("rect", { x: "22", y: "7", rx: "3", ry: "3", width: "250", height: "13" }))));
}
//# sourceMappingURL=AsyncList.js.map