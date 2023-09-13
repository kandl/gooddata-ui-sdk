/**
 * @alpha
 */
export class DecoratedWorkspaceSettingsService {
    constructor(decorated) {
        this.decorated = decorated;
    }
    async getSettings() {
        return this.decorated.getSettings();
    }
    async getSettingsForCurrentUser() {
        return this.decorated.getSettingsForCurrentUser();
    }
    async setLocale(locale) {
        return this.decorated.setLocale(locale);
    }
}
//# sourceMappingURL=workspaceSettings.js.map