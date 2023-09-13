// (C) 2020-2022 GoodData Corporation
import { NotSupported } from "@gooddata/sdk-backend-spi";
import { userLoginMd5FromAuthenticatedPrincipalWithAnonymous } from "../../utils/api.js";
import { ANONYMOUS_USER_SETTINGS } from "../constants.js";
import { DefaultUiSettings } from "../../uiSettings.js";
export class BearUserSettingsService {
    constructor(authCall) {
        this.authCall = authCall;
    }
    async getSettings() {
        return this.authCall(async (sdk, { getPrincipal }) => {
            const userLoginMd5 = await userLoginMd5FromAuthenticatedPrincipalWithAnonymous(getPrincipal);
            // for anonymous users, return defaults
            if (!userLoginMd5) {
                return ANONYMOUS_USER_SETTINGS;
            }
            const [flags, currentProfile, separators] = await Promise.all([
                sdk.user.getUserFeatureFlags(userLoginMd5),
                sdk.user.getCurrentProfile(),
                sdk.user.getUserRegionalNumberFormatting(userLoginMd5),
            ]);
            const { language } = currentProfile;
            return Object.assign(Object.assign(Object.assign({}, DefaultUiSettings), { userId: userLoginMd5, locale: language, separators }), flags);
        });
    }
    setLocale(_locale) {
        throw new NotSupported("Backend does not support user locale setup");
    }
}
//# sourceMappingURL=settings.js.map