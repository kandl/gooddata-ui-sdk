// (C) 2023 GoodData Corporation
import { all, call, put, SagaReturnType, select } from "redux-saga/effects";
import {
    IAttributeFilter,
    IDashboardAttributeFilter,
    ObjRef,
    areObjRefsEqual,
    filterAttributeElements,
    filterObjRef,
    getAttributeElementsItems,
    isNegativeAttributeFilter,
    updateAttributeElementsItems,
} from "@gooddata/sdk-model";
import compact from "lodash/compact.js";
import uniq from "lodash/uniq.js";
import { DashboardContext } from "../../types/commonTypes.js";
import { selectFilterContextAttributeFilters } from "../../store/filterContext/filterContextSelectors.js";
import { convertIntersectionToAttributeFilters } from "./common/intersectionUtils.js";
import { addAttributeFilter, removeAttributeFilter } from "../../commands/filters.js";
import { replaceInsightWidgetFilterSettings } from "../../commands/insight.js";
import { CrossFiltering } from "../../commands/drill.js";

export function* crossFilteringHandler(ctx: DashboardContext, cmd: CrossFiltering) {
    const backendSupportsElementUris = !!ctx.backend.capabilities.supportsElementUris;
    const widgetRef = cmd.payload.drillEvent.widgetRef!;
    const currentFilters: SagaReturnType<typeof selectFilterContextAttributeFilters> = yield select(
        selectFilterContextAttributeFilters,
    );

    // CONSTRUCT INTERSECTION FILTERS
    let drillIntersectionFilters: IAttributeFilter[] = [];
    if (cmd.payload.drillEvent.drillContext.intersection) {
        drillIntersectionFilters = convertIntersectionToAttributeFilters(
            cmd.payload.drillEvent.drillContext.intersection,
            [],
            backendSupportsElementUris,
        );
    } else if (cmd.payload.drillEvent?.drillContext?.points) {
        // label click
        if (cmd.payload.drillEvent?.drillContext?.points?.length === 1) {
            drillIntersectionFilters = convertIntersectionToAttributeFilters(
                cmd.payload.drillEvent?.drillContext?.points[0]?.intersection,
                [],
                backendSupportsElementUris,
            );
        } else if (cmd.payload.drillEvent?.drillContext?.points?.length > 1) {
            drillIntersectionFilters = convertIntersectionToAttributeFilters(
                cmd.payload.drillEvent?.drillContext?.points[0]?.intersection.slice(-1),
                [],
                backendSupportsElementUris,
            );
        }
    }

    yield all(drillIntersectionFilters.map((newFilter) => call(applyCrossFilter, currentFilters, newFilter)));

    yield call(disconnectCrossFilterFromWidget, drillIntersectionFilters, widgetRef);
}

function* applyCrossFilter(currentFilters: IDashboardAttributeFilter[], newFilter: IAttributeFilter) {
    const newFilterRef = filterObjRef(newFilter);
    const newFilterElements = filterAttributeElements(newFilter);
    const eixstingFilterIndex = currentFilters.findIndex((item) =>
        areObjRefsEqual(item.attributeFilter.displayForm, newFilterRef),
    );

    if (eixstingFilterIndex > -1) {
        // TODO: handle merging positive and negative filters?
        const existingFilter = currentFilters[eixstingFilterIndex];
        const existingAttributeElementsItems = getAttributeElementsItems(
            existingFilter.attributeFilter.attributeElements,
        );
        const newAttributeElementsItems = getAttributeElementsItems(newFilterElements);
        const mergedAttributeElementsItems = uniq([
            ...existingAttributeElementsItems,
            ...newAttributeElementsItems,
        ]);

        yield put(removeAttributeFilter(existingFilter.attributeFilter.localIdentifier!));
        yield put(
            addAttributeFilter(
                newFilterRef,
                eixstingFilterIndex,
                "",
                "multi",
                "readonly",
                updateAttributeElementsItems(newFilterElements, mergedAttributeElementsItems),
                isNegativeAttributeFilter(newFilter),
            ),
        );
    } else {
        yield put(
            addAttributeFilter(
                newFilterRef,
                currentFilters.length,
                "",
                "multi",
                "readonly",
                newFilterElements,
                isNegativeAttributeFilter(newFilter),
            ),
        );
    }
}

function* disconnectCrossFilterFromWidget(filters: IAttributeFilter[], widgetRef: ObjRef) {
    const filterRefsToDisconnect = compact(filters.map(filterObjRef));

    yield put(
        replaceInsightWidgetFilterSettings(widgetRef, {
            ignoreAttributeFilters: filterRefsToDisconnect,
        }),
    );
}
