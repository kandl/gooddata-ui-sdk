import { IDateFilterConfig, ISettings } from "@gooddata/sdk-model";
/**
 * Validation result.
 *
 * @public
 */
export type DateFilterConfigValidationResult = "Valid" | "NoVisibleOptions" | "ConflictingIdentifiers" | "SelectedOptionInvalid";
/**
 * Validates the provided date filter config. The config has a lot of options and not all of them can be
 * covered by the typing.
 *
 * @param config - config to validate
 * @param shouldCheckSelectedOption - indicate whether validation should check that a valid option is selected
 */
export declare function validateDateFilterConfig(config: IDateFilterConfig, shouldCheckSelectedOption?: boolean): DateFilterConfigValidationResult;
/**
 * Filters out all weekly presets from the filter config.
 */
export declare function filterOutWeeks(config: IDateFilterConfig): IDateFilterConfig;
/**
 * Given the date filter config loaded from backend and the settings, this function will perform validation
 * of the config and if needed also cleanup of invalid/disabled presets.
 */
export declare function getValidDateFilterConfig(config: IDateFilterConfig, settings: ISettings): [IDateFilterConfig, DateFilterConfigValidationResult];
