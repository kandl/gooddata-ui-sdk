// (C) 2020-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import compact from "lodash/compact.js";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import { isLocalIdRef, isIdentifierRef, isUriRef, areObjRefsEqual, localIdRef, isDrillFromAttribute, isDrillFromMeasure, objRefToString, } from "@gooddata/sdk-model";
import { HeaderPredicates, } from "@gooddata/sdk-ui";
import { createMemoizedSelector } from "../_infra/selectors.js";
import { selectWidgetDrills } from "../layout/layoutSelectors.js";
import { selectDrillTargetsByWidgetRef } from "../drillTargets/drillTargetsSelectors.js";
import { selectAllCatalogAttributesMap, selectAllCatalogDisplayFormsMap, selectAttributesWithDisplayFormLink, selectAttributesWithHierarchyDescendants, } from "../catalog/catalogSelectors.js";
import { selectDrillableItems } from "../drill/drillSelectors.js";
import { selectDisableDefaultDrills, selectEnableClickableAttributeURL, selectEnableKPIDashboardDrillToURL, selectEnableKPIDashboardDrillToInsight, selectEnableKPIDashboardDrillToDashboard, selectIsDrillDownEnabled, selectHideKpiDrillInEmbedded, selectIsEmbedded, } from "../config/configSelectors.js";
import flatMap from "lodash/flatMap.js";
import { selectAccessibleDashboardsMap } from "../accessibleDashboards/accessibleDashboardsSelectors.js";
import { selectInsightsMap } from "../insights/insightsSelectors.js";
function drillDefinitionToPredicates(drill) {
    let origin;
    if (isDrillFromMeasure(drill.origin)) {
        origin = drill.origin.measure;
    }
    else if (isDrillFromAttribute(drill.origin)) {
        origin = drill.origin.attribute;
    }
    else {
        throw new UnexpectedError("Unknown drill origin!");
    }
    // add drillable items for all three types of objRefs that the origin measure can be
    return compact([
        isLocalIdRef(origin) && HeaderPredicates.localIdentifierMatch(origin.localIdentifier),
        isIdentifierRef(origin) && HeaderPredicates.identifierMatch(origin.identifier),
        isUriRef(origin) && HeaderPredicates.uriMatch(origin.uri),
    ]);
}
function getDrillDownDefinitionsWithPredicates(availableDrillAttributes, attributesWithHierarchyDescendants, allCatalogAttributesMap) {
    const matchingAvailableDrillAttributes = availableDrillAttributes.filter((candidate) => objRefToString(candidate.attribute.attributeHeader.formOf.ref) in
        attributesWithHierarchyDescendants);
    return matchingAvailableDrillAttributes.flatMap((drill) => {
        const attributeDrillDescendants = attributesWithHierarchyDescendants[objRefToString(drill.attribute.attributeHeader.formOf.ref)];
        return attributeDrillDescendants.map((descendantRef) => {
            /**
             * Here we need to distinguish how the drill is defined in the attribute hierarchy.
             *
             * On Tiger, the drilldown is defined as "Attr --\> Attr" (so we take the default display form as the drill target)
             * On Bear, the drilldown is defined as "Attr --\> specific display form" (= drill target implicitly)
             */
            const drillTargetAttributeFromCatalog = allCatalogAttributesMap.get(descendantRef);
            const drillTargetDescriptionObj = drillTargetAttributeFromCatalog
                ? {
                    target: drillTargetAttributeFromCatalog.defaultDisplayForm.ref,
                    title: drillTargetAttributeFromCatalog.attribute.title, // title is used to distinguish between multiple drill-downs
                }
                : {
                    target: descendantRef,
                };
            return {
                drillDefinition: Object.assign({ type: "drillDown", origin: localIdRef(drill.attribute.attributeHeader.localIdentifier) }, drillTargetDescriptionObj),
                predicates: [
                    HeaderPredicates.localIdentifierMatch(drill.attribute.attributeHeader.localIdentifier),
                ],
            };
        });
    });
}
function getDrillToUrlDefinitionsWithPredicates(availableDrillAttributes, attributesWithDisplayFormLink) {
    const matchingAvailableDrillAttributes = availableDrillAttributes.filter((candidate) => {
        return attributesWithDisplayFormLink.some((attr) => areObjRefsEqual(attr.attribute.ref, candidate.attribute.attributeHeader.formOf.ref));
    });
    return matchingAvailableDrillAttributes.map((targetAttribute) => {
        const matchingCatalogAttribute = attributesWithDisplayFormLink.find((attr) => areObjRefsEqual(attr.attribute.ref, targetAttribute.attribute.attributeHeader.formOf.ref));
        const drillDefinition = {
            type: "drillToAttributeUrl",
            transition: "new-window",
            origin: {
                type: "drillFromAttribute",
                attribute: localIdRef(targetAttribute.attribute.attributeHeader.localIdentifier),
            },
            target: {
                displayForm: targetAttribute.attribute.attributeHeader.ref,
                hyperlinkDisplayForm: matchingCatalogAttribute.attribute.drillToAttributeLink,
            },
        };
        return {
            drillDefinition,
            predicates: [
                // add drillable items for both types of objRefs that the header can be
                HeaderPredicates.identifierMatch(targetAttribute.attribute.attributeHeader.identifier),
                HeaderPredicates.uriMatch(targetAttribute.attribute.attributeHeader.uri),
            ],
        };
    });
}
function getDrillDefinitionsWithPredicates(insightWidgetDrills) {
    return insightWidgetDrills.map((drill) => {
        return {
            drillDefinition: drill,
            predicates: drillDefinitionToPredicates(drill),
        };
    });
}
//
// Following selectors are for the 1st level insight widget (insight widget on the dashboard)
//
/**
 * @internal
 */
export const selectImplicitDrillsDownByWidgetRef = createMemoizedSelector((ref) => createSelector(selectDrillTargetsByWidgetRef(ref), selectAttributesWithHierarchyDescendants, selectAllCatalogAttributesMap, selectIsDrillDownEnabled, (availableDrillTargets, attributesWithHierarchyDescendants, allCatalogAttributesMap, isDrillDownEnabled) => {
    var _a, _b;
    if (isDrillDownEnabled) {
        const availableDrillAttributes = (_b = (_a = availableDrillTargets === null || availableDrillTargets === void 0 ? void 0 : availableDrillTargets.availableDrillTargets) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : [];
        return getDrillDownDefinitionsWithPredicates(availableDrillAttributes, attributesWithHierarchyDescendants, allCatalogAttributesMap);
    }
    return [];
}));
/**
 * @internal
 */
export const selectImplicitDrillsToUrlByWidgetRef = createMemoizedSelector((ref) => createSelector(selectDrillTargetsByWidgetRef(ref), selectAttributesWithDisplayFormLink, selectEnableClickableAttributeURL, (availableDrillTargets, attributesWithLink, isClickableAttributeURLEnabled) => {
    var _a, _b;
    if (isClickableAttributeURLEnabled) {
        const availableDrillAttributes = (_b = (_a = availableDrillTargets === null || availableDrillTargets === void 0 ? void 0 : availableDrillTargets.availableDrillTargets) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : [];
        return getDrillToUrlDefinitionsWithPredicates(availableDrillAttributes, attributesWithLink);
    }
    return [];
}));
/**
 * @internal
 */
export const selectConfiguredDrillsByWidgetRef = createMemoizedSelector((ref) => createSelector(selectWidgetDrills(ref), selectDisableDefaultDrills, selectEnableClickableAttributeURL, selectEnableKPIDashboardDrillToURL, selectEnableKPIDashboardDrillToInsight, selectEnableKPIDashboardDrillToDashboard, selectHideKpiDrillInEmbedded, selectIsEmbedded, (drills = [], disableDefaultDrills, enableClickableAttributeURL, enableKPIDashboardDrillToURL, enableKPIDashboardDrillToInsight, enableKPIDashboardDrillToDashboard, hideKpiDrillInEmbedded, isEmbedded) => {
    if (disableDefaultDrills) {
        return [];
    }
    const filteredDrills = [...drills].filter((drill) => {
        const drillType = drill.type;
        switch (drillType) {
            case "drillToAttributeUrl": {
                return enableClickableAttributeURL;
            }
            case "drillToCustomUrl": {
                return enableKPIDashboardDrillToURL;
            }
            case "drillToDashboard": {
                return enableKPIDashboardDrillToDashboard;
            }
            case "drillToInsight": {
                return enableKPIDashboardDrillToInsight;
            }
            case "drillToLegacyDashboard": {
                return !(isEmbedded && hideKpiDrillInEmbedded);
            }
            default: {
                const unhandledType = drillType;
                throw new UnexpectedError(`Unhandled widget drill type: ${unhandledType}`);
            }
        }
    });
    return getDrillDefinitionsWithPredicates(filteredDrills);
}));
/**
 * @internal
 */
export const selectValidConfiguredDrillsByWidgetRef = createMemoizedSelector((ref) => createSelector(selectConfiguredDrillsByWidgetRef(ref), selectAllCatalogDisplayFormsMap, selectAccessibleDashboardsMap, selectInsightsMap, (drills = [], displayFormsMap, accessibleDashboardsMap, insightsMap) => {
    return drills.filter((drill) => {
        switch (drill.drillDefinition.type) {
            case "drillToAttributeUrl": {
                return displayFormsMap.get(drill.drillDefinition.target.hyperlinkDisplayForm);
            }
            case "drillToCustomUrl": {
                return true;
            }
            case "drillToDashboard": {
                // No drill target equals drill to the same dashboard
                return (!drill.drillDefinition.target ||
                    accessibleDashboardsMap.get(drill.drillDefinition.target));
            }
            case "drillToInsight": {
                return insightsMap.get(drill.drillDefinition.target);
            }
            case "drillToLegacyDashboard": {
                return true;
            }
            case "drillDown": {
                return true;
            }
            default: {
                const unhandledType = drill.drillDefinition;
                throw new UnexpectedError(`Unhandled widget drill type: ${unhandledType}`);
            }
        }
    });
}));
const selectImplicitDrillToUrlPredicates = createMemoizedSelector((ref) => createSelector(selectImplicitDrillsToUrlByWidgetRef(ref), (drillToUrlDrills) => {
    return flatMap(drillToUrlDrills, (drill) => drill.predicates);
}));
const selectImplicitDrillDownPredicates = createMemoizedSelector((ref) => createSelector(selectImplicitDrillsDownByWidgetRef(ref), (drillDownDrills) => {
    return flatMap(drillDownDrills, (drill) => drill.predicates);
}));
const selectConfiguredDrillPredicates = createMemoizedSelector((ref) => createSelector(selectValidConfiguredDrillsByWidgetRef(ref), (configuredDrills = []) => {
    return flatMap(configuredDrills, (drill) => drill.predicates);
}));
/**
 * @internal
 */
export const selectConfiguredAndImplicitDrillsByWidgetRef = createMemoizedSelector((ref) => createSelector(selectValidConfiguredDrillsByWidgetRef(ref), selectImplicitDrillsDownByWidgetRef(ref), selectImplicitDrillsToUrlByWidgetRef(ref), (configuredDrills, implicitDrillDownDrills, implicitDrillToUrlDrills) => {
    return [...configuredDrills, ...implicitDrillDownDrills, ...implicitDrillToUrlDrills];
}));
/**
 * @internal
 */
export const selectDrillableItemsByWidgetRef = createMemoizedSelector((ref) => createSelector(selectDisableDefaultDrills, selectDrillableItems, selectConfiguredDrillPredicates(ref), selectImplicitDrillDownPredicates(ref), selectImplicitDrillToUrlPredicates(ref), (disableDefaultDrills, drillableItems, configuredDrills, implicitDrillDownDrills, implicitDrillToUrlDrills) => {
    const resolvedDrillableItems = [...drillableItems];
    if (!disableDefaultDrills) {
        resolvedDrillableItems.push(...configuredDrills, ...implicitDrillDownDrills, ...implicitDrillToUrlDrills);
    }
    return resolvedDrillableItems;
}));
//
// Following selectors are for insight widget in drill dialog
//
/**
 * @internal
 */
export const selectImplicitDrillsByAvailableDrillTargets = createMemoizedSelector((availableDrillTargets) => createSelector(selectAttributesWithDisplayFormLink, selectAttributesWithHierarchyDescendants, selectAllCatalogAttributesMap, selectIsDrillDownEnabled, (attributesWithLink, attributesWithHierarchyDescendants, allCatalogAttributesMap, isDrillDownEnabled) => {
    var _a;
    const availableDrillAttributes = (_a = availableDrillTargets === null || availableDrillTargets === void 0 ? void 0 : availableDrillTargets.attributes) !== null && _a !== void 0 ? _a : [];
    const drillDownDrills = isDrillDownEnabled
        ? getDrillDownDefinitionsWithPredicates(availableDrillAttributes, attributesWithHierarchyDescendants, allCatalogAttributesMap)
        : [];
    const drillToUrlDrills = getDrillToUrlDefinitionsWithPredicates(availableDrillAttributes, attributesWithLink);
    return [...drillDownDrills, ...drillToUrlDrills];
}));
/**
 * @internal
 */
export const selectDrillableItemsByAvailableDrillTargets = createMemoizedSelector((availableDrillTargets) => createSelector(selectImplicitDrillsByAvailableDrillTargets(availableDrillTargets), (implicitDrillDowns) => {
    return flatMap(implicitDrillDowns, (implicitDrill) => implicitDrill.predicates);
}));
//# sourceMappingURL=widgetDrillSelectors.js.map