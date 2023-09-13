// (C) 2021 GoodData Corporation
import { Heatmap } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { HeatmapWithMeasureRowsAndColumns, HeatmapWithNullDataPoints } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("Heatmap", Heatmap)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", HeatmapWithMeasureRowsAndColumns)
    .addScenario("themed with null values", HeatmapWithNullDataPoints)
    .addScenario("font", HeatmapWithMeasureRowsAndColumns, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map