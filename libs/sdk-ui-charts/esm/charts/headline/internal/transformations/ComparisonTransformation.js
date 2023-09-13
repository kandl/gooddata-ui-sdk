// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import BaseHeadline from "../headlines/baseHeadline/BaseHeadline.js";
import { useFireDrillEvent } from "./useFiredDrillEvent.js";
import { getComparisonBaseHeadlineData } from "../utils/ComparisonTransformationUtils.js";
const ComparisonTransformation = ({ dataView, drillableItems, config, onAfterRender, onDrill, }) => {
    const { comparison } = config;
    const intl = useIntl();
    const { handleFiredDrillEvent } = useFireDrillEvent(dataView, onDrill);
    const data = useMemo(() => getComparisonBaseHeadlineData(dataView, drillableItems, comparison, intl), [dataView, drillableItems, comparison, intl]);
    return (React.createElement(BaseHeadline, { data: data, config: config, onDrill: handleFiredDrillEvent, onAfterRender: onAfterRender }));
};
export default ComparisonTransformation;
//# sourceMappingURL=ComparisonTransformation.js.map