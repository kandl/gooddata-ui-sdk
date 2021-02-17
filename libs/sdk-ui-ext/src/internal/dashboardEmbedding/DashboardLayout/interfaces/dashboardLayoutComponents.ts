// (C) 2020-2021 GoodData Corporation
import { CSSProperties } from "react";
import {
    IFluidLayoutColumnRenderProps,
    IFluidLayoutRowRenderProps,
    IFluidLayoutRowRenderer,
    IFluidLayoutColumnRenderer,
    IFluidLayoutContentRenderer,
    IFluidLayoutContentRenderProps,
    IFluidLayoutRowKeyGetter,
    IFluidLayoutColumnKeyGetter,
    IFluidLayoutRenderer,
    IFluidLayoutRowHeaderRenderProps,
    IFluidLayoutRowHeaderRenderer,
} from "../../FluidLayout";

import { IDashboardViewLayoutContent } from "./dashboardLayout";

/**
 * @alpha
 */
export interface IDashboardViewLayoutCommonRenderProps {
    debug?: boolean;
}

/**
 * @alpha
 */
export type IDashboardViewLayoutRowKeyGetter<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutRowKeyGetter<TCustomContent>;

/**
 * @alpha
 */
export type IDashboardViewLayoutRowRenderProps<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutRowRenderProps<TCustomContent> & IDashboardViewLayoutCommonRenderProps;

/**
 * @alpha
 */
export type IDashboardViewLayoutRowRenderer<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutRowRenderer<TCustomContent, IDashboardViewLayoutCommonRenderProps>;

/**
 * @alpha
 */
export type IDashboardViewLayoutRowHeaderRenderProps<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutRowHeaderRenderProps<TCustomContent> &
    IDashboardViewLayoutCommonRenderProps & {
        /**
         * Default row header renderer - can be used as a fallback for custom rowHeaderRenderer.
         */
        DefaultRowHeaderRenderer: IDashboardViewLayoutRowHeaderRenderer<TCustomContent>;
    };

/**
 * @alpha
 */
export type IDashboardViewLayoutRowHeaderRenderer<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutRowHeaderRenderer<TCustomContent, IDashboardViewLayoutRowHeaderRenderProps<TCustomContent>>;

/**
 * @alpha
 */
export type IDashboardViewLayoutColumnKeyGetter<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutColumnKeyGetter<TCustomContent>;

/**
 * @alpha
 */
export type IDashboardViewLayoutColumnRenderProps<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutColumnRenderProps<TCustomContent> & IDashboardViewLayoutCommonRenderProps;

/**
 * @alpha
 */
export type IDashboardViewLayoutColumnRenderer<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutColumnRenderer<TCustomContent, IDashboardViewLayoutColumnRenderProps<TCustomContent>>;

/**
 * @alpha
 */
export type IDashboardViewLayoutContentRenderProps<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutContentRenderProps<TCustomContent> &
    IDashboardViewLayoutCommonRenderProps & {
        /**
         * React ref to content element.
         */
        contentRef?: React.RefObject<HTMLDivElement>;

        /**
         * Additional css class name of the content.
         */
        className?: string;

        /**
         * Content to render - widget, insight, or custom content.
         */
        children?: React.ReactNode;

        /**
         * Height of the content.
         */
        height?: CSSProperties["height"];

        /**
         * Minimum height of the content.
         */
        minHeight?: CSSProperties["minHeight"];

        /**
         * Allow vertical overflow?
         * (This basically sets overflowX to hidden and overflowY to auto)
         */
        allowOverflow?: boolean;

        /**
         * Was column size updated by layout sizing strategy?
         */
        isResizedByLayoutSizingStrategy?: boolean;

        /**
         * Default content renderer - can be used as a fallback for custom contentRenderer.
         */
        DefaultContentRenderer: IDashboardViewLayoutContentRenderer<TCustomContent>;
    };

/**
 * @alpha
 */
export type IDashboardViewLayoutContentRenderer<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutContentRenderer<TCustomContent, IDashboardViewLayoutContentRenderProps<TCustomContent>>;

/**
 * Dashboard layout definition.
 *
 * @alpha
 */
export type IDashboardViewLayoutRenderer<
    TCustomContent extends IDashboardViewLayoutContent<any>
> = IFluidLayoutRenderer<TCustomContent>;
