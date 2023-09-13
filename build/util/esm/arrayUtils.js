// (C) 2007-2020 GoodData Corporation
/**
 * Shift array once to the right
 *
 * @param array - some array
 * @internal
 */
export function shiftArrayRight(array) {
    if (!(array === null || array === void 0 ? void 0 : array.length)) {
        return array;
    }
    const [last, ...res] = [...array].reverse();
    return [last, ...res.reverse()];
}
//# sourceMappingURL=arrayUtils.js.map