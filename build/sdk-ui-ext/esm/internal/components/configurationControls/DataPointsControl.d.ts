import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IDataPointsControlProps {
    pushData: (data: any) => any;
    properties: IVisualizationProperties;
    isDisabled: boolean;
    showDisabledMessage?: boolean;
    defaultValue?: string | boolean;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IDataPointsControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDataPointsControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=DataPointsControl.d.ts.map