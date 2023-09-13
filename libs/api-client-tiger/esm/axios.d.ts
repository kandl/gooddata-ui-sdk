import { AxiosInstance, CreateAxiosDefaults } from "axios";
/**
 * Returns an instance of axios with default configuration.
 */
export declare const axios: AxiosInstance;
/**
 * This function sets global API token to send in Authorization header on all API calls done by axios. If the token is
 * undefined then no Authorization header will be sent.
 *
 * Make your code obtain the token as you see fit (for instance from env variable available in CLI tool) and set
 * it before calling {@link newAxios}.
 *
 * Note: this setting WILL NOT reflect any existing `AxiosInstance`s. It will be in effect for all new
 * instances created by calling {@link newAxios}.
 *
 * @param token - token to set; if undefined to
 * @public
 */
export declare function setGlobalAuthorizationToken(token: string | undefined): void;
/**
 * Sets or clears Authorization token to use in the provided axios instance. If the token is provided,
 * then it will be used in `common` Authorization header which will be sent on all requests.
 *
 * If the token is undefined, the common Authorization header setting will be removed from axios config.
 *
 * @param axios - an instance of axios to update with authorization token
 * @param token - token to set or undefined to clear
 * @public
 */
export declare function setAxiosAuthorizationToken(axios: AxiosInstance, token: string | undefined): void;
/**
 * Creates a new configuration for axios. The factory allows to override baseUrl (e.g. tiger hostname) and to
 * merge-in additional headers. If the global authorization token is set, it will automatically include the token.
 *
 * @param baseUrl - hostname to use, if not specified then axios (in browser) works on top of current origin
 * @param headers - header settings, merged into axios' headers object
 * @public
 */
export declare function newAxiosRequestConfig(baseUrl?: string, headers?: {
    [name: string]: string;
}): CreateAxiosDefaults;
/**
 * Creates a new instance of axios.
 *
 * @param baseUrl - hostname, optional, will default to current origin
 * @param headers - object mapping header name → header value
 * @returns always new instance
 * @public
 */
export declare function newAxios(baseUrl?: string, headers?: {
    [name: string]: string;
}): AxiosInstance;
//# sourceMappingURL=axios.d.ts.map