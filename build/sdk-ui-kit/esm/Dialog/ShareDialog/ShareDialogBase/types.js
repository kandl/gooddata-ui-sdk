import isEmpty from "lodash/isEmpty.js";
/**
 * @internal
 */
export const isGranteeUser = (obj) => {
    return !isEmpty(obj) && obj.type === "user";
};
/**
 * @internal
 */
export const isGranularGranteeUser = (obj) => {
    return !isEmpty(obj) && obj.type === "granularUser";
};
/**
 * @internal
 */
export const isGranteeUserInactive = (obj) => {
    return !isEmpty(obj) && obj.type === "inactive_owner";
};
/**
 * @internal
 */
export const isGranteeGroup = (obj) => {
    return !isEmpty(obj) && obj.type === "group";
};
/**
 * @internal
 */
export const isGranularGranteeGroup = (obj) => {
    return !isEmpty(obj) && obj.type === "granularGroup";
};
/**
 * @internal
 */
export const isGranularGrantee = (obj) => {
    return isGranularGranteeUser(obj) || isGranularGranteeGroup(obj);
};
/**
 * @internal
 */
export const isGranteeGroupAll = (obj) => {
    return !isEmpty(obj) && obj.type === "groupAll";
};
/**
 * @internal
 */
export const isGranteeItem = (obj) => {
    return (!isEmpty(obj) &&
        (isGranteeGroupAll(obj) || isGranteeGroup(obj) || isGranteeUserInactive(obj) || isGranteeUser(obj)));
};
/**
 * @internal
 */
export const isSelectErrorOption = (obj) => {
    return !isEmpty(obj) && obj.type === "error";
};
//# sourceMappingURL=types.js.map