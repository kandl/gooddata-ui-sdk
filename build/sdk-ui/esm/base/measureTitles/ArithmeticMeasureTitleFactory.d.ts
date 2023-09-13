import { IArithmeticMeasureTitleProps, IMeasureTitleProps } from "./MeasureTitle.js";
import { ILocale } from "../localization/Locale.js";
/**
 * Factory that builds formatted localized titles of arithmetic measures.
 * The title is used during AFM execution and for bucket item titles.
 *
 * @internal
 */
export declare class ArithmeticMeasureTitleFactory {
    private readonly locale;
    /**
     * Create a new instance of the class.
     * @param locale - The locale used for translation.
     */
    constructor(locale: ILocale);
    /**
     * Returns formatted localized title string for arithmetic measure.
     *
     * @param arithmeticMeasureProps - The properties of arithmetic measure for which
     *      the title must be obtained.
     * @param measureTitleProps - The array of objects in which the title of master measures used
     *      in arithmetic measure is looked up.
     * @returns localized title of the arithmetic measure or null when arithmetic measure references invalid
     *      master measures or invalid number of master measures.
     */
    getTitle(arithmeticMeasureProps: IArithmeticMeasureTitleProps, measureTitleProps: IMeasureTitleProps[]): string | null;
    private getTitleLocalizationKey;
    private getMasterMeasureTitles;
    private findMeasureTitle;
    private translateKey;
}
//# sourceMappingURL=ArithmeticMeasureTitleFactory.d.ts.map