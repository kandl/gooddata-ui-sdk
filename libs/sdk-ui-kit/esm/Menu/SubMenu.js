// (C) 2007-2018 GoodData Corporation
import React from "react";
import { MenuState } from "./MenuState.js";
import { MenuOpener } from "./menuOpener/MenuOpener.js";
/**
 * @internal
 */
export const SubMenu = (props) => (React.createElement(MenuState, { opened: props.opened, defaultOpened: props.defaultOpened, onOpenedChange: props.onOpenedChange }, ({ opened, onOpenedChange }) => (React.createElement(MenuOpener, { opened: opened, onOpenedChange: onOpenedChange, topLevelMenu: false, openAction: props.openAction, toggler: props.toggler, alignment: props.alignment, spacing: props.spacing, offset: props.offset }, props.children))));
//# sourceMappingURL=SubMenu.js.map