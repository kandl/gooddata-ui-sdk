// (C) 2007-2022 GoodData Corporation
import React from "react";
import { MenuOpenedByClick } from "./MenuOpenedByClick.js";
import { MenuOpenedByHover } from "./MenuOpenedByHover.js";
class MenuOpener extends React.Component {
    constructor() {
        super(...arguments);
        this.getComponentByOpenAction = () => {
            switch (this.props.openAction) {
                case "click":
                    return MenuOpenedByClick;
                case "hover":
                    return MenuOpenedByHover;
            }
        };
    }
    render() {
        const Component = this.getComponentByOpenAction();
        return (React.createElement(Component, { opened: this.props.opened, onOpenedChange: this.props.onOpenedChange, topLevelMenu: this.props.topLevelMenu, alignment: this.props.alignment, spacing: this.props.spacing, offset: this.props.offset, toggler: this.props.toggler, togglerWrapperClassName: this.props.togglerWrapperClassName, portalTarget: this.props.portalTarget },
            React.createElement("div", { className: "gd-menuOpener" }, this.props.children)));
    }
}
MenuOpener.defaultProps = {
    openAction: "hover",
    alignment: ["right", "bottom"],
    spacing: 0,
    offset: 0,
    portalTarget: document.querySelector("body"),
};
export { MenuOpener };
//# sourceMappingURL=MenuOpener.js.map