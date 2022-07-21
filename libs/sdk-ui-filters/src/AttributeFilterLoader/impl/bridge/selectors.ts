// (C) 2022 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

import { InvertableAttributeElementSelection } from "../../types";
import {
    selectWorkingSelection,
    selectCommittedSelection,
    selectIsWorkingSelectionInverted,
} from "../../internal";

/**
 * @internal
 */
export const selectInvertableWorkingSelection = createSelector(
    selectWorkingSelection,
    selectIsWorkingSelectionInverted,
    (items, isInverted): InvertableAttributeElementSelection => ({
        items,
        isInverted,
    }),
);

/**
 * @internal
 */
export const selectInvertableCommittedSelection = createSelector(
    selectCommittedSelection,
    selectIsWorkingSelectionInverted,
    (items, isInverted): InvertableAttributeElementSelection => ({
        items,
        isInverted,
    }),
);

/**
 * @internal
 */
export const selectIsWorkingSelectionChanged = createSelector(
    selectCommittedSelection,
    selectWorkingSelection,
    isEqual,
);

/**
 * @internal
 */
export const selectIsWorkingSelectionEmpty = createSelector(selectWorkingSelection, isEmpty);
