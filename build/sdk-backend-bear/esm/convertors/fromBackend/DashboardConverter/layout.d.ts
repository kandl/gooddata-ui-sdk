import { IFluidLayoutColSize, IFluidLayoutSize, IVisualizationClassWrapped, Layout } from "@gooddata/api-model-bear";
import { IWidget, IDashboardLayout, IDashboardLayoutSize, IDashboardLayoutSizeByScreenSize } from "@gooddata/sdk-model";
import { BearDashboardDependency } from "./types.js";
/**
 * @internal
 */
export declare const convertLayoutSize: (size: IFluidLayoutSize) => IDashboardLayoutSize;
/**
 * @internal
 */
export declare const convertLayoutItemSize: (column: IFluidLayoutColSize) => IDashboardLayoutSizeByScreenSize;
/**
 * @internal
 */
export declare const convertLayout: (layout: Layout, widgetDependencies: IWidget[]) => IDashboardLayout;
/**
 * Create {@link ILegacyDashboardLayout} from {@link IWidget} items. As widgets do not contain any layout information,
 * implicit layout with a single row will be generated.
 *
 * @returns fluid layout created from the widgets
 */
export declare function createImplicitDashboardLayout(widgets: IWidget[], dependencies: BearDashboardDependency[], visualizationClasses: IVisualizationClassWrapped[]): IDashboardLayout | undefined;
//# sourceMappingURL=layout.d.ts.map