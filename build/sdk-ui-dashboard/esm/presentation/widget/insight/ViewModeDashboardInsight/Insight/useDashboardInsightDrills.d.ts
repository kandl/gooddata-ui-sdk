import { OnWidgetDrill } from "../../../../drill/types.js";
import { IDrillEvent, IPushData } from "@gooddata/sdk-ui";
import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface UseDashboardInsightDrillsProps {
    widget: IInsightWidget;
    insight: IInsight;
    onDrill?: OnWidgetDrill;
}
/**
 * @internal
 */
export declare const useDashboardInsightDrills: ({ widget, insight, onDrill: onDrillFn, }: UseDashboardInsightDrillsProps) => {
    drillableItems: import("@gooddata/sdk-ui").ExplicitDrill[];
    onPushData: (data: IPushData) => void;
    onDrill: ((event: IDrillEvent) => false | void) | undefined;
};
