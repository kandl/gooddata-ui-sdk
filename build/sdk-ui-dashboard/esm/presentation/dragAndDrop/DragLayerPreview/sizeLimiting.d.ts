import { ReachedResizingLimit } from "./types.js";
export declare function getLimitedSize(minimumSize: number, maximumSize: number, originalSize: number, deltaSize: number): number;
export declare function applySizeLimitation(minimumSize: number, maximumSize: number, originalSize: number, deltaSize: number): {
    limitedSize: number;
    unlimitedSize: number;
    isLimited: boolean;
    limitReached: ReachedResizingLimit;
};
