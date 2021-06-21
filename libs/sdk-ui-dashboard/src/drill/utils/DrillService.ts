// (C) 2019-2021 GoodData Corporation
import first from "lodash/first";
import last from "lodash/last";
import {
    // DrillEventIntersectionElementHeader,
    getMappingHeaderLocalIdentifier,
    HeaderPredicates,
    IAvailableDrillTargetAttribute,
    IAvailableDrillTargetMeasure,
    IAvailableDrillTargets,
    IDrillEvent,
    IDrillEventIntersectionElement,
    // IDrillEventIntersectionElement,
    // IDrillIntersectionAttributeItem,
    IHeaderPredicate,
    isDrillIntersectionAttributeItem,
    // isDrillIntersectionAttributeItem,
} from "@gooddata/sdk-ui";
// import stringify from "fast-json-stable-stringify";
// import { IntlShape } from "react-intl";
import {
    DrillDefinition,
    // IDrillToAttributeUrl,
    // IDrillToCustomUrl,
    IDrillToDashboard,
    IDrillToInsight,
    isMeasureDescriptor,
    // IUserWorkspaceSettings,
} from "@gooddata/sdk-backend-spi";
import {
    IAttributeFilter,
    // areObjRefsEqual,
    IInsight,
    localIdRef,
    newPositiveAttributeFilter,
    ObjRef,
    // objRefToString,
    // newPositiveAttributeFilter,
} from "@gooddata/sdk-model";
import { IDrillDownContext } from "@gooddata/sdk-ui-ext/esm/internal";
import { v4 as uuid } from "uuid";

// import { IDropdownItem } from "../Core/typings/DropdownItem";
// import { IAttributeFilter } from "../AttributeFilters";
// import { AttributeFilterItem } from "../Core/typings/bear";

// import { isElementUrisSupported } from "../Core/selectors/BackendCapabilitiesSelector";

// import { DrillConfigFactory } from "./DrillConfigFactory/DrillConfigFactory";
import { IDrillDownDefinition, isDrillDownDefinition } from "@gooddata/sdk-ui-ext";
// import { createDrillPerformedAction } from "./DrillConfig/DrillConfigActions";

import { getDrillDownTarget } from "./DrillDownService";
import {
    DashboardDrillDefinition,
    DashboardDrillEvent,
    IDrillConfigItem,
    // IDrillToUrlPlaceholder,
    isKpiDrillEvent,
} from "../Types";
import { DrillConfigFactory } from "./DrillConfigFactory/DrillConfigFactory";

const stringify = JSON.stringify;

//////

export interface IHeaderPredicateStore {
    [x: string]: IHeaderPredicate[];
}

export function getDrillBySourceLocalIdentifier(
    widgetDrillDefinition: DashboardDrillDefinition[],
    drillSourceLocalIdentifiers: string[],
): DashboardDrillDefinition {
    const drills: DashboardDrillDefinition[] = getDrillsBySourceLocalIdentifiers(
        widgetDrillDefinition,
        drillSourceLocalIdentifiers,
    );
    return selectFirstDrill(drills);
}

export function getDrillsBySourceLocalIdentifiers(
    widgetDrillDefinition: Array<DrillDefinition | IDrillDownDefinition>,
    drillSourceLocalIdentifiers: string[],
): Array<DrillDefinition | IDrillDownDefinition> {
    return widgetDrillDefinition.filter((d) =>
        drillSourceLocalIdentifiers.includes(DrillConfigFactory.Create(d).getFromLocalIdentifier()),
    );
}

// export function getDrillsForWidget(config: IDrillConfig, widgetRef: ObjRef): AppDrillDefinition[] {
//     return (widgetRef && config[objRefToString(widgetRef)]) || [];
// }

/**
 * It may happen that drill event contains multiple measures (for example with bubble chart and scatter plot), as the
 *  measure data points here are two-dimensional.
 *
 *  In the rare cases when there is configured drilling on both measures, we have to decide which single drill to
 *  activate. This function should ensure that.
 *
 * @param drills
 *  drills from which are we choosing
 *  @return single selected drill, or {@code null}
 */
export function selectFirstDrill(drills: DashboardDrillDefinition[]): DashboardDrillDefinition {
    return drills[0] || null;
}

export function getLocalIdentifiersFromEvent(drillEvent: IDrillEvent): string[] {
    const drillIntersection =
        (drillEvent && drillEvent.drillContext && drillEvent.drillContext.intersection) || [];
    return drillIntersection.map((x) => x.header).map(getMappingHeaderLocalIdentifier);
}

const getMeasureLocalIdentifier = (drillEvent: IDrillEvent): string =>
    first(
        ((drillEvent && drillEvent.drillContext.intersection) || [])
            .map((intersection) => intersection.header)
            .filter(isMeasureDescriptor)
            .map(getMappingHeaderLocalIdentifier),
    )!;

export function getDrillSourceLocalIdentifierFromEvent(drillEvent: IDrillEvent): string[] {
    const localIdentifiersFromEvent = getLocalIdentifiersFromEvent(drillEvent);

    if (drillEvent.drillContext.type === "table") {
        /*
        For tables, the event is always triggered on the individual column and there is no hierarchy involved.
        */
        const measureLocalIdentifier = getMeasureLocalIdentifier(drillEvent);

        return [measureLocalIdentifier ? measureLocalIdentifier : last(localIdentifiersFromEvent)!];
    }

    return localIdentifiersFromEvent;
}

export function filterDrillsByDrillEvent(
    drillDefinitions: DashboardDrillDefinition[],
    drillEvent: IDrillEvent,
): DashboardDrillDefinition[] {
    if (!drillDefinitions || !drillEvent) {
        return [];
    }
    const drillSourceLocalIdentifiers = getDrillSourceLocalIdentifierFromEvent(drillEvent);
    return getDrillsBySourceLocalIdentifiers(drillDefinitions, drillSourceLocalIdentifiers);
}

export function convertIntersectionToAfmFilters(
    intersection: IDrillEventIntersectionElement[],
    getIsElementUrisSupported = () => false, // isElementUrisSupported,
): IAttributeFilter[] {
    const useElementUris = getIsElementUrisSupported();
    return intersection
        .map((i) => i.header)
        .filter(isDrillIntersectionAttributeItem)
        .map((h) =>
            newPositiveAttributeFilter(
                h.attributeHeader.ref,
                useElementUris
                    ? { uris: [h.attributeHeaderItem.uri] }
                    : { values: [h.attributeHeaderItem.name] },
            ),
        );
}

// /**
//  *  For correct drill intersection that should be converted into AttributeFilters must be drill intersection:
//  *  1. AttributeItem
//  *  2. Not a date attribute
//  */
// function filterIntersection(
//     intersection: DrillEventIntersectionElementHeader,
//     dateDataSetsAttributesRefs: ObjRef[],
// ): boolean {
//     const attributeItem = isDrillIntersectionAttributeItem(intersection) ? intersection : undefined;
//     const ref = attributeItem?.attributeHeader?.formOf?.ref;

//     return ref ? !dateDataSetsAttributesRefs.some((ddsRef) => areObjRefsEqual(ddsRef, ref)) : false;
// }

export const generateFilterLocalIdentifier = (): string => uuid().replace(/-/g, "");

// export function convertIntersectionToAttributeFilters(
//     intersection: IDrillEventIntersectionElement[],
//     dateDataSetsAttributesRef: ObjRef[],
// ): IAttributeFilter[] {
//     return intersection
//         .map((i) => i.header)
//         .filter((i: DrillEventIntersectionElementHeader) => filterIntersection(i, dateDataSetsAttributesRef))
//         .map((h: IDrillIntersectionAttributeItem) => ({
//             displayForm: h.attributeHeader.ref,
//             negativeSelection: false,
//             attributeElements: { uris: [h.attributeHeaderItem.uri] },
//             localIdentifier: generateFilterLocalIdentifier(),
//             parents: [],
//         }));
// }

export function getActiveDrillableItems(
    isInternalDrilling: boolean,
    isInEditMode: boolean,
    drillConfig: DashboardDrillDefinition[],
    externalDrillableItems: IHeaderPredicate[],
    predicateStore: IHeaderPredicateStore,
): IHeaderPredicate[] {
    // internal drilling
    if (isInternalDrilling) {
        if (isInEditMode) {
            return [];
        }

        const hash = stringify(drillConfig);
        if (predicateStore[hash]) {
            return predicateStore[hash];
        }

        predicateStore[hash] = drillConfig.map((config) => {
            return HeaderPredicates.localIdentifierMatch(
                DrillConfigFactory.Create(config).getFromLocalIdentifier(),
            );
        });

        return predicateStore[hash];
    }

    // external drilling
    return externalDrillableItems;
}

export function getDrillToVisualizationDefinition(
    localIdentifier: string,
    insightRef: ObjRef,
): IDrillToInsight {
    return {
        type: "drillToInsight",
        origin: {
            type: "drillFromMeasure",
            measure: localIdRef(localIdentifier),
        },
        transition: "pop-up",
        target: insightRef,
    };
}

export function getMappedConfigForWidget(
    configForWidget: DashboardDrillDefinition[],
    supportedItemsForWidget: IAvailableDrillTargets,
): IDrillConfigItem[] {
    return configForWidget.map((item) => {
        return DrillConfigFactory.Create(item).createConfig(supportedItemsForWidget);
    });
}

export function getFilteredSupportedItemsForWidget(
    configForWidget: DashboardDrillDefinition[],
    supportedItemsForWidget: IAvailableDrillTargets,
): IAvailableDrillTargetMeasure[] {
    const configForWidgetIds = configForWidget.map((config) =>
        DrillConfigFactory.Create(config).getFromLocalIdentifier(),
    );

    const measureItems = supportedItemsForWidget.measures || [];
    return measureItems.filter((supported) => {
        return !configForWidgetIds.includes(supported.measure.measureHeaderItem.localIdentifier);
    });
}

// export const getDrillTargetTypeItems = (
//     intl: IntlShape,
//     featureFlags?: IUserWorkspaceSettings,
// ): IDropdownItem[] => {
//     const dropdownItems = [];

//     if (featureFlags && featureFlags.enableKPIDashboardDrillToDashboard) {
//         dropdownItems.push({
//             id: DRILL_TARGET_TYPE.DRILL_TO_DASHBOARD,
//             title: intl.formatMessage({ id: "configurationPanel.drillConfig.drillIntoDashboard" }),
//         });
//     }

//     if (featureFlags && featureFlags.enableKPIDashboardDrillToInsight) {
//         dropdownItems.push({
//             id: DRILL_TARGET_TYPE.DRILL_TO_INSIGHT,
//             title: intl.formatMessage({ id: "configurationPanel.drillConfig.drillIntoInsight" }),
//         });
//     }

//     if (featureFlags && featureFlags.enableKPIDashboardDrillToURL) {
//         dropdownItems.push({
//             id: DRILL_TARGET_TYPE.DRILL_TO_URL,
//             title: intl.formatMessage({ id: "configurationPanel.drillConfig.drillIntoUrl" }),
//         });
//     }

//     return dropdownItems;
// };

// export const getIconClassNameBySelection = (selection: DRILL_TARGET_TYPE) => {
//     const icons = {
//         [DRILL_TARGET_TYPE.DRILL_TO_DASHBOARD]: "gd-icon-drill-to-dashboard",
//         [DRILL_TARGET_TYPE.DRILL_TO_INSIGHT]: "gd-icon-drill-to-insight",
//         [DRILL_TARGET_TYPE.DRILL_TO_URL]: "gd-icon-hyperlink-disabled",
//     };

//     return icons[selection];
// };

export const mergeDrillConfigItems = (
    drillConfigItems: IDrillConfigItem[],
    incompleteItems: IDrillConfigItem[],
): IDrillConfigItem[] => {
    return incompleteItems.reduce(
        (acc: IDrillConfigItem[], incompleteItem: IDrillConfigItem) => {
            const found = acc.findIndex((item) => item.localIdentifier === incompleteItem.localIdentifier);
            if (found !== -1) {
                acc[found] = incompleteItem;
            } else {
                acc.push(incompleteItem);
            }
            return acc;
        },
        [...drillConfigItems],
    );
};
export const addOrUpdateDrillConfigItem = (
    drillConfigItems: IDrillConfigItem[],
    newItem: IDrillConfigItem,
) => {
    const found = drillConfigItems.findIndex(
        (drillConfigItem) => drillConfigItem.localIdentifier === newItem.localIdentifier,
    );
    if (found !== -1) {
        const incompleteItemsUpdated = [...drillConfigItems];
        incompleteItemsUpdated[found] = newItem;
        return incompleteItemsUpdated;
    } else {
        return [...drillConfigItems, newItem];
    }
};

export const getDrillToDashboardDefinition = (
    localIdentifier: string,
    dashboardRef: ObjRef,
): IDrillToDashboard => ({
    type: "drillToDashboard",
    transition: "in-place",
    origin: {
        type: "drillFromMeasure",
        measure: localIdRef(localIdentifier),
    },
    target: dashboardRef,
});

// export const getDrillToUrlDefinition = (
//     measureLocalIdentifier: string,
//     urlDrillTarget: UrlDrillTarget,
// ): IDrillToCustomUrl | IDrillToAttributeUrl => {
//     if (isDrillToCustomUrlConfig(urlDrillTarget)) {
//         return {
//             type: "drillToCustomUrl",
//             transition: "new-window",
//             origin: {
//                 type: "drillFromMeasure",
//                 measure: localIdRef(measureLocalIdentifier),
//             },
//             target: {
//                 url: urlDrillTarget.customUrl,
//             },
//         };
//     }
//     if (isDrillToAttributeUrlConfig(urlDrillTarget)) {
//         const { insightAttributeDisplayForm, drillToAttributeDisplayForm } = urlDrillTarget;
//         return {
//             type: "drillToAttributeUrl",
//             transition: "new-window",
//             origin: {
//                 type: "drillFromMeasure",
//                 measure: localIdRef(measureLocalIdentifier),
//             },
//             target: {
//                 displayForm: insightAttributeDisplayForm,
//                 hyperlinkDisplayForm: drillToAttributeDisplayForm,
//             },
//         };
//     }
//     throw new Error("Unsupported URL drill type!");
// };

export const createDrillDefinitionFromDrillTarget = (
    item: IAvailableDrillTargetAttribute,
    targetAttributeDisplayRef: ObjRef,
): IDrillDownDefinition => {
    return {
        type: "drillDown",
        origin: localIdRef(item.attribute.attributeHeader.localIdentifier),
        target: targetAttributeDisplayRef,
    };
};

export function handleDrillPickerSelect(
    sourceInsight: IInsight,
    event: DashboardDrillEvent,
    drillDefinition: DashboardDrillDefinition,
    widgetRef: ObjRef,
    drillPerformedAction: any, // typeof createDrillPerformedAction,
    conversionFn: (source: IInsight, drillDownContext: IDrillDownContext) => IInsight,
) {
    if (!isDrillDownDefinition(drillDefinition) || isKpiDrillEvent(event)) {
        return drillPerformedAction(widgetRef, event, drillDefinition, null);
    }
    const drillDownTarget = getDrillDownTarget(sourceInsight, event, drillDefinition, conversionFn);
    return drillPerformedAction(widgetRef, event, drillDefinition, drillDownTarget);
}
