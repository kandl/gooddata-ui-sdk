import React from "react";
import { IAlignPoint } from "../typings/positioning.js";
import { ArrowOffset } from "../Bubble/index.js";
/**
 * @internal
 */
export interface ITooltipIconProps {
    text: string;
    iconClass: string;
    alignPoints?: IAlignPoint[];
    arrowOffsets?: Record<string, ArrowOffset>;
}
/**
 * @internal
 */
export declare const TooltipIcon: React.FC<ITooltipIconProps>;
//# sourceMappingURL=TooltipIcon.d.ts.map