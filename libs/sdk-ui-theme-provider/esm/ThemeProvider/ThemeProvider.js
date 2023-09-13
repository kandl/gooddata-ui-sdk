// (C) 2020-2022 GoodData Corporation
import React, { useEffect, useState, useRef } from "react";
import { getLuminance } from "polished";
import identity from "lodash/identity.js";
import { useBackend, useWorkspace } from "@gooddata/sdk-ui";
import { clearCssProperties, setCssProperties } from "../cssProperties.js";
import { ThemeContextProvider } from "./Context.js";
import { prepareTheme } from "./prepareTheme.js";
/**
 * @internal
 */
export const isDarkTheme = (theme) => {
    var _a, _b, _c, _d;
    const firstColor = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c0;
    const lastColor = (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c9;
    if (!firstColor || !lastColor) {
        return false;
    }
    return getLuminance(firstColor) < getLuminance(lastColor);
};
/**
 * Fetches the theme object from the backend upon mounting and passes both theme object and isThemeLoading flag
 * to the context via ThemeContextProvider.
 *
 * @remarks
 * Converts properties from theme object into CSS variables and injects them into <body> via setCssProperties
 *
 * Both backend and workspace can be passed as an arguments, otherwise the component tries to get these from the context
 *
 * @public
 */
export const ThemeProvider = ({ children, theme: themeParam, backend: backendParam, workspace: workspaceParam, modifier = identity, enableComplementaryPalette = true, removeGlobalStylesOnUnmout = true, }) => {
    const backend = useBackend(backendParam);
    const workspace = useWorkspace(workspaceParam);
    const [theme, setTheme] = useState(themeParam !== null && themeParam !== void 0 ? themeParam : {});
    const [isLoading, setIsLoading] = useState(false);
    const lastWorkspace = useRef();
    lastWorkspace.current = workspace;
    useEffect(() => {
        // no need to load anything if the themeParam is present
        if (themeParam) {
            const preparedTheme = prepareTheme(themeParam, enableComplementaryPalette);
            setTheme(preparedTheme);
            clearCssProperties();
            setCssProperties(preparedTheme, isDarkTheme(preparedTheme));
            return;
        }
        const fetchData = async () => {
            if (!backend || !workspace) {
                clearCssProperties();
                return;
            }
            setIsLoading(true);
            const selectedTheme = await backend.workspace(workspace).styling().getTheme();
            if (lastWorkspace.current === workspace) {
                const modifiedTheme = modifier(selectedTheme);
                const preparedTheme = prepareTheme(modifiedTheme, enableComplementaryPalette);
                setTheme(preparedTheme);
                clearCssProperties();
                setCssProperties(preparedTheme, isDarkTheme(preparedTheme));
                setIsLoading(false);
            }
        };
        fetchData();
    }, [themeParam, workspace, backend, modifier, enableComplementaryPalette]);
    useEffect(() => {
        return () => {
            if (removeGlobalStylesOnUnmout) {
                clearCssProperties();
            }
        };
    }, [removeGlobalStylesOnUnmout]);
    return (React.createElement(ThemeContextProvider, { theme: theme, themeIsLoading: isLoading }, children));
};
//# sourceMappingURL=ThemeProvider.js.map