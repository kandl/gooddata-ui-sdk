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

import {
    IDashboardViewLayoutColumn,
    IDashboardViewLayoutContent,
    IDashboardViewLayoutRow,
} from "./dashboardLayout";

/**
 * @alpha
 */
export interface IDashboardViewLayoutCommonRenderProps {
    debug?: boolean;
}

/**
 * @alpha
 */
export type IDashboardViewLayoutRowKeyGetter<TCustomContent> = IFluidLayoutRowKeyGetter<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
>;

/**
 * @alpha
 */
export type IDashboardViewLayoutRowRenderProps<TCustomContent> = IFluidLayoutRowRenderProps<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
> &
    IDashboardViewLayoutCommonRenderProps;

/**
 * @alpha
 */
export type IDashboardViewLayoutRowRenderer<TCustomContent> = IFluidLayoutRowRenderer<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>,
    IDashboardViewLayoutCommonRenderProps
>;

/**
 * @alpha
 */
export type IDashboardViewLayoutRowHeaderRenderProps<TCustomContent> = IFluidLayoutRowHeaderRenderProps<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
> &
    IDashboardViewLayoutCommonRenderProps & {
        /**
         * Default row header renderer - can be use as a fallback for custom rowHeaderRenderer.
         */
        DefaultRenderer: IDashboardViewLayoutRowHeaderRenderer<TCustomContent>;
    };

/**
 * @alpha
 */
export type IDashboardViewLayoutRowHeaderRenderer<TCustomContent> = IFluidLayoutRowHeaderRenderer<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>,
    IDashboardViewLayoutCommonRenderProps
>;

/**
 * @alpha
 */
export type IDashboardViewLayoutColumnKeyGetter<TCustomContent> = IFluidLayoutColumnKeyGetter<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
>;

/**
 * @alpha
 */
export type IDashboardViewLayoutColumnRenderProps<TCustomContent> = IFluidLayoutColumnRenderProps<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
> &
    IDashboardViewLayoutCommonRenderProps;

/**
 * @alpha
 */
export type IDashboardViewLayoutColumnRenderer<TCustomContent> = IFluidLayoutColumnRenderer<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>,
    IDashboardViewLayoutCommonRenderProps
>;

/**
 * @alpha
 */
export type IDashboardViewLayoutContentRenderProps<TCustomContent> = IFluidLayoutContentRenderProps<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
> &
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
         * Note: height is used only when column IFluidLayoutSize use heightAsRatio.
         */
        height?: CSSProperties["height"];

        /**
         * Minimum height of the content.
         * Note: minimum height is used only when column IFluidLayoutSize heightAsRatio is missing.
         */
        minHeight?: CSSProperties["minHeight"];

        /**
         * Was column size updated by layout sizing strategy?
         */
        isResizedByLayoutSizingStrategy?: boolean;

        /**
         * Default content renderer - can be use as a fallback for custom contentRenderer.
         */
        DefaultRenderer: IDashboardViewLayoutContentRenderer<TCustomContent>;
    };

/**
 * @alpha
 */
export type IDashboardViewLayoutContentRenderer<TCustomContent> = IFluidLayoutContentRenderer<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>,
    IDashboardViewLayoutContentRenderProps<TCustomContent>
>;

/**
 * Dashboard layout definition.
 *
 * @alpha
 */
export type IDashboardViewLayoutRenderer<TCustomContent> = IFluidLayoutRenderer<
    IDashboardViewLayoutContent<TCustomContent>,
    IDashboardViewLayoutColumn<TCustomContent>,
    IDashboardViewLayoutRow<TCustomContent>
>;
