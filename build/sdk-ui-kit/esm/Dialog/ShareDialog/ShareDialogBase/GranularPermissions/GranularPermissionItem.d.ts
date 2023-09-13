import React from "react";
import { AccessGranularPermission } from "@gooddata/sdk-model";
import { GranteeItem, IGranularGrantee, IGranularPermissionTypeItem } from "../types.js";
interface IGranularPermissionItemProps {
    grantee: IGranularGrantee;
    permission: IGranularPermissionTypeItem;
    selectedPermission: AccessGranularPermission;
    toggleDropdown: () => void;
    onChange: (grantee: GranteeItem) => void;
    handleSetSelectedPermission: (permission: AccessGranularPermission) => void;
}
export declare const GranularPermissionSelectItemWithBubble: React.FC<IGranularPermissionItemProps & import("../../../../Bubble/withBubble.js").IWithBubbleProps>;
export {};
//# sourceMappingURL=GranularPermissionItem.d.ts.map