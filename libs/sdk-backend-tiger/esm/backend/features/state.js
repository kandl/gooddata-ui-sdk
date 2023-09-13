// (C) 2020-2023 GoodData Corporation
export const FeatureEnabled = ["ENABLED", "TRUE"];
export const FeatureDisabled = ["DISABLED", "FALSE"];
export function convertState(type, possibleValues, state) {
    switch (type) {
        case "BOOLEAN":
            return convertBooleanState(possibleValues.slice(), state);
        case "STRING":
            return convertStringState(possibleValues.slice(), state);
        default:
            return undefined;
    }
}
const enabledValues = FeatureEnabled.map((s) => s.toLowerCase());
const disabledValues = FeatureDisabled.map((s) => s.toLowerCase());
function convertBooleanState(possibleValues, state) {
    const validState = (state !== null && state !== void 0 ? state : "").toString().toLowerCase();
    if (possibleValues.includes(true)) {
        possibleValues.push(...enabledValues);
    }
    if (possibleValues.includes(false)) {
        possibleValues.push(...disabledValues);
    }
    if (possibleValues.includes(validState) && enabledValues.includes(validState)) {
        return true;
    }
    if (possibleValues.includes(validState) && disabledValues.includes(validState)) {
        return false;
    }
    if (possibleValues.includes(state) && (state === true || state === false)) {
        return state;
    }
    return undefined;
}
function convertStringState(possibleValues, state) {
    var _a;
    const available = possibleValues.map((item) => (item !== null && item !== void 0 ? item : "").toString().toLowerCase());
    const index = available.indexOf((state !== null && state !== void 0 ? state : "").toString().toLowerCase());
    return (_a = possibleValues[index]) !== null && _a !== void 0 ? _a : undefined;
}
//# sourceMappingURL=state.js.map