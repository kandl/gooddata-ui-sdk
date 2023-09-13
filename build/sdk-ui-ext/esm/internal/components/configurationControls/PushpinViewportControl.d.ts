import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IVisualizationProperties } from "../../interfaces/Visualization.js";
export interface IPushpinViewportControl {
    disabled: boolean;
    properties: IVisualizationProperties;
    pushData: (data: any) => any;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IPushpinViewportControl & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IPushpinViewportControl & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=PushpinViewportControl.d.ts.map