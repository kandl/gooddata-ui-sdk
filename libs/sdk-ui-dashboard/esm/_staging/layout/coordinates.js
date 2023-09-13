// (C) 2019-2022 GoodData Corporation
/**
 * @internal
 */
export function getLayoutCoordinates(item) {
    var _a;
    return {
        sectionIndex: (_a = item.section()) === null || _a === void 0 ? void 0 : _a.index(),
        itemIndex: item.index(),
    };
}
//# sourceMappingURL=coordinates.js.map