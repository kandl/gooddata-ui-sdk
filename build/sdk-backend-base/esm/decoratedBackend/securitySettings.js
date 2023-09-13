// (C) 2021 GoodData Corporation
/**
 * @alpha
 */
export class DecoratedSecuritySettingsService {
    constructor(decorated) {
        this.decorated = decorated;
        this.scope = this.decorated.scope;
    }
    isUrlValid(url, context) {
        return this.decorated.isUrlValid(url, context);
    }
    isDashboardPluginUrlValid(url, workspace) {
        return this.decorated.isDashboardPluginUrlValid(url, workspace);
    }
}
//# sourceMappingURL=securitySettings.js.map