import { TigerUserSettingsService } from "./settings.js";
import { convertUser } from "../../convertors/fromBackend/UsersConverter.js";
export class TigerUserService {
    constructor(authCall) {
        this.authCall = authCall;
    }
    settings() {
        return new TigerUserSettingsService(this.authCall);
    }
    async getUser() {
        return this.authCall(async (client) => {
            return convertUser(await client.profile.getCurrent());
        });
    }
}
//# sourceMappingURL=index.js.map