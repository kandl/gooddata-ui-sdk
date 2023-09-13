import { __rest } from "tslib";
/**
 * Given an object with settings that include user and workspace information, convert to a new object that
 * contains just the settings.
 *
 * @param userWorkspaceSettings - full object to strip of extra user and workspace data
 */
export function stripUserAndWorkspaceProps(userWorkspaceSettings) {
    const { userId: _userId, locale: _locale, separators: _separators, workspace: _workspace } = userWorkspaceSettings, rest = __rest(userWorkspaceSettings, ["userId", "locale", "separators", "workspace"]);
    return rest;
}
//# sourceMappingURL=conversion.js.map