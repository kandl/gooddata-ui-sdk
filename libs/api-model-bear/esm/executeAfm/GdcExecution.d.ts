/**
 * @public
 */
export interface IMeasureHeaderItem {
    measureHeaderItem: {
        uri?: string;
        identifier?: string;
        localIdentifier: string;
        name: string;
        format: string;
    };
}
/**
 * @public
 */
export interface ITotalHeaderItem {
    totalHeaderItem: {
        name: string;
    };
}
/**
 * @public
 */
export interface IMeasureGroupHeader {
    measureGroupHeader: {
        items: IMeasureHeaderItem[];
        totalItems?: ITotalHeaderItem[];
    };
}
/**
 * @public
 */
export interface IAttributeHeader {
    attributeHeader: {
        uri: string;
        identifier: string;
        localIdentifier: string;
        name: string;
        totalItems?: ITotalHeaderItem[];
        formOf: {
            uri: string;
            identifier: string;
            name: string;
        };
    };
}
/**
 * @public
 */
export type IHeader = IMeasureGroupHeader | IAttributeHeader;
/**
 * @public
 */
export interface IResultAttributeHeaderItem {
    attributeHeaderItem: {
        uri: string;
        name: string;
    };
}
/**
 * @public
 */
export interface IResultMeasureHeaderItem {
    measureHeaderItem: {
        name: string;
        order: number;
    };
}
/**
 * @public
 */
export interface IResultTotalHeaderItem {
    totalHeaderItem: {
        name: string;
        type: string;
    };
}
/**
 * @public
 */
export type IResultHeaderItem = IResultAttributeHeaderItem | IResultMeasureHeaderItem | IResultTotalHeaderItem;
/**
 * @public
 */
export interface IResultDimension {
    headers: IHeader[];
}
/**
 * @public
 */
export interface IExecutionResponse {
    links: {
        executionResult: string;
    };
    dimensions: IResultDimension[];
}
/**
 * @public
 */
export interface IExecutionResponseWrapper {
    executionResponse: IExecutionResponse;
}
/**
 * @public
 */
export type DataValue = null | string | number;
/**
 * @public
 */
export interface Warning {
    warningCode: string;
    message: string;
    parameters?: any[];
}
/**
 * @public
 */
export interface IExecutionResult {
    headerItems?: IResultHeaderItem[][][];
    data: DataValue[][] | DataValue[];
    totals?: DataValue[][][];
    totalTotals?: DataValue[][][];
    paging: {
        count: number[];
        offset: number[];
        total: number[];
    };
    warnings?: Warning[];
}
/**
 * @public
 */
export interface IExecutionResultWrapper {
    executionResult: IExecutionResult;
}
/**
 * @public
 */
export interface IError extends Error {
    response: Response;
}
/**
 * Combination of both AFM executions responses
 *
 * `null` value as executionResult means empty response (HTTP 204)
 * @public
 */
export interface IExecutionResponses {
    executionResponse: IExecutionResponse;
    executionResult: IExecutionResult | null;
}
/**
 * @public
 */
export declare function isAttributeHeaderItem(header: IResultHeaderItem): header is IResultAttributeHeaderItem;
/**
 * @public
 */
export declare function isMeasureHeaderItem(header: IResultHeaderItem): header is IResultMeasureHeaderItem;
/**
 * @public
 */
export declare function isTotalHeaderItem(header: IResultHeaderItem): header is IResultTotalHeaderItem;
/**
 * @public
 */
export declare function isAttributeHeader(header: IHeader): header is IAttributeHeader;
/**
 * @public
 */
export declare function isMeasureGroupHeader(header: IHeader): header is IMeasureGroupHeader;
//# sourceMappingURL=GdcExecution.d.ts.map