import { IDashboardFilterReference, IInsight, IInsightWidgetBase, IInsightWidgetConfiguration, InsightDrillDefinition, ObjRef, VisualizationProperties } from "@gooddata/sdk-model";
/**
 * @internal
 */
export type InsightWidgetModifications = (builder: InsightWidgetBuilder) => InsightWidgetBuilder;
/**
 * Creates a new insightWidget with specified identifier and title and with optional modifications.
 *
 * @param insight - the insight object to create widget for.
 * @param modifications - optional modifications
 *
 * @internal
 */
export declare function newInsightWidget(insight: IInsight, modifications?: InsightWidgetModifications): IInsightWidgetBase;
/**
 * Builder for a {@link @gooddata/sdk-model#IInsightWidgetBase} object.
 *
 * @remarks
 * The builder without any modifications returns a widget with all mandatory data. To apply
 * additional information use builder functions.
 *
 * @internal
 */
export declare class InsightWidgetBuilder {
    widget: {
        -readonly [K in keyof IInsightWidgetBase]: IInsightWidgetBase[K];
    };
    constructor(insightRef: ObjRef, title: string);
    withIgnoreDashboardFilters(ignoreDashboardFilters: IDashboardFilterReference[]): this;
    withDrills(drills: InsightDrillDefinition[]): this;
    withTitle(title: string): this;
    withDescription(description: string): this;
    withConfiguration(configuration: IInsightWidgetConfiguration): this;
    withProperties(properties: VisualizationProperties): this;
    build(): IInsightWidgetBase;
}
