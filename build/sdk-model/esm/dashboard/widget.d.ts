import { ObjRef } from "../objRef/index.js";
import { IKpiWidgetDefinition, IInsightWidgetDefinition, IKpiWidget, IInsightWidget, AnalyticalWidgetType } from "./analyticalWidgets.js";
/**
 * See {@link IWidget}]
 * @alpha
 */
export type IWidgetDefinition = IKpiWidgetDefinition | IInsightWidgetDefinition;
/**
 * @alpha
 */
export type IWidget = IKpiWidget | IInsightWidget;
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidgetDefinition}.
 * @alpha
 */
export declare function isWidgetDefinition(obj: unknown): obj is IWidgetDefinition;
/**
 * Type-guard testing whether the provided object is an instance of {@link IWidget}.
 * @alpha
 */
export declare function isWidget(obj: unknown): obj is IWidget;
/**
 * Gets the widget identifier
 *
 * @param widget - widget to get identifier of
 * @returns the widget identifier
 * @alpha
 */
export declare function widgetId(widget: IWidget): string;
/**
 * Gets the widget uri
 *
 * @param widget - widget to get uri of
 * @returns the widget uri
 * @alpha
 */
export declare function widgetUri(widget: IWidget): string;
/**
 * Gets the widget ref
 *
 * @param widget - widget to get ref of
 * @returns the widget ref
 * @alpha
 */
export declare function widgetRef(widget: IWidget): ObjRef;
/**
 * Gets the widget type
 *
 * @param widget - widget to get type of
 * @returns the widget type
 * @alpha
 */
export declare function widgetType(widget: IWidget): AnalyticalWidgetType;
/**
 * Gets the widget title
 *
 * @param widget - widget to get title of
 * @returns the widget title
 * @alpha
 */
export declare function widgetTitle(widget: IWidget): string;
/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidget}.
 * @alpha
 */
export declare function isInsightWidget(obj: unknown): obj is IInsightWidget;
/**
 * Type-guard testing whether the provided object is an instance of {@link IInsightWidgetDefinition}.
 * @alpha
 */
export declare function isInsightWidgetDefinition(obj: unknown): obj is IInsightWidgetDefinition;
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @alpha
 */
export declare function isKpiWidget(obj: unknown): obj is IKpiWidget;
/**
 * Type-guard testing whether the provided object is an instance of {@link IKpiWidget}.
 * @alpha
 */
export declare function isKpiWidgetDefinition(obj: unknown): obj is IKpiWidgetDefinition;
//# sourceMappingURL=widget.d.ts.map