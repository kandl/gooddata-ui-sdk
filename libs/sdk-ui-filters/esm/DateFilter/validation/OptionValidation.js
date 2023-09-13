import { isAbsoluteDateFilterForm, isRelativeDateFilterForm } from "@gooddata/sdk-model";
import { convertPlatformDateStringToDate } from "../utils/DateConversions.js";
import { messages } from "../../locales.js";
const validateVisibility = (filterOption) => {
    const errors = {};
    if (!filterOption.visible) {
        // indicate that the Apply button should be disabled, it makes no sense for hidden forms
        errors[filterOption.type] = {};
    }
    return errors;
};
const validateAbsoluteForm = (filterOption) => {
    const errors = validateVisibility(filterOption);
    const absoluteFormKeys = ["from", "to"];
    absoluteFormKeys.forEach((field) => {
        if (!filterOption[field]) {
            errors.absoluteForm = errors.absoluteForm || {};
            // null means empty, undefined means invalid
            // this is dictated by react-day-picker that returns undefined on invalid values
            if (filterOption[field] === undefined) {
                errors.absoluteForm[field] = messages.incorrectFormat.id;
            }
        }
    });
    if (!errors.absoluteForm) {
        const start = convertPlatformDateStringToDate(filterOption.from);
        const end = convertPlatformDateStringToDate(filterOption.to);
        if (start > end) {
            errors.absoluteForm = { to: messages.endDateBeforeStartDate.id };
        }
    }
    return errors.absoluteForm ? errors : {};
};
const validateRelativeForm = (filterOption) => {
    const errors = validateVisibility(filterOption);
    const relativeFormKeys = ["from", "to"];
    relativeFormKeys.forEach((field) => {
        if (filterOption[field] === undefined) {
            errors.relativeForm = errors.relativeForm || {};
            // There is no validation message as we have no place to show it
        }
    });
    return errors.relativeForm ? errors : {};
};
export const validateFilterOption = (filterOption) => {
    if (isAbsoluteDateFilterForm(filterOption)) {
        return validateAbsoluteForm(filterOption);
    }
    else if (isRelativeDateFilterForm(filterOption)) {
        return validateRelativeForm(filterOption);
    }
    else {
        return validateVisibility(filterOption);
    }
};
//# sourceMappingURL=OptionValidation.js.map