import { FilterContextItem, IExportResponse } from "@gooddata/api-model-bear";
import { XhrModule } from "../xhr.js";
import { IPollingOptions } from "../util.js";
export declare class DashboardModule {
    private xhr;
    constructor(xhr: XhrModule);
    exportToPdf(projectId: string, dashboardUri: string, filters?: FilterContextItem[], pollingOptions?: IPollingOptions): Promise<IExportResponse>;
    private pollPdfFile;
    private getDashboardExportPayload;
}
//# sourceMappingURL=dashboard.d.ts.map