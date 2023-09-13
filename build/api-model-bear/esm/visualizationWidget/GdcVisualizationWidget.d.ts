import { IObjectMeta } from "../meta/GdcMetadata.js";
import { IAttributeFilterReference, IDateFilterReference } from "../extendedDateFilters/GdcExtendedDateFilters.js";
import { IReferenceItems } from "../visualizationObject/GdcVisualizationObject.js";
import { ILocalIdentifierQualifier, IObjUriQualifier, Identifier } from "../base/GdcTypes.js";
/**
 * @public
 */
export interface IVisualizationWidget {
    meta: IObjectMeta;
    content: {
        visualization: string;
        dateDataSet?: string;
        ignoreDashboardFilters: Array<IDateFilterReference | IAttributeFilterReference>;
        drills?: IDrillDefinition[];
        properties?: string;
        references?: IReferenceItems;
        configuration?: IVisualizationWidgetConfiguration;
    };
}
/**
 * @public
 */
export interface IWrappedVisualizationWidget {
    visualizationWidget: IVisualizationWidget;
}
/**
 * @public
 */
export type IDrillDefinition = IDrillToVisualization | IDrillToDashboard | IDrillToCustomUrl | IDrillToAttributeUrl;
/**
 * @public
 */
export type DrillFromType = IDrillFromMeasure | IDrillFromAttribute;
/**
 * @public
 */
export interface IDrillFromMeasure {
    drillFromMeasure: ILocalIdentifierQualifier;
}
/**
 * @public
 */
export interface IDrillFromAttribute {
    drillFromAttribute: ILocalIdentifierQualifier;
}
/**
 * @public
 */
export interface IDrillToVisualization {
    drillToVisualization: {
        target: "pop-up";
        from: DrillFromType;
        toVisualization: IObjUriQualifier;
    };
}
/**
 * @public
 */
export interface IDrillToDashboard {
    drillToDashboard: {
        target: "in-place";
        from: DrillFromType;
        toDashboard?: Identifier;
    };
}
/**
 * @public
 */
export interface IDrillToCustomUrl {
    drillToCustomUrl: {
        target: "new-window";
        from: DrillFromType;
        customUrl: string;
    };
}
/**
 * @public
 */
export interface IDrillToAttributeUrl {
    drillToAttributeUrl: {
        target: "new-window";
        from: DrillFromType;
        insightAttributeDisplayForm: IObjUriQualifier;
        drillToAttributeDisplayForm: IObjUriQualifier;
    };
}
/**
 * @public
 */
export interface IVisualizationWidgetConfiguration {
    hideTitle?: boolean;
    description?: IVisualizationWidgetDescriptionConfiguration;
}
/**
 * @public
 */
export interface IVisualizationWidgetDescriptionConfiguration {
    visible: boolean;
    source: VisualizatioWidgetDescriptionSourceType;
    includeMetrics: boolean;
}
/**
 * @public
 */
export type VisualizatioWidgetDescriptionSourceType = "widget" | "insight";
/**
 * @public
 */
export declare function isDrillToVisualization(obj: unknown): obj is IDrillToVisualization;
/**
 * @public
 */
export declare function isDrillToDashboard(obj: unknown): obj is IDrillToDashboard;
/**
 * @public
 */
export declare function isDrillToCustomUrl(obj: unknown): obj is IDrillToCustomUrl;
/**
 * @public
 */
export declare function isDrillToAttributeUrl(obj: unknown): obj is IDrillToAttributeUrl;
/**
 * @public
 */
export declare function isDrillFromMeasure(obj: DrillFromType): obj is IDrillFromMeasure;
/**
 * @public
 */
export declare function isDrillFromAttribute(obj: DrillFromType): obj is IDrillFromAttribute;
/**
 * @public
 */
export declare function isVisualizationWidget(obj: unknown): obj is IVisualizationWidget;
/**
 * @public
 */
export declare function isWrappedVisualizationWidget(obj: unknown): obj is IWrappedVisualizationWidget;
//# sourceMappingURL=GdcVisualizationWidget.d.ts.map