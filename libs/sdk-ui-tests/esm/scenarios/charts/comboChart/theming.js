// (C) 2021 GoodData Corporation
import { scenariosFor } from "../../../src/index.js";
import { ComboChart } from "@gooddata/sdk-ui-charts";
import { ComboChartWithArithmeticMeasuresAndViewBy } from "./base.js";
import { ScenarioGroupNames } from "../_infra/groupNames.js";
export default scenariosFor("ComboChart", ComboChart)
    .withGroupNames(...ScenarioGroupNames.Theming)
    .withDefaultTestTypes("visual")
    .withDefaultTags("themed")
    .addScenario("themed", ComboChartWithArithmeticMeasuresAndViewBy)
    .addScenario("font", ComboChartWithArithmeticMeasuresAndViewBy, (m) => m.withTags("themed", "font"));
//# sourceMappingURL=theming.js.map