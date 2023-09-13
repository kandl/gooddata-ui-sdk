import React from "react";
import { ILoadingInjectedProps } from "@gooddata/sdk-ui";
import { ICoreChartProps } from "../../interfaces/index.js";
import { IHeadlineTransformationProps } from "./HeadlineProvider.js";
/**
 * @internal
 */
interface ICoreHeadlineExtendedProps {
    headlineTransformation: React.ComponentType<IHeadlineTransformationProps>;
}
type CoreHeadlineProps = ICoreChartProps & ILoadingInjectedProps & ICoreHeadlineExtendedProps;
export declare class HeadlineStateless extends React.Component<CoreHeadlineProps> {
    static defaultProps: {
        config: {};
        locale?: string;
        onError?: import("@gooddata/sdk-ui").OnError;
        drillableItems?: import("@gooddata/sdk-ui").ExplicitDrill[];
        ErrorComponent?: React.ComponentType<import("@gooddata/sdk-ui").IErrorProps>;
        LoadingComponent?: React.ComponentType<import("@gooddata/sdk-ui").ILoadingProps>;
        onDrill?: import("@gooddata/sdk-ui").IDrillEventCallback;
        afterRender?: () => void;
        pushData?: (data: import("@gooddata/sdk-ui").IPushData) => void;
        onExportReady?: import("@gooddata/sdk-ui").OnExportReady;
        onLoadingChanged?: import("@gooddata/sdk-ui").OnLoadingChanged;
    };
    private errorMap;
    constructor(props: CoreHeadlineProps);
    render(): JSX.Element;
    protected renderVisualization(): JSX.Element;
}
/**
 * @internal
 */
declare const CoreHeadline: React.ComponentClass<ICoreChartProps & ICoreHeadlineExtendedProps, any>;
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 */
export { CoreHeadline, ICoreHeadlineExtendedProps };
//# sourceMappingURL=CoreHeadline.d.ts.map