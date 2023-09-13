import React from "react";
import { IAlignPoint } from "@gooddata/sdk-ui-kit";
interface IListItemTooltipProps extends React.HTMLProps<HTMLSpanElement> {
    bubbleAlignPoints: IAlignPoint[];
}
export declare const ListItemTooltip: React.FC<IListItemTooltipProps>;
export {};
