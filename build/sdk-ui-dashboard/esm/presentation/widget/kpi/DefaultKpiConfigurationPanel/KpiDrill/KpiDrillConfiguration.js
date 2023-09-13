// (C) 2022 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import flatMap from "lodash/flatMap.js";
import sortBy from "lodash/sortBy.js";
import { Button, Dropdown, DropdownButton, DropdownList, NoData, SingleSelectListItem, } from "@gooddata/sdk-ui-kit";
import { widgetRef } from "@gooddata/sdk-model";
import { removeDrillForKpiWidget, selectLegacyDashboards, selectShouldHidePixelPerfectExperience, setDrillForKpiWidget, useDashboardDispatch, useDashboardSelector, } from "../../../../../model/index.js";
import { CONFIG_PANEL_INNER_WIDTH } from "../constants.js";
const alignPoints = [{ align: "bl tl" }, { align: "tl bl" }];
const CONFIG_PANEL_DRILL_WIDTH = CONFIG_PANEL_INNER_WIDTH - 23;
const DrillToDropdownButton = (props) => {
    const { isDisabled = false, isOpen = false, value = "", selection, title = "", onClick } = props;
    let button;
    if (selection) {
        button = React.createElement(DropdownButton, { title: title, value: value, onClick: onClick, isOpen: isOpen });
    }
    else {
        const buttonClasses = cx("gd-button-secondary", "gd-button-small", "gd-icon-add", {
            "is-focus": isOpen,
        });
        button = (React.createElement(Button, { onClick: onClick, title: title, className: buttonClasses, value: value, disabled: isDisabled }));
    }
    return React.createElement("div", { className: "s-drill_to_select" }, button);
};
const KpiDrillConfigurationCore = (props) => {
    var _a, _b;
    const { widget } = props;
    const intl = useIntl();
    const dispatch = useDashboardDispatch();
    const onDrillToSelect = useCallback((item) => {
        dispatch(setDrillForKpiWidget(widgetRef(widget), item.dashboardRef, item.identifier));
    }, [dispatch, widget]);
    const onDrillToRemove = useCallback(() => {
        dispatch(removeDrillForKpiWidget(widgetRef(widget)));
    }, [dispatch, widget]);
    const dashboards = useDashboardSelector(selectLegacyDashboards);
    const drillToItem = (_b = (_a = widget.drills) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.tab;
    const UNLISTED_DASHBOARD_TAB = {
        title: intl.formatMessage({ id: "configurationPanel.unlistedDashboardTab" }),
    };
    const drillToItems = useMemo(() => {
        if (!dashboards) {
            return [];
        }
        const sortedDashboards = sortBy(dashboards, (dashboard) => dashboard.title);
        return flatMap(sortedDashboards, (dash) => {
            return [
                {
                    title: dash.title,
                    identifier: dash.identifier,
                    dashboardRef: dash.ref,
                    type: "header",
                },
                ...dash.tabs.map((tab) => {
                    return {
                        title: tab.title,
                        identifier: tab.identifier,
                        dashboardRef: dash.ref,
                        type: undefined,
                    };
                }),
            ];
        });
    }, [dashboards]);
    const foundDrillToItem = drillToItems === null || drillToItems === void 0 ? void 0 : drillToItems.find((item) => item.identifier === drillToItem);
    const selectedDrillToItem = drillToItem ? foundDrillToItem || UNLISTED_DASHBOARD_TAB : null;
    const buttonValue = selectedDrillToItem
        ? selectedDrillToItem.title
        : intl.formatMessage({ id: "configurationPanel.selectDashboard" });
    return (React.createElement("div", { className: "drill-to-dropdown-container" },
        React.createElement(Dropdown, { className: "drill-to-dropdown s-drill-to-dropdown", closeOnParentScroll: true, closeOnMouseDrag: true, alignPoints: alignPoints, renderButton: ({ isOpen, toggleDropdown }) => (React.createElement(DrillToDropdownButton, { title: buttonValue, value: buttonValue, selection: selectedDrillToItem, isOpen: isOpen, onClick: toggleDropdown })), renderBody: ({ closeDropdown }) => (React.createElement(DropdownList, { isLoading: !dashboards, renderNoData: ({ hasNoMatchingData }) => (React.createElement(NoData, { hasNoMatchingData: hasNoMatchingData, noDataLabel: intl.formatMessage({
                        id: "configurationPanel.noLinkableDashboards",
                    }) })), className: "configuration-dropdown s-drill-to-list", width: CONFIG_PANEL_DRILL_WIDTH, items: drillToItems, renderItem: ({ item }) => {
                    const selected = selectedDrillToItem && selectedDrillToItem.title === item.title;
                    return (React.createElement(SingleSelectListItem, { title: item.title, isSelected: !!selected, type: item.type, onClick: () => {
                            onDrillToSelect(item);
                            closeDropdown();
                        } }));
                } })) }),
        drillToItem ? (React.createElement(Button, { className: "gd-button-link-dimmed gd-button-icon-only gd-icon-cross button-remove-drill-to s-button-remove-drill-to", onClick: onDrillToRemove })) : null));
};
export const KpiDrillConfiguration = (props) => {
    const isHidden = useDashboardSelector(selectShouldHidePixelPerfectExperience);
    if (isHidden) {
        return null;
    }
    return React.createElement(KpiDrillConfigurationCore, Object.assign({}, props));
};
//# sourceMappingURL=KpiDrillConfiguration.js.map