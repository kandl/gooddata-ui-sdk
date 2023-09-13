import React from "react";
import { WrappedComponentProps } from "react-intl";
import { ChartOrientationType } from "@gooddata/sdk-ui-charts";
import { IPushData } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IOrientationDropdownControl {
    disabled: boolean;
    value: ChartOrientationType;
    showDisabledMessage: boolean;
    properties: IVisualizationProperties;
    pushData: (data: IPushData) => void;
}
export declare function convertXYNamePosition(namePosition: {
    position: string;
}): {
    position: string;
};
export declare function getAxesByChartOrientation(properties: IVisualizationProperties): {
    xaxis: any;
    yaxis: any;
};
declare const _default: React.FC<import("react-intl").WithIntlProps<IOrientationDropdownControl & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IOrientationDropdownControl & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=OrientationDropdownControl.d.ts.map