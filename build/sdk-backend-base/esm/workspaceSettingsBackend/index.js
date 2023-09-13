// (C) 2021-2022 GoodData Corporation
import identity from "lodash/identity.js";
import { decoratedBackend } from "../decoratedBackend/index.js";
import { DecoratedWorkspaceSettingsService } from "../decoratedBackend/workspaceSettings.js";
class WithModifiedWorkspaceSettingsService extends DecoratedWorkspaceSettingsService {
    constructor(decorated, settingsWrapper, currentUserSettingsWrapper, commonSettingsSetter) {
        super(decorated);
        this.settingsWrapper = settingsWrapper;
        this.currentUserSettingsWrapper = currentUserSettingsWrapper;
        this.commonSettingsSetter = commonSettingsSetter;
    }
    async getSettings() {
        const settings = await this.decorated.getSettings();
        return this.settingsWrapper(Object.assign(Object.assign({}, settings), this.commonSettingsSetter(settings)));
    }
    async getSettingsForCurrentUser() {
        const currentUserSettings = await this.decorated.getSettingsForCurrentUser();
        return this.currentUserSettingsWrapper(Object.assign(Object.assign({}, currentUserSettings), this.commonSettingsSetter(currentUserSettings)));
    }
}
function customWorkspaceSettings(config) {
    const emptySettingsSetter = () => ({});
    return (original) => new WithModifiedWorkspaceSettingsService(original, config.settingsWrapper || identity, config.currentUserSettingsWrapper || identity, config.commonSettingsWrapper || emptySettingsSetter);
}
/**
 * Adjusts workspace configs and current user configs from the real backend.
 *
 * @remarks see {@link WorkspaceSettingsConfiguration} properties for more information.
 * @param realBackend - real backend to decorate with custom workspace settings
 * @param config - workspace configs configuration
 * @beta
 */
export function withCustomWorkspaceSettings(realBackend, config) {
    const workspaceSettings = customWorkspaceSettings(config);
    return decoratedBackend(realBackend, { workspaceSettings });
}
//# sourceMappingURL=index.js.map