import React from "react";
import { IRgbColorValue } from "@gooddata/sdk-model";
import { ISelectableChild } from "../colorDropdown/ColorDropdown.js";
export interface IColoredItemContentProps extends ISelectableChild {
    color: IRgbColorValue;
    text: string;
}
export default class ColoredItemContent extends React.PureComponent<IColoredItemContentProps> {
    render(): JSX.Element;
    private getIconStyle;
    private getClassName;
    private getBackgroundColor;
}
//# sourceMappingURL=ColoredItemContent.d.ts.map