import React from "react";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { IColorPalette } from "@gooddata/sdk-model";
import { IVisualizationProperties } from "../../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../../interfaces/ControlProperties.js";
interface IColorControlProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    colorPalette: IColorPalette;
    pushData: PushDataCallback;
}
declare const ColorsControl: React.FC<IColorControlProps>;
export default ColorsControl;
//# sourceMappingURL=ColorsControl.d.ts.map