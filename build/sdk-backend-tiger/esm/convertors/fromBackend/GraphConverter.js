// (C) 2022-2023 GoodData Corporation
import { idRef } from "@gooddata/sdk-model";
/**
 * Graph entities do not hold uri information, so if uri is needed, it has
 * to be constructed from object id somehow.
 */
export const convertGraphEntityNodeToAnalyticalDashboard = (node) => {
    var _a;
    return {
        id: node.id,
        ref: idRef(node.id, "analyticalDashboard"),
        type: "analyticalDashboard",
        title: (_a = node.title) !== null && _a !== void 0 ? _a : node.id,
        uri: "",
        description: "",
        production: false,
        unlisted: false,
        deprecated: false,
    };
};
//# sourceMappingURL=GraphConverter.js.map