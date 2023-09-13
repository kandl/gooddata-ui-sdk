import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { NormalizationState } from "./normalizer.js";
/**
 * @beta
 */
export type NormalizationWhenExecuteByRef = "prohibit" | "fallback";
/**
 * @beta
 */
export type NormalizationConfig = {
    /**
     * Specify callback where the normalizing backend will dispatch state of the normalizations being done.
     */
    normalizationStatus?: (normalizationState: NormalizationState) => void;
    /**
     * Specify what should happen if the normalized backend is asked to perform execution by reference.
     *
     * Background:
     *
     * Execution by reference cannot be normalized - strictly because execution by reference executes exactly
     * what is stored somewhere on the backend (this can connect to authorization schemes, ACLs and so on - such as
     * allowing users to execute only insights exactly as they were prepared by someone else)
     *
     * By default, trying to run execute-by-reference using normalizing decorator will fail. It is possible
     * to modify this behavior so that instead there will be fallback to freeform execution. For backends that
     * do not support execute-by-ref this is all good.
     */
    executeByRefMode?: NormalizationWhenExecuteByRef;
};
/**
 * Decorates backend with logic which transparently normalizes execution definitions before they are dispatched
 * to the underlying backend. The normalization standardizes local identifiers and removes any fields that do not
 * impact the resulting data itself: aliases, title customizations and measure format customizations.
 *
 * All the detail that is stripped on the way to the execution APIs is restored before the results reach the
 * caller code.
 *
 * The normalization is essential to increase cache hits - be it both on client or on the server.
 *
 * @param realBackend - real backend to decorate
 * @param config - Specify configuration of the normalization process, see {@link NormalizationConfig}
 * @returns new instance of backend
 * @beta
 */
export declare function withNormalization(realBackend: IAnalyticalBackend, config?: NormalizationConfig): IAnalyticalBackend;
//# sourceMappingURL=index.d.ts.map