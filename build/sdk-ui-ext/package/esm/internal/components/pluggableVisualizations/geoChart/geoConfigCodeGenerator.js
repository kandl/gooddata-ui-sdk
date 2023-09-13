// (C) 2022-2023 GoodData Corporation
import { bucketAttribute, idRef, insightBucket, insightProperties, insightVisualizationUrl, newAttribute, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import filter from "lodash/fp/filter";
import flow from "lodash/fp/flow";
import fromPairs from "lodash/fromPairs";
import isNil from "lodash/isNil";
import toPairs from "lodash/toPairs";
import { sdkModelPropMetas, } from "../../../utils/embeddingCodeGenerator";
const supportedGeoConfigProperties = new Set([
    "center",
    "colorMapping",
    "cooperativeGestures",
    "legend",
    "limit",
    "selectedSegmentItems",
    "separators",
    "viewport",
    "points",
    "showLabels",
    "showLabels",
    "tooltipText",
]);
export function geoConfigFromInsight(insight, ctx) {
    var _a, _b, _c;
    const properties = insightProperties(insight);
    const controls = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) !== null && _a !== void 0 ? _a : {};
    const withValuesFromContext = Object.assign(Object.assign({}, controls), (((_b = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _b === void 0 ? void 0 : _b.separators) ? { separators: (_c = ctx === null || ctx === void 0 ? void 0 : ctx.settings) === null || _c === void 0 ? void 0 : _c.separators } : {}));
    const configFromProperties = flow(toPairs, filter(([key, value]) => supportedGeoConfigProperties.has(key) && !isNil(value)), fromPairs)(withValuesFromContext);
    return Object.assign(Object.assign({}, configFromProperties), mapBoxTokenPlaceholder());
}
export function geoInsightConversion(propName, bucketName) {
    return {
        propName,
        propType: sdkModelPropMetas.Attribute.Single,
        itemAccessor(insight, ctx) {
            return getLocationAttributeFromInsight(insight, ctx, bucketName);
        },
    };
}
function getLocationAttributeFromInsight(insight, ctx, bucketName) {
    var _a, _b, _c;
    if (bucketName === BucketNames.LOCATION &&
        !((_a = ctx.backend) === null || _a === void 0 ? void 0 : _a.capabilities.supportsSeparateLatitudeLongitudeLabels)) {
        const bucket = insightBucket(insight, bucketName);
        return bucket && bucketAttribute(bucket);
    }
    else if (
    // dont rely on Latitude being already in bucket, take both lat and long from properties
    (bucketName === BucketNames.LATITUDE || bucketName === BucketNames.LONGITUDE) &&
        ((_b = ctx.backend) === null || _b === void 0 ? void 0 : _b.capabilities.supportsSeparateLatitudeLongitudeLabels)) {
        const properties = insightProperties(insight);
        const controls = (_c = properties === null || properties === void 0 ? void 0 : properties.controls) !== null && _c !== void 0 ? _c : {};
        const identifier = controls[bucketName];
        return newAttribute(idRef(identifier, "displayForm"), (a) => a.localId(`a_${identifier}`));
    }
}
export function mapBoxTokenPlaceholder() {
    return {
        mapboxToken: "<fill your Mapbox token here>",
    };
}
export function isGeoChart(insightDefinition) {
    const type = insightVisualizationUrl(insightDefinition).split(":")[1];
    return type === "pushpin";
}
export function geoConfigForInsightViewComponent() {
    return {
        value: mapBoxTokenPlaceholder(),
        meta: {
            cardinality: "scalar",
            typeImport: {
                importType: "named",
                name: "IGeoConfig",
                package: "@gooddata/sdk-ui-geo",
            },
        },
    };
}
//# sourceMappingURL=geoConfigCodeGenerator.js.map