// (C) 2007-2019 GoodData Corporation
import { scenariosFor } from "../../../src/index.js";
export function responsiveScenarios(chart, groupNames, component, baseProps, sizes, generateInsight, customizer) {
    const tags = generateInsight ? [] : ["no-plug-viz-tests"];
    const usedLabels = {};
    return sizes.map((size) => {
        const label = size.label
            ? `${size.width}x${size.height} - ${size.label}`
            : `${size.width}x${size.height}`;
        if (usedLabels[label]) {
            console.error("Label of story has to be unique", "Label", label);
        }
        usedLabels[label] = label;
        const scenario = scenariosFor(chart, component)
            .withGroupNames(...groupNames)
            .withVisualTestConfig({
            groupUnder: label,
            screenshotSize: { width: size.width, height: size.height },
        })
            .withDefaultTags("vis-config-only", "mock-no-scenario-meta", ...tags);
        if (customizer) {
            scenario.addScenarios(label, baseProps, customizer);
        }
        else {
            scenario.addScenario(label, baseProps);
        }
        return scenario;
    });
}
//# sourceMappingURL=responsiveScenarios.js.map