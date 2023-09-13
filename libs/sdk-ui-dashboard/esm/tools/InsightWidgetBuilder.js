// (C) 2022-2023 GoodData Corporation
import { insightRef, insightTitle, uriRef, } from "@gooddata/sdk-model";
import identity from "lodash/identity.js";
/**
 * Creates a new insightWidget with specified identifier and title and with optional modifications.
 *
 * @param insight - the insight object to create widget for.
 * @param modifications - optional modifications
 *
 * @internal
 */
export function newInsightWidget(insight, modifications = identity) {
    const ref = insightRef(insight);
    const title = insightTitle(insight);
    const builder = new InsightWidgetBuilder(ref, title);
    return modifications(builder).build();
}
/**
 * Builder for a {@link @gooddata/sdk-model#IInsightWidgetBase} object.
 *
 * @remarks
 * The builder without any modifications returns a widget with all mandatory data. To apply
 * additional information use builder functions.
 *
 * @internal
 */
export class InsightWidgetBuilder {
    constructor(insightRef, title) {
        this.widget = {
            insight: uriRef(""),
            type: "insight",
            ignoreDashboardFilters: [],
            drills: [],
            title: "",
            description: "",
        };
        this.widget.insight = insightRef;
        this.widget.title = title;
    }
    withIgnoreDashboardFilters(ignoreDashboardFilters) {
        this.widget.ignoreDashboardFilters = ignoreDashboardFilters;
        return this;
    }
    withDrills(drills) {
        this.widget.drills = drills;
        return this;
    }
    withTitle(title) {
        this.widget.title = title;
        return this;
    }
    withDescription(description) {
        this.widget.description = description;
        return this;
    }
    withConfiguration(configuration) {
        this.widget.configuration = configuration;
        return this;
    }
    withProperties(properties) {
        this.widget.properties = properties;
        return this;
    }
    build() {
        return Object.assign({}, this.widget);
    }
}
//# sourceMappingURL=InsightWidgetBuilder.js.map