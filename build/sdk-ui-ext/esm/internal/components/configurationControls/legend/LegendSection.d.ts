import React from "react";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
export interface ILegendSection {
    controlsDisabled: boolean;
    properties: IVisualizationProperties;
    propertiesMeta: any;
    defaultLegendEnabled?: boolean;
    pushData: (data: any) => any;
}
declare class LegendSection extends React.PureComponent<ILegendSection> {
    static defaultProps: ILegendSection;
    render(): JSX.Element;
}
export default LegendSection;
//# sourceMappingURL=LegendSection.d.ts.map