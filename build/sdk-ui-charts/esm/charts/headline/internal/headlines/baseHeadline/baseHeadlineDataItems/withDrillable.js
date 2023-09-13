// (C) 2023 GoodData Corporation
import React, { useCallback } from "react";
import { wrapDisplayName } from "@gooddata/sdk-ui";
import { useBaseHeadline } from "../BaseHeadlineContext.js";
export const withDrillable = (BaseHeadlineValueItem) => {
    const WithDrillable = (props) => {
        const { dataItem, elementType } = props;
        const { fireDrillEvent } = useBaseHeadline();
        const handleDrillable = useCallback((event) => {
            if (dataItem === null || dataItem === void 0 ? void 0 : dataItem.isDrillable) {
                fireDrillEvent(dataItem, elementType, event.target);
            }
        }, [dataItem, elementType, fireDrillEvent]);
        return (dataItem === null || dataItem === void 0 ? void 0 : dataItem.isDrillable) ? (React.createElement("div", { className: "headline-item-link s-headline-item-link", onClick: handleDrillable },
            React.createElement(BaseHeadlineValueItem, Object.assign({}, props)))) : (React.createElement(BaseHeadlineValueItem, Object.assign({}, props)));
    };
    return wrapDisplayName("withDrillable", BaseHeadlineValueItem)(WithDrillable);
};
//# sourceMappingURL=withDrillable.js.map