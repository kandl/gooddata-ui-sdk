// (C) 2019-2022 GoodData Corporation
import cx from "classnames";
import React from "react";
import { isMeasureValueFilter, measureValueFilterCondition, isRankingFilter, } from "@gooddata/sdk-model";
import { Bubble, BubbleHoverTrigger, Header, Icon, Item, ItemsWrapper, Menu, } from "@gooddata/sdk-ui-kit";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import menuHelper, { getAttributeDescriptorsLocalId } from "./aggregationsMenuHelper.js";
import AggregationsSubMenu from "./AggregationsSubMenu.js";
import { isSliceMeasureCol, isScopeCol, isSeriesCol, isRootCol, isSliceCol, } from "../tableDescriptorTypes.js";
import { messages } from "../../../locales.js";
/*
 * TODO: same thing is in sdk-ui-ext .. but pivot must not depend on it. we may be in need of some lower-level
 *  project on which both of filters and ext can depend. perhaps the purpose of the new project would be to provide
 *  thin layer on top of goodstrap (?)
 */
const SHOW_DELAY_DEFAULT = 200;
const HIDE_DELAY_DEFAULT = 0;
const MenuToggler = () => {
    var _a, _b;
    const theme = useTheme();
    return (React.createElement("div", { className: "menu-icon" },
        React.createElement(Icon.BurgerMenu, { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c8 })));
};
export default class AggregationsMenu extends React.Component {
    render() {
        const { intl, colId, getTableDescriptor, isMenuOpened, onMenuOpenedChange, showColumnsSubMenu } = this.props;
        if (!colId) {
            return null;
        }
        // Because of Ag-grid react wrapper does not rerender the component when we pass
        // new gridOptions we need to pull the data manually on each render
        const tableDescriptor = getTableDescriptor();
        const canShowMenu = tableDescriptor.canTableHaveColumnTotals() && showColumnsSubMenu;
        if (!tableDescriptor.canTableHaveRowTotals() && !canShowMenu) {
            return null;
        }
        const col = tableDescriptor.getCol(colId);
        if (isSliceCol(col) || isRootCol(col)) {
            // aggregation menu should not appear on headers of the slicing columns or on the
            // very to header which describes table grouping
            return null;
        }
        // Note: for measures in rows, where the column is of type isSliceMeasureCol()
        // we have all measures associated with the menu. This is overriden in the individual
        // cell renderers for particular measure with specific onMenuAggregationClick fn.
        const measures = isSeriesCol(col)
            ? [col.seriesDescriptor.measureDescriptor]
            : tableDescriptor.getMeasures();
        const measureLocalIdentifiers = measures.map((m) => m.measureHeaderItem.localIdentifier);
        const useGrouped = isScopeCol(col) || isSliceMeasureCol(col);
        const columnTotals = this.getColumnTotals(measureLocalIdentifiers, useGrouped, isSliceMeasureCol(col));
        const rowTotals = this.getRowTotals(measureLocalIdentifiers, useGrouped, isSliceMeasureCol(col));
        const rowAttributeDescriptors = tableDescriptor.getSlicingAttributes();
        const columnAttributeDescriptors = tableDescriptor.getScopingAttributes();
        return (React.createElement(Menu, { toggler: React.createElement(MenuToggler, null), togglerWrapperClassName: this.getTogglerClassNames(), opened: isMenuOpened, onOpenedChange: onMenuOpenedChange, openAction: "click", closeOnScroll: true },
            React.createElement(ItemsWrapper, null,
                React.createElement("div", { className: "s-table-header-menu-content" },
                    React.createElement(Header, null, intl.formatMessage({ id: "visualizations.menu.aggregations" })),
                    this.renderMainMenuItems(columnTotals, rowTotals, measureLocalIdentifiers, rowAttributeDescriptors, columnAttributeDescriptors, showColumnsSubMenu)))));
    }
    getColumnTotals(measureLocalIdentifiers, isGroupedHeader, ignoreMeasures) {
        var _a, _b, _c;
        const columnTotals = (_c = (_b = (_a = this.props).getColumnTotals) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : [];
        if (isGroupedHeader) {
            return menuHelper.getTotalsForAttributeHeader(columnTotals, measureLocalIdentifiers, ignoreMeasures);
        }
        return menuHelper.getTotalsForMeasureHeader(columnTotals, measureLocalIdentifiers[0]);
    }
    getRowTotals(measureLocalIdentifiers, isGroupedHeader, ignoreMeasures) {
        var _a, _b, _c;
        const rowTotals = (_c = (_b = (_a = this.props).getRowTotals) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : [];
        if (isGroupedHeader) {
            return menuHelper.getTotalsForAttributeHeader(rowTotals, measureLocalIdentifiers, ignoreMeasures);
        }
        return menuHelper.getTotalsForMeasureHeader(rowTotals, measureLocalIdentifiers[0]);
    }
    getTogglerClassNames() {
        const { isMenuButtonVisible, isMenuOpened } = this.props;
        return cx("s-table-header-menu", "gd-pivot-table-header-menu", {
            "gd-pivot-table-header-menu--show": isMenuButtonVisible,
            "gd-pivot-table-header-menu--hide": !isMenuButtonVisible,
            "gd-pivot-table-header-menu--open": isMenuOpened,
        });
    }
    renderMenuItemContent(totalType, isSelected, hasSubMenu = false, disabled, tooltipMessage) {
        const { intl } = this.props;
        const itemElement = (React.createElement(Item, { checked: isSelected, subMenu: hasSubMenu, disabled: disabled },
            React.createElement("div", { className: "gd-aggregation-menu-item-inner s-menu-aggregation-inner" }, intl.formatMessage(messages[totalType]))));
        return disabled ? (React.createElement(BubbleHoverTrigger, { showDelay: SHOW_DELAY_DEFAULT, hideDelay: HIDE_DELAY_DEFAULT },
            itemElement,
            React.createElement(Bubble, { className: "bubble-primary", alignPoints: [{ align: "bc tc" }] }, tooltipMessage))) : (itemElement);
    }
    getItemClassNames(totalType) {
        return cx("gd-aggregation-menu-item", "s-menu-aggregation", `s-menu-aggregation-${totalType}`);
    }
    isTableFilteredByMeasureValue() {
        const definition = this.props.getExecutionDefinition();
        // ignore measure value filters without condition, these are not yet specified by the user and are not sent as part of the execution
        return definition.filters.some((filter) => isMeasureValueFilter(filter) && !!measureValueFilterCondition(filter));
    }
    isTableFilteredByRankingFilter() {
        const definition = this.props.getExecutionDefinition();
        return definition.filters.some(isRankingFilter);
    }
    renderMainMenuItems(columnTotals, rowTotals, measureLocalIdentifiers, rowAttributeDescriptors, columnAttributeDescriptors, showColumnsSubMenu) {
        const { intl, onAggregationSelect, showSubmenu, availableTotalTypes } = this.props;
        const isFilteredByMeasureValue = this.isTableFilteredByMeasureValue();
        const isFilteredByRankingFilter = this.isTableFilteredByRankingFilter();
        const rowAttributeIdentifiers = getAttributeDescriptorsLocalId(rowAttributeDescriptors);
        const columnAttributeIdentifiers = getAttributeDescriptorsLocalId(columnAttributeDescriptors);
        return availableTotalTypes.map((totalType) => {
            const isSelected = menuHelper.isTotalEnabledForAttribute(rowAttributeIdentifiers, columnAttributeIdentifiers, totalType, columnTotals, rowTotals);
            const itemClassNames = this.getItemClassNames(totalType);
            const disabled = totalType === "nat" && (isFilteredByMeasureValue || isFilteredByRankingFilter);
            const cause = isFilteredByMeasureValue ? messages[`disabled.mvf`] : messages[`disabled.ranking`];
            const tooltipMessage = disabled ? intl.formatMessage(cause) : undefined;
            const renderSubmenu = !disabled && showSubmenu;
            const toggler = this.renderMenuItemContent(totalType, isSelected, renderSubmenu, disabled, tooltipMessage);
            return (React.createElement("div", { className: itemClassNames, key: totalType }, renderSubmenu ? (React.createElement(AggregationsSubMenu, { intl: intl, totalType: totalType, rowAttributeDescriptors: rowAttributeDescriptors, columnAttributeDescriptors: columnAttributeDescriptors, columnTotals: columnTotals, rowTotals: rowTotals, measureLocalIdentifiers: measureLocalIdentifiers, onAggregationSelect: onAggregationSelect, toggler: toggler, showColumnsSubMenu: showColumnsSubMenu })) : (toggler)));
        });
    }
}
//# sourceMappingURL=AggregationsMenu.js.map