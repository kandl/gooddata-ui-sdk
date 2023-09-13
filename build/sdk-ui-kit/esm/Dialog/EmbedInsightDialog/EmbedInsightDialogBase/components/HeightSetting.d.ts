import React from "react";
import { UnitsType } from "../types.js";
/**
 * @internal
 */
export interface IHeightSettingProps {
    value?: string;
    unit?: UnitsType;
    onValueChange: (value: string, unit: UnitsType) => void;
}
/**
 * @internal
 */
export declare const HeightSetting: React.VFC<IHeightSettingProps>;
//# sourceMappingURL=HeightSetting.d.ts.map