// (C) 2007-2021 GoodData Corporation
/**
 * @internal
 */
export function activateHeaderMenuItems(items, ids) {
    return items.map((headerMenuList) => headerMenuList.map((item) => (Object.assign(Object.assign({}, item), { isActive: ids.indexOf(item.key) >= 0 }))));
}
//# sourceMappingURL=activateHeaderMenuItems.js.map