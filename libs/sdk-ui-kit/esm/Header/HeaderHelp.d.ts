import React from "react";
import { IntlShape } from "react-intl";
import { HelpMenuDropdownAlignPoints } from "../typings/positioning.js";
interface IHelpItem {
    key: string;
    href?: string;
    isActive?: boolean;
    className?: string;
    target?: string;
    iconName?: string;
    onClick?: (obj: any) => void;
}
interface IHeaderHelpProps {
    intl: IntlShape;
    className: string;
    helpMenuDropdownAlignPoints?: HelpMenuDropdownAlignPoints;
    items: IHelpItem[];
    onMenuItemClick?: (...args: any[]) => void;
    disableDropdown?: boolean;
    onHelpClicked?: (isOpen?: boolean) => void;
    helpRedirectUrl?: string;
}
export declare const CoreHeaderHelp: React.FC<IHeaderHelpProps>;
export declare const HeaderHelp: React.FC<import("react-intl").WithIntlProps<IHeaderHelpProps>> & {
    WrappedComponent: React.ComponentType<IHeaderHelpProps>;
};
export {};
//# sourceMappingURL=HeaderHelp.d.ts.map