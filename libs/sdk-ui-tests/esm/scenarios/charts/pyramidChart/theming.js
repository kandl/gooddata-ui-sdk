// (C) 2021 GoodData Corporation
import { PyramidChart } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { PyramidChartWithMeasureAndViewBy } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("PyramidChart", PyramidChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", PyramidChartWithMeasureAndViewBy)
    .addScenario("font", PyramidChartWithMeasureAndViewBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map