// (C) 2007-2022 GoodData Corporation
import React from "react";
import { DashboardItemHeadlineContainer } from "../../../presentationComponents/index.js";
import { EditableHeadline } from "../../common/EditableHeadline.js";
const MAX_KPI_TITLE_LENGTH = 35;
export const EditableKpiHeadline = ({ title, onTitleChange, onTitleEditingEnd, onTitleEditingStart, clientHeight, }) => {
    const maxLength = Math.max(title.length, MAX_KPI_TITLE_LENGTH);
    return (React.createElement(DashboardItemHeadlineContainer, { clientHeight: clientHeight },
        React.createElement(EditableHeadline, { text: title, originalTitle: title, maxLength: maxLength, onTitleChange: onTitleChange, onTitleEditingStart: onTitleEditingStart, onTitleEditingCancel: onTitleEditingEnd })));
};
//# sourceMappingURL=EditModeKpiHeadline.js.map