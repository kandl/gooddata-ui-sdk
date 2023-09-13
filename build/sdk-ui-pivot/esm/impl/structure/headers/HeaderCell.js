// (C) 2007-2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { AVAILABLE_TOTALS, HEADER_LABEL_CLASS } from "../../base/constants.js";
import AggregationsMenu from "./AggregationsMenu.js";
export const ALIGN_LEFT = "left";
export const ALIGN_RIGHT = "right";
class HeaderCell extends React.Component {
    constructor() {
        super(...arguments);
        this.resetSortDirection = () => {
            this.setState({
                currentSortDirection: this.props.sortDirection,
            });
        };
        this.state = {
            isMenuOpen: false,
            isMenuButtonVisible: false,
            currentSortDirection: null,
        };
        this.onMouseEnterHeaderCell = () => {
            this.showMenuButton();
        };
        this.onMouseLeaveHeaderCell = () => {
            this.hideMenuButton();
        };
        this.onMouseEnterHeaderCellText = () => {
            if (this.props.enableSorting) {
                const { sortDirection } = this.props;
                if (sortDirection === null) {
                    return this.setState({
                        currentSortDirection: this.props.defaultSortDirection,
                    });
                }
                else if (sortDirection === "asc") {
                    return this.setState({
                        currentSortDirection: "desc",
                    });
                }
                else if (sortDirection === "desc") {
                    return this.setState({
                        currentSortDirection: "asc",
                    });
                }
                else {
                    return this.setState({
                        currentSortDirection: null,
                    });
                }
            }
        };
        this.onMouseLeaveHeaderCellText = () => {
            this.resetSortDirection();
        };
        this.onTextClick = () => {
            const { sortDirection, onSortClick, enableSorting, defaultSortDirection } = this.props;
            if (!enableSorting) {
                return;
            }
            if (sortDirection === null) {
                const nextSortDirection = defaultSortDirection;
                this.setState({
                    currentSortDirection: nextSortDirection,
                });
                onSortClick(nextSortDirection);
                return;
            }
            const nextSort = sortDirection === "asc" ? "desc" : "asc";
            this.setState({
                currentSortDirection: nextSort,
            });
            onSortClick(nextSort);
        };
        this.showMenuButton = () => {
            if (this.state.isMenuOpen) {
                return;
            }
            this.setState({
                isMenuButtonVisible: true,
            });
        };
        this.hideMenuButton = () => {
            if (this.state.isMenuOpen) {
                return;
            }
            this.setState({
                isMenuButtonVisible: false,
            });
        };
        this.hideAndCloseMenu = () => {
            this.setState({
                isMenuButtonVisible: false,
                isMenuOpen: false,
            });
        };
        this.menuItemClick = (menuAggregationClickConfig) => {
            this.hideAndCloseMenu();
            if (this.props.onMenuAggregationClick) {
                this.props.onMenuAggregationClick(menuAggregationClickConfig);
            }
        };
        this.handleMenuOpenedChange = ({ opened, source }) => {
            this.setState({
                isMenuOpen: opened,
            });
            // When source is 'TOGGLER_BUTTON_CLICK' we do not want to hide menu
            // button visibility. Because user is hovering over this button
            // so we do not want to hide it.
            if (source === "OUTSIDE_CLICK" || source === "SCROLL") {
                this.setState({
                    isMenuButtonVisible: false,
                });
            }
        };
    }
    componentDidMount() {
        this.resetSortDirection();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.sortDirection !== this.props.sortDirection) {
            this.setState({
                currentSortDirection: this.props.sortDirection,
            });
        }
    }
    render() {
        const { menuPosition, className } = this.props;
        return (React.createElement("div", { className: cx("gd-pivot-table-header", {
                "gd-pivot-table-header--open": this.state.isMenuButtonVisible,
            }, className), onMouseEnter: this.onMouseEnterHeaderCell, onMouseLeave: this.onMouseLeaveHeaderCell },
            menuPosition === "left" && this.renderMenu(),
            this.renderText(),
            menuPosition === "right" && this.renderMenu()));
    }
    renderMenu() {
        var _a, _b, _c;
        const { intl, colId, menu, getTableDescriptor, getExecutionDefinition, getColumnTotals, getRowTotals, } = this.props;
        const { isMenuOpen, isMenuButtonVisible } = this.state;
        if (!(menu === null || menu === void 0 ? void 0 : menu.aggregations)) {
            return null;
        }
        return (React.createElement(AggregationsMenu, { intl: intl, colId: colId, isMenuOpened: isMenuOpen, isMenuButtonVisible: isMenuButtonVisible, showSubmenu: (_a = menu.aggregations) !== null && _a !== void 0 ? _a : false, showColumnsSubMenu: (_b = menu.aggregationsSubMenuForRows) !== null && _b !== void 0 ? _b : false, availableTotalTypes: (_c = menu.aggregationTypes) !== null && _c !== void 0 ? _c : AVAILABLE_TOTALS, getTableDescriptor: getTableDescriptor, getExecutionDefinition: getExecutionDefinition, getColumnTotals: getColumnTotals, getRowTotals: getRowTotals, onMenuOpenedChange: this.handleMenuOpenedChange, onAggregationSelect: this.menuItemClick }));
    }
    renderText() {
        const { displayText, textAlign, enableSorting } = this.props;
        const classes = cx(HEADER_LABEL_CLASS, "gd-pivot-table-header-label", {
            "gd-pivot-table-header-label--right": textAlign === "right",
            "gd-pivot-table-header-label--center": textAlign === "center",
            "gd-pivot-table-header-label--clickable": enableSorting,
        });
        return (React.createElement("div", { className: classes, onClick: this.onTextClick, onMouseEnter: this.onMouseEnterHeaderCellText, onMouseLeave: this.onMouseLeaveHeaderCellText },
            React.createElement("span", null, displayText ? displayText : ""),
            this.renderSorting()));
    }
    renderSorting() {
        const { enableSorting } = this.props;
        const { currentSortDirection } = this.state;
        const sortClasses = cx("s-sort-direction-arrow", `s-sorted-${currentSortDirection}`, {
            "gd-pivot-table-header-arrow-up": currentSortDirection === "asc",
            "gd-pivot-table-header-arrow-down": currentSortDirection === "desc",
        });
        return (currentSortDirection &&
            enableSorting && (React.createElement("span", { className: "gd-pivot-table-header-next-sort" },
            React.createElement("span", { className: sortClasses }))));
    }
}
HeaderCell.defaultProps = {
    sortDirection: null,
    textAlign: ALIGN_LEFT,
    menuPosition: ALIGN_LEFT,
    defaultSortDirection: "desc",
    menu: null,
    enableSorting: false,
    onMenuAggregationClick: () => null,
    onSortClick: () => null,
};
export default HeaderCell;
//# sourceMappingURL=HeaderCell.js.map