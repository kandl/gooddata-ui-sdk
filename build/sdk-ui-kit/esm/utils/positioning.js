export const positioningToAlignPoints = (positioning) => positioning.map(({ snapPoints, offset }) => ({
    align: `${snapPoints.parent} ${snapPoints.child}`,
    offset,
}));
//# sourceMappingURL=positioning.js.map