// (C) 2007-2023 GoodData Corporation
import identity from "lodash/identity.js";
import isEmpty from "lodash/isEmpty.js";
import SparkMD5 from "spark-md5";
import { provideCreateRoot } from "@gooddata/sdk-ui-ext";
import { createRoot } from "react-dom/client";
// provide React18 root API for visualization rendering
provideCreateRoot(createRoot);
export class ScenarioBuilder {
    vis;
    component;
    name;
    props;
    groupName;
    tags = [];
    tests = ["api", "visual"];
    insightConverter = identity;
    workspaceType = "reference-workspace";
    customDataCapture = {};
    backendSettings = {};
    constructor(vis, component, name, props, groupName) {
        this.vis = vis;
        this.component = component;
        this.name = name;
        this.props = props;
        this.groupName = groupName;
    }
    /**
     * Sets tags for this scenario. This will override any tags that may be specified on the scenario group
     * to which this scenario belongs. Passing no flags means the scenario will have none.
     *
     * @param tags - tags to assign, may be undefined or empty if no flags desired
     */
    withTags(...tags) {
        this.tags = !isEmpty(tags) ? tags : [];
        return this;
    }
    withTests(...tests) {
        this.tests = !isEmpty(tests) ? tests : [];
        return this;
    }
    withInsightConverter(converter) {
        this.insightConverter = converter;
        return this;
    }
    withBackendSettings(settings) {
        this.backendSettings = settings;
        return this;
    }
    /**
     * Customize workspace against which this scenario can run.
     *
     * @remarks
     * See {@link WorkspaceType}.
     *
     * If not specified, defaults to reference-workspace.
     *
     * @param type - one of supported workspace types
     */
    withWorkspaceType(type) {
        this.workspaceType = type;
        return this;
    }
    /**
     * Customize data capture parameters for this scenario.
     *
     * @remarks
     * Note that the essential data capture parameters
     * are automatically sniffed by the infrastructure. This customization can be used _on top_ of the captures
     * identified automatically.
     *
     * @param config - configuration, as understood by mock-handling
     */
    withCustomDataCapture(config) {
        this.customDataCapture = config;
        return this;
    }
    build = () => {
        const props = this.props;
        const { vis, name, component, tags, tests, insightConverter, workspaceType, customDataCapture, groupName, backendSettings, } = this;
        const hasher = new SparkMD5();
        const fullyQualifiedName = `${vis} - ${groupName.join("/")} - ${name}`;
        const insightId = `${this.vis}.${hasher.append(fullyQualifiedName).end()}`;
        const propsFactory = (backend, workspace) => {
            // typescript won't let this fly without explicit casts; it is safe in this circumstance. see
            // UnboundChartProps.. whatever subtype, we always omit just backend and workspace that are
            // filled in during this factory call
            return {
                ...props,
                backend,
                workspace,
            };
        };
        return {
            vis,
            name,
            props,
            tags,
            tests,
            component,
            workspaceType,
            propsFactory,
            insightId,
            insightConverter,
            customDataCapture,
            groupName,
            fullyQualifiedName,
            backendSettings,
            asTestInput: () => {
                return [name, component, propsFactory, tags, insightId];
            },
        };
    };
}
/**
 * Enum with indexes into scenario test input array.
 */
export var ScenarioTestMembers;
(function (ScenarioTestMembers) {
    ScenarioTestMembers[ScenarioTestMembers["ScenarioName"] = 0] = "ScenarioName";
    ScenarioTestMembers[ScenarioTestMembers["Component"] = 1] = "Component";
    ScenarioTestMembers[ScenarioTestMembers["PropsFactory"] = 2] = "PropsFactory";
    ScenarioTestMembers[ScenarioTestMembers["Tags"] = 3] = "Tags";
    ScenarioTestMembers[ScenarioTestMembers["InsightId"] = 4] = "InsightId";
})(ScenarioTestMembers = ScenarioTestMembers || (ScenarioTestMembers = {}));
//# sourceMappingURL=scenario.js.map