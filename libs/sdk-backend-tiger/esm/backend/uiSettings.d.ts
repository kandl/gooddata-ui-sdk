import { IUserSettings } from "@gooddata/sdk-backend-spi";
import { ISettings } from "@gooddata/sdk-model";
/**
 * Tiger does not yet have endpoints for settings. All the UI-specific
 * settings are thus hardcoded here.
 */
export declare const DefaultUiSettings: ISettings;
/**
 * Locale for the applications.
 */
export declare const DefaultLocale: string;
export declare const DefaultWeekStart: string;
/**
 * Number separators.
 */
export declare const DefaultSeparators: {
    thousand: string;
    decimal: string;
};
/**
 * Default user settings. Make sure to override the 'userId' with the real id when using.
 */
export declare const DefaultUserSettings: IUserSettings;
//# sourceMappingURL=uiSettings.d.ts.map