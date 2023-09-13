import { IntlShape } from "react-intl";
import { AccessGranularPermission, IUser, ObjRef } from "@gooddata/sdk-model";
import { GranteeItem, IGranteeGroupAll, IGranteeInactiveOwner } from "./types.js";
import { CurrentUserPermissions } from "../types.js";
/**
 * @internal
 */
export declare const GROUP_ALL_ID = "groupAll";
/**
 * @internal
 */
export declare const GranteeGroupAll: IGranteeGroupAll;
/**
 * @internal
 */
export declare const INACTIVE_OWNER_ID = "inactive_owner";
/**
 * @internal
 */
export declare const InactiveOwner: IGranteeInactiveOwner;
/**
 * @internal
 */
export declare const getGranteeLabel: (grantee: GranteeItem, intl: IntlShape) => string;
/**
 * @internal
 */
export declare const sortGranteesByName: (intl: IntlShape) => (granteeA: GranteeItem, granteeB: GranteeItem) => number;
export declare const sortGranteeList: (grantees: GranteeItem[], intl: IntlShape) => GranteeItem[];
/**
 * @internal
 */
export declare const notInArrayFilter: (array: GranteeItem[], notInArray: GranteeItem[]) => GranteeItem[];
/**
 * @internal
 */
export declare const hasGroupAll: (array: GranteeItem[]) => boolean;
/**
 * @internal
 */
export declare const getAppliedGrantees: (grantees: GranteeItem[], granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => GranteeItem[];
/**
 * @internal
 */
export declare const getGranteeItemTestId: (grantee: GranteeItem, prefix?: "option") => string;
/**
 * @internal
 */
export declare const getGranularGranteeClassNameId: (grantee: GranteeItem) => string;
/**
 * @internal
 */
export declare const getGranularPermissionFromUserPermissions: (userPermissions: CurrentUserPermissions) => AccessGranularPermission | undefined;
/**
 * Decide whether specific grantee is the currently logged in user.
 *
 * In some cases, current user might have uriRef instead of idRef or vice versa. This would result in
 * a false negative match. Method conveniently checks also user login to avoid such mismatch.
 *
 * @internal
 */
export declare const getIsGranteeCurrentUser: (granteeRef: ObjRef, currentUser: IUser) => boolean;
//# sourceMappingURL=utils.d.ts.map