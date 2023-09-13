import { XhrModule } from "./xhr.js";
import { IAnalyticalDashboard, IAnalyticalDashboardContent } from "@gooddata/api-model-bear";
/**
 * Modify how and what should be copied to the cloned dashboard
 */
export interface ICopyDashboardOptions {
    /** copy new kpi and reference it in the cloned dashboard */
    copyKpi?: boolean;
    /** copy new visualization object and reference it in the cloned widget */
    copyVisObj?: boolean;
    /** optional, default value of name is "Copy of (current dashboard title)" */
    name?: string;
    /** optional, default value of summary is (current dashboard summary) */
    summary?: string;
    /** optional, default value of tags is (current dashboard tags) */
    tags?: string;
    /** optional, if true, the isLocked flag will be cleared for the newly created dashboard, defaults to false */
    clearLockedFlag?: boolean;
}
type UriTranslator = (oldUri: string) => string;
export declare function createTranslator(kpiMap: Map<string, string>, visWidgetMap: Map<string, string>): UriTranslator;
/**
 * Updates content of the dashboard
 *
 * @param dashboardUri - uri of dashboard
 * @param uriTranslator - gets updated widgets and kpis uri
 * @param filterContext - updated filter context uri
 * @experimental
 */
export declare function updateContent(analyticalDashboard: IAnalyticalDashboard, uriTranslator: UriTranslator, filterContext: string): IAnalyticalDashboardContent;
export declare class MetadataModuleExt {
    private metadataModule;
    private userModule;
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * @param projectId - id of the project
     * @param dashboardUri - uri of the dashboard
     * @param options - object with options:
     *          - default - dashboard is cloned with new kpi reference and visualization widget is cloned with new
     *              visualization object reference
     *          - copyKpi - choose whether dashboard is cloned with new Kpi reference
     *          - copyVisObj - choose whether visualization widget is cloned with new visualization object reference
     *          - name - optional - choose name, default value is "Copy of (old title of the dashboard)"
     *          - summary - choose summary, default is the summary of the original dashboard
     *          - tags - choose tags, default is the tags of the original dashboard
     *          - clearLockedFlag - if true, the isLocked flag will be cleared for the newly created dashboard, defaults to false
     * @returns uri of cloned dashboard
     * @experimental
     */
    saveDashboardAs(projectId: string, dashboardUri: string, options: ICopyDashboardOptions): Promise<string>;
    /**
     * Deletes dashboard and its objects
     * (only the author of the dashboard can delete the dashboard and its objects)
     *
     * @param projectId - Project identifier
     * @param dashboardUri - Uri of a dashboard to be deleted
     * @experimental
     */
    cascadingDelete(projectID: string, dashboardUri: string): Promise<any>;
    private duplicateOrKeepKpis;
    private duplicateWidgets;
    private createAndUpdateWidgets;
    private duplicateFilterContext;
    private getObjectsFromDashboard;
    private getObjectsUrisInDashboard;
    private unwrapObj;
    private shouldCopyVisObj;
    private shouldCopyKpi;
}
export {};
//# sourceMappingURL=metadataExt.d.ts.map