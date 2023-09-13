import { IntlShape } from "react-intl";
import { IDataView } from "@gooddata/sdk-backend-spi";
import { GridApi, IDatasource, IGetRowsParams } from "@ag-grid-community/all-modules";
import { IGroupingProvider } from "./rowGroupingProvider.js";
import { ITotal } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { TableDescriptor } from "../structure/tableDescriptor.js";
import { OnExecutionTransformed, OnTransformedExecutionFailed } from "../privateTypes.js";
import { ColumnHeadersPosition } from "../../publicTypes.js";
export type DatasourceConfig = {
    tableDescriptor: TableDescriptor;
    getGroupRows: () => boolean;
    getColumnTotals: () => ITotal[];
    getRowTotals: () => ITotal[];
    getColumnHeadersPosition: () => ColumnHeadersPosition;
    onPageLoaded: OnPageLoaded;
    onExecutionTransformed: OnExecutionTransformed;
    onTransformedExecutionFailed: OnTransformedExecutionFailed;
    dataViewTransform: (dv: IDataView) => IDataView;
};
export type OnPageLoaded = (dv: DataViewFacade) => void;
export declare function createAgGridDatasource(config: DatasourceConfig, initialDv: DataViewFacade, gridApiProvider: GridApiProvider, intl: IntlShape): AgGridDatasource;
export type GridApiProvider = () => GridApi | undefined;
export declare class AgGridDatasource implements IDatasource {
    private readonly config;
    private readonly initialDv;
    private readonly gridApiProvider;
    private readonly intl;
    rowCount: number | undefined;
    private destroyed;
    private currentResult;
    private currentSorts;
    private grouping;
    constructor(config: DatasourceConfig, initialDv: DataViewFacade, gridApiProvider: GridApiProvider, intl: IntlShape);
    private createGroupingProvider;
    private resetGroupingProvider;
    private onDestroy;
    private processData;
    private transformResult;
    private driveExecutionAndUpdateDatasource;
    destroy: () => void;
    getRows: (params: IGetRowsParams) => void;
    getGroupingProvider: () => IGroupingProvider;
}
//# sourceMappingURL=dataSource.d.ts.map