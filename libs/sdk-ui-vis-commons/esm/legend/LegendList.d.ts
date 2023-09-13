import React from "react";
import { ItemBorderRadiusPredicate } from "./types.js";
export interface ILegendListProps {
    series: any;
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    width?: number;
    onItemClick: (item: any) => void;
}
export declare const LegendSeparator: () => JSX.Element;
export declare class LegendList extends React.PureComponent<ILegendListProps> {
    render(): any;
}
//# sourceMappingURL=LegendList.d.ts.map