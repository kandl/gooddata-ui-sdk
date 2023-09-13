import React from "react";
import { Color, IIconProps } from "../typings.js";
/**
 * @internal
 */
export interface IRowsIconProps extends IIconProps {
    colorPalette?: {
        normalRow?: Color;
        totalRow?: Color;
    };
}
/**
 * @internal
 */
export declare const Rows: React.FC<IRowsIconProps>;
//# sourceMappingURL=Rows.d.ts.map