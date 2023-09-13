// (C) 2023 GoodData Corporation
import React, { useMemo } from "react";
import PrimarySectionContent from "./PrimarySectionContent.js";
import { calculateHeadlineHeightFontSize } from "@gooddata/sdk-ui-vis-commons";
import { useBaseHeadline } from "./BaseHeadlineContext.js";
const PrimarySectionCompactContent = ({ primaryItem, isOnlyPrimaryItem, }) => {
    const { clientHeight } = useBaseHeadline();
    const customStyle = useMemo(() => {
        const { height, fontSize } = calculateHeadlineHeightFontSize(!isOnlyPrimaryItem, clientHeight);
        return {
            height: `${height}px`,
            lineHeight: `${height}px`,
            fontSize,
        };
    }, [isOnlyPrimaryItem, clientHeight]);
    return clientHeight ? (React.createElement(PrimarySectionContent, { primaryItem: primaryItem, customStyle: customStyle })) : null;
};
export default PrimarySectionCompactContent;
//# sourceMappingURL=PrimarySectionCompactContent.js.map