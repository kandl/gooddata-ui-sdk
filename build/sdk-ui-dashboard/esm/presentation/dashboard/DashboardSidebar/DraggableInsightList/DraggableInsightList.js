// (C) 2007-2022 GoodData Corporation
import React, { useEffect, useRef } from "react";
import { FlexDimensions } from "@gooddata/sdk-ui-kit";
import { DraggableInsightListCore } from "./DraggableInsightListCore.js";
export const DraggableInsightList = (props) => {
    const { recalculateSizeReference, searchAutofocus, enableDescriptions, WrapInsightListItemWithDragComponent, } = props;
    const flexRef = useRef(null);
    useEffect(() => {
        var _a;
        (_a = flexRef.current) === null || _a === void 0 ? void 0 : _a.updateSize();
    }, [recalculateSizeReference]);
    return (React.createElement("div", { className: "gd-visualizations-list gd-flex-item-stretch gd-flex-row-container" },
        React.createElement(FlexDimensions, { ref: flexRef, measureHeight: true, measureWidth: false, className: "visualizations-flex-dimensions" },
            React.createElement(DraggableInsightListCore, { WrapInsightListItemWithDragComponent: WrapInsightListItemWithDragComponent, searchAutofocus: searchAutofocus, enableDescriptions: enableDescriptions }))));
};
//# sourceMappingURL=DraggableInsightList.js.map