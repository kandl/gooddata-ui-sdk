import { IDataView } from "@gooddata/sdk-backend-spi";
import { IDrillEventCallback } from "@gooddata/sdk-ui";
import { HeadlineFiredDrillEvent } from "../interfaces/DrillEvents.js";
export declare const useFireDrillEvent: (dataView: IDataView, onDrill: IDrillEventCallback) => {
    handleFiredDrillEvent: HeadlineFiredDrillEvent;
};
//# sourceMappingURL=useFiredDrillEvent.d.ts.map