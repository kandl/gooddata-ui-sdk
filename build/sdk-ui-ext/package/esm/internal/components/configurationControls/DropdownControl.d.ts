import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization";
import { IDropdownItem } from "../../interfaces/Dropdown";
export interface IDropdownControlProps {
    valuePath: string;
    properties: IVisualizationProperties;
    labelText?: string;
    value?: string;
    items?: IDropdownItem[];
    disabled?: boolean;
    width?: number;
    showDisabledMessage?: boolean;
    pushData(data: any): void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IDropdownControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDropdownControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=DropdownControl.d.ts.map