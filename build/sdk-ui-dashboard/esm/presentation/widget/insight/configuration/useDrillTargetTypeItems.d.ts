import { DRILL_TARGET_TYPE } from "../../../drill/types.js";
export interface IDrillTargetType {
    id: DRILL_TARGET_TYPE;
    title: string;
}
export declare const useDrillTargetTypeItems: () => IDrillTargetType[];
