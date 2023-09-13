import { InvertableAttributeElementSelection } from "../../../types/index.js";
import { FilterSelector } from "../common/types.js";
/**
 * @internal
 */
export declare const selectWorkingSelection: FilterSelector<string[]>;
/**
 * @internal
 */
export declare const selectIsWorkingSelectionInverted: FilterSelector<boolean>;
/**
 * @internal
 */
export declare const selectCommittedSelection: FilterSelector<string[]>;
/**
 * @internal
 */
export declare const selectIsCommittedSelectionInverted: FilterSelector<boolean>;
/**
 * @internal
 */
export declare const selectInvertableWorkingSelection: FilterSelector<InvertableAttributeElementSelection>;
/**
 * @internal
 */
export declare const selectInvertableCommittedSelection: FilterSelector<InvertableAttributeElementSelection>;
/**
 * @internal
 */
export declare const selectIsWorkingSelectionChanged: FilterSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsWorkingSelectionEmpty: FilterSelector<boolean>;
