// (C) 2022 GoodData Corporation
/**
 * Returns the value if it is non-empty or a fallback text.
 *
 * @param value - value to handle
 * @param emptyValueText - text to display if value is empty
 * @internal
 */
export function valueWithEmptyHandling(value, emptyValueText) {
    return value || emptyValueText; // TODO: RAIL-4360 distinguish between empty and null
}
//# sourceMappingURL=valueWithEmptyHandling.js.map