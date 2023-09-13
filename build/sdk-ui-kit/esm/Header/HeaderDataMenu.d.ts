import React from "react";
import { IntlShape } from "react-intl";
import { IHeaderMenuItem } from "./typings.js";
/**
 * @internal
 */
export interface IHeaderDataMenuItem extends IHeaderMenuItem {
    isDisable?: boolean;
    tooltipText?: string;
}
/**
 * @internal
 */
export interface IHeaderDataMenuProps {
    intl: IntlShape;
    className?: string;
    onMenuItemClick: (item: IHeaderDataMenuItem) => void;
    dataMenuItems: IHeaderDataMenuItem[];
}
export declare const CoreHeaderDataMenu: React.FC<IHeaderDataMenuProps>;
/**
 * @internal
 */
export declare const HeaderDataMenu: React.FC<import("react-intl").WithIntlProps<IHeaderDataMenuProps>> & {
    WrappedComponent: React.ComponentType<IHeaderDataMenuProps>;
};
//# sourceMappingURL=HeaderDataMenu.d.ts.map