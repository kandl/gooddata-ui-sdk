import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
import { IPushData } from "@gooddata/sdk-ui";
export declare function useHandlePropertiesPushData(widget: IInsightWidget, insight: IInsight): (data: IPushData) => void;
