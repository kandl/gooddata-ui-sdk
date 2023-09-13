// (C) 2007-2019 GoodData Corporation
import { PieChart } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { BlackColor, CustomColorPalette, CustomPaletteColor, RedColor } from "../../_infra/colors.js";
import { AmountMeasurePredicate, AttributeElements, WonMeasurePredicate } from "../../_infra/predicates.js";
import { coloringCustomizer } from "../_infra/coloringVariants.js";
import { PieChartWithSingleMeasureAndViewBy, PieChartWithTwoMeasures } from "./base.js";
import { replaceMappingPredicates } from "../_infra/insightConverters.js";
import { ReferenceData, ReferenceMd } from "@gooddata/reference-workspace";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
const colorsAndPalette = scenariosFor("PieChart", PieChart)
    .withGroupNames(...ScenarioGroupNames.Coloring)
    .withVisualTestConfig({ groupUnder: "coloring" })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("coloring", PieChartWithSingleMeasureAndViewBy, coloringCustomizer);
const colorAssignment = scenariosFor("PieChart", PieChart)
    .withGroupNames(...ScenarioGroupNames.Coloring)
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenario("assign color to measures", {
    ...PieChartWithTwoMeasures,
    config: {
        colorPalette: CustomColorPalette,
        colorMapping: [
            {
                predicate: AmountMeasurePredicate,
                color: BlackColor,
            },
            {
                predicate: WonMeasurePredicate,
                color: CustomPaletteColor,
            },
        ],
    },
}, (m) => m.withInsightConverter(replaceMappingPredicates(ReferenceMd.Amount, ReferenceMd.Won)))
    .addScenario("assign color to attributes", {
    ...PieChartWithSingleMeasureAndViewBy,
    config: {
        colorPalette: CustomColorPalette,
        colorMapping: [
            {
                predicate: AttributeElements.Product.WonderKid,
                color: BlackColor,
            },
            {
                predicate: AttributeElements.Product.Explorer,
                color: RedColor,
            },
        ],
    },
}, (m) => m.withInsightConverter(replaceMappingPredicates(ReferenceData.ProductName.WonderKid.uri, ReferenceData.ProductName.Explorer.uri)));
export default [colorsAndPalette, colorAssignment];
//# sourceMappingURL=coloring.js.map