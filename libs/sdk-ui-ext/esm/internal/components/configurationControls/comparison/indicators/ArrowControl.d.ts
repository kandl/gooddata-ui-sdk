import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../interfaces/ControlProperties.js";
interface IArrowControlProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const ArrowControl: React.FC<IArrowControlProps>;
export default ArrowControl;
//# sourceMappingURL=ArrowControl.d.ts.map