/**
 * @internal
 */
export function isDraggableInternalItemType(type) {
    return type === "internal-width-resizer" || type === "internal-height-resizer";
}
/**
 * @internal
 */
export function isAttributeFilterDraggableItem(item) {
    return item.type === "attributeFilter";
}
/**
 * @internal
 */
export function isBaseDraggableLayoutItem(item) {
    var _a, _b;
    return ((_a = item.size) === null || _a === void 0 ? void 0 : _a.gridWidth) !== undefined && ((_b = item.size) === null || _b === void 0 ? void 0 : _b.gridHeight) !== undefined;
}
/**
 * @internal
 */
export function isBaseDraggableMovingItem(item) {
    return isBaseDraggableLayoutItem(item) && item.sectionIndex !== undefined && item.itemIndex !== undefined;
}
/**
 * @internal
 */
export function isInsightDraggableItem(item) {
    return item.type === "insight";
}
/**
 * @internal
 */
export function isKpiDraggableItem(item) {
    return item.type === "kpi";
}
/**
 * @internal
 */
export function isAttributeFilterPlaceholderDraggableItem(item) {
    return item.type === "attributeFilter-placeholder";
}
/**
 * @internal
 */
export function isKpiPlaceholderDraggableItem(item) {
    return item.type === "kpi-placeholder";
}
/**
 * @internal
 */
export function isInsightPlaceholderDraggableItem(item) {
    return item.type === "insight-placeholder";
}
/**
 * @internal
 */
export function isInsightDraggableListItem(item) {
    return item.type === "insightListItem";
}
//# sourceMappingURL=types.js.map