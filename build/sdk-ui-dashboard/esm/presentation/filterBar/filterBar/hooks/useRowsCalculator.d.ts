import { MutableRefObject } from "react";
import { ContentRect } from "react-measure";
export type CalculatedRows = {
    expandedHeight: number;
    collapsedHeight: number;
    rows: number[];
};
export declare const CalculatedRowsDefault: {
    expandedHeight: number;
    collapsedHeight: number;
    rows: never[];
};
export declare function useRowsCalculator(element: MutableRefObject<Element | null>): (dimensions: ContentRect) => CalculatedRows;
