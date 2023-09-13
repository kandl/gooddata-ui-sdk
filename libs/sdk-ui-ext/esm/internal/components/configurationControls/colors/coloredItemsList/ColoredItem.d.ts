import React from "react";
import { WrappedComponentProps } from "react-intl";
import { IColor, IColorPalette } from "@gooddata/sdk-model";
import { IColoredItem } from "../../../../interfaces/Colors.js";
export interface IColoredItemProps {
    colorPalette: IColorPalette;
    className?: string;
    item?: IColoredItem;
    onSelect?: (source: IColoredItem, color: IColor) => void;
    showCustomPicker?: boolean;
    isSelected?: boolean;
    disabled?: boolean;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IColoredItemProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IColoredItemProps & WrappedComponentProps>;
};
export default _default;
//# sourceMappingURL=ColoredItem.d.ts.map