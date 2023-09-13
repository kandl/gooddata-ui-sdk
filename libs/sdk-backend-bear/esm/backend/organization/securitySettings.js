// (C) 2021-2022 GoodData Corporation
import { validatePluginUrlIsSane } from "@gooddata/sdk-backend-base";
import isEmpty from "lodash/isEmpty.js";
export class SecuritySettingsService {
    /**
     * Constructs a new SecuritySettingsService
     * @param authCall - call guard to perform API calls through
     * @param scope - URI of the scope. For now only the organization (domain) URI is supported by the backend.
     *  The plan is to support also workspace URI and user profile URI.
     */
    constructor(authCall, scope) {
        this.authCall = authCall;
        this.scope = scope;
        this.isUrlValid = (url, context) => {
            return this.authCall(async (sdk) => sdk.xhr
                .postParsed("/gdc/securitySettings/validate", {
                body: {
                    validationRequest: {
                        type: context,
                        value: url,
                        scope: this.scope,
                    },
                },
            })
                .then(({ validationResponse }) => {
                return validationResponse.valid;
            }));
        };
        this.isDashboardPluginUrlValid = async (url, workspace) => {
            var _a;
            const sanitizationError = validatePluginUrlIsSane(url);
            if (sanitizationError) {
                console.warn("Dashboard plugin URL is not valid: ", sanitizationError);
                return false;
            }
            const setting = await this.authCall(async (sdk) => {
                return sdk.project.getConfigItem(workspace, "dashboardPluginHosts");
            });
            return validateAgainstList(url, (_a = setting === null || setting === void 0 ? void 0 : setting.settingItem) === null || _a === void 0 ? void 0 : _a.value);
        };
    }
}
export function validateAgainstList(url, listContent) {
    if (!listContent || isEmpty(listContent) || typeof listContent !== "string") {
        return false;
    }
    const allowedHosts = listContent
        .split(";")
        .map((entry) => entry.trim())
        .filter((entry) => !isEmpty(entry));
    return allowedHosts.some((host) => url.startsWith(host));
}
//# sourceMappingURL=securitySettings.js.map