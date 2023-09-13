import { ObjRef, IInsight, IDashboardWidget, IDashboardLayoutItem } from "@gooddata/sdk-model";
import { LRUCache } from "lru-cache";
import { DashboardLayoutItemModifications } from "./DefaultDashboardLayoutRenderer/index.js";
/**
 * We need to aggressively memoize the widget sanitization results in order to prevent expensive re-renders
 * down the line - we need to keep the widgets referentially equal whenever they are not changed.
 */
export declare const getMemoizedWidgetSanitizer: <TWidget>(cache: LRUCache<string, IDashboardLayoutItem<TWidget>, unknown>) => (getInsightByRef: (insightRef: ObjRef) => IInsight | undefined, enableKDWidgetCustomHeight: boolean) => DashboardLayoutItemModifications<TWidget>;
/**
 * Ensure that areObjRefsEqual() and other predicates will be working with uncontrolled user ref inputs
 * in custom layout transformation and/or custom widget/item renderers.
 *
 * @internal
 */
export declare function polluteWidgetRefsWithBothIdAndUri<TWidget = IDashboardWidget>(getInsightByRef: (insightRef: ObjRef) => IInsight | undefined): DashboardLayoutItemModifications<TWidget>;
/**
 * Ensure the insight widgets conform to their allowed sizes.
 *
 * @internal
 */
export declare function validateItemsSize<TWidget = IDashboardWidget>(getInsightByRef: (insightRef: ObjRef) => IInsight | undefined, enableKDWidgetCustomHeight: boolean): DashboardLayoutItemModifications<TWidget>;
