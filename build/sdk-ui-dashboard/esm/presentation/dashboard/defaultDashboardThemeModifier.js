// (C) 2020-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * Default modifier applied to any theme passed to Dashboard component
 * @param theme - theme to modify
 * @beta
 */
export const defaultDashboardThemeModifier = (theme) => {
    var _a, _b, _c, _d, _e;
    const modifiedTheme = cloneDeep(theme);
    if ((_c = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.dashboards) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.kpiWidget) === null || _c === void 0 ? void 0 : _c.kpi) {
        // duplicate dashboard specific kpi customization to the generic kpi key
        modifiedTheme.kpi = Object.assign({}, theme.dashboards.content.kpiWidget.kpi);
    }
    const additionalCssProperties = [];
    /**
     * The second copy of --gd-chart/table-backgroundColor is necessary for rewriting in
     * the local scope. Works in pair with 'dash-item-content' class from dashboard.scss.
     */
    if ((_d = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _d === void 0 ? void 0 : _d.backgroundColor) {
        additionalCssProperties.push(`--gd-dashboards-content-widget-chart-backgroundColor: ${theme.chart.backgroundColor};`);
    }
    if ((_e = theme === null || theme === void 0 ? void 0 : theme.table) === null || _e === void 0 ? void 0 : _e.backgroundColor) {
        additionalCssProperties.push(`--gd-dashboards-content-widget-table-backgroundColor: ${theme.table.backgroundColor};`);
    }
    if (!isEmpty(additionalCssProperties)) {
        const styleTag = document.createElement("style");
        styleTag.appendChild(document.createTextNode(`:root{${additionalCssProperties.join("")}}`));
        document.head.appendChild(styleTag);
    }
    return modifiedTheme;
};
//# sourceMappingURL=defaultDashboardThemeModifier.js.map