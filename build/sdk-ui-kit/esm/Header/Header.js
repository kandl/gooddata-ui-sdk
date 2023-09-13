// (C) 2007-2022 GoodData Corporation
import React, { Component, createRef } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import cx from "classnames";
import differenceInMonths from "date-fns/differenceInMonths/index.js";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays/index.js";
import format from "date-fns/format/index.js";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
import { v4 as uuid } from "uuid";
import debounce from "lodash/debounce.js";
import { Overlay } from "../Overlay/index.js";
import { removeFromDom } from "../utils/domUtilities.js";
import { Icon } from "../Icon/index.js";
import { getItemActiveColor, getTextColor, getItemHoverColor, getSeparatorColor, getWorkspacePickerHoverColor, } from "./colors.js";
import { addCssToStylesheet } from "./addCssToStylesheet.js";
import { HeaderHelp } from "./HeaderHelp.js";
import { HeaderAccount } from "./HeaderAccount.js";
import { HeaderMenu } from "./HeaderMenu.js";
import { HeaderUpsellButton } from "./HeaderUpsellButton.js";
import { HeaderInvite } from "./HeaderInvite.js";
function getOuterWidth(element) {
    const width = element.offsetWidth;
    const { marginLeft, marginRight } = getComputedStyle(element);
    return width + parseInt(marginLeft, 10) + parseInt(marginRight, 10);
}
function getWidthOfChildren(element, selector = "> *") {
    const SAFETY_PADDING = 10;
    return Array.from(element.querySelectorAll(selector))
        .map(getOuterWidth)
        .reduce((sum, childWidth) => sum + childWidth, SAFETY_PADDING);
}
class AppHeaderCore extends Component {
    constructor(props) {
        super(props);
        this.nodeRef = createRef();
        this.resizeHandler = debounce(() => this.measure(), 100);
        this.getClassNames = () => {
            return cx({
                "gd-header": true,
                [this.state.guid]: true,
                [this.props.className]: !!this.props.className,
            });
        };
        this.measureChildren = () => {
            const currentDOMNode = this.nodeRef.current;
            const childrenWidth = getWidthOfChildren(currentDOMNode, ".gd-header-measure");
            this.setState({
                childrenWidth,
            }, this.measure);
        };
        this.measure = () => {
            const currentDOMNode = this.nodeRef.current;
            if (!currentDOMNode) {
                // ref is null because 'this.measure()' is called after 100ms 'componentWillUnmount' called,
                // which cleans the nodeRef
                return;
            }
            const currentWidth = currentDOMNode.clientWidth;
            const responsiveMode = currentWidth < this.state.childrenWidth;
            if (this.state.responsiveMode !== responsiveMode) {
                this.setState({
                    responsiveMode,
                    isOverlayMenuOpen: false,
                    isHelpMenuOpen: false,
                });
            }
        };
        this.createStyles = () => {
            const { guid } = this.state;
            const { activeColor, headerColor, headerTextColor } = this.props;
            const textColor = getTextColor(headerTextColor, headerColor);
            const itemActiveColor = getItemActiveColor(activeColor, headerColor);
            const itemHoverColor = getItemHoverColor(headerColor, activeColor);
            const separatorColor = getSeparatorColor(headerColor, activeColor);
            const workspacesPickerHoverColor = getWorkspacePickerHoverColor(headerColor);
            const css = [];
            css.push(`.${guid} { color: ${textColor}; background: ${headerColor}}`);
            css.push(`.${guid} .gd-header-menu-section { border-color: ${separatorColor}}`);
            css.push(`.${guid} .gd-header-menu-item:hover { border-color: ${itemHoverColor}}`);
            css.push(`.${guid} .gd-header-menu-item.active { border-color: var(--gd-palette-primary-base, ${itemActiveColor})}`);
            css.push(`.${guid} .gd-header-project { border-color: ${separatorColor}}`);
            css.push(`.${guid} .gd-header-project:hover { background-color: ${workspacesPickerHoverColor}; color: ${textColor}}`);
            css.push(`.${guid} .hamburger-icon:not(.is-open) i { border-color: ${textColor}}`);
            css.push(`.${guid} .hamburger-icon:not(.is-open):after { border-color: ${textColor}}`);
            css.push(`.${guid} .hamburger-icon:not(.is-open):before { border-color: ${textColor}}`);
            this.stylesheet = addCssToStylesheet(`header-css-${guid}`, css.join("\n"), true);
        };
        this.setOverlayMenu = (isOverlayMenuOpen) => {
            this.setState({
                isOverlayMenuOpen,
                isHelpMenuOpen: false,
            });
        };
        this.setHelpMenu = (isHelpMenuOpen) => {
            this.setState({
                isHelpMenuOpen,
            });
        };
        this.toggleHelpMenu = () => this.setHelpMenu(!this.state.isHelpMenuOpen);
        this.handleMenuItemClick = (item, event) => {
            if (this.state.isHelpMenuOpen) {
                this.setOverlayMenu(false);
            }
            this.props.onMenuItemClick(item, event);
        };
        this.addHelpItemGroup = (itemGroups) => {
            return !this.props.documentationUrl ? itemGroups : [...itemGroups, [this.getHelpMenuLink()]];
        };
        this.getHelpMenu = () => [
            [this.getHelpMenuLink("gd-icon-header-help-back"), ...this.props.helpMenuItems],
        ];
        this.getHelpMenuLink = (icon = "gd-icon-header-help") => ({
            key: "gs.header.help",
            className: `s-menu-help ${icon}`,
            href: this.state.responsiveMode && this.props.helpMenuItems ? undefined : this.props.documentationUrl,
            onClick: this.state.responsiveMode && this.props.helpMenuItems ? this.toggleHelpMenu : undefined,
        });
        this.getTrialCountdown = (expiredDate) => {
            // expiredDate is the last day that user can use the service
            const trialDaysLeft = differenceInCalendarDays(new Date(expiredDate), new Date()) + 1;
            if (trialDaysLeft === 1) {
                return React.createElement(FormattedMessage, { id: "gs.header.countdown.lastDay" });
            }
            if (trialDaysLeft === 30) {
                return React.createElement(FormattedMessage, { id: "gs.header.countdown.oneMonthLeft" });
            }
            if (trialDaysLeft > 1 && trialDaysLeft < 30) {
                return (React.createElement(FormattedMessage, { id: "gs.header.countdown.numberOfDaysLeft", values: { number: trialDaysLeft } }));
            }
            if (trialDaysLeft > 30 && trialDaysLeft <= 91) {
                const currentDateWithoutTime = format(new Date(), "yyyy-MM-dd");
                const trialMonthsLeft = differenceInMonths(new Date(expiredDate), new Date(currentDateWithoutTime));
                return (React.createElement(FormattedMessage, { id: "gs.header.countdown.numberOfMonthsLeft", values: { number: trialMonthsLeft + 1 } }));
            }
            return "";
        };
        this.renderNav = () => {
            return this.state.responsiveMode ? this.renderMobileNav() : this.renderStandardNav();
        };
        this.renderMobileNav = () => {
            const iconClasses = cx({
                "hamburger-icon": true,
                "is-open": this.state.isOverlayMenuOpen,
            });
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "hamburger-wrapper", key: "hamburger-wrapper" },
                    React.createElement("div", { className: iconClasses, key: "hamburger-icon", onClick: () => {
                            this.setOverlayMenu(!this.state.isOverlayMenuOpen);
                        } },
                        React.createElement("i", null))),
                this.state.isOverlayMenuOpen ? this.renderOverlayMenu() : null));
        };
        this.renderOverlayMenu = () => {
            return (React.createElement(Overlay, { key: "header-overlay-menu", alignPoints: [
                    {
                        align: "tr tr",
                    },
                ], closeOnOutsideClick: this.state.isOverlayMenuOpen, isModal: this.state.isOverlayMenuOpen, positionType: "fixed", onClose: () => {
                    this.setOverlayMenu(false);
                } },
                React.createElement(TransitionGroup, null,
                    React.createElement(CSSTransition, { classNames: "gd-header", timeout: 300 }, this.renderVerticalMenu()))));
        };
        this.renderTrialItems = () => {
            if (this.props.expiredDate || this.props.showUpsellButton) {
                return (React.createElement("div", { className: "gd-header-menu-trial gd-header-measure" },
                    this.props.expiredDate ? (React.createElement("div", { className: "gd-header-expiration-date" }, this.getTrialCountdown(this.props.expiredDate))) : null,
                    this.props.showUpsellButton ? (React.createElement(HeaderUpsellButton, { onUpsellButtonClick: this.props.onUpsellButtonClick })) : null));
            }
            return null;
        };
        this.renderVerticalMenu = () => {
            const { badges } = this.props;
            const menuItemsGroups = !this.state.isHelpMenuOpen
                ? this.props.showStaticHelpMenu
                    ? [[this.getHelpMenuLink()]]
                    : this.addHelpItemGroup(this.props.menuItemsGroups)
                : this.getHelpMenu();
            return (React.createElement("div", { key: "overlay-menu", className: "gd-header-menu-vertical-wrapper" },
                React.createElement("div", { className: "gd-header-menu-vertical-header" }, "Menu"),
                React.createElement("div", { className: "gd-header-menu-vertical-content" },
                    React.createElement(HeaderMenu, { onMenuItemClick: this.handleMenuItemClick, sections: menuItemsGroups, className: "gd-header-menu-vertical" }),
                    this.renderTrialItems()),
                React.createElement("div", { className: "gd-header-menu-vertical-footer" },
                    !!badges && React.createElement("div", { className: "gd-header-vertical-badges" }, badges),
                    React.createElement("div", { className: "gd-header-menu-vertical-bottom-item" },
                        React.createElement("span", { className: "gd-header-username gd-icon-user" }, this.props.userName)),
                    React.createElement("div", null, this.renderLogoutButton()))));
        };
        this.renderLogoutButton = () => {
            var _a, _b, _c;
            const [logoutMenuItem] = this.props.accountMenuItems.filter((item) => item.key === "gs.header.logout");
            return logoutMenuItem ? (React.createElement("button", { className: "logout-button gd-button s-logout", onClick: (e) => {
                    this.props.onMenuItemClick(logoutMenuItem, e);
                } },
                React.createElement(Icon.Logout, { className: "gd-icon-logout", color: (_c = (_b = (_a = this.props.theme) === null || _a === void 0 ? void 0 : _a.palette) === null || _b === void 0 ? void 0 : _b.complementary) === null || _c === void 0 ? void 0 : _c.c0 }),
                React.createElement("span", { className: "gd-button-text" },
                    React.createElement(FormattedMessage, { id: "gs.header.logout" })))) : (false);
        };
        this.renderStandardNav = () => {
            const { badges, helpMenuDropdownAlignPoints, headerTextColor, headerColor } = this.props;
            const textColor = getTextColor(headerTextColor, headerColor);
            return (React.createElement("div", { className: "gd-header-stretch gd-header-menu-wrapper" },
                React.createElement(HeaderMenu, { onMenuItemClick: this.props.onMenuItemClick, sections: this.props.menuItemsGroups, className: "gd-header-menu-horizontal" }),
                this.renderTrialItems(),
                this.props.helpMenuItems.length ? (React.createElement(HeaderHelp, { onMenuItemClick: this.props.onMenuItemClick, className: "gd-header-measure", helpMenuDropdownAlignPoints: helpMenuDropdownAlignPoints, items: this.props.helpMenuItems, disableDropdown: this.props.disableHelpDropdown, onHelpClicked: this.props.onHelpClick, helpRedirectUrl: this.props.helpRedirectUrl })) : null,
                this.props.showInviteItem ? (React.createElement(HeaderInvite, { onInviteItemClick: this.props.onInviteItemClick, textColor: textColor })) : null,
                React.createElement(HeaderAccount, { userName: this.props.userName, onMenuItemClick: this.props.onMenuItemClick, className: "gd-header-measure", items: this.props.accountMenuItems }),
                badges ? React.createElement("div", { className: "gd-header-badges gd-header-measure" }, badges) : null));
        };
        this.state = {
            childrenWidth: 0,
            guid: `header-${uuid()}`,
            isOverlayMenuOpen: false,
            responsiveMode: false,
            isHelpMenuOpen: false,
        };
    }
    render() {
        const { logoUrl, logoTitle, workspacePicker } = this.props;
        this.createStyles();
        const logoLinkClassName = cx({
            "gd-header-logo": true,
            "gd-header-measure": true,
            "gd-header-shrink": this.state.responsiveMode,
        });
        return (React.createElement("div", { className: this.getClassNames(), ref: this.nodeRef },
            React.createElement("a", { href: this.props.logoHref, onClick: this.props.onLogoClick, className: logoLinkClassName },
                React.createElement("img", { src: logoUrl, title: logoTitle, onLoad: this.measureChildren, onError: this.measureChildren, alt: "" })),
            workspacePicker,
            this.renderNav()));
    }
    componentDidMount() {
        window.addEventListener("resize", this.resizeHandler);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
        removeFromDom(this.stylesheet);
    }
}
AppHeaderCore.defaultProps = {
    logoHref: "/",
    helpMenuDropdownAlignPoints: "br tr",
    accountMenuItems: [],
    helpMenuItems: [],
    menuItemsGroups: [],
};
/**
 * @internal
 */
export const AppHeader = withTheme(injectIntl(AppHeaderCore));
//# sourceMappingURL=Header.js.map