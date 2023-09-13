// (C) 2021 GoodData Corporation
import { scenariosFor } from "../../../src/index.js";
import { BulletChart } from "@gooddata/sdk-ui-charts";
import { BulletChartWithAllMeasuresAndViewBy } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("BulletChart", BulletChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", BulletChartWithAllMeasuresAndViewBy)
    .addScenario("font", BulletChartWithAllMeasuresAndViewBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map