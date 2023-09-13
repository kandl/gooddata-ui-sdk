export const workspaceConverter = ({ relationships, attributes, id }, parentPrefixes) => {
    var _a, _b;
    const parentWorkspace = (_b = (_a = relationships === null || relationships === void 0 ? void 0 : relationships.parent) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.id;
    return {
        description: (attributes === null || attributes === void 0 ? void 0 : attributes.description) || (attributes === null || attributes === void 0 ? void 0 : attributes.name) || id,
        title: (attributes === null || attributes === void 0 ? void 0 : attributes.name) || "",
        id: id,
        prefix: attributes === null || attributes === void 0 ? void 0 : attributes.prefix,
        parentWorkspace,
        parentPrefixes,
    };
};
//# sourceMappingURL=WorkspaceConverter.js.map