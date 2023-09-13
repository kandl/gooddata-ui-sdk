import { ChangeEvent } from "react";
import { InsightCodeType } from "../types.js";
/**
 * @internal
 */
export interface IComponentTypeSelectProps {
    className: string;
    questionMarkMessage: string;
    itemValue: InsightCodeType;
    itemText: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * @internal
 */
export declare const ComponentTypeItem: (props: IComponentTypeSelectProps) => JSX.Element;
//# sourceMappingURL=ComponentTypeItem.d.ts.map