import { InsightDrillDefinition, ObjRef } from "@gooddata/sdk-model";
import { IDrillConfigItem } from "../../../../drill/types.js";
/**
 * @internal
 */
export interface IUseDrillConfigPanelProps {
    widgetRef: ObjRef;
}
/**
 * hook for DrillConfigPanel component
 * @internal
 */
export declare const useInsightDrillConfigPanel: (props: IUseDrillConfigPanelProps) => {
    widget: import("@gooddata/sdk-model").IInsightWidget;
    enableKDZooming: boolean | undefined;
    drillConfigItems: IDrillConfigItem[];
    originSelectorItems: {
        measures: import("@gooddata/sdk-ui").IAvailableDrillTargetMeasure[] | undefined;
        attributes: import("@gooddata/sdk-ui").IAvailableDrillTargetAttribute[] | undefined;
    };
    isOriginSelectorVisible: boolean;
    isLoaded: boolean;
    onChangeItem: (changedItem: IDrillConfigItem) => void;
    onOriginSelect: (selectedItem: import("../../../../drill/DrillSelect/types.js").IAvailableDrillTargetItem) => void;
    onSetupItem: (drill: InsightDrillDefinition, changedItem: IDrillConfigItem) => void;
    onDeleteItem: (item: IDrillConfigItem) => void;
};
