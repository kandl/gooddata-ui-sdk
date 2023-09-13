import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IMetricsPositionControlProps {
    pushData: (data: any) => any;
    properties: IVisualizationProperties;
    isDisabled: boolean;
    showDisabledMessage?: boolean;
    defaultValue?: string;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IMetricsPositionControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IMetricsPositionControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=MetricsPositionControl.d.ts.map