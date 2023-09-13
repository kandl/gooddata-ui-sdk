// (C) 2007-2022 GoodData Corporation
import React, { PureComponent } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { v4 as uuid } from "uuid";
import identity from "lodash/identity.js";
import cx from "classnames";
class WrappedHeaderMenu extends PureComponent {
    getClassNames() {
        return cx("gd-header-menu", this.props.className);
    }
    renderSection(items) {
        return items.map((item) => {
            const clickHandler = item.onClick
                ? item.onClick
                : (event) => this.props.onMenuItemClick(item, event);
            const classNames = cx("gd-header-menu-item gd-list-help-menu-item", {
                active: item.isActive,
                [item.className]: !!item.className,
            });
            return (React.createElement("li", { key: item.key },
                React.createElement("a", { onClick: clickHandler, href: item.href, className: classNames, target: item.target, rel: item.target === "_blank" ? "noreferrer noopener" : undefined },
                    item.iconName ? React.createElement("i", { className: cx(item.iconName, "gd-icon") }) : null,
                    React.createElement("span", { className: item.className },
                        React.createElement(FormattedMessage, { id: item.key })))));
        });
    }
    renderSections() {
        return this.props.sections.map((items) => {
            return (React.createElement("ul", { key: `section-${uuid()}`, className: "gd-header-menu-section gd-header-measure" }, this.renderSection(items)));
        });
    }
    render() {
        return React.createElement("div", { className: this.getClassNames() }, this.renderSections());
    }
}
WrappedHeaderMenu.defaultProps = {
    className: "",
    onMenuItemClick: identity,
    sections: [],
};
export const HeaderMenu = injectIntl(WrappedHeaderMenu);
//# sourceMappingURL=HeaderMenu.js.map