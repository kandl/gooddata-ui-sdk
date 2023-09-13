import React from "react";
import { DialogModeType, GranteeItem, IGranteePermissionsPossibilities, IGranularGrantee } from "../types.js";
interface IGranularPermissionsDropdownProps {
    grantee: IGranularGrantee;
    granteePossibilities: IGranteePermissionsPossibilities;
    isDropdownDisabled?: boolean;
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    onChange: (grantee: GranteeItem) => void;
    onDelete: (grantee: GranteeItem) => void;
    className: string;
    mode: DialogModeType;
}
export declare const GranularPermissionsDropdown: React.FC<IGranularPermissionsDropdownProps>;
export declare const GranularPermissionsDropdownWithBubble: React.FC<IGranularPermissionsDropdownProps & import("../../../../Bubble/withBubble.js").IWithBubbleProps>;
export {};
//# sourceMappingURL=GranularPermissionsDropdown.d.ts.map