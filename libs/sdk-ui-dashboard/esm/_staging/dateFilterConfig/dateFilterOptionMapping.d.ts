import { IDashboardDateFilter } from "@gooddata/sdk-model";
import { DateFilterOption, IDateFilterOptionsByType } from "@gooddata/sdk-ui-filters";
interface IDateFilterOptionInfo {
    dateFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}
/**
 * Tries to match a preset or a form with the provided value. Prioritizes the provided option if possible.
 *
 * @remarks
 * This is to handle cases when user picked a form and filled values that match an existing preset.
 * In those cases we want to show the form as picked even though a preset would otherwise be preferred.
 *
 * @param dateFilter - value to match against
 * @param availableOptions - date options available
 * @param preferredOptionId - id of the option that should be matched first if possible
 */
export declare function matchDateFilterToDateFilterOptionWithPreference(dateFilter: IDashboardDateFilter | undefined, availableOptions: IDateFilterOptionsByType, preferredOptionId: string | undefined): IDateFilterOptionInfo;
/**
 * Tries to match a preset or a form with the provided value. Prioritizes presets over forms.
 * @param dateFilterValue - value to match against
 * @param availableOptions - date options available
 */
export declare function matchDateFilterToDateFilterOption(dateFilter: IDashboardDateFilter | undefined, availableOptions: IDateFilterOptionsByType): IDateFilterOptionInfo;
/**
 * Flattens the provided date filter options. The flattening maintains a stable, predefined order in which
 * the options should be rendered by the date filter component.
 *
 * @param dateFilterOptions - available options to flatten
 */
export declare function flattenDateFilterOptions(dateFilterOptions: IDateFilterOptionsByType): DateFilterOption[];
export declare function findDateFilterOptionByValue(dateFilter: IDashboardDateFilter, dateFilterOptions: IDateFilterOptionsByType): DateFilterOption | undefined;
export {};
