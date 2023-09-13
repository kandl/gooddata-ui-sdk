import React from "react";
import { ISubMenuProps } from "./SubMenu.js";
/**
 * @internal
 */
export interface IMenuProps extends ISubMenuProps {
    closeOnScroll?: boolean;
    portalTarget?: Element;
    togglerWrapperClassName?: string;
    children: React.ReactNode;
}
/**
 * @internal
 */
export declare const Menu: React.FC<IMenuProps>;
//# sourceMappingURL=Menu.d.ts.map