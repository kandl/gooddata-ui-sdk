// (C) 2019-2023 GoodData Corporation
import set from "lodash/set";
import { getTranslation } from "./translations";
import { messages } from "../../locales";
function fixEmptyMaxValue(value) {
    return value === "" ? Number.MAX_SAFE_INTEGER : Number(value);
}
function fixEmptyMinValue(value) {
    return value === "" ? Number.MIN_SAFE_INTEGER : Number(value);
}
function isValueMinusOrEmpty(value) {
    return value === "-" || value === "";
}
function isInvalidOrMinMaxError(value, minNumberValue, maxNumberValue) {
    const valueIsMinus = value === "-";
    const maxMinNumbers = !isNaN(minNumberValue) && !isNaN(maxNumberValue);
    return valueIsMinus || !maxMinNumbers || minNumberValue > maxNumberValue;
}
export function maxInputValidateAndPushData(data, state, props, setState, defaultState) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { basePath } = props;
    const maxValue = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[basePath]) === null || _c === void 0 ? void 0 : _c.max;
    const incorrectMinValue = (_e = (_d = state === null || state === void 0 ? void 0 : state.minScale) === null || _d === void 0 ? void 0 : _d.incorrectValue) !== null && _e !== void 0 ? _e : "";
    const correctMinValue = (_j = (_h = (_g = (_f = props === null || props === void 0 ? void 0 : props.properties) === null || _f === void 0 ? void 0 : _f.controls) === null || _g === void 0 ? void 0 : _g[basePath]) === null || _h === void 0 ? void 0 : _h.min) !== null && _j !== void 0 ? _j : "";
    const incorrectMinInvalid = isValueMinusOrEmpty(incorrectMinValue);
    const minNumberValue = incorrectMinInvalid
        ? fixEmptyMinValue(correctMinValue)
        : Number(incorrectMinValue);
    const maxNumberValue = fixEmptyMaxValue(maxValue);
    const maxIsMinus = maxValue === "-";
    const { propertiesMeta, pushData } = props;
    set(propertiesMeta, "undoApplied", false);
    // dash, non-numeric or min/max mismatch: set error
    if (isInvalidOrMinMaxError(maxValue, minNumberValue, maxNumberValue)) {
        setState({
            minScale: Object.assign(Object.assign({}, state.minScale), { hasWarning: incorrectMinValue === "-" }),
            maxScale: {
                hasWarning: true,
                // no error message for dash
                warningMessage: maxIsMinus ? "" : getTranslation(messages.axisMaxWarning.id, props.intl),
                incorrectValue: maxValue,
            },
        });
        pushData({ propertiesMeta }); // post undoApplied flag to AD
        return;
    }
    // valid, set new value
    const { properties } = props;
    set(properties, `controls.${basePath}.max`, maxValue);
    // if incorrect value was set previously but now validation passed, set incorrect value as correct value
    if (isNaN(parseFloat(incorrectMinValue))) {
        setState({
            maxScale: defaultState.maxScale,
        });
    }
    else {
        set(properties, `controls.${basePath}.min`, incorrectMinValue);
        setState(defaultState);
    }
    pushData({ properties, propertiesMeta });
}
export function minInputValidateAndPushData(data, state, props, setState, defaultState) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { basePath } = props;
    const minValue = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[basePath]) === null || _c === void 0 ? void 0 : _c.min;
    const incorrectMaxValue = (_e = (_d = state === null || state === void 0 ? void 0 : state.maxScale) === null || _d === void 0 ? void 0 : _d.incorrectValue) !== null && _e !== void 0 ? _e : "";
    const correctMaxValue = (_j = (_h = (_g = (_f = props === null || props === void 0 ? void 0 : props.properties) === null || _f === void 0 ? void 0 : _f.controls) === null || _g === void 0 ? void 0 : _g[basePath]) === null || _h === void 0 ? void 0 : _h.max) !== null && _j !== void 0 ? _j : "";
    const incorrectMaxInvalid = isValueMinusOrEmpty(incorrectMaxValue);
    const maxNumberValue = incorrectMaxInvalid
        ? fixEmptyMaxValue(correctMaxValue)
        : Number(incorrectMaxValue);
    const minNumberValue = fixEmptyMinValue(minValue);
    const minIsDash = minValue === "-";
    const { propertiesMeta, pushData } = props;
    set(propertiesMeta, "undoApplied", false);
    // dash, non-numeric or min/max mismatch: set error
    if (isInvalidOrMinMaxError(minValue, minNumberValue, maxNumberValue)) {
        setState({
            maxScale: Object.assign(Object.assign({}, state.maxScale), { hasWarning: incorrectMaxValue === "-" }),
            minScale: {
                hasWarning: true,
                // no error message for dash
                warningMessage: minIsDash ? "" : getTranslation(messages.axisMinWarning.id, props.intl),
                incorrectValue: minValue,
            },
        });
        pushData({ propertiesMeta }); // post undoApplied flag to AD
        return;
    }
    // valid, set new value
    const { properties } = props;
    set(properties, `controls.${basePath}.min`, minValue);
    // if incorrect value was set previously but now validation passed, set incorrect value as correct value
    if (isNaN(parseFloat(incorrectMaxValue))) {
        setState({
            minScale: defaultState.minScale,
        });
    }
    else {
        set(properties, `controls.${basePath}.max`, incorrectMaxValue);
        setState(defaultState);
    }
    pushData({ properties, propertiesMeta });
}
//# sourceMappingURL=controlsHelper.js.map