import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
export interface ITotalSectionProps {
    controlsDisabled: boolean;
    properties: IVisualizationProperties;
    propertiesMeta: any;
    pushData: (data: any) => any;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ITotalSectionProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ITotalSectionProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=TotalSection.d.ts.map