import { BearUserSettingsService } from "./settings.js";
import { convertUser } from "../../convertors/fromBackend/UsersConverter.js";
export class BearUserService {
    constructor(authCall) {
        this.authCall = authCall;
    }
    settings() {
        return new BearUserSettingsService(this.authCall);
    }
    getUser() {
        return this.authCall(async (sdk) => {
            const accountSettings = await sdk.user.getCurrentProfile();
            return convertUser(accountSettings);
        });
    }
}
//# sourceMappingURL=index.js.map