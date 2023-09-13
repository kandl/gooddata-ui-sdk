// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isVisualizationObject(visualizationObject) {
    return (!isEmpty(visualizationObject) && !!visualizationObject.visualizationObject);
}
//# sourceMappingURL=VisualizationObjectModelV1.js.map