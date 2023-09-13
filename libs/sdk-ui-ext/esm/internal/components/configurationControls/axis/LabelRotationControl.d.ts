import React from "react";
import { WrappedComponentProps } from "react-intl";
import { AxisType } from "../../../interfaces/AxisType.js";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
export interface ILabelRotationControl {
    disabled: boolean;
    configPanelDisabled: boolean;
    axis: AxisType;
    properties: IVisualizationProperties;
    pushData: (data: any) => any;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ILabelRotationControl & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ILabelRotationControl & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=LabelRotationControl.d.ts.map