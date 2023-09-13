// (C) 2007-2022 GoodData Corporation
import { isAbsoluteDateFilterForm, isAbsoluteDateFilterPreset, isRelativeDateFilterForm, isRelativeDateFilterPreset, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link IUiRelativeDateFilterForm}.
 * @public
 */
export const isUiRelativeDateFilterForm = (obj) => {
    return !isEmpty(obj) && obj.type === "relativeForm";
};
/**
 * Type-guard testing whether the provided object is an instance of {@link AbsoluteDateFilterOption}.
 * @public
 */
export const isAbsoluteDateFilterOption = (obj) => isAbsoluteDateFilterForm(obj) || isAbsoluteDateFilterPreset(obj);
/**
 * Type-guard testing whether the provided object is an instance of {@link RelativeDateFilterOption}.
 * @public
 */
export const isRelativeDateFilterOption = (obj) => isRelativeDateFilterForm(obj) || isRelativeDateFilterPreset(obj);
//# sourceMappingURL=index.js.map