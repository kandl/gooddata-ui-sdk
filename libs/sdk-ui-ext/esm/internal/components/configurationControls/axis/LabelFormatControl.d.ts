import React from "react";
import { WrappedComponentProps } from "react-intl";
import { AxisType } from "../../../interfaces/AxisType.js";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
export interface ILabelFormatControl {
    disabled: boolean;
    configPanelDisabled: boolean;
    axis: AxisType;
    properties: IVisualizationProperties;
    pushData: (data: any) => any;
}
export declare const LabelFormatControl: React.FC<import("react-intl").WithIntlProps<ILabelFormatControl & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ILabelFormatControl & WrappedComponentProps>;
};
//# sourceMappingURL=LabelFormatControl.d.ts.map