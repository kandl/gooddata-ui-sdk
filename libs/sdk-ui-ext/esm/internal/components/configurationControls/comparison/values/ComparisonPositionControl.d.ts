import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IComparisonControlProperties } from "../../../../interfaces/ControlProperties.js";
import { IVisualizationProperties } from "../../../../interfaces/Visualization.js";
interface IPositionControlProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const ComparisonPositionControl: React.FC<IPositionControlProps>;
export default ComparisonPositionControl;
//# sourceMappingURL=ComparisonPositionControl.d.ts.map