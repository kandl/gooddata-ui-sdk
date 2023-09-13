import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization";
export interface ICheckboxControlProps {
    valuePath: string;
    properties: IVisualizationProperties;
    labelText?: string;
    checked?: boolean;
    disabled?: boolean;
    showDisabledMessage?: boolean;
    pushData(data: any): void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ICheckboxControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ICheckboxControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=CheckboxControl.d.ts.map