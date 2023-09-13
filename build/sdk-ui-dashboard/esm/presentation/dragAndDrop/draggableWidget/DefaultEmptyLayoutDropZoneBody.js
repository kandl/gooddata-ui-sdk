// (C) 2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "@gooddata/sdk-ui-kit";
export const DefaultEmptyLayoutDropZoneBody = () => {
    return (React.createElement("div", { className: "drag-info-placeholder-box s-drag-info-placeholder-box" },
        React.createElement(Typography, { tagName: "h2" },
            React.createElement(FormattedMessage, { id: "newDashboard.title" }))));
};
//# sourceMappingURL=DefaultEmptyLayoutDropZoneBody.js.map