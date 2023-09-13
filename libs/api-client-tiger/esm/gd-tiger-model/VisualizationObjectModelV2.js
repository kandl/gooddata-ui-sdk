// (C) 2019-2021 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isVisualizationObject(visualizationObject) {
    return !isEmpty(visualizationObject) && visualizationObject.version === "2";
}
//# sourceMappingURL=VisualizationObjectModelV2.js.map