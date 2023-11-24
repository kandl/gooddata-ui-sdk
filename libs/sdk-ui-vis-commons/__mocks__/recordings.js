// (C) 2020 GoodData Corporation
import { DataViewFacade } from "@gooddata/sdk-ui";
import { recordedDataView } from "@gooddata/sdk-backend-mockingbird";
export function recordedDataFacade(rec) {
    return DataViewFacade.for(recordedDataView(rec));
}
//# sourceMappingURL=recordings.js.map