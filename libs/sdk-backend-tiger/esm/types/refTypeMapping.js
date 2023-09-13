// (C) 2019-2022 GoodData Corporation
import invert from "lodash/invert.js";
import isEmpty from "lodash/isEmpty.js";
import values from "lodash/values.js";
/**
 * @alpha
 */
export const tigerIdTypeToObjectType = {
    attribute: "attribute",
    metric: "measure",
    label: "displayForm",
    dataset: "dataSet",
    fact: "fact",
    prompt: "variable",
    analyticalDashboard: "analyticalDashboard",
    visualizationObject: "insight",
    filterContext: "filterContext",
    dashboardPlugin: "dashboardPlugin",
};
/**
 * @alpha
 */
export const objectTypeToTigerIdType = invert(tigerIdTypeToObjectType);
const validTigerTypes = Object.keys(tigerIdTypeToObjectType);
const validCompatibleTypes = values(tigerIdTypeToObjectType);
/**
 * @alpha
 */
export const isTigerCompatibleType = (obj) => {
    return !isEmpty(obj) && validCompatibleTypes.some((type) => type === obj);
};
/**
 * @alpha
 */
export const isTigerType = (obj) => {
    return !isEmpty(obj) && validTigerTypes.some((type) => type === obj);
};
//# sourceMappingURL=refTypeMapping.js.map