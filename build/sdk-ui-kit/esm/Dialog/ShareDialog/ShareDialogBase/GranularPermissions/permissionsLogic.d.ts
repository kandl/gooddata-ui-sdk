import { AccessGranularPermission } from "@gooddata/sdk-model";
import { CurrentUserPermissions } from "../../types.js";
import { IGranteePermissionsPossibilities, IGranularGrantee } from "../types.js";
export declare const getEffectivePermission: (permissions: AccessGranularPermission[], inheritedPermissions: AccessGranularPermission[], isSharedObjectLocked: boolean) => AccessGranularPermission;
export declare const getGranteePossibilities: (grantee: IGranularGrantee, currentUserPermissions: CurrentUserPermissions, isSharedObjectLocked: boolean) => IGranteePermissionsPossibilities;
//# sourceMappingURL=permissionsLogic.d.ts.map