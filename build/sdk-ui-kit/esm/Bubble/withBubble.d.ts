import React from "react";
import { IAlignPoint } from "../typings/positioning.js";
/**
 * @internal
 */
export interface IWithBubbleProps {
    showBubble?: boolean;
    alignPoints?: IAlignPoint[];
    bubbleTextId?: string;
    triggerClassName?: string;
}
/**
 * @internal
 */
export declare function withBubble<T>(WrappedComponent: React.ComponentType<T>): React.FC<T & IWithBubbleProps>;
//# sourceMappingURL=withBubble.d.ts.map