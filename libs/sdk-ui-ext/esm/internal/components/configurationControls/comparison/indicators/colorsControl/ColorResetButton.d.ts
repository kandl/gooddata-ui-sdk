import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../../interfaces/ControlProperties.js";
interface IColorResetButtonProps {
    disabled: boolean;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const ColorResetButton: React.FC<IColorResetButtonProps>;
export default ColorResetButton;
//# sourceMappingURL=ColorResetButton.d.ts.map