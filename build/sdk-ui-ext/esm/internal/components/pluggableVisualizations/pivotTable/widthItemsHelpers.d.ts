import { ColumnWidthItem, MeasureGroupDimension } from "@gooddata/sdk-ui-pivot";
import { IBucketFilter, IBucketItem } from "../../../interfaces/Visualization.js";
import { IInsightDefinition } from "@gooddata/sdk-model";
export declare function adaptReferencePointWidthItemsToPivotTable(originalColumnWidths: ColumnWidthItem[], measures: IBucketItem[], rowAttributes: IBucketItem[], columnAttributes: IBucketItem[], previousRowAttributes: IBucketItem[], previousColumnAttributes: IBucketItem[], filters: IBucketFilter[], measureGroupDimension: MeasureGroupDimension): ColumnWidthItem[];
export declare function adaptMdObjectWidthItemsToPivotTable(originalColumnWidths: ColumnWidthItem[], insight: IInsightDefinition, measureGroupDimension?: MeasureGroupDimension): ColumnWidthItem[];
//# sourceMappingURL=widthItemsHelpers.d.ts.map