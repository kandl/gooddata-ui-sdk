// (C) 2023 GoodData Corporation
import React from "react";
import { wrapDisplayName } from "@gooddata/sdk-ui";
export const withTitle = (BaseHeadlineDataItem) => {
    const WithTitle = (props) => {
        const { shouldHideTitle, titleRef, dataItem } = props;
        return (React.createElement(React.Fragment, null,
            React.createElement(BaseHeadlineDataItem, Object.assign({}, props)),
            !shouldHideTitle ? (React.createElement("div", { className: "headline-title-wrapper s-headline-title-wrapper", title: dataItem === null || dataItem === void 0 ? void 0 : dataItem.title, ref: titleRef }, dataItem === null || dataItem === void 0 ? void 0 : dataItem.title)) : null));
    };
    return wrapDisplayName("withTitle", BaseHeadlineDataItem)(WithTitle);
};
//# sourceMappingURL=withTitle.js.map