import React from "react";
import { IErrorProps, ILoadingProps } from "@gooddata/sdk-ui";
import { IDashboardLoadOptions } from "./types.js";
/**
 * @public
 */
export interface IDashboardStubProps extends IDashboardLoadOptions {
    /**
     * Component to render if embedding fails.
     */
    ErrorComponent?: React.ComponentType<IErrorProps>;
    /**
     * Component to render while the insight is loading.
     */
    LoadingComponent?: React.ComponentType<ILoadingProps>;
}
/**
 * DashboardStub encapsulates load, bootstrap and teardown of a dashboard enhanced by plugins.
 *
 * @remarks
 * This component is a thin wrapper on top of the {@link useDashboardLoader} hook which does the heavy lifting - you can
 * use the hook in your own component if this simple stub does not suffice.
 *
 * @public
 */
export declare const DashboardStub: React.FC<IDashboardStubProps>;
