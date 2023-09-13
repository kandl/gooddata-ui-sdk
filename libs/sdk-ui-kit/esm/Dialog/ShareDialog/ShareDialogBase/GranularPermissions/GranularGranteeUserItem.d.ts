import React from "react";
import { DialogModeType, GranteeItem, IGranularGranteeUser } from "../types.js";
import { CurrentUserPermissions } from "../../types.js";
interface IGranularGranteeUserItemProps {
    grantee: IGranularGranteeUser;
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    mode: DialogModeType;
    onChange: (grantee: GranteeItem) => void;
    onDelete: (grantee: GranteeItem) => void;
}
export declare const GranularGranteeUserItem: React.FC<IGranularGranteeUserItemProps>;
export {};
//# sourceMappingURL=GranularGranteeUserItem.d.ts.map