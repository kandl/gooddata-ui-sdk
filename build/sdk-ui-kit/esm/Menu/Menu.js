// (C) 2007-2018 GoodData Corporation
import React from "react";
import isFunction from "lodash/isFunction.js";
import { MenuState } from "./MenuState.js";
import { ControlledMenu } from "./ControlledMenu.js";
/**
 * @internal
 */
export const Menu = (props) => (React.createElement(MenuState, { opened: props.opened, defaultOpened: props.defaultOpened, onOpenedChange: props.onOpenedChange }, (controlledProps) => (React.createElement(ControlledMenu, { opened: controlledProps.opened, onOpenedChange: controlledProps.onOpenedChange, openAction: props.openAction, alignment: props.alignment, spacing: props.spacing, offset: props.offset, toggler: props.toggler, togglerWrapperClassName: props.togglerWrapperClassName, portalTarget: props.portalTarget, closeOnScroll: props.closeOnScroll }, isFunction(props.children)
    ? props.children({
        closeMenu: () => controlledProps.onOpenedChange({
            opened: false,
            source: "CLOSE_MENU_RENDER_PROP",
        }),
    })
    : props.children))));
Menu.defaultProps = {
    openAction: "click",
    alignment: ["bottom", "right"],
    closeOnScroll: false,
};
//# sourceMappingURL=Menu.js.map