import { IDrillToCustomUrl, IInsightWidget } from "@gooddata/sdk-model";
interface IInvalidParamsInfo {
    widget: IInsightWidget;
    invalidDrills: IDrillToCustomUrl[];
}
export declare function validateDrillToCustomUrlParams(widgets: IInsightWidget[]): Generator<import("redux-saga/effects").AllEffect<import("redux-saga/effects").CallEffect<IInvalidParamsInfo>> | import("redux-saga/effects").PutEffect<{
    payload: IInsightWidget[];
    type: "uiSlice/resetInvalidCustomUrlDrillParameterWidget";
}> | import("redux-saga/effects").PutEffect<{
    payload: {
        widget: IInsightWidget;
        invalidDrills: IDrillToCustomUrl[];
    }[];
    type: "uiSlice/setInvalidCustomUrlDrillParameterWidgets";
}>, void, IInvalidParamsInfo[]>;
export {};
