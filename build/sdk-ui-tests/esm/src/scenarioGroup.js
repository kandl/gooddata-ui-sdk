// (C) 2007-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { ScenarioBuilder, } from "./scenario.js";
import intersection from "lodash/intersection.js";
import identity from "lodash/identity.js";
import cloneDeep from "lodash/cloneDeep.js";
/**
 * This class supports concept of grouping multiple related test scenarios. To that end it provides functions
 * to add one scenario, add scenarios in bulk & accessing the scenarios either in their normal shape or as
 * input to vitest parameterized tests.
 */
export class ScenarioGroup {
    vis;
    component;
    groupNames = [];
    scenarioList = [];
    testConfig = { visual: {} };
    scenarioIndex = {};
    defaultTags = [];
    defaultTestTypes = ["api", "visual"];
    defaultWorkspaceType = "reference-workspace";
    defaultBackendSettings = {};
    constructor(vis, component) {
        this.vis = vis;
        this.component = component;
    }
    /**
     * Sets this scenario group's name. The name may be composite and consist of multiple
     * parts. Look at each part as a node in hierarchy.
     *
     * @param groupNames - group name(s)
     */
    withGroupNames(...groupNames) {
        this.groupNames = groupNames;
        return this;
    }
    /**
     * Configures the scenario group to assign the provided tags to all new scenarios added
     * after this call.
     *
     * @param tags - tags to assign
     */
    withDefaultTags(...tags) {
        this.defaultTags = tags;
        return this;
    }
    /**
     * Configures the scenario group to be tested using the specified types of tests. By default both API and visual
     * regression will be done. Use this to override.
     *
     * @param testTypes - test types
     */
    withDefaultTestTypes(...testTypes) {
        this.defaultTestTypes = testTypes;
        return this;
    }
    withDefaultWorkspaceType(workspaceType) {
        this.defaultWorkspaceType = workspaceType;
        return this;
    }
    withDefaultBackendSettings(settings) {
        this.defaultBackendSettings = settings;
        return this;
    }
    /**
     * Adds a new test scenarios for a component. The scenario specifies name and visualization props (sans backend
     * and workspace .. these will be injected by framework).
     *
     * @param name - name of the scenario, SHOULD NOT contain name of the visualization, just focus on well formed scenario name
     * @param props - props for the visualization that exercise the scenario
     * @param m - specify function to modify the scenario being defined, this allows specifying extra tags or types of tests to run
     */
    addScenario(name, props, m = identity) {
        const exists = this.scenarioIndex[name];
        invariant(!exists, `contract "${name}" for ${this.vis} already exists`);
        const builder = new ScenarioBuilder(this.vis, this.component, name, props, this.groupNames);
        builder.withTags(...this.defaultTags);
        builder.withTests(...this.defaultTestTypes);
        builder.withWorkspaceType(this.defaultWorkspaceType);
        builder.withBackendSettings(this.defaultBackendSettings);
        this.insertScenario(m(builder).build());
        return this;
    }
    /**
     * Adds multiple test scenarios; given base name & props of the scenario this method will use the
     * provided customizer function to expand base into multiple concrete scenarios. It then adds those
     * one-by-one using the {@link addScenario} method.
     *
     * When adding scenarios in bulk fashion, the scenario tagging works as follows:
     *
     * -  scenario inherits any default tags already set for the scenario group
     * -  IF customizer returns tags for the customizer scenario, they will be used as is, replacing anything
     *    set so far
     * -  IF the modifications use builder's withTags() call, then tags provided on that call will be used as is,
     *    replacing anything set so far
     *
     * @param baseName - base name for the scenario variants
     * @param baseProps - base props for the scenario variants
     * @param customizer - function to expand base name & props into multiple variants
     * @param m - modifications to apply on each scenario
     */
    addScenarios(baseName, baseProps, customizer, m = identity) {
        const variants = customizer(baseName, baseProps, this.defaultTags);
        variants.forEach(([name, props, tags]) => {
            this.addScenario(name, props, (builder) => {
                /*
                 * Customizer MAY specify that particular scenarios should have certain tags.
                 *
                 * If customizer returns non-null, non-undefined tags, they are applied as-is.
                 */
                if (tags) {
                    builder.withTags(...tags);
                }
                return m(builder);
            });
        });
        return this;
    }
    /**
     * Configures how to do visual regression tests for scenarios in this group.
     *
     * @param config - instance of config, will be used as is, will replace any existing config.
     */
    withVisualTestConfig(config) {
        this.testConfig.visual = config;
        return this;
    }
    /**
     * Given another scenario group, this method will take all the scenarios from the other group and add
     * them into this group. The scenario customizer & scenario modifications will be applied for each scenario.
     *
     * This can be used to copy & modify scenarios, or to multiply scenarios for different variants. All depends
     * on the implementation of the customizer function.
     */
    addCustomizedScenarios(fromGroup, customizer = copyCustomizer, m = identity) {
        fromGroup.scenarioList.forEach((scenario) => {
            this.addScenarios(scenario.name, scenario.props, customizer, m);
        });
        return this;
    }
    /**
     * Filters scenarios by types of tests that should be run on top of them. This is immutable, the original
     * instance is left unfiltered and a copy of filtered scenarios is returned.
     *
     * @param testTypes - test types to filter scenarios by, only those test cases that specify to be tested by one
     *   of these test types will be returned
     * @returns always new instance, may contain no scenarios
     */
    forTestTypes = (...testTypes) => {
        const filtered = new ScenarioGroup(this.vis, this.component);
        this.scenarioList.forEach((u) => {
            if (intersection(u.tests, testTypes).length > 0) {
                filtered.insertScenario(u);
            }
        });
        return filtered;
    };
    /**
     * Transform scenarios for this component to an inputs for parameterized vitest tests.
     */
    asTestInput = () => {
        return this.scenarioList.map((scenario) => scenario.asTestInput());
    };
    /**
     * Transform scenarios in this group into a list of tuples where first member is scenario name and
     * the second is the entire scenario.
     */
    asScenarioDescAndScenario = () => {
        return this.scenarioList.map((scenario) => [scenario.name, scenario]);
    };
    /**
     * @returns true if no scenarios in the group
     */
    isEmpty = () => {
        return this.scenarioList.length === 0;
    };
    /**
     * @returns list of scenarios in the group; may be empty
     */
    asScenarioList = () => {
        return [...this.scenarioList];
    };
    insertScenario(scenario) {
        this.scenarioIndex[scenario.name] = scenario;
        this.scenarioList.push(scenario);
    }
}
/**
 * Start defining scenarios for a component that is realized using the provided React component..
 *
 * @param chart - chart name
 * @param component - chart renderer, a function that transforms chart props to a JSX.Element
 */
export function scenariosFor(chart, component) {
    return new ScenarioGroup(chart, component);
}
/**
 * Scenario customer that only creates a new copy of the input scenario.
 *
 * @param baseName - input scenario base name, will be kept as is
 * @param baseProps - input scenario props, will be copied
 * @param baseTags - input scenario base tags, will be copied
 */
export function copyCustomizer(baseName, baseProps, baseTags) {
    return [[baseName, cloneDeep(baseProps), cloneDeep(baseTags)]];
}
/**
 * Creates scenario customizer, which will create 1-1 new scenario with same name and modified props
 *
 * @param modify - props modification function, this will receive deep copy of the original props, it is
 *  thus no problem to mutate the props if that is simpler
 */
export function copyWithModifiedProps(modify) {
    return (baseName, baseProps, baseTags) => {
        return [[baseName, modify(cloneDeep(baseProps)), cloneDeep(baseTags)]];
    };
}
//# sourceMappingURL=scenarioGroup.js.map