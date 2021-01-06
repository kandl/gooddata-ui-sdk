// (C) 2019-2021 GoodData Corporation
import {
    IFluidLayout,
    IFluidLayoutColumn,
    IFluidLayoutRow,
    IDashboardLayoutContent,
    isWidget,
    isWidgetDefinition,
    isFluidLayout,
} from "@gooddata/sdk-backend-spi";

/**
 * Dashboard layout content can be customized from the outside
 *
 * @alpha
 */
export type IDashboardViewLayoutContent<TCustomContent> = IDashboardLayoutContent | TCustomContent;

export const isDashboardLayoutContent = (obj: unknown): obj is IDashboardLayoutContent =>
    [isFluidLayout, isWidget, isWidgetDefinition].some((guard) => guard(obj));

/**
 * Dashboard layout column definition.
 *
 * @alpha
 */
export type IDashboardViewLayoutColumn<TCustomContent = IDashboardLayoutContent> = IFluidLayoutColumn<
    IDashboardViewLayoutContent<TCustomContent>
>;

/**
 * Dashboard layout row definition.
 *
 * @alpha
 */
export type IDashboardViewLayoutRow<TCustomContent = IDashboardLayoutContent> = IFluidLayoutRow<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>
>;

/**
 * Dashboard layout definition.
 *
 * @alpha
 */
export type IDashboardViewLayout<TCustomContent = IDashboardLayoutContent> = IFluidLayout<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
>;
