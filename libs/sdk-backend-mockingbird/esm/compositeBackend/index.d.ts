import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
/**
 * @internal
 */
export type CompositeBackendPart = {
    /**
     * Specify workspace for which this backend has data.
     */
    workspace: string;
    /**
     * The instance of backend.
     */
    backend: IAnalyticalBackend;
};
/**
 * Creates a composite backend from one or more other test backends, each serving a test data for different
 * workspace. Composite backend will delegate all workspace services to the instance of backend which declares
 * that it has data for that workspace. If no backend is found during lookup, composite backend will fall-back to
 * the first backend on the list and whatever happens, happens (NO_DATA etc).
 *
 * For all other services available on the top-level backend API, the composite backend delegates to the first backend
 * on the list.
 *
 * Note on backend capabilities: the composite backend will inherit capabilities from the first backend component. It
 * will not do any other processing in regards to capabilities. This can potentially be limiting and breaking in
 * situations when the backend is composed from multiple different implementations, each with different capabilities.
 *
 * @param components - backends to compose from, must contain at least one backend
 * @internal
 */
export declare function compositeBackend(...components: CompositeBackendPart[]): IAnalyticalBackend;
//# sourceMappingURL=index.d.ts.map