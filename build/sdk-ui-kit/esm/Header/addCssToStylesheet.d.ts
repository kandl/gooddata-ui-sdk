/**
 * Appends CSS rules to existing stylesheet or creates it and appends to DOM first, if it does not exists.
 *
 * @param sheetId - ID of the stylesheet (<style> element in the DOM document).
 * @param rules - string with stylesheet rules, for example `html {border: 3px dotted black; padding: 20px;}`.
 * @param clear - true if stylesheet identified by 'sheetId' id should be removed from DOM if it is found, false if 'rules' should be appended to it.
 * @returns updated stylesheet
 *
 * @internal
 */
export declare function addCssToStylesheet(sheetId: string, rules: string, clear?: boolean): HTMLStyleElement;
//# sourceMappingURL=addCssToStylesheet.d.ts.map