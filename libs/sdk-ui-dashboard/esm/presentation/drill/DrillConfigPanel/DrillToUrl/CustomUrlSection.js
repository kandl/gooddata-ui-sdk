// (C) 2020-2022 GoodData Corporation
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "@gooddata/sdk-ui-kit";
import { DropdownSectionHeader } from "./DropdownSectionHeader.js";
import { isDrillToCustomUrlConfig } from "../../types.js";
const UrlDropdownOption = ({ urlValue, closeDropdown, }) => (React.createElement("div", { onClick: closeDropdown, className: "gd-list-item gd-menu-item gd-drill-to-custom-url-option s-drill-to-custom-url-option gd-icon-hyperlink-disabled is-selected" },
    React.createElement("span", null, urlValue.length > 50 ? `${urlValue.substring(0, 50)}...` : urlValue)));
const EditButton = ({ urlValue, toggleModal }) => {
    const intl = useIntl();
    const buttonTitle = urlValue
        ? intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.customUrlEditButtonLabel",
        })
        : intl.formatMessage({
            id: "configurationPanel.drillIntoUrl.customUrlAddButtonLabel",
        });
    const buttonIconLeft = urlValue ? undefined : "gd-icon-add";
    return (React.createElement(Button, { className: "gd-button gd-button-secondary gd-button-small s-drill-to-custom-url-button", iconLeft: buttonIconLeft, onClick: toggleModal, value: buttonTitle }));
};
export const CustomUrlSection = (props) => {
    const { urlDrillTarget, closeDropdown } = props;
    const urlValue = isDrillToCustomUrlConfig(urlDrillTarget) ? urlDrillTarget.customUrl : undefined;
    return (React.createElement(React.Fragment, null,
        React.createElement(DropdownSectionHeader, null,
            React.createElement(FormattedMessage, { id: "configurationPanel.drillIntoUrl.customUrlSectionTitle" })),
        !!urlValue && React.createElement(UrlDropdownOption, { urlValue: urlValue, closeDropdown: closeDropdown }),
        React.createElement("div", { className: "gd-drill-to-custom-url-button-wrapper" },
            React.createElement(EditButton, Object.assign({}, props, { urlValue: urlValue })))));
};
//# sourceMappingURL=CustomUrlSection.js.map