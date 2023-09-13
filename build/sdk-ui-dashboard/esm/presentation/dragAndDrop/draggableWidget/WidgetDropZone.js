// (C) 2022 GoodData Corporation
import React from "react";
import { WidgetDropZoneBox } from "./WidgetDropZoneBox.js";
export const WidgetDropZone = (props) => {
    const { isLastInSection, dropRef } = props;
    return (React.createElement("div", { className: "widget-dropzone", ref: dropRef },
        React.createElement(WidgetDropZoneBox, { isLast: isLastInSection })));
};
//# sourceMappingURL=WidgetDropZone.js.map