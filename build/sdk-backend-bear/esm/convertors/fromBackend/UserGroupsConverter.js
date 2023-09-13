import { uriRef } from "@gooddata/sdk-model";
export const convertWorkspaceUserGroup = (group) => {
    const { content: { name, description, id }, links, } = group;
    return {
        ref: uriRef(links.self),
        name,
        id: id,
        description: description,
    };
};
//# sourceMappingURL=UserGroupsConverter.js.map