import { ITotal } from "@gooddata/sdk-model";
import { TableFacadeInitializer } from "./impl/tableFacadeInitializer.js";
import { TableFacade } from "./impl/tableFacade.js";
import { ICustomGridOptions } from "./impl/privateTypes.js";
import { IScrollPosition } from "./impl/stickyRowHandler.js";
export interface ICorePivotTableState {
    readyToRender: boolean;
    columnTotals: ITotal[];
    rowTotals: ITotal[];
    desiredHeight: number | undefined;
    error?: string;
    resized: boolean;
}
/**
 * Because the ag-grid is not a true React component, a lot of the state related to operations
 * and interactions with ag-grid should be and are treated in 'typical' fashion, outside of the
 * usual React state.
 */
export declare class InternalTableState {
    initializer?: TableFacadeInitializer;
    table?: TableFacade;
    gridOptions?: ICustomGridOptions;
    firstDataRendered: boolean;
    lastScrollPosition: IScrollPosition;
    isMetaOrCtrlKeyPressed: boolean;
    isAltKeyPressed: boolean;
    lastResizedWidth: number;
    lastResizedHeight: number;
    private watchingIntervalId?;
    destroy: () => void;
    /**
     * Abandon current table initialization (if any). This will not cancel any in-flight requests but will
     * make sure that when they complete they are noop - dead work.
     */
    abandonInitialization: () => void;
    stopWatching: () => void;
    startWatching: (handler: TimerHandler, timeout?: number) => void;
    /**
     * Checks if the last size on record for this table is same as the provided sizes. If it is, don't
     * do anything and return false. If the sizes differ, they will be updated and true is returned.
     *
     * @param width - width to test & update if needed
     * @param height - height to test & update if needed
     */
    checkAndUpdateLastSize: (width: number, height: number) => boolean;
}
//# sourceMappingURL=tableState.d.ts.map