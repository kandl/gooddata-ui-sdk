// (C) 2021-2022 GoodData Corporation
import { insightCreated, insightCreatedBy, insightTitle, insightUpdated, insightUpdatedBy, } from "./index.js";
import { stringComparatorFactory } from "../base/comparators.js";
/**
 * @beta
 */
export const insightTitleComparator = stringComparatorFactory(insightTitle);
/**
 * @beta
 */
export const insightCreatedByComparator = stringComparatorFactory((i) => { var _a; return (_a = insightCreatedBy(i)) === null || _a === void 0 ? void 0 : _a.fullName; });
/**
 * @beta
 */
export const insightUpdatedByComparator = stringComparatorFactory((i) => { var _a; return (_a = insightUpdatedBy(i)) === null || _a === void 0 ? void 0 : _a.fullName; });
/**
 * @beta
 */
export const insightCreatedComparator = stringComparatorFactory(insightCreated);
/**
 * @beta
 */
export const insightUpdatedComparator = stringComparatorFactory(insightUpdated);
//# sourceMappingURL=comparators.js.map