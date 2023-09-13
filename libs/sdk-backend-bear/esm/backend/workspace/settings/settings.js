// (C) 2019-2022 GoodData Corporation
import { NotSupported, } from "@gooddata/sdk-backend-spi";
import { userLoginMd5FromAuthenticatedPrincipalWithAnonymous } from "../../../utils/api.js";
import { ANONYMOUS_USER_SETTINGS } from "../../constants.js";
import { DefaultUiSettings } from "../../../uiSettings.js";
// settings which are ignored from user level as they can be set up only for project and above levels
// no explicit type as every string is valid key from IUserWorkspaceSettings
const IGNORED_USER_SETTINGS = [
    "enableAnalyticalDashboardPermissions",
    "enableNewAnalyticalDashboardsNavigation",
];
const filterIgnoredUserSettings = (userFeatureFlags) => {
    const keptUserSettings = Object.assign({}, userFeatureFlags);
    for (const settingName of IGNORED_USER_SETTINGS) {
        delete keptUserSettings[settingName];
    }
    return keptUserSettings;
};
export const mergeWorkspaceAndUserSettings = (workspaceFeatureFlags, userFeatureFlags) => {
    return Object.assign(Object.assign({}, workspaceFeatureFlags), filterIgnoredUserSettings(userFeatureFlags));
};
export class BearWorkspaceSettings {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    getSettings() {
        return this.authCall(async (sdk) => {
            const flags = await sdk.project.getProjectFeatureFlags(this.workspace);
            return Object.assign(Object.assign(Object.assign({}, DefaultUiSettings), { workspace: this.workspace }), flags);
        });
    }
    getSettingsForCurrentUser() {
        return this.authCall(async (sdk, { getPrincipal }) => {
            const userLoginMd5 = await userLoginMd5FromAuthenticatedPrincipalWithAnonymous(getPrincipal);
            // for anonymous users, return defaults with just the workspace settings
            if (!userLoginMd5) {
                const workspaceSettings = await this.getSettings();
                return Object.assign(Object.assign(Object.assign({}, DefaultUiSettings), ANONYMOUS_USER_SETTINGS), workspaceSettings);
            }
            const [workspaceFeatureFlags, userFeatureFlags, currentProfile, separators] = await Promise.all([
                sdk.project.getProjectFeatureFlags(this.workspace),
                // the getUserFeatureFlags returns all the feature flags (including the defaults)
                // so we have to filter only the user specific values so as not to use defaults everywhere
                sdk.user.getUserFeatureFlags(userLoginMd5, ["user"]),
                sdk.user.getCurrentProfile(),
                sdk.user.getUserRegionalNumberFormatting(userLoginMd5),
            ]);
            const { language } = currentProfile;
            return Object.assign(Object.assign(Object.assign({}, DefaultUiSettings), { userId: userLoginMd5, workspace: this.workspace, locale: language, separators: separators }), mergeWorkspaceAndUserSettings(workspaceFeatureFlags, userFeatureFlags));
        });
    }
    setLocale(_locale) {
        throw new NotSupported("Backend does not support workspace locale setup");
    }
}
//# sourceMappingURL=settings.js.map