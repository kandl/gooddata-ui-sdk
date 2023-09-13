// (C) 2007-2021 GoodData Corporation
import React, { PureComponent } from "react";
import cx from "classnames";
import { injectIntl, FormattedMessage } from "react-intl";
import { Overlay } from "../Overlay/index.js";
class WrappedHeaderAccount extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleAccountMenu = (isOpen = !this.state.isOpen) => {
            this.setState({
                isOpen,
            });
        };
        this.toggleAccountMenuHandler = () => {
            this.toggleAccountMenu();
        };
        this.state = {
            isOpen: false,
        };
    }
    getClassNames() {
        return cx({
            "gd-header-account": true,
            "is-open": this.state.isOpen,
            [this.props.className]: !!this.props.className,
        });
    }
    getMenuItems() {
        return this.props.items.map((item) => {
            return (React.createElement("a", { key: item.key, href: item.href, onClick: (e) => {
                    this.menuItemClicked(item, e);
                }, className: `gd-list-item ${item.className}` },
                React.createElement(FormattedMessage, { id: item.key })));
        });
    }
    menuItemClicked(item, e) {
        this.toggleAccountMenu(false);
        this.props.onMenuItemClick(item, e);
    }
    renderAccountMenu() {
        return this.state.isOpen ? (React.createElement(Overlay, { alignTo: ".gd-header-account", alignPoints: [
                {
                    align: "br tr",
                },
            ], closeOnOutsideClick: true, closeOnMouseDrag: true, closeOnParentScroll: true, onClose: () => {
                this.toggleAccountMenu(false);
            } },
            React.createElement("div", { className: "gd-dialog gd-dropdown overlay gd-header-account-dropdown" },
                React.createElement("div", { className: "gd-list small" }, this.getMenuItems())))) : (false);
    }
    render() {
        return (React.createElement("div", { className: this.getClassNames(), onClick: this.toggleAccountMenuHandler },
            React.createElement("span", { className: "gd-header-account-icon gd-icon-user" }),
            React.createElement("span", { className: "gd-header-account-user" }, this.props.userName),
            this.renderAccountMenu()));
    }
}
WrappedHeaderAccount.defaultProps = {
    className: "",
    items: [],
    userName: "",
};
export const HeaderAccount = injectIntl(WrappedHeaderAccount);
//# sourceMappingURL=HeaderAccount.js.map