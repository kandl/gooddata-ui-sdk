import { IExportConfig, IExportResponse } from "@gooddata/api-model-bear";
import { XhrModule } from "../xhr.js";
import { IPollingOptions } from "../util.js";
/**
 * Functions for working with reports
 */
export declare class ReportModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * exportResult
     * request new result export
     * request new export of existing AFM execution
     *
     * Export file is downloaded and attached as Blob data to the current window instance.
     *
     * @experimental
     * @param projectId - GoodData projectId
     * @param executionResult - report which should be exported
     * @param exportConfig - requested export options
     * @param pollingOptions - for polling (maxAttempts, pollStep)
     * @returns Resolves if export successfully,
     *                   Reject if export has error (network error, api error)
     */
    exportResult(projectId: string, executionResult: string, exportConfig?: IExportConfig, pollingOptions?: IPollingOptions): Promise<IExportResponse>;
    private sanitizeExportConfig;
    private handleExportResultError;
    private isApiResponseError;
    private sanitizeFilters;
}
//# sourceMappingURL=report.d.ts.map