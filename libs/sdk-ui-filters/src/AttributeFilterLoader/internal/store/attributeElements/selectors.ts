// (C) 2021-2022 GoodData Corporation
import { IAttributeElement } from "@gooddata/sdk-model";
import { createSelector } from "@reduxjs/toolkit";
import invariant from "ts-invariant";
import { selectState } from "../common/selectors";

/**
 * @internal
 */
export const getElementsByKeys = (keys: string[], elementsMap: Record<string, IAttributeElement>) => {
    return keys.map((key) => {
        const element = elementsMap[key];
        invariant(element, `Unable to map selection to elements - element with key "${key}" is not loaded.`);
        return element;
    });
};

/**
 * @internal
 */
export const selectAttributeElementKeys = createSelector(
    selectState,
    (state) => state.attributeElements ?? [],
);

/**
 * @internal
 */
export const selectAttributeElementsMap = createSelector(selectState, (state) => state.attributeElementsMap);

/**
 * @internal
 */
export const selectAttributeElements = createSelector(
    selectAttributeElementKeys,
    selectAttributeElementsMap,
    getElementsByKeys,
);

/**
 * @internal
 */
export const selectAttributeElementsTotalCount = createSelector(
    selectState,
    (state) => state.attributeElementsTotalCount,
);

/**
 * @internal
 */
export const selectAttributeElementsTotalCountWithCurrentSettings = createSelector(
    selectState,
    (state) => state.attributeElementsTotalCountWithCurrentSettings,
);

/**
 * @internal
 */
export const selectStaticElements = createSelector(selectState, (state) => state.staticElements ?? []);

/**
 * @internal
 */
export const selectLoadNextElementsPageStatus = createSelector(
    selectState,
    (state) => state.loadAttributeElementsNextPageStatus,
);

/**
 * @internal
 */
export const selectLoadNextElementsPageError = createSelector(
    selectState,
    (state) => state.loadAttributeElementsNextPageError,
);

/**
 * @internal
 */
export const selectLoadInitialElementsPageStatus = createSelector(
    selectState,
    (state) => state.loadAttributeElementsInitialPageStatus,
);

/**
 * @internal
 */
export const selectLoadInitialElementsPageError = createSelector(
    selectState,
    (state) => state.loadAttributeElementsInitialPageError,
);
