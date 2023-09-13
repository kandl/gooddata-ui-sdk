// (C) 2021 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
export const HeaderUpsellButton = ({ onUpsellButtonClick }) => {
    const intl = useIntl();
    return (React.createElement("button", { className: "gd-button-small gd-button-primary gd-upsell-button", onClick: onUpsellButtonClick },
        React.createElement("i", { className: "gd-icon-star" }),
        React.createElement("span", { className: "gd-upgrade-button-text" }, intl.formatMessage({ id: "gs.header.upsellButtonText" }))));
};
//# sourceMappingURL=HeaderUpsellButton.js.map