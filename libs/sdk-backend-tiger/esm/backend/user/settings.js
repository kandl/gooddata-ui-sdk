import { TigerFeaturesService } from "../features/index.js";
import { DefaultUserSettings } from "../uiSettings.js";
import { TigerSettingsService, mapTypeToKey } from "../settings/index.js";
import { unwrapSettingContent } from "../../convertors/fromBackend/SettingsConverter.js";
export class TigerUserSettingsService extends TigerSettingsService {
    constructor(authCall) {
        super();
        this.authCall = authCall;
    }
    async getSettings() {
        return this.authCall(async (client) => {
            const profile = await client.profile.getCurrent();
            const features = await new TigerFeaturesService(this.authCall).getFeatures(profile);
            const { data } = await client.actions.resolveAllSettingsWithoutWorkspace();
            const resolvedSettings = data.reduce((result, setting) => (Object.assign(Object.assign({}, result), { [mapTypeToKey(setting.type, setting.id)]: unwrapSettingContent(setting.content) })), {});
            return Object.assign(Object.assign(Object.assign(Object.assign({}, DefaultUserSettings), features), resolvedSettings), { userId: profile.userId });
        });
    }
    async getSettingByType(type) {
        return this.authCall(async (client) => {
            const profile = await client.profile.getCurrent();
            return client.entities.getAllEntitiesUserSettings({
                userId: profile.userId,
                filter: `type==${type}`,
            });
        });
    }
    async updateSetting(type, id, content) {
        return this.authCall(async (client) => {
            const profile = await client.profile.getCurrent();
            return client.entities.updateEntityUserSettings({
                id,
                userId: profile.userId,
                jsonApiUserSettingInDocument: {
                    data: {
                        type: "userSetting",
                        id,
                        attributes: {
                            content,
                            type,
                        },
                    },
                },
            });
        });
    }
    async createSetting(type, id, content) {
        return this.authCall(async (client) => {
            const profile = await client.profile.getCurrent();
            return client.entities.createEntityUserSettings({
                userId: profile.userId,
                jsonApiUserSettingInDocument: {
                    data: {
                        type: "userSetting",
                        id,
                        attributes: {
                            content,
                            type,
                        },
                    },
                },
            });
        });
    }
    async deleteSettingByType(type) {
        const settings = await this.getSettingByType(type);
        for (const setting of settings.data.data) {
            await this.authCall(async (client) => {
                const profile = await client.profile.getCurrent();
                return client.entities.deleteEntityUserSettings({
                    userId: profile.userId,
                    id: setting.id,
                });
            });
        }
    }
}
//# sourceMappingURL=settings.js.map