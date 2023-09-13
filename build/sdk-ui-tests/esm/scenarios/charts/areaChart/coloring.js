// (C) 2007-2019 GoodData Corporation
import { scenariosFor } from "../../../src/index.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
import { AreaChartWithTwoMeasuresAndViewBy } from "./base.js";
import { coloringCustomizer } from "../_infra/coloringVariants.js";
import { AreaChart } from "@gooddata/sdk-ui-charts";
export default scenariosFor("AreaChart", AreaChart)
    .withGroupNames(...ScenarioGroupNames.Coloring)
    .withVisualTestConfig({ groupUnder: "coloring" })
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .addScenarios("coloring", AreaChartWithTwoMeasuresAndViewBy, coloringCustomizer);
//# sourceMappingURL=coloring.js.map