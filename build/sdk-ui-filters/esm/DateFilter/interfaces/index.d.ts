import { DateString, DateFilterGranularity, IAbsoluteDateFilterPreset, IRelativeDateFilterPreset, IRelativeDateFilterPresetOfGranularity, IAbsoluteDateFilterForm, IRelativeDateFilterForm, IAllTimeDateFilterOption, RelativeDateFilterGranularityOffset } from "@gooddata/sdk-model";
/**
 * Represents the global absolute date filter, which may contain selected values
 * @public
 */
export interface IUiAbsoluteDateFilterForm extends IAbsoluteDateFilterForm {
    /**
     * Selected global absolute date filter start date
     */
    from?: DateString;
    /**
     * Selected global absolute date filter end date
     */
    to?: DateString;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IUiRelativeDateFilterForm}.
 * @public
 */
export declare const isUiRelativeDateFilterForm: (obj: unknown) => obj is IUiRelativeDateFilterForm;
/**
 * Represents the global relative date filter, which may contain selected granularity and values
 * @public
 */
export interface IUiRelativeDateFilterForm extends Omit<IRelativeDateFilterForm, "availableGranularities"> {
    /**
     * Selected global relative date filter granularity
     */
    granularity?: DateFilterGranularity;
    /**
     * Selected global relative date filter granularity start offset
     */
    from?: RelativeDateFilterGranularityOffset;
    /**
     * Selected global relative date filter granularity end offset
     */
    to?: RelativeDateFilterGranularityOffset;
}
/**
 * Represents a absolute date filter option in the date filter dropdown
 * @public
 */
export type AbsoluteDateFilterOption = IUiAbsoluteDateFilterForm | IAbsoluteDateFilterPreset;
/**
 * Type-guard testing whether the provided object is an instance of {@link AbsoluteDateFilterOption}.
 * @public
 */
export declare const isAbsoluteDateFilterOption: (obj: unknown) => obj is AbsoluteDateFilterOption;
/**
 * Represents a relative date filter option in the date filter dropdown
 * @public
 */
export type RelativeDateFilterOption = IUiRelativeDateFilterForm | IRelativeDateFilterPreset;
/**
 * Type-guard testing whether the provided object is an instance of {@link RelativeDateFilterOption}.
 * @public
 */
export declare const isRelativeDateFilterOption: (obj: unknown) => obj is RelativeDateFilterOption;
/**
 * Represents any option in the date filter dropdown
 * @public
 */
export type DateFilterOption = IAllTimeDateFilterOption | AbsoluteDateFilterOption | RelativeDateFilterOption;
/**
 * Relative date filter options grouped by their granularity
 * @public
 */
export type DateFilterRelativeOptionGroup = {
    [key in DateFilterGranularity]?: Array<IRelativeDateFilterPresetOfGranularity<key>>;
};
/**
 * All date filter options grouped by their type
 * @public
 */
export interface IDateFilterOptionsByType {
    /**
     * Global all time date filter options
     */
    allTime?: IAllTimeDateFilterOption;
    /**
     * Global absolute date filter options
     */
    absoluteForm?: IUiAbsoluteDateFilterForm;
    /**
     * Global relative date filter options
     */
    relativeForm?: IUiRelativeDateFilterForm;
    /**
     * Custom absolute date filter presets
     */
    absolutePreset?: IAbsoluteDateFilterPreset[];
    /**
     * Custom relative date filter presets
     */
    relativePreset?: DateFilterRelativeOptionGroup;
}
/**
 * Absolute form date filter errors.
 *
 * @public
 */
export interface IDateFilterAbsoluteFormErrors {
    from?: string;
    to?: string;
}
/**
 * Relative form date filter errors.
 *
 * @public
 */
export interface IDateFilterRelativeFormErrors {
    from?: string;
    to?: string;
}
/**
 * Extended date filter errors
 * @public
 */
export interface IExtendedDateFilterErrors {
    /**
     * Global absolute date filter errors
     */
    absoluteForm?: IDateFilterAbsoluteFormErrors;
    /**
     * Global relative date filter errors
     */
    relativeForm?: IDateFilterRelativeFormErrors;
}
