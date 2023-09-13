import React from "react";
import { IVisualizationProperties } from "../../../interfaces/Visualization";
export interface ILegendSection {
    controlsDisabled: boolean;
    properties: IVisualizationProperties;
    propertiesMeta: any;
    pushData: (data: any) => any;
}
declare class LegendSection extends React.PureComponent<ILegendSection> {
    render(): JSX.Element;
}
export default LegendSection;
//# sourceMappingURL=LegendSection.d.ts.map