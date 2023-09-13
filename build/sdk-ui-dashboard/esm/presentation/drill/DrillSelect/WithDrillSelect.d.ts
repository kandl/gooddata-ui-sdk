/// <reference types="react" />
import { OnWidgetDrill, OnDrillDownSuccess, OnDrillToAttributeUrlSuccess, OnDrillToCustomUrlSuccess, OnDrillToDashboardSuccess, OnDrillToInsightSuccess } from "../types.js";
import { IInsight, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface WithDrillSelectProps {
    widgetRef: ObjRef;
    insight: IInsight;
    onDrillDownSuccess?: OnDrillDownSuccess;
    onDrillToInsightSuccess?: OnDrillToInsightSuccess;
    onDrillToDashboardSuccess?: OnDrillToDashboardSuccess;
    onDrillToAttributeUrlSuccess?: OnDrillToAttributeUrlSuccess;
    onDrillToCustomUrlSuccess?: OnDrillToCustomUrlSuccess;
    onError?: (error: any) => void;
    children: (props: {
        onDrill: OnWidgetDrill;
    }) => JSX.Element;
}
/**
 * @internal
 */
export declare function WithDrillSelect({ widgetRef, children, insight, onDrillDownSuccess, onDrillToInsightSuccess, onDrillToDashboardSuccess, onDrillToAttributeUrlSuccess, onDrillToCustomUrlSuccess, onError, }: WithDrillSelectProps): JSX.Element;
