// (C) 2020-2022 GoodData Corporation
import React from "react";
import { ParameterDetail } from "./ParameterDetail.js";
import { useIntl } from "react-intl";
import { useClientWorkspaceIdentifiers } from "@gooddata/sdk-ui";
export const DataProductIdParameterDetail = ({ title }) => {
    const intl = useIntl();
    const { dataProduct } = useClientWorkspaceIdentifiers();
    return (React.createElement(ParameterDetail, { title: title, typeName: intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.editor.identifierTypeLabel",
        }), useEllipsis: false, values: dataProduct ? [dataProduct] : [] }));
};
//# sourceMappingURL=DataProductIdParameterDetail.js.map