import { IDataView } from "@gooddata/sdk-backend-spi";
import { DataValue } from "@gooddata/sdk-model";
/**
 * Methods to access data and totals in a result.
 *
 * @internal
 */
export interface IResultDataMethods {
    /**
     * @returns true if the data is empty
     */
    isEmpty(): boolean;
    /**
     * @returns size for first dimension of the data view
     */
    firstDimSize(): number;
    /**
     * @returns size for second dimension of the data view
     */
    secondDimSize(): number;
    /**
     * @param index - index within first dimension
     * @returns data at index of the first dimension of the data view; if the data view has single dimension
     *  then returns actual data point; if the data view is two dimensional, then returns array
     */
    dataAt(index: number): DataValue | DataValue[];
    /**
     * @returns all data in the data view; this is array of arrays for two dim views or array of data points
     *  for one dimensional data view
     */
    data(): DataValue[][] | DataValue[];
    /**
     * This is a convenience method that asserts whether data in the data view is one dimensional and if so
     * returns array of data points.
     *
     * @returns array of data points, empty array if there's no data at all
     */
    singleDimData(): DataValue[];
    /**
     * This is a convenience method that determines whether the data in the data view is two dimension; if it
     * is then data is returned as-is. If the data is single dimension, this method will up-cast the data to
     * two dimensions.
     *
     * TODO: this method has serious contract issues and inconsistencies; it even borders outright dumb behavior :)
     *   investigation & clean up is a must
     *
     * @returns two dimensional data; if data is empty, returns array with single empty array in
     */
    twoDimData(): DataValue[][];
    /**
     * @returns grand totals in the data view, undefined if there are no grand totals
     */
    totals(): DataValue[][][] | undefined;
    /**
     * @returns grand totals for row in the data view, undefined if there are no row grand totals
     */
    rowTotals(): DataValue[][] | undefined;
    /**
     * @returns grand totals for column in the data view, undefined if there are no column grand totals
     */
    columnTotals(): DataValue[][] | undefined;
    /**
     * @returns totals of grand totals in the data view, undefined if there are no totals of grand totals
     */
    totalOfTotals(): DataValue[][][] | undefined;
    /**
     * Tests whether the data view included grand totals for row
     *
     * @returns true if row grand totals present, false if not
     */
    hasRowTotals(): boolean;
    /**
     * Tests whether the data view included grand totals for column
     *
     * @returns true if column grand totals present, false if not
     */
    hasColumnTotals(): boolean;
    /**
     * Tests whether the data view included grand totals.
     *
     * @returns true if grand totals present, false if not
     */
    hasTotals(): boolean;
}
export declare function newResultDataMethods(dataView: IDataView): IResultDataMethods;
//# sourceMappingURL=resultDataMethods.d.ts.map