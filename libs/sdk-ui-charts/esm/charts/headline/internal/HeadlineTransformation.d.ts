import { IDataView } from "@gooddata/sdk-backend-spi";
import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IChartConfig } from "../../../interfaces/index.js";
import { ExplicitDrill, IDrillEventCallback } from "@gooddata/sdk-ui";
export interface IHeadlineTransformationProps {
    dataView: IDataView;
    drillableItems?: ExplicitDrill[];
    config?: IChartConfig;
    onDrill?: IDrillEventCallback;
    onAfterRender?: () => void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IHeadlineTransformationProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IHeadlineTransformationProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=HeadlineTransformation.d.ts.map