export function getRefsForSection(section) {
    return section.items().map((item) => item.ref());
}
export function getRefsForItem(item) {
    return [item.ref()];
}
//# sourceMappingURL=refs.js.map