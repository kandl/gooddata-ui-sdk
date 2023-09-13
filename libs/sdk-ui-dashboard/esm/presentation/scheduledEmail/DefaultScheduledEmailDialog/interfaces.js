// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @internal
 */
export const isScheduleEmailExternalRecipient = (obj) => !isEmpty(obj) && typeof obj.email === "string";
/**
 * @internal
 */
export const isScheduleEmailExistingRecipient = (obj) => !isEmpty(obj) && typeof obj.user === "object";
//# sourceMappingURL=interfaces.js.map