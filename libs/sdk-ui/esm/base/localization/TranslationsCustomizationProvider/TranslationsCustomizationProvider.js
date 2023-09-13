import React, { useEffect, useState } from "react";
import { useBackend } from "../../react/BackendContext.js";
import { useWorkspace } from "../../react/WorkspaceContext.js";
import { TranslationsCustomizationContextProvider } from "./Context.js";
import { pickCorrectWording } from "./utils.js";
const defaultTranslationsParam = {};
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
export const TranslationsCustomizationProvider = ({ render, customize = pickCorrectWording, translations: translationsParam = defaultTranslationsParam, backend: backendParam, workspace: workspaceParam, }) => {
    const backend = useBackend(backendParam);
    const workspace = useWorkspace(workspaceParam);
    const [translations, setTranslations] = useState(() => customize(translationsParam));
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchSettings = async () => {
            if (!backend || !workspace) {
                return;
            }
            setIsLoading(true);
            const settings = await backend.workspace(workspace).settings().getSettingsForCurrentUser();
            /**
             * Because of issues described in the ticket FET-855, we decided to use this workaround.
             * After the issues that are described in the ticket are solved or at least reduced,
             * this workaround can be removed.
             */
            window.gdSettings = settings;
            setTranslations(customize(translationsParam, settings));
            setIsLoading(false);
        };
        fetchSettings();
    }, [backend, workspace, translationsParam]);
    return (React.createElement(TranslationsCustomizationContextProvider, { translationsCustomizationIsLoading: isLoading, translations: translations }, render(translations)));
};
//# sourceMappingURL=TranslationsCustomizationProvider.js.map