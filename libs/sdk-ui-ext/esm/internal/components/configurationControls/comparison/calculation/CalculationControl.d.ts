import React from "react";
import { CalculationType } from "@gooddata/sdk-ui-charts";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IComparisonControlProperties } from "../../../../interfaces/ControlProperties.js";
import { IVisualizationProperties } from "../../../../interfaces/Visualization.js";
interface ICalculationControlProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    defaultCalculationType: CalculationType;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const CalculationControl: React.FC<ICalculationControlProps>;
export default CalculationControl;
//# sourceMappingURL=CalculationControl.d.ts.map