import { IGridRow } from "./resultTypes.js";
export interface IGroupingProvider {
    reset: () => void;
    isRepeatedValue: (columnId: string, rowIndex: number) => boolean;
    isGroupBoundary: (rowIndex: number) => boolean;
    isColumnWithGrouping: (columnId: string) => boolean;
    processPage: (pageRows: IGridRow[], rowOffset: number, columnIds: string[]) => void;
}
export declare class GroupingProviderFactory {
    static createProvider(groupRows: boolean): IGroupingProvider;
}
//# sourceMappingURL=rowGroupingProvider.d.ts.map