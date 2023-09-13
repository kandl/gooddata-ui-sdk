// (C) 2021-2022 GoodData Corporation
/**
 * Abstract base class for the Dashboard Plugin.
 *
 * @remarks
 * Each plugin should extend this class and implement at least the {@link DashboardPluginV1.register} method.
 *
 * @public
 */
export class DashboardPluginV1 {
    constructor() {
        this._pluginVersion = "1.0";
        this.minEngineVersion = "bundled";
        this.maxEngineVersion = "bundled";
    }
}
//# sourceMappingURL=plugin.js.map