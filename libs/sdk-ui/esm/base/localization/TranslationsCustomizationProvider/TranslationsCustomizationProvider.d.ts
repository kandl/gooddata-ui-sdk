import { IAnalyticalBackend, IWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import React from "react";
declare global {
    interface Window {
        gdSettings: IWorkspaceSettings | undefined;
    }
}
/**
 * @beta
 */
export interface ITranslationsCustomizationProviderProps {
    /**
     * Component that will be render (Render Props pattern).
     */
    render(translations: Record<string, string>): JSX.Element;
    /**
     * Customization function that will change final translations.
     */
    customize?(translations: Record<string, string>, settings?: IWorkspaceSettings): Record<string, string>;
    /**
     * Translations that needs to be modified.
     */
    translations: Record<string, string>;
    /**
     * Analytical backend, from which the ThemeProvider will obtain selected theme object
     *
     * @remarks
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the ThemeProvider will obtain the selected theme identifier
     *
     * @remarks
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;
}
/**
 * This provider is here because of the need for customization of translations.
 *
 * @remarks
 * If you need to change translations based on some setting flag,
 * use this provider at the top of you your react tree.
 *
 * You can see that the provider accepts render function and customize function as parameters.
 * Using these two function you can customize your translations.
 *
 * @beta
 */
export declare const TranslationsCustomizationProvider: React.FC<ITranslationsCustomizationProviderProps>;
//# sourceMappingURL=TranslationsCustomizationProvider.d.ts.map