// (C) 2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { useTheme } from "@gooddata/sdk-ui-theme-provider";
import { Button } from "../Button/index.js";
import { Icon } from "../Icon/index.js";
import { Typography } from "../Typography/index.js";
import { Overlay } from "./Overlay.js";
import { IntlWrapper } from "@gooddata/sdk-ui";
const ErrorOverlayCore = (props) => {
    var _a, _b;
    const { showIcon = true, showButton = true, icon, title, text, buttonTitle, onButtonClick, className, intl, } = props;
    const theme = useTheme();
    const IconComponent = icon !== null && icon !== void 0 ? icon : (React.createElement(Icon.Leave, { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.base, className: "gd-error-overlay-icon" }));
    const titleContent = title !== null && title !== void 0 ? title : intl.formatMessage({ id: "error.overlay.title" });
    const textContent = text !== null && text !== void 0 ? text : intl.formatMessage({ id: "error.overlay.text" });
    const buttonValue = buttonTitle !== null && buttonTitle !== void 0 ? buttonTitle : intl.formatMessage({ id: "error.overlay.login" });
    return (React.createElement(Overlay, { isModal: true, positionType: "fixed", alignPoints: [{ align: "cc cc" }], closeOnEscape: false, closeOnParentScroll: false, closeOnOutsideClick: false, closeOnMouseDrag: false, zIndex: 10001, containerClassName: "gd-error-overlay-content", className: className },
        React.createElement("div", { className: "gd-error-overlay s-error-overlay" },
            showIcon ? IconComponent : null,
            React.createElement(Typography, { tagName: "h2" }, titleContent),
            React.createElement("div", { className: "gd-error-overlay-text" }, textContent),
            showButton ? (React.createElement(Button, { className: "gd-button gd-button-action gd-error-overlay-button", value: buttonValue, onClick: onButtonClick })) : null)));
};
const ErrorOverlayWithIntl = injectIntl(ErrorOverlayCore);
/**
 * @internal
 */
export class ErrorOverlay extends React.PureComponent {
    render() {
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(ErrorOverlayWithIntl, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=ErrorOverlay.js.map