import { dataLoaderAbstractFactory } from "./DataLoaderAbstractFactory";
class UserWorkspaceSettingsDataLoader {
    constructor(workspace) {
        this.workspace = workspace;
    }
    getUserWorkspaceSettings(backend) {
        if (!this.cachedUserWorkspaceSettings) {
            this.cachedUserWorkspaceSettings = backend
                .workspace(this.workspace)
                .settings()
                .getSettingsForCurrentUser()
                .catch((error) => {
                this.cachedUserWorkspaceSettings = undefined;
                throw error;
            });
        }
        return this.cachedUserWorkspaceSettings;
    }
}
/**
 * @internal
 */
export const userWorkspaceSettingsDataLoaderFactory = dataLoaderAbstractFactory((workspace) => new UserWorkspaceSettingsDataLoader(workspace));
//# sourceMappingURL=UserWorkspaceSettingsDataLoader.js.map