import { XhrModule, ApiResponse } from "./xhr.js";
import { IAccountInfo, IAccountSetting, IBootstrapResource, ISeparators, IFeatureFlags, IOrganization } from "@gooddata/api-model-bear";
export interface IUserConfigsSettingItem {
    settingItem: {
        key: string;
        links: {
            self: string;
        };
        source: string;
        value: string;
    };
}
export interface IUserConfigsResponse {
    settings: {
        items: IUserConfigsSettingItem[];
    };
}
export declare class UserModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * Find out whether a user is logged in
     *
     * @returns resolves with true if user logged in, false otherwise
     */
    isLoggedIn(): Promise<boolean>;
    /**
     * Find out whether a specified project is available to a currently logged user
     *
     * @param projectId - A project identifier
     * @returns Resolves with true if user logged in and project available,
     *                   resolves with false if user logged in and project not available,
     *                   rejects if user not logged in
     */
    isLoggedInProject(projectId: string): Promise<boolean>;
    /**
     * This function provides an authentication entry point to the GD API. It is needed to authenticate
     * by calling this function prior any other API calls. After providing valid credentials
     * every subsequent API call in a current session will be authenticated.
     */
    login(username: string, password: string): Promise<any>;
    /**
     * This function provides an authentication entry point to the GD API via SSO
     * https://help.gooddata.com/display/developer/GoodData+PGP+Single+Sign-On
     *
     * @param encryptedClaims - PGP message
     * @param ssoProvider - name of the SSO provider
     * @param targetUrl - where to redirect after the SSO flow, set this to `/gdc/account/token`
     */
    loginSso(encryptedClaims: string, ssoProvider: string, targetUrl: string): Promise<ApiResponse<any>>;
    /**
     * Logs out current user
     */
    logout(): Promise<ApiResponse | void>;
    /**
     * Gets current user's profile
     * @returns Resolves with account setting object
     */
    getCurrentProfile(): Promise<IAccountSetting>;
    /**
     * Gets user's regional number formatting configuration
     * @param userId - loginMD5
     * @returns Resolves with separators setting object
     */
    getUserRegionalNumberFormatting(userId: string): Promise<ISeparators>;
    /**
     * Updates user's profile settings
     * @param profileId - User profile identifier
     * @param profileSetting - the profile setting update payload
     */
    updateProfileSettings(profileId: string, profileSetting: any): Promise<ApiResponse>;
    /**
     * Returns info about currently logged in user from bootstrap resource
     */
    getAccountInfo(): Promise<IAccountInfo>;
    /**
     * Gets user configs including user specific feature flags
     *
     * @param userId - A user identifier
     * @returns An array of user configs setting item
     */
    getUserConfigs(userId: string): Promise<IUserConfigsSettingItem[]>;
    /**
     * Gets user specific feature flags
     *
     * @param userId - A user identifier
     * @param sourceFilter - Optional list of setting item sources to include. Defaults to including everything
     * @returns Hash table of feature flags and their values where feature flag is the key
     */
    getUserFeatureFlags(userId: string, sourceFilter?: string[]): Promise<IFeatureFlags>;
    /**
     * Returns the feature flags valid for the currently logged in user.
     */
    getFeatureFlags(): Promise<IFeatureFlags>;
    getCurrentOrganization(): Promise<IOrganization>;
    /**
     * Returns bootstrap resource for the currently logged in user.
     */
    getBootstrapResource(options?: {
        projectId?: string;
        productId?: string;
        clientId?: string;
        loadAnalyticalDashboards?: boolean;
    }): Promise<IBootstrapResource>;
    /**
     * Initiates SPI SAML SSO.
     *
     * @param relayState - URL of the page where the user is redirected after a successful login
     */
    initiateSamlSso(relayState: string): Promise<void>;
}
//# sourceMappingURL=user.d.ts.map