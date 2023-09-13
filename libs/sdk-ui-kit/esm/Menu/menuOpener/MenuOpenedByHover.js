// (C) 2007-2022 GoodData Corporation
import React from "react";
import { MenuPosition } from "../positioning/MenuPosition.js";
class MenuOpenedByHover extends React.Component {
    constructor() {
        super(...arguments);
        this.timerCloseDelay = null;
        this.clearCloseDelayTimer = () => {
            if (this.timerCloseDelay) {
                window.clearTimeout(this.timerCloseDelay);
            }
        };
        this.hoverStart = () => {
            this.clearCloseDelayTimer();
            this.timerCloseDelay = window.setTimeout(() => {
                this.props.onOpenedChange({ opened: true, source: "HOVER_TIMEOUT" });
            }, MenuOpenedByHover.openCloseDelayMs);
        };
        this.hoverEnd = () => {
            this.clearCloseDelayTimer();
            this.timerCloseDelay = window.setTimeout(() => {
                this.props.onOpenedChange({ opened: false, source: "HOVER_TIMEOUT" });
            }, MenuOpenedByHover.openCloseDelayMs);
        };
    }
    componentWillUnmount() {
        this.clearCloseDelayTimer();
    }
    render() {
        return (React.createElement(MenuPosition, { toggler: React.createElement("div", { onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd }, this.props.toggler), togglerWrapperClassName: this.props.togglerWrapperClassName, opened: this.props.opened, topLevelMenu: this.props.topLevelMenu, alignment: this.props.alignment, spacing: this.props.spacing, offset: this.props.offset, portalTarget: this.props.portalTarget },
            React.createElement("div", { onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd }, this.props.children)));
    }
}
MenuOpenedByHover.openCloseDelayMs = 200;
export { MenuOpenedByHover };
//# sourceMappingURL=MenuOpenedByHover.js.map