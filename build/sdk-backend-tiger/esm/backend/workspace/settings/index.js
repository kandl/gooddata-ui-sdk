import { TigerFeaturesService, pickContext } from "../../features/index.js";
import { DefaultUiSettings, DefaultUserSettings } from "../../uiSettings.js";
import { unwrapSettingContent } from "../../../convertors/fromBackend/SettingsConverter.js";
import { TigerSettingsService, mapTypeToKey } from "../../settings/index.js";
export class TigerWorkspaceSettings extends TigerSettingsService {
    constructor(authCall, workspace) {
        super();
        this.authCall = authCall;
        this.workspace = workspace;
    }
    getSettings() {
        return this.authCall(async (client) => {
            const { data: { meta: config }, } = (await client.entities.getEntityWorkspaces({
                id: this.workspace,
                metaInclude: ["config"],
            })).data;
            return Object.assign(Object.assign({ workspace: this.workspace }, DefaultUiSettings), config === null || config === void 0 ? void 0 : config.config);
        });
    }
    getSettingsForCurrentUser() {
        return getSettingsForCurrentUser(this.authCall, this.workspace);
    }
    async getSettingByType(type) {
        return this.authCall((client) => client.entities.getAllEntitiesWorkspaceSettings({
            workspaceId: this.workspace,
            origin: "NATIVE",
            filter: `type==${type}`,
        }));
    }
    async updateSetting(type, id, content) {
        return this.authCall(async (client) => client.entities.updateEntityWorkspaceSettings({
            workspaceId: this.workspace,
            objectId: id,
            jsonApiWorkspaceSettingInDocument: {
                data: {
                    type: "workspaceSetting",
                    id,
                    attributes: {
                        content,
                        type,
                    },
                },
            },
        }));
    }
    async createSetting(type, content) {
        return this.authCall(async (client) => client.entities.createEntityWorkspaceSettings({
            workspaceId: this.workspace,
            jsonApiWorkspaceSettingPostOptionalIdDocument: {
                data: {
                    type: "workspaceSetting",
                    attributes: {
                        content,
                        type,
                    },
                },
            },
        }));
    }
    async deleteSettingByType(type) {
        const settings = await this.getSettingByType(type);
        for (const setting of settings.data.data) {
            await this.authCall(async (client) => client.entities.deleteEntityWorkspaceSettings({
                workspaceId: this.workspace,
                objectId: setting.id,
            }));
        }
    }
}
/**
 * @internal
 */
async function resolveSettings(authCall, workspace) {
    const { data } = await authCall(async (client) => client.actions.workspaceResolveAllSettings({
        workspaceId: workspace,
    }));
    return data.reduce((result, setting) => {
        return Object.assign(Object.assign({}, result), { [mapTypeToKey(setting.type, setting.id)]: unwrapSettingContent(setting.content) });
    }, {});
}
/**
 * Expose this wrapper to other SPI implementations
 *
 * @internal
 */
export function getSettingsForCurrentUser(authCall, workspace) {
    return authCall(async (client) => {
        const { data: { meta: config, attributes }, } = (await client.entities.getEntityWorkspaces({
            id: workspace,
            metaInclude: ["config"],
        })).data;
        const resolvedSettings = await resolveSettings(authCall, workspace);
        const profile = await client.profile.getCurrent();
        const features = await new TigerFeaturesService(authCall).getFeatures(profile, pickContext(attributes, profile.organizationId));
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, DefaultUserSettings), { userId: profile.userId, workspace }), config === null || config === void 0 ? void 0 : config.config), features), resolvedSettings);
    });
}
//# sourceMappingURL=index.js.map