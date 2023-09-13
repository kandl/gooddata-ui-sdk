import React from "react";
import { WrappedComponentProps } from "react-intl";
import { AxisType } from "../../../interfaces/AxisType.js";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
export interface ILabelSubsection {
    disabled: boolean;
    configPanelDisabled: boolean;
    axis: AxisType;
    properties: IVisualizationProperties;
    pushData: (data: any) => any;
    showFormat?: boolean;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ILabelSubsection & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ILabelSubsection & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=LabelSubsection.d.ts.map