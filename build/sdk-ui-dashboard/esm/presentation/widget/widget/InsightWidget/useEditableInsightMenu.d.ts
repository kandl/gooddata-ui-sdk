import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
import { IInsightMenuItem } from "../../insightMenu/index.js";
type UseEditableInsightMenuConfig = {
    insight: IInsight;
    widget: IInsightWidget;
    closeMenu: () => void;
};
export declare const useEditableInsightMenu: (config: UseEditableInsightMenuConfig) => {
    menuItems: IInsightMenuItem[];
};
export {};
