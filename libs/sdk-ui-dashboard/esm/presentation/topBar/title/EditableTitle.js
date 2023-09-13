// (C) 2021-2022 GoodData Corporation
import React from "react";
import { EditableLabel } from "@gooddata/sdk-ui-kit";
import { defineMessage, useIntl } from "react-intl";
import { TitleWrapper } from "./TitleWrapper.js";
import { DASHBOARD_TITLE_MAX_LENGTH } from "../../constants/index.js";
import { selectDashboardTitle, useDashboardSelector } from "../../../model/index.js";
const placeholderMessage = defineMessage({ id: "untitled" });
/**
 * @alpha
 */
export const EditableTitle = (props) => {
    const { title, onTitleChanged } = props;
    const intl = useIntl();
    const dashboardTitle = useDashboardSelector(selectDashboardTitle);
    return (React.createElement(TitleWrapper, null,
        React.createElement(EditableLabel, { value: title, onSubmit: onTitleChanged, maxRows: 1, maxLength: DASHBOARD_TITLE_MAX_LENGTH, className: "s-gd-dashboard-title s-dash-title dash-title editable", isEditableLabelWidthBasedOnText: true, autofocus: !dashboardTitle, placeholder: intl.formatMessage(placeholderMessage) }, title)));
};
//# sourceMappingURL=EditableTitle.js.map