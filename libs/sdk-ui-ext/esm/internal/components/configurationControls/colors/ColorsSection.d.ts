import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IReferences, IVisualizationProperties } from "../../../interfaces/Visualization.js";
import { IColorConfiguration } from "../../../interfaces/Colors.js";
export interface IColorsSectionProps {
    controlsDisabled: boolean;
    showCustomPicker: boolean;
    properties: IVisualizationProperties;
    propertiesMeta: any;
    references: IReferences;
    pushData: (data: any) => void;
    hasMeasures: boolean;
    colors: IColorConfiguration;
    isLoading: boolean;
}
export declare const COLOR_MAPPING_CHANGED = "COLOR_MAPPING_CHANGED";
declare const _default: React.FC<import("react-intl").WithIntlProps<IColorsSectionProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IColorsSectionProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=ColorsSection.d.ts.map