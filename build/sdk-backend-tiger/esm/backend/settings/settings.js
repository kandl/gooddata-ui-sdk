// (C) 2020-2023 GoodData Corporation
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import { v4 as uuidv4 } from "uuid";
import { convertApiError } from "../../utils/errorHandling.js";
export class TigerSettingsService {
    constructor() { }
    async getSettings() {
        throw new UnexpectedError("This method needs to be implemented.");
    }
    async setLocale(locale) {
        return this.setSetting("LOCALE", { value: locale });
    }
    async setSetting(type, content) {
        var _a, _b;
        try {
            const { data } = await this.getSettingByType(type);
            const settings = data.data;
            if (settings.length === 0) {
                const id = uuidv4();
                await this.createSetting(type, id, content);
            }
            else {
                const record = settings[0];
                await this.updateSetting((_b = (_a = record.attributes) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : type, record.id, content);
            }
        }
        catch (error) {
            throw convertApiError(error);
        }
    }
    async getSettingByType(_type) {
        throw new UnexpectedError("This method needs to be implemented.");
    }
    async deleteSettingByType(_type) {
        throw new UnexpectedError("This method needs to be implemented.");
    }
    async updateSetting(_type, _id, _content) {
        throw new UnexpectedError("This method needs to be implemented.");
    }
    async createSetting(_type, _id, _content) {
        throw new UnexpectedError("This method needs to be implemented.");
    }
}
//# sourceMappingURL=settings.js.map