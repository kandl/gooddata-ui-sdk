import React from "react";
export declare enum DropdownVersionType {
    ColorPalette = 0,
    ColorPicker = 1
}
export interface IColorOverlayProps {
    alignTo: string;
    dropdownVersion: DropdownVersionType;
    onClose: () => void;
}
export default class ColorOverlay extends React.PureComponent<IColorOverlayProps> {
    componentWillUnmount(): void;
    render(): JSX.Element;
    private stopScrollingPropagation;
    private startScrollingPropagation;
    private stopPropagation;
    private getAlignPoints;
    private onClose;
}
//# sourceMappingURL=ColorOverlay.d.ts.map