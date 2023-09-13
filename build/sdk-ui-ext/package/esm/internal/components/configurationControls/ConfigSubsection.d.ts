import React from "react";
import { WrappedComponentProps } from "react-intl";
import { AxisType } from "../../interfaces/AxisType";
export interface IConfigSubsectionOwnProps {
    valuePath?: string;
    title: string;
    canBeToggled?: boolean;
    toggleDisabled?: boolean;
    toggledOn?: boolean;
    showDisabledMessage?: boolean;
    properties?: any;
    pushData?(data: any): void;
    axisType?: AxisType;
}
export interface IConfigSubsectionState {
    disabled: boolean;
}
export type IConfigSubsectionProps = IConfigSubsectionOwnProps & WrappedComponentProps;
declare const _default: React.FC<import("react-intl").WithIntlProps<IConfigSubsectionProps>> & {
    WrappedComponent: React.ComponentType<IConfigSubsectionProps>;
};
export default _default;
//# sourceMappingURL=ConfigSubsection.d.ts.map