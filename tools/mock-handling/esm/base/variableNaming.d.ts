export type TakenNamesSet = {
    [name: string]: any;
};
/**
 * Given a metadata object title, this function figures out the ideal name for the variable that should
 * represent the object in a TypeScript code.
 *
 * This function can also work with a mapping of used variable names. If the determined variable name is found
 * as used, it will append a number (1, 2 etc) to make the variable name unique. The provided mapping will be
 * used read-only. The value of the mapping is not used for anything - the mere presence of the key in the mapping
 * indicates the name is used.
 *
 * @param title - object title
 * @param scope - uniqueness scope
 */
export declare function createUniqueVariableName(title: string, scope?: TakenNamesSet): string;
/**
 * Given metadata object identifier, this function returns a valid typescript variable name. Optionally this
 * function can assure uniqueness of the returned name within some scope.
 *
 * @param id - metadata object identifier
 * @param scope - uniqueness scope
 */
export declare function createUniqueVariableNameForIdentifier(id: string, scope?: TakenNamesSet): string;
/**
 * Given workspace id, return variable name for the workspace.
 */
export declare function workspaceName(workspace: string): string;
//# sourceMappingURL=variableNaming.d.ts.map