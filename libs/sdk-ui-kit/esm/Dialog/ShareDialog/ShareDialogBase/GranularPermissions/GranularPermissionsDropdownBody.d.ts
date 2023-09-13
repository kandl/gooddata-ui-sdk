import React from "react";
import { AccessGranularPermission } from "@gooddata/sdk-model";
import { DialogModeType, GranteeItem, IGranteePermissionsPossibilities, IGranularGrantee } from "../types.js";
interface IGranularPermissionsDropdownBodyProps {
    alignTo: string;
    grantee: IGranularGrantee;
    granteePossibilities: IGranteePermissionsPossibilities;
    isShowDropdown: boolean;
    selectedPermission: AccessGranularPermission;
    toggleDropdown(): void;
    onChange: (grantee: GranteeItem) => void;
    onDelete: (grantee: GranteeItem) => void;
    handleSetSelectedPermission: (permission: AccessGranularPermission) => void;
    mode: DialogModeType;
}
export declare const GranularPermissionsDropdownBody: React.FC<IGranularPermissionsDropdownBodyProps>;
export {};
//# sourceMappingURL=GranularPermissionsDropdownBody.d.ts.map