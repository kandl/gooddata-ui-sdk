// (C) 2007-2019 GoodData Corporation
import { scenariosFor } from "../../../src/index.js";
import { Treemap } from "@gooddata/sdk-ui-charts";
import { TreemapWithMeasureViewByAndSegmentBy } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("Treemap", Treemap)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", TreemapWithMeasureViewByAndSegmentBy)
    .addScenario("font", TreemapWithMeasureViewByAndSegmentBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map