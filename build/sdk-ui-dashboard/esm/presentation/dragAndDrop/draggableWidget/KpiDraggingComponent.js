// (C) 2022 GoodData Corporation
import React from "react";
import { ShortenedText } from "@gooddata/sdk-ui-kit";
/*
 * @internal
 */
export function KpiDraggingComponent({ item }) {
    return (React.createElement("div", { className: "move-kpi-placeholder" },
        React.createElement(ShortenedText, null, item.title)));
}
//# sourceMappingURL=KpiDraggingComponent.js.map