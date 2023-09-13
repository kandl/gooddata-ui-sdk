import { __rest } from "tslib";
import { uriRef, } from "@gooddata/sdk-model";
const convertAllTime = (allTime) => {
    return Object.assign({ type: "allTime" }, allTime);
};
const convertAbsoluteForm = (absoluteForm) => {
    return Object.assign({ type: "absoluteForm" }, absoluteForm);
};
const convertRelativeForm = (relativeForm) => {
    const { granularities: availableGranularities } = relativeForm, other = __rest(relativeForm, ["granularities"]);
    return Object.assign({ type: "relativeForm", availableGranularities }, other);
};
const convertAbsolutePreset = (absolutePreset) => {
    return Object.assign({ type: "absolutePreset" }, absolutePreset);
};
const convertRelativePreset = (relativePreset) => {
    return Object.assign({ type: "relativePreset" }, relativePreset);
};
export const convertDateFilterConfig = (dateFilterConfig) => {
    const { dateFilterConfig: { content: { selectedOption, allTime, absoluteForm, relativeForm, absolutePresets, relativePresets, }, meta, }, } = dateFilterConfig;
    return {
        ref: uriRef(meta.uri),
        selectedOption,
        allTime: allTime && convertAllTime(allTime),
        absoluteForm: absoluteForm && convertAbsoluteForm(absoluteForm),
        relativeForm: relativeForm && convertRelativeForm(relativeForm),
        absolutePresets: absolutePresets === null || absolutePresets === void 0 ? void 0 : absolutePresets.map(convertAbsolutePreset),
        relativePresets: relativePresets === null || relativePresets === void 0 ? void 0 : relativePresets.map(convertRelativePreset),
    };
};
//# sourceMappingURL=DateFilterConfigConverter.js.map