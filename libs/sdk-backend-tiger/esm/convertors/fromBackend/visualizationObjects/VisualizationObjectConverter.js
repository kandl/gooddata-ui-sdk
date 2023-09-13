// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { VisualizationObjectModelV1, VisualizationObjectModelV2 } from "@gooddata/api-client-tiger";
import { convertVisualizationObject as convertVisualizationObjectV1 } from "./v1/VisualizationObjectConverter.js";
import { convertVisualizationObject as convertVisualizationObjectV2 } from "./v2/VisualizationObjectConverter.js";
export const convertVisualizationObject = (visualizationObject, title, description, tags) => {
    if (VisualizationObjectModelV1.isVisualizationObject(visualizationObject)) {
        return convertVisualizationObjectV1(visualizationObject);
    }
    if (VisualizationObjectModelV2.isVisualizationObject(visualizationObject)) {
        return convertVisualizationObjectV2(visualizationObject, title, description, tags);
    }
    invariant(false, "Unknown visualization object version");
};
//# sourceMappingURL=VisualizationObjectConverter.js.map