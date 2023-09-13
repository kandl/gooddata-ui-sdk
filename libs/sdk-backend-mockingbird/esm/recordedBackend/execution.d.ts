import { IDataView, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { IExecutionDefinition, IInsight } from "@gooddata/sdk-model";
import { RecordingIndex, ScenarioRecording, RecordedRefType, InsightRecording } from "./types.js";
import { AbstractExecutionFactory } from "@gooddata/sdk-backend-base";
/**
 * @internal
 */
export declare const DataViewAll: string;
/**
 * @internal
 */
export declare const dataViewWindow: (offset: number[], size: number[]) => string;
/**
 * @internal
 */
export declare const DataViewFirstPage: string;
/**
 * @internal
 */
export declare class RecordedExecutionFactory extends AbstractExecutionFactory {
    private readonly recordings;
    private readonly resultRefType;
    constructor(recordings: RecordingIndex, workspace: string, resultRefType: RecordedRefType);
    forDefinition(def: IExecutionDefinition): IPreparedExecution;
}
/**
 * Creates a new data view facade for the provided recording. If the recording contains multiple sets of dataViews
 * (e.g. for different windows etc), then it is possible to provide dataViewId to look up the particular view. By default,
 * the data view with all data is wrapped in the facade.
 *
 * The returned view is linked to a valid result; calling transform() returns an instance of prepared execution which
 * is executable as-is (and leads to the same result). However any modification to this prepared execution would
 * lead a NO_DATA errors (because that different data is not included in the index)
 *
 * @remarks see {@link dataViewWindow}
 *
 * @param recording - recording (as obtained from the index, typically using the Scenario mapping)
 * @param dataViewId - Identifier of the data view; defaults to view with all data
 * @param resultRefType - Specify what types of refs should the backend create in the result's dimension descriptors (uri refs returned by bear, id refs returned by tiger)
 * @internal
 */
export declare function recordedDataView(recording: ScenarioRecording, dataViewId?: string, resultRefType?: RecordedRefType): IDataView;
/**
 * @internal
 */
export type NamedDataView = {
    name: string;
    dataView: IDataView;
};
/**
 * Given recording index with executions, this function will return named DataView instances for executions
 * that match the following criteria:
 *
 * 1.  Executions specify test scenarios to which they belong - the test scenarios are used to obtain
 *     name of the data view
 *
 * 2.  Executions contain `DataViewAll` recording = all data for the test scenario.
 *
 * @param recordings - recording index (as created by mock-handling tooling)
 * @returns list of named data views; names are derived from test scenarios to which the data views belong
 * @internal
 */
export declare function recordedDataViews(recordings: RecordingIndex): NamedDataView[];
/**
 * Given insight recording (as accessible through Recordings.Insights), this function returns instance of IInsight.
 *
 * @param recording - insight recording
 * @param refType - ref type to have in the insight, default is uri
 * @internal
 */
export declare function recordedInsight(recording: InsightRecording, refType?: RecordedRefType): IInsight;
/**
 * Given recording index with insight metadata, this function will return IInsight objects for every recording there.
 *
 * @param recordings - recording index (as created by mock-handling tooling)
 * @param refType - ref type to have in the insight, default is uri
 * @internal
 */
export declare function recordedInsights(recordings: RecordingIndex, refType?: RecordedRefType): IInsight[];
//# sourceMappingURL=execution.d.ts.map