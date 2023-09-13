import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ISingleSelectListItemProps, IAlignPoint } from "@gooddata/sdk-ui-kit";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
import { IDropdownItem } from "../../interfaces/Dropdown.js";
export interface IDropdownControlProps {
    valuePath: string;
    properties: IVisualizationProperties;
    labelText?: string;
    value?: string;
    items?: IDropdownItem[];
    disabled?: boolean;
    width?: number;
    showDisabledMessage?: boolean;
    disabledMessageAlignPoints?: IAlignPoint[];
    customListItem?: React.ComponentType<ISingleSelectListItemProps>;
    pushData(data: any): void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IDropdownControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IDropdownControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=DropdownControl.d.ts.map