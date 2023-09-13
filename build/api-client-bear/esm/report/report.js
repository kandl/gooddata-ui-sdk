import compact from "lodash/compact.js";
import isEmpty from "lodash/isEmpty.js";
import { ERROR_RESTRICTED_CODE, ERROR_RESTRICTED_MESSAGE } from "../constants/errors.js";
import { ApiResponseError } from "../xhr.js";
import { handleHeadPolling } from "../util.js";
import { isExportFinished, getFormatContentType } from "../utils/export.js";
/**
 * Functions for working with reports
 */
export class ReportModule {
    constructor(xhr) {
        this.xhr = xhr;
        this.handleExportResultError = (error) => {
            if (this.isApiResponseError(error) &&
                error.response.status === 400 &&
                error.responseBody.indexOf(ERROR_RESTRICTED_CODE) !== -1) {
                const updatedError = new ApiResponseError(ERROR_RESTRICTED_MESSAGE, error.response, error.responseBody);
                return Promise.reject(updatedError);
            }
            return Promise.reject(error);
        };
    }
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
    exportResult(projectId, executionResult, exportConfig = {}, pollingOptions = {}) {
        const requestPayload = {
            resultExport: {
                executionResult,
                exportConfig: Object.assign(Object.assign({}, exportConfig), this.sanitizeExportConfig(exportConfig)),
            },
        };
        return this.xhr
            .post(`/gdc/internal/projects/${projectId}/exportResult`, { body: requestPayload })
            .then((response) => response.getData())
            .then((data) => handleHeadPolling(this.xhr.get.bind(this.xhr), data.uri, isExportFinished, Object.assign(Object.assign({}, pollingOptions), { blobContentType: getFormatContentType(exportConfig.format) })))
            .catch(this.handleExportResultError);
    }
    sanitizeExportConfig(exportConfig) {
        const { afm } = exportConfig;
        if (afm && !isEmpty(afm.filters)) {
            const sanitizedAfm = Object.assign(Object.assign({}, afm), { filters: this.sanitizeFilters(afm.filters) });
            return Object.assign(Object.assign({}, exportConfig), { afm: sanitizedAfm });
        }
        return exportConfig;
    }
    isApiResponseError(error) {
        return error.response !== undefined;
    }
    sanitizeFilters(filters) {
        return filters ? compact(filters) : [];
    }
}
//# sourceMappingURL=report.js.map