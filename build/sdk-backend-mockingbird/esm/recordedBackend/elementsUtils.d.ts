import { IElementsQueryAttributeFilter, ElementsQueryOptionsElementsSpecification } from "@gooddata/sdk-backend-spi";
import { IAttributeElement, IRelativeDateFilter, IMeasure, IAttributeFilter, IDateFilter, Identifier, IMeasureDefinition } from "@gooddata/sdk-model";
import { AttributeElementsFiltering, AttributeElementsFilteringPredicate } from "./types.js";
export declare const resolveLimitingItems: (attributeElementsFiltering: AttributeElementsFiltering | undefined, attributeFilters: IElementsQueryAttributeFilter[], dateFilters: IRelativeDateFilter[], measures: IMeasure[]) => (elements: IAttributeElement[]) => IAttributeElement[];
export declare const resolveSelectedElements: (selectedElements: ElementsQueryOptionsElementsSpecification | undefined) => (elements: IAttributeElement[]) => IAttributeElement[];
export declare const resolveStringFilter: (filter: string | undefined | null) => (elements: IAttributeElement[]) => IAttributeElement[];
/**
 * @internal
 */
export declare function newAttributeFilterLimitingItem(attributeFilter: IAttributeFilter, predicate: AttributeElementsFilteringPredicate<IAttributeFilter>): Record<Identifier, AttributeElementsFilteringPredicate<IAttributeFilter>>;
/**
 * @internal
 */
export declare function newDateFilterLimitingItem(dateFilter: IDateFilter, predicate: AttributeElementsFilteringPredicate<IDateFilter>): Record<Identifier, AttributeElementsFilteringPredicate<IDateFilter>>;
/**
 * @internal
 */
export declare function newMeasureLimitingItem(measure: IMeasure<IMeasureDefinition>, predicate: AttributeElementsFilteringPredicate<IMeasure>): Record<Identifier, AttributeElementsFilteringPredicate<IMeasure>>;
//# sourceMappingURL=elementsUtils.d.ts.map