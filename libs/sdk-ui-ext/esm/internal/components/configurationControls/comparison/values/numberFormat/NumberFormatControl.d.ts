import React from "react";
import { ISeparators, PushDataCallback } from "@gooddata/sdk-ui";
import { IVisualizationProperties } from "../../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../../interfaces/ControlProperties.js";
interface INumberFormatControlProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    defaultFormat: string;
    separators: ISeparators;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    pushData: PushDataCallback;
}
declare const NumberFormatControl: React.FC<INumberFormatControlProps>;
export default NumberFormatControl;
//# sourceMappingURL=NumberFormatControl.d.ts.map