import React from "react";
import { Color, IIconProps } from "../typings.js";
/**
 * @internal
 */
export interface IColumnsIconProps extends IIconProps {
    colorPalette?: {
        normalColumn?: Color;
        totalColumn?: Color;
    };
}
/**
 * @internal
 */
export declare const Columns: React.FC<IColumnsIconProps>;
//# sourceMappingURL=Columns.d.ts.map