import { IExecutionDefinition, IBucket } from "@gooddata/sdk-model";
/**
 * Significant file names.
 */
export declare const RecordingFiles: {
    Execution: {
        /**
         * File name for the execution definition.
         *
         * Store IExecutionDefinition in this file.
         */
        Definition: string;
        /**
         * File name for data capture requests. Store DataViewRequests in this file.
         */
        Requests: string;
        /**
         * File name for metadata about test scenarios that use the same execution definition. This is a list
         * of objects of {@link ScenarioDescriptor} type
         */
        Scenarios: string;
    };
    Insights: {
        /**
         * File name containing object mapping insight identifier to an object of {@link InsightRecordingSpec} type.
         */
        Index: string;
        /**
         * Insight object file name.
         */
        Object: string;
    };
    Dashboards: {
        Object: string;
        Alerts: string;
    };
};
/**
 * Store this as json in execution definition file.
 */
export type DataViewRequests = {
    allData?: boolean;
    windows?: RequestedWindow[];
};
/**
 * Definition of data view window to obtain
 */
export type RequestedWindow = {
    offset: number[];
    size: number[];
};
/**
 * Provides details about test scenarios that use the captured execution & its data.
 */
export type ScenarioDescriptor = {
    /**
     * Name of visualization using the execution
     */
    vis: string;
    /**
     * Test scenario name.
     */
    scenario: string;
    /**
     * For normalized executions, store the original execution definition
     */
    originalExecution?: IExecutionDefinition;
    /**
     * For normalized executions, store mapping between normalized and original local ids
     */
    n2oMap?: {
        [from: string]: string;
    };
    /**
     * For non-normalized executions, store buckets
     */
    buckets?: IBucket[];
};
/**
 * Store this object as value for insightId key in insight index
 */
export type InsightRecordingSpec = {
    visName?: string;
    scenarioName?: string;
    comment?: string;
};
/**
 * Utility function to create a number of consecutive RequestedWindows for N pages of data. Page = vertical scrolling. The
 * second-dim offset always stays the same.
 *
 * @param start - start offset
 * @param size - page size
 * @param pages - number of pages
 */
export declare function requestPages(start: [number, number], size: [number, number], pages: number): RequestedWindow[];
//# sourceMappingURL=interface.d.ts.map