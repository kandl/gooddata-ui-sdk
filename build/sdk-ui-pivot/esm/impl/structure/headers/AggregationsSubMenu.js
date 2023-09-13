// (C) 2007-2023 GoodData Corporation
import { ItemsWrapper, SubMenu } from "@gooddata/sdk-ui-kit";
import cx from "classnames";
import React from "react";
import { tableHasColumnAttributes, tableHasRowAttributes } from "../../utils.js";
import { AggregationsSubMenuItems } from "./AggregationsSubMenuItems.js";
import { RowsHeaderIcon } from "./subMenuIcons/RowsIcon.js";
import { ColumnsHeaderIcon } from "./subMenuIcons/ColumnsIcon.js";
const MENU_HEADER_OFFSET = -36;
class AggregationsSubMenu extends React.Component {
    render() {
        const { toggler, isMenuOpened, rowAttributeDescriptors, columnAttributeDescriptors, intl, measureLocalIdentifiers, totalType, columnTotals, rowTotals, showColumnsSubMenu, onAggregationSelect, } = this.props;
        const menuOpenedProp = isMenuOpened ? { opened: true } : {};
        const shouldRenderSeparator = tableHasRowAttributes(rowAttributeDescriptors) &&
            tableHasColumnAttributes(columnAttributeDescriptors) &&
            showColumnsSubMenu;
        return (React.createElement(SubMenu, Object.assign({ toggler: toggler, offset: MENU_HEADER_OFFSET }, menuOpenedProp),
            React.createElement(ItemsWrapper, null,
                React.createElement("div", { className: "gd-aggregation-submenu s-table-header-submenu-content" },
                    tableHasRowAttributes(rowAttributeDescriptors) ? (React.createElement(AggregationsSubMenuItems, { intl: intl, attributeDescriptors: rowAttributeDescriptors, measureLocalIdentifiers: measureLocalIdentifiers, totalType: totalType, totals: columnTotals, isColumn: true, icon: React.createElement(RowsHeaderIcon, null), headerText: intl.formatMessage({
                            id: "visualizations.menu.aggregations.rows",
                        }), onAggregationSelect: onAggregationSelect })) : null,
                    React.createElement("div", { className: cx("s-table-header-submenu-rows-separator", {
                            "gd-aggregation-submenu-rows-separator": shouldRenderSeparator,
                        }) }),
                    tableHasColumnAttributes(columnAttributeDescriptors) && showColumnsSubMenu ? (React.createElement(AggregationsSubMenuItems, { intl: intl, attributeDescriptors: columnAttributeDescriptors, measureLocalIdentifiers: measureLocalIdentifiers, totalType: totalType, totals: rowTotals, isColumn: false, icon: React.createElement(ColumnsHeaderIcon, null), headerText: intl.formatMessage({
                            id: "visualizations.menu.aggregations.columns",
                        }), onAggregationSelect: onAggregationSelect })) : null))));
    }
}
AggregationsSubMenu.defaultProps = {
    isMenuOpened: false,
};
export default AggregationsSubMenu;
//# sourceMappingURL=AggregationsSubMenu.js.map