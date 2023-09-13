// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { LoadingMask } from "@gooddata/sdk-ui-kit";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty.js";
const LOADING_MASK_HEIGHT = 60;
export const ParameterDetail = (props) => {
    const { title, typeName, label, isLoading, useEllipsis, values, additionalValues } = props;
    return (React.createElement("div", { className: "gd-drill-to-url-editor-parameter-detail s-parameter-detail" },
        React.createElement("div", { className: "gd-parameter-detail-title" }, title),
        React.createElement(ParameterTypeSection, { typeName: typeName }),
        label ? React.createElement(ParameterLabelSection, { label: label }) : null,
        !isEmpty(values) && (React.createElement(ParameterValuesSection, { isLoading: isLoading, useEllipsis: useEllipsis, values: values, additionalValues: additionalValues }))));
};
const ParameterTypeSection = ({ typeName }) => {
    return (React.createElement("div", { className: "gd-parameter-detail-section" },
        React.createElement("div", { className: "gd-parameter-detail-subtitle" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.parameterDetailType" })),
        React.createElement("div", null, typeName)));
};
const ParameterLabelSection = ({ label }) => {
    return (React.createElement("div", { className: "gd-parameter-detail-section" },
        React.createElement("div", { className: "gd-parameter-detail-subtitle" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.parameterDetailLabel" })),
        React.createElement("div", null, label)));
};
const ParameterValuesSection = ({ isLoading, useEllipsis, values, additionalValues, }) => {
    return isLoading ? (React.createElement(LoadingMask, { className: "s-parameter-detail-loading", height: LOADING_MASK_HEIGHT })) : (React.createElement(Values, { useEllipsis: useEllipsis, values: values, additionalValues: additionalValues }));
};
const Values = ({ useEllipsis, values, additionalValues }) => {
    const valueClassName = classNames("s-parameter-detail-value", {
        "gd-parameter-detail-ellipsis-row": useEllipsis,
    });
    return (values && (React.createElement("div", { className: "gd-parameter-detail-section" },
        React.createElement("div", { className: "gd-parameter-detail-subtitle" },
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.parameterDetailValues", values: { numberOfValues: values.length } })),
        React.createElement("div", null,
            values.map((item, i) => (React.createElement("div", { className: valueClassName, key: i }, item))),
            additionalValues ? (React.createElement("div", { className: "gd-parameter-detail-info" },
                React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.editor.parameterDetailMoreValues", values: { count: additionalValues } }))) : null))));
};
//# sourceMappingURL=ParameterDetail.js.map