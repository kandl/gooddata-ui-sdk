// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
const dateFilterGranularity = [
    "GDC.time.minute",
    "GDC.time.hour",
    "GDC.time.date",
    "GDC.time.week_us",
    "GDC.time.month",
    "GDC.time.quarter",
    "GDC.time.year",
];
/**
 * Type-guard testing whether the provided object is an instance of {@link DateFilterGranularity}.
 * @alpha
 */
export const isDateFilterGranularity = (obj) => !isEmpty(obj) && dateFilterGranularity.some((granularity) => granularity === obj);
/**
 * Type-guard testing whether the provided object is an instance of {@link IAllTimeDateFilterOption}.
 * @alpha
 */
export const isAllTimeDateFilterOption = (obj) => !isEmpty(obj) && obj.type === "allTime";
/**
 * Type-guard testing whether the provided object is an instance of {@link IAbsoluteDateFilterForm}.
 * @alpha
 */
export const isAbsoluteDateFilterForm = (obj) => !isEmpty(obj) && obj.type === "absoluteForm";
/**
 * Type-guard testing whether the provided object is an instance of {@link IAbsoluteDateFilterPreset}.
 * @alpha
 */
export const isAbsoluteDateFilterPreset = (obj) => !isEmpty(obj) && obj.type === "absolutePreset";
/**
 * Type-guard testing whether the provided object is an instance of {@link IRelativeDateFilterForm}.
 * @alpha
 */
export const isRelativeDateFilterForm = (obj) => !isEmpty(obj) && obj.type === "relativeForm";
/**
 * Type-guard testing whether the provided object is an instance of {@link IRelativeDateFilterPreset}.
 * @alpha
 */
export const isRelativeDateFilterPreset = (obj) => !isEmpty(obj) && obj.type === "relativePreset";
//# sourceMappingURL=index.js.map