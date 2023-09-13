// (C) 2023 GoodData Corporation
import React, { createRef, useMemo } from "react";
import { HeadlinePagination, shouldRenderPagination } from "@gooddata/sdk-ui-vis-commons";
import CompareSectionItem from "./CompareSectionItem.js";
import { getCompareSectionClasses } from "../../utils/HeadlineDataItemUtils.js";
import { useBaseHeadline } from "./BaseHeadlineContext.js";
const CompareSection = ({ secondaryItem, tertiaryItem }) => {
    const { config, clientHeight, clientWidth } = useBaseHeadline();
    const { enableCompactSize } = config;
    const secondaryItemTitleWrapperRef = createRef();
    const pagination = useMemo(() => shouldRenderPagination(enableCompactSize, clientWidth, clientHeight), [enableCompactSize, clientHeight, clientWidth]);
    const compareSectionClassNames = useMemo(() => getCompareSectionClasses(clientWidth, secondaryItemTitleWrapperRef), [clientWidth, secondaryItemTitleWrapperRef]);
    return pagination && tertiaryItem ? (React.createElement("div", { className: "gd-flex-container headline-compare-section headline-paginated-compare-section s-headline-paginated-compare-section" },
        React.createElement(HeadlinePagination, { renderSecondaryItem: () => (React.createElement(CompareSectionItem, { dataItem: secondaryItem, titleRef: secondaryItemTitleWrapperRef })), renderTertiaryItem: () => React.createElement(CompareSectionItem, { dataItem: tertiaryItem }) }))) : (React.createElement("div", { className: compareSectionClassNames },
        tertiaryItem ? React.createElement(CompareSectionItem, { dataItem: tertiaryItem }) : null,
        React.createElement(CompareSectionItem, { dataItem: secondaryItem, titleRef: secondaryItemTitleWrapperRef })));
};
export default CompareSection;
//# sourceMappingURL=CompareSection.js.map