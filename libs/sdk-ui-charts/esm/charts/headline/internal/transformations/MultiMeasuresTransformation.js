// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import BaseHeadline from "../headlines/baseHeadline/BaseHeadline.js";
import { getBaseHeadlineData } from "../utils/BaseHeadlineTransformationUtils.js";
import { useFireDrillEvent } from "./useFiredDrillEvent.js";
/**
 * The React component that handles the transformation of the execution objects into the data accepted by the {@link BaseHeadline}
 * React component that this components wraps. It also handles the propagation of the drillable items to the component
 * and drill events out of it.
 */
const MultiMeasuresTransformation = ({ dataView, drillableItems, config, onAfterRender, onDrill, }) => {
    const { handleFiredDrillEvent } = useFireDrillEvent(dataView, onDrill);
    const data = useMemo(() => getBaseHeadlineData(dataView, drillableItems), [dataView, drillableItems]);
    return (React.createElement(BaseHeadline, { data: data, config: config, onDrill: handleFiredDrillEvent, onAfterRender: onAfterRender }));
};
export default MultiMeasuresTransformation;
//# sourceMappingURL=MultiMeasuresTransformation.js.map