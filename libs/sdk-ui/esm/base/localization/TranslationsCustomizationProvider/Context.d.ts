import React from "react";
/**
 * @beta
 */
export interface ITranslationsCustomizationContextProviderProps {
    /**
     * Flag telling whether settings is being loaded or not
     */
    translationsCustomizationIsLoading: boolean;
    /**
     * Customized translations.
     */
    translations: Record<string, string>;
    /**
     * React children
     */
    children?: React.ReactNode;
}
/**
 * @beta
 */
export declare const TranslationsCustomizationContextProvider: React.FC<ITranslationsCustomizationContextProviderProps>;
/**
 * @beta
 */
export declare function withTranslationsCustomization<T>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, "translationsCustomizationIsLoading" | "translations">>;
//# sourceMappingURL=Context.d.ts.map