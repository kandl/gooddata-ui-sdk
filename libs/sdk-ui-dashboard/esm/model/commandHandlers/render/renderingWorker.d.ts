import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
/**
 * @internal
 */
export interface RenderingWorkerConfiguration {
    /**
     * Maximum time limit for rendering the dashboard.
     * Somehow in sync with limits of exporter
     * https://github.com/gooddata/gdc-exporters-microservices/blob/master/microservices/visual-exporter-service/src/main/kotlin/com/gooddata/exporters/visual/config/TabSessionConfig.kt
     *
     * Default: 20*60000 (20min).
     * @privateRemarks
     * If changing this value update it also in documentation of {@link requestAsyncRender} command creator and {@link useDashboardAsyncRender} hook.
     */
    maxTimeout: number;
    /**
     * Maximum time limit for the first asynchronous rendering request.
     * If no asynchronous rendering request is fired in this time limit, the dashboard will announce that it is rendered.
     *
     * Default: 2000 (2s).
     */
    asyncRenderRequestedTimeout: number;
    /**
     * Maximum time limit to re-request asynchronous rendering of the component once it's resolved.
     *
     * Default: 2000 (2s).
     */
    asyncRenderResolvedTimeout: number;
    /**
     * Generator of correlation ids
     *
     * Default: uuid4
     */
    correlationIdGenerator: () => string;
}
export declare function newRenderingWorker(config?: RenderingWorkerConfiguration): (ctx: DashboardContext) => SagaIterator<void>;
