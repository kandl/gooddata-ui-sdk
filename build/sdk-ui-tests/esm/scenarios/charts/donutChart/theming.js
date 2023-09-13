// (C) 2021 GoodData Corporation
import { DonutChart } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { DonutChartWithSingleMeasureAndViewBy } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("DonutChart", DonutChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", DonutChartWithSingleMeasureAndViewBy)
    .addScenario("font", DonutChartWithSingleMeasureAndViewBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map