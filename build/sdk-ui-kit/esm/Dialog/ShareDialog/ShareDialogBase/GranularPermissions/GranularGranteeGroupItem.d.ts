import React from "react";
import { DialogModeType, GranteeItem, IGranularGranteeGroup } from "../types.js";
import { CurrentUserPermissions } from "../../types.js";
interface IGranularGranteeGroupItemProps {
    grantee: IGranularGranteeGroup;
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    mode: DialogModeType;
    onChange: (grantee: GranteeItem) => void;
    onDelete: (grantee: GranteeItem) => void;
}
export declare const GranularGranteeGroupItem: React.FC<IGranularGranteeGroupItemProps>;
export {};
//# sourceMappingURL=GranularGranteeGroupItem.d.ts.map