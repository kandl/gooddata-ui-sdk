// (C) 2023 GoodData Corporation
import { useCallback } from "react";
import { fireDrillEvent } from "@gooddata/sdk-ui";
import { buildDrillEventData } from "../utils/HeadlineTransformationUtils.js";
export const useFireDrillEvent = (dataView, onDrill) => {
    const handleFiredDrillEvent = useCallback((item, elementTarget) => {
        const drillEventData = buildDrillEventData(item, dataView);
        fireDrillEvent(onDrill, drillEventData, elementTarget);
    }, [dataView, onDrill]);
    return { handleFiredDrillEvent };
};
//# sourceMappingURL=useFiredDrillEvent.js.map