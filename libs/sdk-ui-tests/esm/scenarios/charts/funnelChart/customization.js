// (C) 2007-2019 GoodData Corporation
import { FunnelChart } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { legendCustomizer } from "../_infra/legendVariants.js";
import { ConfigVariants } from "../_infra/dataLabelVariants.js";
import { FunnelChartWithMeasureAndViewBy, FunnelChartWithTwoMeasures } from "./base.js";
import { chartAlignmentVariants } from "../_infra/chartAlignmentVariants.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
import { responsiveScenarios } from "../_infra/responsiveScenarios.js";
import { legendResponsiveVariants, legendResponsiveSizeVariants, } from "../_infra/legendResponsiveVariants.js";
const legendScenarios = scenariosFor("FunnelChart", FunnelChart)
    .withGroupNames(ScenarioGroupNames.ConfigurationCustomization)
    .withVisualTestConfig({ groupUnder: "legend position" })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("legend position - two measures", FunnelChartWithTwoMeasures, legendCustomizer)
    .addScenarios("legend position - single measure and viewBy", FunnelChartWithMeasureAndViewBy, legendCustomizer);
const labelsConfigVariants = [
    ...ConfigVariants,
    ["forced visible with shown percentages", { dataLabels: { visible: true, percentsVisible: true } }],
    ["forced visible with hidden percentages", { dataLabels: { visible: true, percentsVisible: false } }],
    [
        "forced hidden, percentages visible has no effect",
        { dataLabels: { visible: false, percentsVisible: true } },
    ],
];
function funnelChartDataLabelCustomizer(baseName, baseProps) {
    return labelsConfigVariants.map(([variantName, dataLabelOverlay]) => {
        return [
            `${baseName} - ${variantName}`,
            { ...baseProps, config: { ...baseProps.config, ...dataLabelOverlay } },
        ];
    });
}
const dataLabelScenarios = scenariosFor("FunnelChart", FunnelChart)
    .withGroupNames(ScenarioGroupNames.ConfigurationCustomization)
    .withVisualTestConfig({ groupUnder: "data labels" })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("data labels", FunnelChartWithMeasureAndViewBy, funnelChartDataLabelCustomizer);
const chartAlignmentScenarios = scenariosFor("FunnelChart", FunnelChart)
    .withGroupNames(ScenarioGroupNames.ConfigurationCustomization)
    .withVisualTestConfig({ groupUnder: "alignment", screenshotSize: { width: 400, height: 600 } })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("vertical alignment", FunnelChartWithMeasureAndViewBy, chartAlignmentVariants);
const legendResponziveScenarios = responsiveScenarios("FunnelChart", ScenarioGroupNames.LegendResponsive, FunnelChart, FunnelChartWithMeasureAndViewBy, legendResponsiveSizeVariants, false, legendResponsiveVariants);
export default [legendScenarios, dataLabelScenarios, chartAlignmentScenarios, ...legendResponziveScenarios];
//# sourceMappingURL=customization.js.map