/// <reference types="react" />
import { CalculatedRows } from "./useRowsCalculator.js";
export declare function useFilterBarState(): {
    rows: number[];
    scrollable: boolean;
    height: number;
    isFilterBarExpanded: boolean;
    setCalculatedRows: import("react").Dispatch<import("react").SetStateAction<CalculatedRows>>;
    setFilterBarExpanded: (isExpanded: boolean) => {
        payload: boolean;
        type: "uiSlice/setFilterBarExpanded";
    };
};
