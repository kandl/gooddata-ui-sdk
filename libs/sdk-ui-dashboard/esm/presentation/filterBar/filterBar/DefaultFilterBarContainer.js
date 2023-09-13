// (C) 2021-2022 GoodData Corporation
import React, { useRef } from "react";
import DefaultMeasure from "react-measure";
import cx from "classnames";
import { IntlWrapper } from "../../localization/index.js";
import { selectLocale, useDashboardSelector } from "../../../model/index.js";
import { BulletsBar } from "../../dragAndDrop/index.js";
import { ShowAllFiltersButton } from "./ShowAllFiltersButton.js";
import { useRowsCalculator } from "./hooks/useRowsCalculator.js";
import { useFilterBarState } from "./hooks/useFilterBarState.js";
import { useFilterExpansionByDragAndDrop } from "./hooks/useFilterExpansionByDragAndDrop.js";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(DefaultMeasure);
const DefaultFilterBarContainerCore = ({ children }) => {
    const { rows, height, isFilterBarExpanded, scrollable, setFilterBarExpanded, setCalculatedRows } = useFilterBarState();
    const dropRef = useFilterExpansionByDragAndDrop(rows.length > 1, isFilterBarExpanded, setFilterBarExpanded);
    return (React.createElement("div", { className: "dash-filters-wrapper s-gd-dashboard-filter-bar", ref: dropRef },
        React.createElement("div", { style: { height }, className: cx("dash-filters-visible", {
                scrollable: scrollable,
                "s-dash-filters-visible-all": isFilterBarExpanded,
            }) },
            React.createElement(AllFiltersContainer, { setCalculatedRows: setCalculatedRows }, children),
            React.createElement(FiltersRows, { rows: rows })),
        React.createElement(ShowAllFiltersButton, { isFilterBarExpanded: isFilterBarExpanded, isVisible: rows.length > 1, onToggle: (isExpanded) => setFilterBarExpanded(isExpanded) }),
        React.createElement(BulletsBar, null)));
};
const AllFiltersContainer = ({ setCalculatedRows, children }) => {
    const ref = useRef(null);
    const rowCalculator = useRowsCalculator(ref);
    return (React.createElement(Measure, { bounds: true, innerRef: (rf) => (ref.current = rf), onResize: (dimensions) => setCalculatedRows(rowCalculator(dimensions)) }, ({ measureRef }) => (React.createElement("div", { className: "dash-filters-all", ref: measureRef }, children))));
};
const FiltersRows = ({ rows }) => {
    return (React.createElement(React.Fragment, null, rows.length > 1 && (React.createElement("div", { className: "dash-filters-rows" }, rows.map((height, index) => (React.createElement("div", { className: "dash-filters-row", style: { height }, key: index })))))));
};
/**
 * @internal
 */
export const DefaultFilterBarContainer = ({ children }) => {
    const locale = useDashboardSelector(selectLocale);
    return (React.createElement(IntlWrapper, { locale: locale },
        React.createElement(DefaultFilterBarContainerCore, null, children)));
};
//# sourceMappingURL=DefaultFilterBarContainer.js.map