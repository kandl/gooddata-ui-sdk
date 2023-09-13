import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IChartConfig } from "../../../interfaces/index.js";
import { ExplicitDrill, IDrillEventCallback } from "@gooddata/sdk-ui";
import { IDataView } from "@gooddata/sdk-backend-spi";
export interface IXirrTransformationProps {
    dataView: IDataView;
    drillableItems?: ExplicitDrill[];
    config?: IChartConfig;
    onDrill?: IDrillEventCallback;
    onAfterRender?: () => void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IXirrTransformationProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IXirrTransformationProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=XirrTransformation.d.ts.map