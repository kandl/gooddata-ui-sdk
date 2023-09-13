import { IInsightDefinition } from "@gooddata/sdk-model";
import { ILocale } from "../localization/Locale.js";
/**
 * The function fills the titles of the measures that does not have it set.
 *
 * The derived measures
 * have the title built from the current name of the master measure and suffix based on the derived measure type.
 *
 * The arithmetic measures
 * have the title built from the current names of the referenced master measures and type of the arithmetic
 * operation.
 *
 * @param insight - insight or insight definition that must be processed.
 * @param locale - locale used for localization of the measure titles.
 * @param maxArithmeticMeasureTitleLength - maximum length of generated arithmetic measures titles.
 * Longer names will be shortened. Default value is 50 characters.
 *
 * @returns a copy of insight with auto-generated titles for derived and arithmetic measures
 *
 * @internal
 */
export declare function fillMissingTitles<T extends IInsightDefinition>(insight: T, locale: ILocale, maxArithmeticMeasureTitleLength?: number): T;
//# sourceMappingURL=fillMissingTitles.d.ts.map