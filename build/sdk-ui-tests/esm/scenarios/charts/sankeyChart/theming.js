// (C) 2023 GoodData Corporation
import { SankeyChart } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
import { SankeyChartWithMeasureAttributeFromAndTo } from "./base.js";
export default scenariosFor("SankeyChart", SankeyChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", SankeyChartWithMeasureAttributeFromAndTo)
    .addScenario("font", SankeyChartWithMeasureAttributeFromAndTo, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map