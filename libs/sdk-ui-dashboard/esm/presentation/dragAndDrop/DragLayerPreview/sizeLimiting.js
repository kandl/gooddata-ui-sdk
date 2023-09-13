// (C) 2022 GoodData Corporation
import clamp from "lodash/clamp.js";
export function getLimitedSize(minimumSize, maximumSize, originalSize, deltaSize) {
    const newSize = originalSize + deltaSize;
    return clamp(newSize, minimumSize, maximumSize);
}
function getLimitReached(unlimitedSize, limitedSize, maximumSize) {
    const isLimited = limitedSize !== unlimitedSize;
    if (!isLimited) {
        return "none";
    }
    return unlimitedSize > maximumSize ? "max" : "min";
}
export function applySizeLimitation(minimumSize, maximumSize, originalSize, deltaSize) {
    const unlimitedSize = originalSize + deltaSize;
    const limitedSize = clamp(unlimitedSize, minimumSize, maximumSize);
    return {
        limitedSize,
        unlimitedSize,
        isLimited: limitedSize !== unlimitedSize,
        limitReached: getLimitReached(unlimitedSize, limitedSize, maximumSize),
    };
}
//# sourceMappingURL=sizeLimiting.js.map