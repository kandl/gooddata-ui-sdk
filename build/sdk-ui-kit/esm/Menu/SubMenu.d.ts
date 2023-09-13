import React from "react";
import { OpenAction, IMenuPositionConfig } from "./MenuSharedTypes.js";
import { IMenuStateConfig } from "./MenuState.js";
/**
 * @internal
 */
export interface ISubMenuProps extends IMenuStateConfig, Partial<IMenuPositionConfig> {
    openAction?: OpenAction;
    toggler: React.ReactNode;
    children: React.ReactNode;
}
/**
 * @internal
 */
export declare const SubMenu: React.FC<ISubMenuProps>;
//# sourceMappingURL=SubMenu.d.ts.map