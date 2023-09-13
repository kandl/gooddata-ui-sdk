import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IInsightDefinition } from "@gooddata/sdk-model";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IColumnHeadersPositionControlProps {
    pushData: (data: any) => any;
    properties: IVisualizationProperties;
    isDisabled: boolean;
    insight: IInsightDefinition;
    showDisabledMessage?: boolean;
    defaultValue?: string;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IColumnHeadersPositionControlProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IColumnHeadersPositionControlProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=ColumnHeadersPositionControl.d.ts.map