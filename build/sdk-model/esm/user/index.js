// (C) 2021-2022 GoodData Corporation
import { invariant } from "ts-invariant";
/**
 * Gets the user full name
 *
 * @param user - user to get full name of
 * @returns the user full name
 * @public
 */
export function userFullName(user) {
    invariant(user, "user to get full name of must be specified");
    return user.fullName;
}
//# sourceMappingURL=index.js.map