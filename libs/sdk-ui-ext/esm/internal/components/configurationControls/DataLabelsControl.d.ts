import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IDataLabelsControlProps {
    pushData: (data: any) => any;
    properties: IVisualizationProperties;
    isDisabled: boolean;
    isTotalsDisabled?: boolean;
    showDisabledMessage?: boolean;
    defaultValue?: string | boolean;
    enableSeparateTotalLabels?: boolean;
    enablePercentLabels?: boolean;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IDataLabelsControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDataLabelsControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=DataLabelsControl.d.ts.map