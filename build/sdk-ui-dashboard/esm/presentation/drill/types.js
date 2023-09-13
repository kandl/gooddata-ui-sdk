import isEmpty from "lodash/isEmpty.js";
import { isDrillToAttributeUrl, isDrillToCustomUrl, } from "@gooddata/sdk-model";
export function isDrillToUrl(drillDefinition) {
    return isDrillToCustomUrl(drillDefinition) || isDrillToAttributeUrl(drillDefinition);
}
export var DRILL_TARGET_TYPE;
(function (DRILL_TARGET_TYPE) {
    DRILL_TARGET_TYPE["DRILL_TO_DASHBOARD"] = "DrillToDashboard";
    DRILL_TARGET_TYPE["DRILL_TO_INSIGHT"] = "DrillToInsight";
    DRILL_TARGET_TYPE["DRILL_TO_URL"] = "DrillToUrl";
})(DRILL_TARGET_TYPE = DRILL_TARGET_TYPE || (DRILL_TARGET_TYPE = {}));
export function isDrillToDashboardConfig(item) {
    return !isEmpty(item) && item.dashboard !== undefined;
}
export function isDrillToInsightConfig(item) {
    return !isEmpty(item) && item.insightRef !== undefined;
}
export function isDrillToCustomUrlConfig(item) {
    return !isEmpty(item) && item.customUrl !== undefined;
}
export function isDrillToAttributeUrlConfig(item) {
    return !isEmpty(item) && item.insightAttributeDisplayForm !== undefined;
}
export function isDrillToUrlConfig(item) {
    return !isEmpty(item) && item.urlDrillTarget !== undefined;
}
// check type AttributeDisplayFormType from @gooddata/sdk-model to keep it in sync
export var AttributeDisplayFormType;
(function (AttributeDisplayFormType) {
    AttributeDisplayFormType["HYPERLINK"] = "GDC.link";
    AttributeDisplayFormType["GEO_PUSHPIN"] = "GDC.geo.pin";
    AttributeDisplayFormType["GEO_PUSHPIN_LATITUDE"] = "GDC.geo.pin_latitude";
    AttributeDisplayFormType["GEO_PUSHPIN_LONGITUDE"] = "GDC.geo.pin_longitude";
})(AttributeDisplayFormType = AttributeDisplayFormType || (AttributeDisplayFormType = {}));
export function isAvailableDrillTargetMeasure(obj) {
    return !isEmpty(obj) && obj.measure !== undefined;
}
//# sourceMappingURL=types.js.map