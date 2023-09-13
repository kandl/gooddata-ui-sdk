import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IPushpinSizeControl {
    disabled: boolean;
    properties: IVisualizationProperties;
    pushData: (data: any) => any;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IPushpinSizeControl & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IPushpinSizeControl & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=PushpinSizeControl.d.ts.map