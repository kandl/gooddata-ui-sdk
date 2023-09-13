// (C) 2021-2022 GoodData Corporation
import React from "react";
import { ErrorComponent as DefaultErrorComponent, LoadingComponent as DefaultLoadingComponent, } from "@gooddata/sdk-ui";
import { useDashboardLoader } from "./useDashboardLoader.js";
/**
 * DashboardStub encapsulates load, bootstrap and teardown of a dashboard enhanced by plugins.
 *
 * @remarks
 * This component is a thin wrapper on top of the {@link useDashboardLoader} hook which does the heavy lifting - you can
 * use the hook in your own component if this simple stub does not suffice.
 *
 * @public
 */
export const DashboardStub = (props) => {
    var _a;
    const { ErrorComponent = DefaultErrorComponent, LoadingComponent = DefaultLoadingComponent } = props;
    const { status, error, result } = useDashboardLoader(props);
    if (status === "loading") {
        return React.createElement(LoadingComponent, null);
    }
    if (status === "error" || result === undefined) {
        return React.createElement(ErrorComponent, { message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "" });
    }
    return React.createElement(result.DashboardComponent, Object.assign({}, result.props));
};
//# sourceMappingURL=DashboardStub.js.map