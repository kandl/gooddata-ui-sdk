import React from "react";
import { IColor, IColorPaletteItem } from "@gooddata/sdk-model";
export interface IColorPaletteItemProps {
    selected: boolean;
    paletteItem: IColorPaletteItem;
    onColorSelected: (color: IColor) => void;
}
export default class ColorPaletteItem extends React.PureComponent<IColorPaletteItemProps> {
    private itemRef;
    constructor(props: IColorPaletteItemProps);
    render(): JSX.Element;
    componentDidMount(): void;
    private scrollSelectedItemIntoParent;
    private isItemVisible;
    private getClassNames;
    private getRgbStringFromPaletteItem;
    private onColorSelected;
}
//# sourceMappingURL=ColorPaletteItem.d.ts.map