// (C) 2019-2020 GoodData Corporation
import noop from "lodash/noop.js";
import { ErrorComponent, LoadingComponent, defaultErrorHandler } from "@gooddata/sdk-ui";
export const defaultCoreChartProps = {
    locale: "en-US",
    drillableItems: [],
    afterRender: noop,
    pushData: noop,
    onError: defaultErrorHandler,
    onExportReady: noop,
    onLoadingChanged: noop,
    onDrill: () => true,
    ErrorComponent,
    LoadingComponent,
};
//# sourceMappingURL=defaultProps.js.map