// (C) 2021-2023 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import { idRef, objRefToString, isDrillFromAttribute, isDrillFromMeasure, isDrillToAttributeUrl, isDrillToCustomUrl, isDrillToDashboard, isDrillToInsight, } from "@gooddata/sdk-model";
import { typesUtils } from "@gooddata/util";
import { getAttributeIdentifiersPlaceholdersFromUrl, getDrillOriginLocalIdentifier, getLocalIdentifierOrDie, } from "../../../../_staging/drills/drillingUtils.js";
import { isDisplayFormRelevantToDrill } from "../../common/isDisplayFormRelevantToDrill.js";
export function validateDrillDefinitionOrigin(drillDefinition, drillTargets) {
    const { origin } = drillDefinition;
    if (isDrillFromMeasure(origin)) {
        const originMeasureIdentifier = getDrillOriginLocalIdentifier(drillDefinition);
        const measureItems = drillTargets.measures || [];
        const measureIsValidTarget = measureItems.some((i) => i.measure.measureHeaderItem.localIdentifier === originMeasureIdentifier);
        if (!measureIsValidTarget) {
            throw new Error("InsightDrillDefinition origin is not valid measure drillTarget");
        }
    }
    if (isDrillFromAttribute(origin)) {
        const originAttributeIdentifier = getDrillOriginLocalIdentifier(drillDefinition);
        const attributeItems = drillTargets.attributes || [];
        const attributeIsValidTarget = attributeItems.some((i) => i.attribute.attributeHeader.localIdentifier === originAttributeIdentifier);
        if (!attributeIsValidTarget) {
            throw new Error("InsightDrillDefinition origin is not valid attribute drillTarget");
        }
    }
    return drillDefinition;
}
export function existsDrillDefinitionInArray(drillDefinition, drillDefinitionArray = []) {
    const drillId = getDrillOriginLocalIdentifier(drillDefinition);
    return drillDefinitionArray.some((x) => {
        return drillId === getDrillOriginLocalIdentifier(x);
    });
}
export function getDrillDefinitionFromArray(drillDefinition, drillDefinitionArray = []) {
    const drillId = getDrillOriginLocalIdentifier(drillDefinition);
    return drillDefinitionArray.find((x) => {
        return drillId === getDrillOriginLocalIdentifier(x);
    });
}
export function validateDrillDefinitionByLocalIdentifier(ref, drillDefinitionArray = []) {
    const localIdentifier = getLocalIdentifierOrDie(ref);
    const result = drillDefinitionArray.find((item) => {
        return localIdentifier === getDrillOriginLocalIdentifier(item);
    });
    if (!result) {
        throw new Error("Cannot find drill definition specified by local identifier");
    }
    return result;
}
export function extractInsightRefs(items) {
    return items.filter(isDrillToInsight).map((item) => item.target);
}
export function extractDisplayFormIdentifiers(drillDefinitions) {
    return flatMap(drillDefinitions
        .filter(typesUtils.combineGuards(isDrillToCustomUrl, isDrillToAttributeUrl))
        .map((drillItem) => {
        if (isDrillToCustomUrl(drillItem)) {
            const params = getAttributeIdentifiersPlaceholdersFromUrl(drillItem.target.url);
            // normalize ref take the value from state ...
            // md object has to be identifier
            return params.map((param) => idRef(param.identifier, "displayForm"));
        }
        else {
            return [drillItem.target.displayForm, drillItem.target.hyperlinkDisplayForm];
        }
    }));
}
export function validateInsightDrillDefinition(drillDefinition, validationContext) {
    if (isDrillToDashboard(drillDefinition)) {
        return validateDrillToDashboardDefinition(drillDefinition, validationContext);
    }
    if (isDrillToInsight(drillDefinition)) {
        return validateDrillToInsightDefinition(drillDefinition, validationContext);
    }
    if (isDrillToCustomUrl(drillDefinition)) {
        return validateDrillToCustomURLDefinition(drillDefinition, validationContext);
    }
    if (isDrillToAttributeUrl(drillDefinition)) {
        return validateDrillToAttributeUrlDefinition(drillDefinition, validationContext);
    }
    throw new Error("Can not validate unknown drillDefinition");
}
function validateDrillToDashboardDefinition(drillDefinition, validationContext) {
    const { target } = drillDefinition;
    if (target) {
        let result = undefined;
        const targetDashboard = validationContext.dashboardsMap.get(target) ||
            validationContext.inaccessibleDashboardsMap.get(target);
        if (targetDashboard) {
            // normalize ref take the value from state ...
            // md object has to be identifier
            result = Object.assign(Object.assign({}, drillDefinition), { target: idRef(targetDashboard.identifier, "analyticalDashboard") });
        }
        if (result) {
            return result;
        }
    }
    else {
        return drillDefinition;
    }
    throw Error("Unknown target dashboard");
}
function validateDrillToInsightDefinition(drillDefinition, validationContext) {
    const { target } = drillDefinition;
    let result = undefined;
    if (target) {
        const targetInsights = validationContext.insightsMap.get(target);
        if (targetInsights) {
            // normalize ref take the value from state ...
            result = Object.assign(Object.assign({}, drillDefinition), { target: targetInsights.insight.ref });
        }
    }
    if (result) {
        return result;
    }
    throw Error("Unknown target Insight");
}
export function validateDrillToCustomURLDefinition(drillDefinition, validationContext) {
    const ids = extractDisplayFormIdentifiers([drillDefinition]);
    ids.forEach((identifier) => {
        const displayForms = validationContext.displayFormsMap.get(identifier);
        if (!displayForms) {
            throw new Error(`Cannot find AttributeDisplayForm definition specified by identifier: ${objRefToString(identifier)}`);
        }
    });
    return drillDefinition;
}
export function validateDrillToAttributeUrlDefinition(drillDefinition, validationContext) {
    const displayForms = validationContext.displayFormsMap.get(drillDefinition.target.displayForm);
    if (!displayForms) {
        throw new Error(`Cannot find target displayForm: ${objRefToString(drillDefinition.target.displayForm)}`);
    }
    const hyperlinkDisplayForm = validationContext.displayFormsMap.get(drillDefinition.target.hyperlinkDisplayForm);
    if (!hyperlinkDisplayForm) {
        throw new Error(`Cannot find target hyperlinkDisplayForm: ${objRefToString(drillDefinition.target.hyperlinkDisplayForm)}`);
    }
    if (hyperlinkDisplayForm.displayFormType !== "GDC.link") {
        throw new Error(`DisplayFormType of target hyperlinkDisplayForm type has to be GDC.link`);
    }
    if (!isDisplayFormRelevantToDrill(drillDefinition, validationContext.availableDrillTargets, hyperlinkDisplayForm)) {
        throw new Error(`The hyperlinkDisplayForm ${objRefToString(hyperlinkDisplayForm.ref)} in not a valid drill target`);
    }
    return drillDefinition;
}
//# sourceMappingURL=insightDrillDefinitionUtils.js.map