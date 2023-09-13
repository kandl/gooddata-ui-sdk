// (C) 2019-2023 GoodData Corporation
import { sanitizeFiltersForExport } from "@gooddata/api-model-bear";
import { handleHeadPolling } from "../util.js";
import { isExportFinished } from "../utils/export.js";
export class DashboardModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    async exportToPdf(projectId, dashboardUri, filters = [], pollingOptions = {}) {
        const sanitizedFilters = sanitizeFiltersForExport(filters);
        const payload = this.getDashboardExportPayload(dashboardUri, sanitizedFilters);
        const response = await this.xhr.post(`/gdc/internal/projects/${projectId}/exportDashboard`, { body: payload });
        return this.pollPdfFile(response, pollingOptions);
    }
    async pollPdfFile(response, pollingOptions) {
        const data = response.getData();
        return handleHeadPolling(this.xhr.head.bind(this.xhr), data.uri, isExportFinished, Object.assign(Object.assign({}, pollingOptions), { blobContentType: "application/pdf" }));
    }
    getDashboardExportPayload(dashboardUri, filters) {
        if (filters.length) {
            return {
                dashboardExport: {
                    dashboardUri,
                    filters,
                },
            };
        }
        // minimize payload
        return {
            dashboardExport: {
                dashboardUri,
            },
        };
    }
}
//# sourceMappingURL=dashboard.js.map