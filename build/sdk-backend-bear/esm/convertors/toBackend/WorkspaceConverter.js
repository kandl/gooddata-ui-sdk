export const convertUserProject = ({ userProject }) => {
    const workspace = {
        description: userProject.projectDescription,
        title: userProject.projectTitle,
        id: userProject.links.self.match(/\/gdc\/projects\/(.+)/i)[1],
    };
    if (userProject.demoProject) {
        workspace.isDemo = true;
    }
    return workspace;
};
export const convertPermissions = ({ permissions }) => {
    const workspacePermissions = Object.keys(permissions).reduce((acc, permission) => {
        const hasPermission = permissions[permission];
        // the cast is necessary here, otherwise the indexing does not work
        acc[permission] = hasPermission === "1";
        return acc;
    }, {});
    return workspacePermissions;
};
//# sourceMappingURL=WorkspaceConverter.js.map