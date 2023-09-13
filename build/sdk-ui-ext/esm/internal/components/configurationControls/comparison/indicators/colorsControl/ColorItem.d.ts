import React from "react";
import { MessageDescriptor } from "react-intl";
import { IColor, IColorPalette } from "@gooddata/sdk-model";
import { PushDataCallback } from "@gooddata/sdk-ui";
import { ComparisonColorType } from "@gooddata/sdk-ui-charts";
import { IVisualizationProperties } from "../../../../../interfaces/Visualization.js";
import { IComparisonControlProperties } from "../../../../../interfaces/ControlProperties.js";
interface IColorItemProps {
    disabled: boolean;
    showDisabledMessage?: boolean;
    color: IColor;
    colorType: ComparisonColorType;
    colorPalette: IColorPalette;
    labelDescriptor: MessageDescriptor;
    properties: IVisualizationProperties<IComparisonControlProperties>;
    valuePath: string;
    pushData: PushDataCallback;
}
declare const ColorItem: React.FC<IColorItemProps>;
export default ColorItem;
//# sourceMappingURL=ColorItem.d.ts.map