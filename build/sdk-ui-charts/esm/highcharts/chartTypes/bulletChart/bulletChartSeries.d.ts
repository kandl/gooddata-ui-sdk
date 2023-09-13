import { Identifier, IMeasureGroupDescriptor } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
export declare const isPrimarySeries: (seriesIndex: number, bucketsLocalIdentifiers: Identifier[]) => boolean;
export declare const isTargetSeries: (seriesIndex: number, bucketsLocalIdentifiers: Identifier[]) => boolean;
export declare const isComparativeSeries: (seriesIndex: number, bucketsLocalIdentifiers: Identifier[]) => boolean;
export declare function getBulletChartSeries(dv: DataViewFacade, measureGroup: IMeasureGroupDescriptor["measureGroupHeader"], colorStrategy: IColorStrategy): {
    pointPadding: number;
    zIndex: number;
    bulletChartMeasureType: string;
    negative?: boolean;
    h?: number;
    x?: number;
    y?: number;
    z?: number;
    value?: number;
    format?: string;
    marker?: {
        enabled: boolean;
    };
    name?: string;
    color?: string | import("../../typings/unsafe.js").IPatternObject;
    legendIndex?: number;
    id?: string;
    parent?: string;
    drilldown?: boolean;
    drillIntersection?: any;
    borderWidth?: number;
    borderColor?: string;
    series?: import("../../typings/unsafe.js").ISeriesItem;
    category?: import("../../typings/unsafe.js").ICategory;
}[];
export declare function getOccupiedMeasureBucketsLocalIdentifiers(dv: DataViewFacade): Identifier[];
//# sourceMappingURL=bulletChartSeries.d.ts.map