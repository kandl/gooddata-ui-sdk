import { IDrillConfigItem } from "../../../../drill/types.js";
import { IAvailableDrillTargetItem } from "../../../../drill/DrillSelect/types.js";
import { InsightDrillDefinition } from "@gooddata/sdk-model";
/**
 * Props for hook for manipulation with incomplete IDrillConfigItem
 * @internal
 */
export interface IUseIncompleteItemsProps {
    widgetDrills: InsightDrillDefinition[];
}
/**
 * Hook for manipulation with incomplete IDrillConfigItem
 * @internal
 */
export declare const useIncompleteItems: (props: IUseIncompleteItemsProps) => {
    incompleteItems: IDrillConfigItem[];
    isItemNew: (changedItem: IDrillConfigItem) => boolean;
    completeItem: (item: IDrillConfigItem) => void;
    deleteIncompleteItem: (item: IDrillConfigItem) => void;
    onChangeItem: (changedItem: IDrillConfigItem) => void;
    onOriginSelect: (selectedItem: IAvailableDrillTargetItem) => void;
};
