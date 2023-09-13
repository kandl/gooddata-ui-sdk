// (C) 2022 GoodData Corporation
import React from "react";
import { Button } from "../../Button/index.js";
import { LoadingSpinner } from "../../LoadingSpinner/index.js";
import { SettingWidget } from "../SettingWidget.js";
import { Header } from "../Header.js";
import { Footer } from "../Footer.js";
import { Separator } from "../Separator.js";
import { Title } from "../Title.js";
import { FooterButtons } from "../FooterButtons.js";
import { Hyperlink } from "../../Hyperlink/index.js";
/**
 * This widget toggles one setting on/off.
 *
 * @internal
 */
export const SimpleSettingWidget = (props) => {
    const { title, currentSettingStatus, titleTooltip, helpLinkText, helpLinkUrl, actionButtonText, isLoading, onSubmit, onHelpLinkClick, } = props;
    return (React.createElement(SettingWidget, null,
        React.createElement(Header, null,
            React.createElement(Title, { title: title, tooltip: titleTooltip }),
            isLoading ? (React.createElement(LoadingSpinner, { className: "small gd-loading-equalizer-spinner" })) : (React.createElement("span", { className: "gd-setting-widget-status-pill" }, currentSettingStatus))),
        React.createElement(Separator, null),
        React.createElement(Footer, null,
            helpLinkText && helpLinkUrl ? (React.createElement(Hyperlink, { text: helpLinkText, href: helpLinkUrl, iconClass: "gd-icon-circle-question", onClick: onHelpLinkClick })) : null,
            !isLoading ? (React.createElement(FooterButtons, null,
                React.createElement(Button, { className: "gd-button-action", onClick: onSubmit, disabled: isLoading, value: actionButtonText }))) : null)));
};
//# sourceMappingURL=SimpleSettingWidget.js.map