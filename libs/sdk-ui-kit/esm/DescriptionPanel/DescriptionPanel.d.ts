import React from "react";
import { ArrowOffsets } from "../Bubble/index.js";
/**
 * @internal
 */
export declare const DESCRIPTION_PANEL_ALIGN_POINTS: {
    align: string;
}[];
/**
 * @internal
 */
export declare const DESCRIPTION_PANEL_ARROW_OFFSETS: {
    "br tr": number[];
    "bc tc": number[];
    "bl tl": number[];
    "tr br": number[];
    "tc bc": number[];
    "tl bl": number[];
    "tr tl": number[];
    "cr cl": number[];
    "br bl": number[];
    "tl tr": number[];
    "cl cr": number[];
    "bl br": number[];
};
/**
 * @internal
 */
export interface IDescriptionTriggerProps {
    className?: string;
}
/**
 * @internal
 */
export interface IDescriptionPanelProps {
    title?: string;
    description?: string;
    locale?: string;
    className?: string;
    onBubbleOpen?: () => void;
    arrowOffsets?: ArrowOffsets;
}
/**
 * @internal
 */
export declare const DescriptionPanel: React.FC<IDescriptionPanelProps>;
/**
 * @internal
 */
export declare const DescriptionPanelContent: React.FC<IDescriptionPanelProps>;
/**
 * @internal
 */
export declare const DescriptionIcon: React.FC<IDescriptionTriggerProps>;
//# sourceMappingURL=DescriptionPanel.d.ts.map