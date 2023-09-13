import { unwrapSettingContent } from "../../convertors/fromBackend/SettingsConverter.js";
import { TigerSettingsService, mapTypeToKey } from "../settings/index.js";
export class OrganizationSettingsService extends TigerSettingsService {
    constructor(authCall) {
        super();
        this.authCall = authCall;
    }
    async setWhiteLabeling(whiteLabeling) {
        return this.setSetting("WHITE_LABELING", whiteLabeling);
    }
    async setTimezone(timezone) {
        return this.setSetting("TIMEZONE", { value: timezone });
    }
    async setDateFormat(dateFormat) {
        return this.setSetting("FORMAT_LOCALE", { value: dateFormat });
    }
    async setWeekStart(weekStart) {
        return this.setSetting("WEEK_START", { value: weekStart });
    }
    async setTheme(activeThemeId) {
        return this.setSetting("ACTIVE_THEME", { id: activeThemeId, type: "theme" });
    }
    async deleteTheme() {
        return this.deleteSettingByType("ACTIVE_THEME");
    }
    async setColorPalette(activeColorPaletteId) {
        return this.setSetting("ACTIVE_COLOR_PALETTE", { id: activeColorPaletteId, type: "colorPalette" });
    }
    async deleteColorPalette() {
        return this.deleteSettingByType("ACTIVE_COLOR_PALETTE");
    }
    async getSettings() {
        const { data } = await this.authCall(async (client) => client.entities.getAllEntitiesOrganizationSettings({}));
        return data.data.reduce((result, setting) => {
            var _a, _b;
            return Object.assign(Object.assign({}, result), { [mapTypeToKey((_a = setting.attributes) === null || _a === void 0 ? void 0 : _a.type, setting.id)]: unwrapSettingContent((_b = setting.attributes) === null || _b === void 0 ? void 0 : _b.content) });
        }, {});
    }
    async getSettingByType(type) {
        return this.authCall((client) => client.entities.getAllEntitiesOrganizationSettings({
            filter: `type==${type}`,
        }));
    }
    async updateSetting(type, id, content) {
        return this.authCall((client) => client.entities.updateEntityOrganizationSettings({
            id,
            jsonApiOrganizationSettingInDocument: {
                data: {
                    type: "organizationSetting",
                    id,
                    attributes: {
                        content,
                        type,
                    },
                },
            },
        }));
    }
    async createSetting(type, id, content) {
        return this.authCall((client) => client.entities.createEntityOrganizationSettings({
            jsonApiOrganizationSettingInDocument: {
                data: {
                    type: "organizationSetting",
                    id,
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
            await this.authCall((client) => client.entities.deleteEntityOrganizationSettings({ id: setting.id }));
        }
    }
}
//# sourceMappingURL=settings.js.map