import { IUser } from "@gooddata/sdk-model";
import { IUserProfile, JsonApiUserIdentifierToOneLinkage, JsonApiMetricOutIncludes, JsonApiAnalyticalDashboardOutIncludes } from "@gooddata/api-client-tiger";
/**
 * To preserve the typing and bootstrap concept, we are using firstName
 * as a container for full name and lastname will be an empty string
 */
export declare const convertUser: (user: IUserProfile) => IUser;
export interface IUserIdentifierLinkage {
    data: JsonApiUserIdentifierToOneLinkage | null;
}
export type IIncludedWithUserIdentifier = JsonApiMetricOutIncludes | JsonApiAnalyticalDashboardOutIncludes;
/**
 * Convert user identifier link from relationships.[createdBy/modifiedBy] to {@link IUser} object.
 * @param userIdentifierLinkage - information about user link from relationships data attribute.
 * @param included - included objects to the entity query
 * @returns converted user or undefined if link is empty or does not link to anything in included array
 */
export declare function convertUserIdentifier(userIdentifierLinkage?: IUserIdentifierLinkage, included?: IIncludedWithUserIdentifier[]): IUser | undefined;
//# sourceMappingURL=UsersConverter.d.ts.map