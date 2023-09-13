// (C) 2023 GoodData Corporation
import React from "react";
import { ResponsiveText } from "@gooddata/sdk-ui-kit";
import { withDrillable } from "./withDrillable.js";
import { withTitle } from "./withTitle.js";
import { useBaseHeadlineDataItem } from "./useBaseHeadlineDataItem.js";
import cx from "classnames";
import { useBaseHeadline } from "../BaseHeadlineContext.js";
const BaseHeadlineDataItem = ({ dataItem }) => {
    const { config } = useBaseHeadline();
    const { formattedItem } = useBaseHeadlineDataItem(dataItem);
    const valueClassNames = cx(["headline-value", "s-headline-value"], {
        "headline-value--empty s-headline-value--empty": formattedItem.isValueEmpty,
        "headline-link-style-underline s-headline-link-style-underline": !(config === null || config === void 0 ? void 0 : config.disableDrillUnderline),
    });
    return (React.createElement("div", { className: "headline-value-wrapper s-headline-value-wrapper", style: formattedItem.cssStyle },
        React.createElement(ResponsiveText, null,
            React.createElement("div", { className: valueClassNames }, formattedItem.value))));
};
export default withDrillable(withTitle(BaseHeadlineDataItem));
//# sourceMappingURL=BaseHeadlineDataItem.js.map