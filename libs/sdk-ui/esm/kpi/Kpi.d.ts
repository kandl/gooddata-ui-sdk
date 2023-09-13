import React from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IMeasure, INullableFilter, ISeparators } from "@gooddata/sdk-model";
import { IRawExecuteProps, IWithLoadingEvents } from "../execution/index.js";
import { IErrorProps, ILoadingProps } from "../base/index.js";
/**
 * Props of the {@link Kpi} component.
 * @public
 */
export interface IKpiProps extends IWithLoadingEvents<IRawExecuteProps> {
    /**
     * Specify an instance of analytical backend instance to work with.
     *
     * @remarks
     * Note: if you do not have a BackendProvider above in the component tree, then you MUST specify the backend.
     */
    backend?: IAnalyticalBackend;
    /**
     * Specify workspace to work with.
     *
     * @remarks
     * Note: if you do not have a WorkspaceProvider above in the component tree, then you MUST specify the workspace.
     */
    workspace?: string;
    /**
     * Specify measure whose value should be calculated and rendered.
     */
    measure: IMeasure;
    /**
     * Specify filters to apply during calculation
     */
    filters?: INullableFilter[];
    /**
     * Specify number separators to use when rendering (segment delimiters, decimal point character)
     */
    separators?: ISeparators;
    /**
     * Specify locale to use for strings that the Kpi component may render (for instance when encountering
     * errors).
     */
    locale?: string;
    /**
     * Specify react component to render while the data is loading.
     */
    LoadingComponent?: React.ComponentType<ILoadingProps>;
    /**
     * Specify react component to render if execution fails.
     */
    ErrorComponent?: React.ComponentType<IErrorProps>;
}
/**
 * Kpi is a simple component which calculates and renders a single formatted measure value.
 *
 * @remarks
 * The the value is rendered inside a <span> element.
 *
 * Kpi component is useful for instance for embedding data values into text paragraphs.
 *
 * See also the {@link @gooddata/sdk-ui-charts#Headline} component for a more 'chart-like' variant.
 *
 * @public
 */
export declare const Kpi: React.ComponentType<IKpiProps>;
//# sourceMappingURL=Kpi.d.ts.map