import { IInsight } from "@gooddata/sdk-model";
import { IDrillDownContext, IExtendedReferencePoint, IReferencePoint, IUiConfig, IVisConstruct } from "../../interfaces/Visualization.js";
import { PluggableBaseChart } from "./baseChart/PluggableBaseChart.js";
export declare class PluggableColumnBarCharts extends PluggableBaseChart {
    constructor(props: IVisConstruct);
    getUiConfig(): IUiConfig;
    getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    isOpenAsReportSupported(): boolean;
    private adjustIntersectionForColumnBar;
    private addFiltersForColumnBar;
    getInsightWithDrillDownApplied(source: IInsight, drillDownContext: IDrillDownContext, backendSupportsElementUris: boolean): IInsight;
    protected configureBuckets(extendedReferencePoint: IExtendedReferencePoint): void;
    private configureBucketsWithMultipleDates;
    private canPutAttributeToViewBy;
    private getMeasuresViewStackBucketItems;
    private getViewByMaxItemCount;
    private getStackByMaxItemCount;
}
//# sourceMappingURL=PluggableColumnBarCharts.d.ts.map