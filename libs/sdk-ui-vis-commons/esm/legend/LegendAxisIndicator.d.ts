import React from "react";
import { WrappedComponentProps } from "react-intl";
export interface ILegendAxisIndicatorProps {
    labelKey: string;
    data: string[];
    width?: number;
}
export declare class LegendAxisIndicatorClass extends React.PureComponent<ILegendAxisIndicatorProps & WrappedComponentProps> {
    render(): JSX.Element;
}
export declare const LegendAxisIndicator: React.FC<import("react-intl").WithIntlProps<ILegendAxisIndicatorProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ILegendAxisIndicatorProps & WrappedComponentProps>;
};
//# sourceMappingURL=LegendAxisIndicator.d.ts.map