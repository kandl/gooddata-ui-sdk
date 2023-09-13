import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../../interfaces/ControlProperties.js";
interface IColorItemProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const ColorCheckbox: React.FC<IColorItemProps>;
export default ColorCheckbox;
//# sourceMappingURL=ColorCheckbox.d.ts.map