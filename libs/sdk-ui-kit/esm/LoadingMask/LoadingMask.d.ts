import React, { CSSProperties } from "react";
/**
 * @internal
 */
export type SpinnerSize = "large" | "small";
/**
 * @internal
 */
export interface ILoadingMaskProps {
    className?: string;
    height?: CSSProperties["height"];
    width?: CSSProperties["width"];
    size?: SpinnerSize;
}
/**
 * @internal
 */
export declare const LoadingMask: React.FC<ILoadingMaskProps>;
//# sourceMappingURL=LoadingMask.d.ts.map