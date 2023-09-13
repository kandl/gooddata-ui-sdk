// (C) 2022 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { TextAreaWithSubmit } from "@gooddata/sdk-ui-kit";
export function InsightDescription(props) {
    const { description, setDescription, readOnly = false } = props;
    const intl = useIntl();
    const onChange = (value) => {
        setDescription(value.trim());
    };
    return (React.createElement("label", { className: "gd-input" },
        React.createElement(TextAreaWithSubmit, { className: cx("gd-input-field description gd-widget-description-input"), rows: 4, defaultValue: (description || "").trim(), maxLength: 2000, placeholder: readOnly
                ? undefined
                : intl.formatMessage({
                    id: "configurationPanel.visualprops.descriptionPlaceholder",
                }), onSubmit: onChange, disabled: readOnly })));
}
//# sourceMappingURL=InsightDescription.js.map