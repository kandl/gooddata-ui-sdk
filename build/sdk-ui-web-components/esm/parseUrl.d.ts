/**
 * "none" means programmatic backend setup
 * "sso" means automatic Tiger SSO with redirection
 * "bearSso" means Service-provider initiated SAML SSO on Bear
 * "bear" means no SSO, just redirect to /account.html on the Bear server
 */
export type AuthType = "none" | "sso" | "bearSso" | "bear";
/**
 * @remarks
 * Parse script's own URL and return hostname, workspaceId and authType
 *
 * @example for URL patterns:
 *  * https://example.gooddata.com/components/my-worksapce.js - plain URL, no auto-auth
 *  * https://example.gooddata.com/components/my-workspace.js?auth=sso - auto-auth enabled for Tiger server
 *  * https://example.gooddata.com/components/index.js?workspace=my-workspace - an alternative workspaceId definition
 *
 *  An alternative way to define a workspaceId is used for a rare case when workspaceId would exactly match
 *  some other filename in the /components/ folder. I.e. nginx is set up to return the contents of the index.js
 *  instead of the /workspace-id.js only if the file workspace-id.js does not exist. If user has workspace id
 *  set to something like tigerBackend or bearBackend - this would not work as expected.
 *
 * @internal
 */
export declare const parseUrl: (scriptUrl: string) => {
    hostname?: string | undefined;
    workspaceId?: string | undefined;
    authType: AuthType;
};
//# sourceMappingURL=parseUrl.d.ts.map