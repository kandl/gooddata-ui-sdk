import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IContinuousLineControlProps {
    properties: IVisualizationProperties;
    valuePath?: string;
    checked?: boolean;
    disabled?: boolean;
    pushData(data: any): void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IContinuousLineControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IContinuousLineControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=ContinuousLineControl.d.ts.map