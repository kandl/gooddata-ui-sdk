// (C) 2021 GoodData Corporation
import { scenariosFor } from "../../../src/index.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
import { AreaChartWithTwoMeasuresAndViewBy } from "./base.js";
import { AreaChart } from "@gooddata/sdk-ui-charts";
export default scenariosFor("AreaChart", AreaChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", AreaChartWithTwoMeasuresAndViewBy)
    .addScenario("font", AreaChartWithTwoMeasuresAndViewBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map