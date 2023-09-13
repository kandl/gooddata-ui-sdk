// (C) 2021 GoodData Corporation
import { FunnelChart } from "@gooddata/sdk-ui-charts";
import { scenariosFor } from "../../../src/index.js";
import { FunnelChartWithMeasureAndViewBy } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("FunnelChart", FunnelChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", FunnelChartWithMeasureAndViewBy)
    .addScenario("font", FunnelChartWithMeasureAndViewBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map