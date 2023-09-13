import { IAnalyticalBackendConfig, IAnalyticalBackend, IAuthenticationContext } from "@gooddata/sdk-backend-spi";
import { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
/**
 * A factory to create a new instance of the Bear backend.
 *
 * @public
 */
declare const _default: (config?: IAnalyticalBackendConfig, implConfig?: any) => IAnalyticalBackend;
export default _default;
export declare const redirectToBearAuthentication: (context: IAuthenticationContext) => void;
export declare const redirectToBearSsoAuthentication: (context: IAuthenticationContext) => void;
export { ContextDeferredAuthProvider };
//# sourceMappingURL=bearBackend.d.ts.map