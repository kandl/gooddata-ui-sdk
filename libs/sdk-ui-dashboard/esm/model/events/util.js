// (C) 2021 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Creates a type guard for a given {@link IDashboardEvent} subtype.
 *
 * @param type - type discriminator of the given type
 * @typeParam TEvent - type of the event to check
 */
export const eventGuard = (type) => (obj) => {
    return !isEmpty(obj) && obj.type === type;
};
//# sourceMappingURL=util.js.map