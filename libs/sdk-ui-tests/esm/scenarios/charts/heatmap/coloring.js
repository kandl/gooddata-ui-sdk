// (C) 2007-2019 GoodData Corporation
import { Heatmap } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { BlackColor, CustomColorPalette } from "../../_infra/colors.js";
import { AmountMeasurePredicate } from "../../_infra/predicates.js";
import { coloringCustomizer } from "../_infra/coloringVariants.js";
import { HeatmapWithMeasureRowsAndColumns } from "./base.js";
import { replaceMappingPredicates } from "../_infra/insightConverters.js";
import { ReferenceMd } from "@gooddata/reference-workspace";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
const colorsAndPalette = scenariosFor("Heatmap", Heatmap)
    .withGroupNames(...ScenarioGroupNames.Coloring)
    .withVisualTestConfig({ groupUnder: "coloring" })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("coloring", HeatmapWithMeasureRowsAndColumns, coloringCustomizer);
const colorAssignment = scenariosFor("Heatmap", Heatmap)
    .withGroupNames(...ScenarioGroupNames.Coloring)
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenario("assign color to measures", {
    ...HeatmapWithMeasureRowsAndColumns,
    config: {
        colorPalette: CustomColorPalette,
        colorMapping: [
            {
                predicate: AmountMeasurePredicate,
                color: BlackColor,
            },
        ],
    },
}, (m) => m.withInsightConverter(replaceMappingPredicates(ReferenceMd.Amount)));
export default [colorsAndPalette, colorAssignment];
//# sourceMappingURL=coloring.js.map