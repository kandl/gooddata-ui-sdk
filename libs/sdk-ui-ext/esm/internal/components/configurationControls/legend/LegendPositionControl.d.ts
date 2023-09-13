import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
export interface ILegendPositionControl {
    disabled: boolean;
    value: string;
    showDisabledMessage: boolean;
    properties: IVisualizationProperties;
    pushData: (data: any) => any;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ILegendPositionControl & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ILegendPositionControl & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=LegendPositionControl.d.ts.map