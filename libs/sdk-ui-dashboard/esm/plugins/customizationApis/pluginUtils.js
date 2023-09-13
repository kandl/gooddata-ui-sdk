// (C) 2021 GoodData Corporation
/**
 * Returns string that identifies a concrete plugin and can be used in log messages.
 *
 * @internal
 */
export function pluginDebugStr(plugin) {
    var _a;
    return `${(_a = plugin.debugName) !== null && _a !== void 0 ? _a : plugin.displayName}/${plugin.version}`;
}
//# sourceMappingURL=pluginUtils.js.map