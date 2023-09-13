// (C) 2007-2022 GoodData Corporation
import qs from "qs";
import { ProjectModule } from "./project.js";
import { parseSettingItemValue } from "./util.js";
export class UserModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    /**
     * Find out whether a user is logged in
     *
     * @returns resolves with true if user logged in, false otherwise
     */
    async isLoggedIn() {
        var _a;
        try {
            const result = await this.xhr.get("/gdc/account/token");
            return !!result.response.ok;
        }
        catch (err) {
            if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                return false;
            }
            throw err;
        }
    }
    /**
     * Find out whether a specified project is available to a currently logged user
     *
     * @param projectId - A project identifier
     * @returns Resolves with true if user logged in and project available,
     *                   resolves with false if user logged in and project not available,
     *                   rejects if user not logged in
     */
    async isLoggedInProject(projectId) {
        const profile = await this.getCurrentProfile();
        const projectModule = new ProjectModule(this.xhr);
        const projects = await projectModule.getProjects(profile.links.self.split("/")[4]);
        return projects.some((p) => { var _a; return ((_a = p.links) === null || _a === void 0 ? void 0 : _a.self) === `/gdc/projects/${projectId}`; });
    }
    /**
     * This function provides an authentication entry point to the GD API. It is needed to authenticate
     * by calling this function prior any other API calls. After providing valid credentials
     * every subsequent API call in a current session will be authenticated.
     */
    login(username, password) {
        return this.xhr.postParsed("/gdc/account/login", {
            body: JSON.stringify({
                postUserLogin: {
                    login: username,
                    password,
                    remember: 1,
                    captcha: "",
                    verifyCaptcha: "",
                },
            }),
        });
    }
    /**
     * This function provides an authentication entry point to the GD API via SSO
     * https://help.gooddata.com/display/developer/GoodData+PGP+Single+Sign-On
     *
     * @param encryptedClaims - PGP message
     * @param ssoProvider - name of the SSO provider
     * @param targetUrl - where to redirect after the SSO flow, set this to `/gdc/account/token`
     */
    loginSso(encryptedClaims, ssoProvider, targetUrl) {
        return this.xhr.post("/gdc/account/customerlogin", {
            data: {
                pgpLoginRequest: {
                    targetUrl,
                    ssoProvider,
                    encryptedClaims,
                },
            },
        });
    }
    /**
     * Logs out current user
     */
    async logout() {
        const isLoggedIn = await this.isLoggedIn();
        if (isLoggedIn) {
            const { logoutUri } = await this.getAccountInfo();
            return this.xhr.del(logoutUri);
        }
    }
    /**
     * Gets current user's profile
     * @returns Resolves with account setting object
     */
    getCurrentProfile() {
        return this.xhr
            .getParsed("/gdc/account/profile/current")
            .then((r) => r.accountSetting);
    }
    /**
     * Gets user's regional number formatting configuration
     * @param userId - loginMD5
     * @returns Resolves with separators setting object
     */
    getUserRegionalNumberFormatting(userId) {
        return this.xhr
            .getParsed(`/gdc/account/profile/${userId}/settings/separators`)
            .then((res) => ({
            decimal: res.separators.decimal,
            thousand: res.separators.thousand,
        }));
    }
    /**
     * Updates user's profile settings
     * @param profileId - User profile identifier
     * @param profileSetting - the profile setting update payload
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    updateProfileSettings(profileId, profileSetting) {
        return this.xhr.put(`/gdc/account/profile/${profileId}/settings`, {
            body: profileSetting,
        });
    }
    /**
     * Returns info about currently logged in user from bootstrap resource
     */
    async getAccountInfo() {
        const { accountInfo } = await this.xhr.getParsed("/gdc/app/account/bootstrap/account");
        return accountInfo;
    }
    /**
     * Gets user configs including user specific feature flags
     *
     * @param userId - A user identifier
     * @returns An array of user configs setting item
     */
    async getUserConfigs(userId) {
        const userConfig = await this.xhr.getParsed(`/gdc/account/profile/${userId}/config`);
        return userConfig.settings.items || [];
    }
    /**
     * Gets user specific feature flags
     *
     * @param userId - A user identifier
     * @param sourceFilter - Optional list of setting item sources to include. Defaults to including everything
     * @returns Hash table of feature flags and their values where feature flag is the key
     */
    getUserFeatureFlags(userId, sourceFilter) {
        return this.getUserConfigs(userId).then((settingItems) => {
            const filteredSettingItems = sourceFilter
                ? settingItems.filter((item) => sourceFilter.includes(item.settingItem.source))
                : settingItems;
            const featureFlags = {};
            filteredSettingItems.forEach((settingItem) => {
                featureFlags[settingItem.settingItem.key] = parseSettingItemValue(settingItem.settingItem.value);
            });
            return featureFlags;
        });
    }
    /**
     * Returns the feature flags valid for the currently logged in user.
     */
    async getFeatureFlags() {
        const { featureFlags } = await this.xhr.getParsed("/gdc/app/account/bootstrap/featureFlags");
        return featureFlags;
    }
    async getCurrentOrganization() {
        return this.xhr.getParsed("/gdc/app/organization/current");
    }
    /**
     * Returns bootstrap resource for the currently logged in user.
     */
    getBootstrapResource(options = {}) {
        const { projectId, productId, clientId, loadAnalyticalDashboards = true } = options;
        let uri = `/gdc/app/account/bootstrap?loadAnalyticalDashboards=${loadAnalyticalDashboards}`;
        if (projectId) {
            uri = `${uri}&projectUri=/gdc/projects/${projectId}`;
        }
        else if (productId && clientId) {
            // projectId can be replaced by combination of productId + clientId
            uri = `${uri}&projectUri=/gdc/projects/client:${productId}:${clientId}`;
        }
        return this.xhr.getParsed(uri);
    }
    /**
     * Initiates SPI SAML SSO.
     *
     * @param relayState - URL of the page where the user is redirected after a successful login
     */
    initiateSamlSso(relayState) {
        /*
         * make sure code does not try to get new token before initiating the SAML; the token request would
         * fail and prevent the samlrequest call; there is no point in getting token anyway because it is just
         * now that the client is initializing the session security context.
         */
        this.xhr.ensureNoLeadingTokenRequest();
        return this.xhr
            .get(`/gdc/account/samlrequest?${qs.stringify({ relayState })}`)
            .then((data) => data.getData())
            .then((response) => {
            const loginUrl = response.samlRequests.items[0].samlRequest.loginUrl;
            window.location.assign(loginUrl);
        });
    }
}
//# sourceMappingURL=user.js.map