// (C) 2019-2021 GoodData Corporation
import {
    IFluidLayoutColumnBuilder,
    IFluidLayoutRowBuilder,
    IFluidLayoutBuilder,
    FluidLayoutRowsSelector,
    FluidLayoutColumnsSelector,
    FluidLayoutModifications,
    FluidLayoutRowModifications,
    FluidLayoutColumnModifications,
} from "@gooddata/sdk-backend-spi";
import { ObjRef } from "@gooddata/sdk-model";
import { KpiWidgetBuilder, InsightWidgetBuilder } from "@gooddata/sdk-backend-base";

/**
 * Represents a query to select a subset of layout rows.
 *
 * @alpha
 */
export type DashboardViewLayoutRowsSelector<TContent> = FluidLayoutRowsSelector<TContent>;

/**
 * Represents a query to select a subset of row columns.
 *
 * @alpha
 */
export type DashboardViewLayoutColumnsSelector<TContent> = FluidLayoutColumnsSelector<TContent>;

/**
 * Represents a callback to modify the layout.
 *
 * @alpha
 */
export type DashboardViewLayoutModifications<TContent> = FluidLayoutModifications<TContent>;

/**
 * Represents a callback to modify the layout row.
 *
 * @alpha
 */
export type DashboardViewLayoutRowModifications<TContent> = FluidLayoutRowModifications<TContent>;

/**
 * Represents a callback to modify the layout column.
 *
 * @alpha
 */
export type DashboardViewLayoutColumnModifications<TContent> = FluidLayoutColumnModifications<TContent>;
/**
 * Builder for convenient creation or transformation of any {@link IDashboardViewLayoutColumn}.
 *
 * @alpha
 */
export interface IDashboardViewLayoutColumnBuilder<TContent> extends IFluidLayoutColumnBuilder<TContent> {
    newInsightWidget(insight: ObjRef, create?: (builder: InsightWidgetBuilder) => InsightWidgetBuilder): this;
    modifyInsightWidget(modify: (builder: InsightWidgetBuilder) => InsightWidgetBuilder): this;
    newKpiWidget(measure: ObjRef, create?: (builder: KpiWidgetBuilder) => KpiWidgetBuilder): this;
    modifyKpiWidget(modify: (builder: KpiWidgetBuilder) => KpiWidgetBuilder): this;
}

/**
 * Builder for convenient creation or transformation of any {@link IDashboardViewLayoutRow}.
 *
 * @alpha
 */
export type IDashboardViewLayoutRowBuilder<TContent> = IFluidLayoutRowBuilder<TContent>;

/**
 * Builder for convenient creation or transformation of any {@link IDashboardViewLayout}.
 * The provided layout is not touched in any way, all operations performed on the layout are immutable.
 *
 * @alpha
 */
export type IDashboardViewLayoutBuilder<TContent> = IFluidLayoutBuilder<TContent>;
