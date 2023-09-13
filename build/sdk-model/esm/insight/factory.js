// (C) 2020-2022 GoodData Corporation
import identity from "lodash/identity.js";
/*
 * Factory & builder for insight instances. Keeping it in test infrastructure for now, will see later on
 * whether we should move it to prod code and expose on public API.
 */
/**
 * Creates new, empty insight definition, modifying its content with given modifications.
 *
 * @param visualizationUrl - visualization URL (e.g. local:bar, local:table..)
 * @param modifications - modification function which will be called with builder to update the insight
 * @internal
 */
export function newInsightDefinition(visualizationUrl, modifications = identity) {
    const builder = new InsightDefinitionBuilder(visualizationUrl);
    return modifications(builder).build();
}
/**
 * Insight definition builder can be used to set various properties of the insight using fluent API.
 *
 * @internal
 */
export class InsightDefinitionBuilder {
    constructor(visualizationUrl) {
        this.title = (title) => {
            this.insight.title = title;
            return this;
        };
        this.buckets = (buckets) => {
            this.insight.buckets = buckets;
            return this;
        };
        this.filters = (filters) => {
            this.insight.filters = filters;
            return this;
        };
        this.sorts = (sorts) => {
            this.insight.sorts = sorts;
            return this;
        };
        this.properties = (properties) => {
            this.insight.properties = properties;
            return this;
        };
        this.build = () => {
            return {
                insight: this.insight,
            };
        };
        this.insight = {
            visualizationUrl,
            title: "Untitled",
            buckets: [],
            filters: [],
            sorts: [],
            properties: {},
        };
    }
}
//# sourceMappingURL=factory.js.map