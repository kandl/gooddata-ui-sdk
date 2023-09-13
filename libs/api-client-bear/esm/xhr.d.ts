/**
 * Gooddata-js package signature
 * @internal
 */
export declare const thisPackage: {
    name: string;
    version: string;
};
export declare function handlePolling(url: string, settings: any, sendRequest: (url: string, settings: any) => any): Promise<ApiResponse>;
export interface IPackageHeaders {
    name: string;
    version: string;
}
export declare function originPackageHeaders({ name, version }: IPackageHeaders): object;
export declare class ApiError extends Error {
    cause: any;
    constructor(message: string, cause: any);
}
export declare class ApiResponseError extends ApiError {
    response: any;
    responseBody: any;
    constructor(message: string, response: any, responseBody: any);
}
export declare class ApiNetworkError extends ApiError {
}
export declare class ApiResponse<T = any> {
    response: Response;
    responseBody: string | ArrayBuffer;
    constructor(response: Response, responseBody: string | ArrayBuffer);
    get data(): T;
    getData(): T;
    getRawData(): string | ArrayBuffer;
    getHeaders(): Response;
    private getDataInner;
}
export declare class XhrModule {
    private fetch;
    private configStorage;
    private tokenRequest?;
    constructor(fetch: any, configStorage: any);
    /**
     * Clears the indicator that is making the XHR module to perform token requests before making
     * the actual call. The module may get into this state typically during the application initialization
     * when the session is not yet authenticated.
     *
     * Calling this method will clear that indicator, ensuring that the next call will be called without
     * the leading call to token (which will typically fail).
     */
    ensureNoLeadingTokenRequest(): void;
    /**
     * Back compatible method for setting common XHR settings
     *
     * Usually in our apps we used beforeSend ajax callback to set the X-GDC-REQUEST header with unique ID.
     *
     * @param settings - object XHR settings as
     */
    ajaxSetup(settings: any): void;
    ajax<T = any>(originalUrl: string, customSettings?: {}): Promise<ApiResponse<T>>;
    /**
     * Wrapper for xhr.ajax method GET
     */
    get(url: string, settings?: any): Promise<ApiResponse<any>>;
    /**
     * Wrapper for xhr.ajax method GET, returns parsed JSON response body
     */
    getParsed<T>(url: string, settings?: any): Promise<T>;
    /**
     * Wrapper for xhr.ajax method HEAD
     */
    head(url: string, settings?: any): Promise<ApiResponse<any>>;
    /**
     * Wrapper for xhr.ajax method POST
     */
    post(url: string, settings?: any): Promise<ApiResponse<any>>;
    /**
     * Wrapper for xhr.ajax method POST, returns parsed JSON response body
     */
    postParsed<T>(url: string, settings?: any): Promise<T>;
    /**
     * Wrapper for xhr.ajax method PUT
     */
    put(url: string, settings: any): Promise<ApiResponse<any>>;
    /**
     * Wrapper for xhr.ajax method DELETE
     */
    del(url: string, settings?: any): Promise<ApiResponse<any>>;
    private createRequestSettings;
    private continueAfterTokenRequest;
    private handleUnauthorized;
    private logDeprecatedRestApiCall;
    private isRestApiDeprecated;
    private verifyRestApiDeprecationStatus;
    private responseBodyAsString;
}
//# sourceMappingURL=xhr.d.ts.map