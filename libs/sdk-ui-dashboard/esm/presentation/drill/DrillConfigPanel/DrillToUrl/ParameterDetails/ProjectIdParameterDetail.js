// (C) 2020-2022 GoodData Corporation
import React from "react";
import { ParameterDetail } from "./ParameterDetail.js";
import { useWorkspaceStrict } from "@gooddata/sdk-ui";
import { useIntl } from "react-intl";
export const ProjectIdParameterDetail = ({ title }) => {
    const value = useWorkspaceStrict();
    const intl = useIntl();
    return (React.createElement(ParameterDetail, { title: title, typeName: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.identifierTypeLabel",
        }), useEllipsis: false, values: [value] }));
};
//# sourceMappingURL=ProjectIdParameterDetail.js.map