import { IDataView } from "@gooddata/sdk-backend-spi";
import React from "react";
import { IntlShape } from "react-intl";
import { IExportFunction } from "../../vis/Events.js";
import { IDataVisualizationProps } from "../../vis/VisualizationProps.js";
/**
 * These props are injected by withEntireDataView HOC. This HOC takes care of driving the execution and obtaining
 * the data view to visualize. Oh and by the way, the HOC also provides internationalization context :/
 *
 * @internal
 */
export interface ILoadingInjectedProps {
    /**
     * If the data is loading, then this prop contains true. Otherwise, if the loading finished with either
     * success or failure, this prop contains false.
     */
    isLoading: boolean;
    /**
     * If loading succeeds, then this prop contains the data to visualize. Otherwise is undefined.
     */
    dataView?: IDataView;
    /**
     * If loading fails, then this prop contains description of the error. Otherwise is undefined.
     */
    error?: string;
    intl: IntlShape;
    /**
     * Callback to trigger when export is ready
     */
    onExportReady(exportFunction: IExportFunction): void;
    /**
     * Callback to trigger if the chart cannot visualize the data because it is too large.
     */
    onDataTooLarge(data: any, errorMessage?: string): void;
    /**
     * Callback to trigger if the chart cannot visualize the data because it contains negative values.
     */
    onNegativeValues(): void;
}
/**
 * A HOC to wrap data visualization components with loading / error handling.
 *
 * Note: this is a legacy HOC with a long history. In v7 we had VisualizationLoadingHOC - that one was used for
 * all components and was linked to AFM and the paging and everything. We took this and gutted it out, changed to
 * work with executions and to only support reading all the data.
 *
 * @param InnerComponent - component to wrap
 * @internal
 */
export declare function withEntireDataView<T extends IDataVisualizationProps>(InnerComponent: React.ComponentClass<T & ILoadingInjectedProps>): React.ComponentClass<T>;
//# sourceMappingURL=withEntireDataView.d.ts.map