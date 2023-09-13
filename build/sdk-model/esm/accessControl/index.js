// (C) 2021-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Tests whether the provided object is an instance of {@link IUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isUserAccess = (obj) => {
    return !isEmpty(obj) && obj.type === "user";
};
/**
 * Tests whether the provided object is an instance of {@link IUserGroupAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isUserGroupAccess = (obj) => {
    return !isEmpty(obj) && obj.type === "group";
};
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isGranularUserAccess = (obj) => {
    return !isEmpty(obj) && obj.type === "granularUser";
};
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isGranularUserGroupAccess = (obj) => {
    return !isEmpty(obj) && obj.type === "granularGroup";
};
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess} or {@link IGranularUserGroupAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isGranularAccess = (obj) => {
    return isGranularUserAccess(obj) || isGranularUserGroupAccess(obj);
};
/**
 * Tests whether the provided object is an instance of {@link IUserAccessGrantee}.
 *
 * @param obj - object to test
 * @public
 */
export const isUserAccessGrantee = (obj) => {
    return !isEmpty(obj) && obj.type === "user";
};
/**
 * Tests whether the provided object is an instance of {@link IUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @public
 */
export const isUserGroupAccessGrantee = (obj) => {
    return !isEmpty(obj) && obj.type === "group";
};
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isGranularUserAccessGrantee = (obj) => {
    return !isEmpty(obj) && obj.type === "granularUser";
};
/**
 * Tests whether the provided object is an instance of {@link IGranularUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isGranularUserGroupAccessGrantee = (obj) => {
    return !isEmpty(obj) && obj.type === "granularGroup";
};
/**
 * Tests whether the provided object is an instance of {@link IGranularAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isGranularAccessGrantee = (obj) => {
    return isGranularUserAccessGrantee(obj) || isGranularUserGroupAccessGrantee(obj);
};
/**
 * Tests whether the provided object is an instance of {@link IAvailableUserAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isAvailableUserAccessGrantee = (obj) => {
    return !isEmpty(obj) && obj.type === "user";
};
/**
 * Tests whether the provided object is an instance of {@link IAvailableUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export const isAvailableUserGroupAccessGrantee = (obj) => {
    return !isEmpty(obj) && obj.type === "group";
};
//# sourceMappingURL=index.js.map