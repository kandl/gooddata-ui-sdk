// (C) 2020-2022 GoodData Corporation
import React from "react";
import { ParameterDetail } from "./ParameterDetail.js";
import { useIntl } from "react-intl";
import { useClientWorkspaceIdentifiers } from "@gooddata/sdk-ui";
export const ClientIdParameterDetail = ({ title }) => {
    const intl = useIntl();
    const { client } = useClientWorkspaceIdentifiers();
    return (React.createElement(ParameterDetail, { title: title, typeName: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.identifierTypeLabel",
        }), useEllipsis: false, values: client ? [client] : [] }));
};
//# sourceMappingURL=ClientIdParameterDetail.js.map