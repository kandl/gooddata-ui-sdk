// (C) 2007-2022 GoodData Corporation
import React from "react";
import { MenuOpener } from "./menuOpener/MenuOpener.js";
export class ControlledMenu extends React.Component {
    constructor() {
        super(...arguments);
        this.closeMenu = () => {
            this.props.onOpenedChange({ opened: false, source: "SCROLL" });
        };
        this.addScrollListeners = () => {
            window.addEventListener("scroll", this.closeMenu, true);
        };
        this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.closeMenu, true);
        };
    }
    componentDidMount() {
        if (this.props.closeOnScroll) {
            this.addScrollListeners();
        }
    }
    componentWillUnmount() {
        if (this.props.closeOnScroll) {
            this.removeScrollListeners();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.closeOnScroll !== this.props.closeOnScroll) {
            if (this.props.closeOnScroll) {
                this.addScrollListeners();
            }
            else {
                this.removeScrollListeners();
            }
        }
    }
    render() {
        return (React.createElement(MenuOpener, { opened: this.props.opened, onOpenedChange: this.props.onOpenedChange, openAction: this.props.openAction, alignment: this.props.alignment, spacing: this.props.spacing, offset: this.props.offset, portalTarget: this.props.portalTarget, toggler: this.props.toggler, togglerWrapperClassName: this.props.togglerWrapperClassName, topLevelMenu: true }, this.props.children));
    }
}
//# sourceMappingURL=ControlledMenu.js.map