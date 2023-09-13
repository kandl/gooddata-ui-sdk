// (C) 2020-2023 GoodData Corporation
import { all, call, select } from "redux-saga/effects";
import isNil from "lodash/isNil.js";
import { isDrillIntersectionAttributeItem, } from "@gooddata/sdk-ui";
import { idRef, areObjRefsEqual, insightId, isAttributeDescriptor, } from "@gooddata/sdk-model";
import { selectDashboardId } from "../../store/meta/metaSelectors.js";
import { selectAnalyticalWidgetByRef } from "../../store/layout/layoutSelectors.js";
import { selectInsightByRef } from "../../store/insights/insightsSelectors.js";
import { getElementTitle } from "./getElementTitle.js";
import { getAttributeIdentifiersPlaceholdersFromUrl } from "../../../_staging/drills/drillingUtils.js";
import { invalidArgumentsProvided } from "../../events/general.js";
import { selectCatalogDateAttributes } from "../../store/catalog/catalogSelectors.js";
import groupBy from "lodash/groupBy.js";
import { DRILL_TO_URL_PLACEHOLDER } from "../../types/drillTypes.js";
export function* loadElementTitle(dfRef, dfIdentifier, attrElementUri, ctx) {
    const elementTitle = yield call(getElementTitle, ctx.workspace, dfRef, attrElementUri, ctx);
    return {
        identifier: dfIdentifier,
        elementTitle,
    };
}
function isInRefList(list, ref) {
    return list.some((itemRef) => areObjRefsEqual(itemRef, ref));
}
function findDrillIntersectionAttributeHeaderItem(drillIntersectionElements, attributeRef) {
    const intersectionForAttribute = drillIntersectionElements.find(({ header }) => isAttributeDescriptor(header) && areObjRefsEqual(attributeRef, header.attributeHeader.formOf.ref));
    if (intersectionForAttribute && isDrillIntersectionAttributeItem(intersectionForAttribute.header)) {
        return intersectionForAttribute.header.attributeHeaderItem;
    }
}
export function* splitDFToLoadingAndMapping(attributesDisplayForms, ctx) {
    if (ctx.backend.capabilities.supportsElementUris) {
        return {
            displayFormForValueLoad: attributesDisplayForms,
            displayFormsWithKnownValues: [],
        };
    }
    // in tiger there are no uris for attribute values, only primary values
    // we can't call collectLabelElements for date attributes because there are no date "elements", but we can use this values directly.
    const dateAttributes = yield select(selectCatalogDateAttributes);
    const dateAttributeRefs = dateAttributes.map((da) => da.attribute.ref);
    const { true: displayFormsWithKnownValues = [], false: displayFormForValueLoad = [] } = groupBy(attributesDisplayForms, (df) => isInRefList(dateAttributeRefs, df.attribute));
    return {
        displayFormsWithKnownValues,
        displayFormForValueLoad,
    };
}
export function* loadAttributeElementsForDrillIntersection(drillIntersectionElements, attributesDisplayForms, ctx) {
    const splitDisplayForms = yield call(splitDFToLoadingAndMapping, attributesDisplayForms, ctx);
    const { displayFormsWithKnownValues, displayFormForValueLoad } = splitDisplayForms;
    const mappedElements = displayFormsWithKnownValues.reduce((acc, { id: dfIdentifier, attribute }) => {
        const attributeHeaderItem = findDrillIntersectionAttributeHeaderItem(drillIntersectionElements, attribute);
        if (!attributeHeaderItem) {
            return acc;
        }
        acc.push({
            identifier: dfIdentifier,
            elementTitle: attributeHeaderItem.uri,
        });
        return acc;
    }, []);
    const loadedElement = yield all(displayFormForValueLoad.reduce((acc, displayForm) => {
        const { id: dfIdentifier, attribute, ref: dfRef } = displayForm;
        const attributeHeaderItem = findDrillIntersectionAttributeHeaderItem(drillIntersectionElements, attribute);
        if (!attributeHeaderItem) {
            return acc;
        }
        acc.push(call(loadElementTitle, dfRef, dfIdentifier, attributeHeaderItem.uri, ctx));
        return acc;
    }, []));
    return [...mappedElements, ...loadedElement];
}
const encodeParameterIfSet = (parameter) => isNil(parameter) ? parameter : encodeURIComponent(parameter);
export function getAttributeDisplayForms(projectId, objRefs, ctx) {
    return ctx.backend.workspace(projectId).attributes().getAttributeDisplayForms(objRefs);
}
export function* getAttributeIdentifiersReplacements(url, drillIntersectionElements, ctx) {
    const attributeIdentifiersPlaceholders = getAttributeIdentifiersPlaceholdersFromUrl(url);
    if (attributeIdentifiersPlaceholders.length === 0) {
        return [];
    }
    const displayForms = yield call(getAttributeDisplayForms, ctx.workspace, attributeIdentifiersPlaceholders.map((placeholder) => idRef(placeholder.identifier)), ctx);
    const elements = yield call(loadAttributeElementsForDrillIntersection, drillIntersectionElements, displayForms, ctx);
    return attributeIdentifiersPlaceholders.map(({ placeholder: toBeReplaced, identifier, toBeEncoded }) => {
        var _a;
        const elementTitle = (_a = elements.find((element) => element.identifier === identifier)) === null || _a === void 0 ? void 0 : _a.elementTitle;
        const replacement = toBeEncoded ? encodeParameterIfSet(elementTitle) : elementTitle;
        return {
            toBeReplaced,
            replacement: replacement,
        };
    });
}
const createIdentifierReplacement = (toBeReplaced, replacement = "") => ({ toBeReplaced, replacement, replaceGlobally: true });
export function* getInsightIdentifiersReplacements(customUrl, widgetRef, ctx) {
    const { workspace, clientId, dataProductId } = ctx;
    const dashboardId = yield select(selectDashboardId);
    const widget = yield select(selectAnalyticalWidgetByRef(widgetRef));
    const insight = yield select(selectInsightByRef(widget.insight));
    const replacements = [
        createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.PROJECT_ID, workspace),
        createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.WORKSPACE_ID, workspace),
        createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.DASHBOARD_ID, dashboardId),
        createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.CLIENT_ID, clientId),
        createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.DATA_PRODUCT_ID, dataProductId),
        createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.INSIGHT_ID, insightId(insight)),
    ];
    if (customUrl.includes(DRILL_TO_URL_PLACEHOLDER.WIDGET_ID)) {
        return [
            ...replacements,
            createIdentifierReplacement(DRILL_TO_URL_PLACEHOLDER.WIDGET_ID, widget.identifier),
        ];
    }
    return replacements;
}
const applyReplacements = (url, replacements) => replacements.reduce((customUrlWithReplacedPlaceholders, { toBeReplaced, replacement, replaceGlobally }) => customUrlWithReplacedPlaceholders.replace(replaceGlobally ? new RegExp(toBeReplaced, "g") : toBeReplaced, replacement), url);
export function* resolveDrillToCustomUrl(drillConfig, widgetRef, event, ctx, cmd) {
    const customUrl = drillConfig.target.url;
    const attributeIdentifiersReplacements = yield call(getAttributeIdentifiersReplacements, customUrl, event.drillContext.intersection, ctx);
    const missingReplacement = attributeIdentifiersReplacements.find(({ replacement }) => replacement === undefined);
    if (missingReplacement) {
        throw invalidArgumentsProvided(ctx, cmd, `Drill to custom URL unable to resolve missing parameter ${missingReplacement.toBeReplaced}`);
    }
    const insightIdentifiersReplacements = yield call(getInsightIdentifiersReplacements, customUrl, widgetRef, ctx);
    const replacements = [...attributeIdentifiersReplacements, ...insightIdentifiersReplacements];
    return applyReplacements(customUrl, replacements);
}
//# sourceMappingURL=resolveDrillToCustomUrl.js.map