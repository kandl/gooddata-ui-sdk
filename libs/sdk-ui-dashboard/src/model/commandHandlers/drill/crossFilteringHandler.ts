// (C) 2023 GoodData Corporation
import { all, call, put, SagaReturnType, select } from "redux-saga/effects";
import {
    IAttributeFilter,
    IDashboardAttributeFilter,
    areObjRefsEqual,
    filterAttributeElements,
    filterObjRef,
    isNegativeAttributeFilter,
} from "@gooddata/sdk-model";
import { DashboardContext } from "../../types/commonTypes.js";
import { selectFilterContextAttributeFilters } from "../../store/filterContext/filterContextSelectors.js";
import { convertIntersectionToAttributeFilters } from "./common/intersectionUtils.js";
import { addAttributeFilter, changeAttributeFilterSelection } from "../../commands/filters.js";
import { CrossFiltering } from "../../commands/drill.js";
import { uiActions } from "../../store/ui/index.js";
import { crossFilteringRequested, crossFilteringResolved } from "../../events/drill.js";
import { selectCatalogDateAttributes } from "../../store/catalog/catalogSelectors.js";

export function* crossFilteringHandler(ctx: DashboardContext, cmd: CrossFiltering) {
    yield put(
        crossFilteringRequested(ctx, cmd.payload.drillDefinition, cmd.payload.drillEvent, cmd.correlationId),
    );

    const backendSupportsElementUris = !!ctx.backend.capabilities.supportsElementUris;
    const widgetRef = cmd.payload.drillEvent.widgetRef!;
    const currentFilters: SagaReturnType<typeof selectFilterContextAttributeFilters> = yield select(
        selectFilterContextAttributeFilters,
    );
    const dateAttributes: ReturnType<typeof selectCatalogDateAttributes> = yield select(
        selectCatalogDateAttributes,
    );
    const dateDataSetsAttributesRefs = dateAttributes.map((dateAttribute) => dateAttribute.attribute.ref);

    let drillIntersectionFilters: IAttributeFilter[] = [];
    if (cmd.payload.drillEvent.drillContext.intersection) {
        drillIntersectionFilters = convertIntersectionToAttributeFilters(
            cmd.payload.drillEvent.drillContext.intersection,
            dateDataSetsAttributesRefs,
            backendSupportsElementUris,
        );
    } else if (cmd.payload.drillEvent?.drillContext?.points) {
        // label click
        if (cmd.payload.drillEvent?.drillContext?.points?.length === 1) {
            drillIntersectionFilters = convertIntersectionToAttributeFilters(
                cmd.payload.drillEvent?.drillContext?.points[0]?.intersection,
                dateDataSetsAttributesRefs,
                backendSupportsElementUris,
            );
        } else if (cmd.payload.drillEvent?.drillContext?.points?.length > 1) {
            drillIntersectionFilters = convertIntersectionToAttributeFilters(
                cmd.payload.drillEvent?.drillContext?.points[0]?.intersection.slice(-1),
                dateDataSetsAttributesRefs,
                backendSupportsElementUris,
            );
        }
    }

    yield put(uiActions.setCrossFilteringActiveWidget(widgetRef));
    yield all(drillIntersectionFilters.map((newFilter) => call(applyCrossFilter, currentFilters, newFilter)));

    return crossFilteringResolved(
        ctx,
        drillIntersectionFilters,
        cmd.payload.drillDefinition,
        cmd.payload.drillEvent,
        cmd.correlationId,
    );
}

function* applyCrossFilter(currentFilters: IDashboardAttributeFilter[], newFilter: IAttributeFilter) {
    const newFilterRef = filterObjRef(newFilter);
    const newFilterElements = filterAttributeElements(newFilter);
    const existingFilter = currentFilters.find((item) =>
        areObjRefsEqual(item.attributeFilter.displayForm, newFilterRef),
    );

    if (existingFilter) {
        yield put(
            changeAttributeFilterSelection(
                existingFilter.attributeFilter.localIdentifier!,
                newFilterElements,
                isNegativeAttributeFilter(newFilter) ? "NOT_IN" : "IN",
            ),
        );
    } else {
        yield put(
            addAttributeFilter(
                newFilterRef,
                currentFilters.length,
                "",
                "multi",
                "active",
                newFilterElements,
                isNegativeAttributeFilter(newFilter),
            ),
        );
    }
}
