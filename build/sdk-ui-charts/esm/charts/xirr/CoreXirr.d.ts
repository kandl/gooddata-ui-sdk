import React from "react";
import { ILoadingInjectedProps } from "@gooddata/sdk-ui";
import { ICoreChartProps } from "../../interfaces/index.js";
type Props = ICoreChartProps & ILoadingInjectedProps;
export declare class XirrStateless extends React.Component<Props> {
    static defaultProps: Pick<ICoreChartProps, "locale" | "onError" | "drillableItems" | "ErrorComponent" | "LoadingComponent" | "onDrill" | "afterRender" | "pushData" | "onExportReady" | "onLoadingChanged">;
    private errorMap;
    constructor(props: Props);
    render(): JSX.Element;
    protected renderVisualization(): JSX.Element;
}
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 *
 * @internal
 */
export declare const CoreXirr: React.ComponentClass<ICoreChartProps, any>;
export {};
//# sourceMappingURL=CoreXirr.d.ts.map