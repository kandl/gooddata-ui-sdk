// (C) 2007-2022 GoodData Corporation
/**
 * @internal
 */
export function updateConfigWithSettings(config, settings) {
    let updatedConfig = config;
    if (settings) {
        if (settings["disableKpiDashboardHeadlineUnderline"] === true) {
            updatedConfig = Object.assign(Object.assign({}, updatedConfig), { disableDrillUnderline: true });
        }
        if (settings["enableKDWidgetCustomHeight"] === true) {
            updatedConfig = Object.assign(Object.assign({}, updatedConfig), { enableCompactSize: true });
        }
        if (updatedConfig === undefined || updatedConfig.enableJoinedAttributeAxisName === undefined) {
            updatedConfig = Object.assign(Object.assign({}, updatedConfig), { enableJoinedAttributeAxisName: settings["enableAxisNameViewByTwoAttributes"] });
        }
        if (settings.enableChartsSorting) {
            updatedConfig = Object.assign(Object.assign({}, updatedConfig), { enableChartSorting: true });
        }
        if (settings.enableReversedStacking) {
            updatedConfig = Object.assign(Object.assign({}, updatedConfig), { enableReversedStacking: true });
        }
        if (settings.enableSeparateTotalLabels) {
            updatedConfig = Object.assign(Object.assign({}, updatedConfig), { enableSeparateTotalLabels: true });
        }
    }
    return updatedConfig;
}
//# sourceMappingURL=chartOptionsForSettings.js.map