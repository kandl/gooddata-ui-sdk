// (C) 2007-2019 GoodData Corporation
import { scenariosFor } from "../../src/index.js";
import { GeoPushpinChart } from "@gooddata/sdk-ui-geo";
import { LocationSegmentSizeAndColorWithTooltip } from "./base.js";
import { ScenarioGroupNames } from "../charts/_infra/groupNames.js";
function mergeConfig(props, extraConfig) {
    const defaultConfig = props.config;
    return {
        ...props,
        config: {
            ...defaultConfig,
            ...extraConfig,
        },
    };
}
export default scenariosFor("GeoPushpinChart", GeoPushpinChart)
    .withGroupNames(ScenarioGroupNames.ConfigurationCustomization)
    .withDefaultWorkspaceType("live-examples-workspace")
    .withDefaultTags("vis-config-only", "mock-no-scenario-meta")
    .withDefaultTestTypes("api")
    .addScenario("legend on the left", mergeConfig(LocationSegmentSizeAndColorWithTooltip, {
    legend: {
        enabled: false,
        position: "left",
    },
}))
    .addScenario("legend on the right", mergeConfig(LocationSegmentSizeAndColorWithTooltip, {
    legend: {
        enabled: true,
        position: "right",
    },
}));
//# sourceMappingURL=customization.js.map