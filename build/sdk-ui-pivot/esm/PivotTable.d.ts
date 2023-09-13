/// <reference types="react" />
import { IBucket, IDimension } from "@gooddata/sdk-model";
import { IMenu, IPivotTableProps } from "./publicTypes.js";
import { IBackendCapabilities } from "@gooddata/sdk-backend-spi";
/**
 * [PivotTable](https://sdk.gooddata.com/gooddata-ui/docs/pivot_table_component.html)
 * is a component with bucket props measures, rows, columns, totals, sortBy, filters
 *
 * @public
 */
export declare const PivotTable: (props: IPivotTableProps) => JSX.Element;
/**
 * Given analytical backend capabilities and the desired aggregations menu config.
 *
 * @remarks
 * This function will correct the menu configuration so that it fits the capabilities.
 *
 * The function will explicitly set the options regardless of what is the (current) default value of the option if
 * it is not present in the menu. The backend capabilities are a hard stop for features.
 *
 * Note: the {@link PivotTable} will use this function out of the box to ensure the effective menu configuration
 * matches the backend capabilities. You don't need to use when creating a PivotTable.
 *
 * @param capabilities - Backend capabilities
 * @param desiredMenu - Aggregation menu configuration desired by the client
 * @public
 */
export declare function pivotTableMenuForCapabilities(capabilities: IBackendCapabilities, desiredMenu?: IMenu): IMenu;
/**
 * Prepares dimensions for pivot table execution from buckets and info if table is transposed or not.
 *
 * @param buckets - table buckets
 * @param isTransposed - whether table is transposed (metrics are in rows)
 * @public
 */
export declare function getPivotTableDimensions(buckets: IBucket[], isTransposed: boolean): IDimension[];
//# sourceMappingURL=PivotTable.d.ts.map