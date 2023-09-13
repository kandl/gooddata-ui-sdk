import { IProjectPermissions, IUserProject } from "@gooddata/api-model-bear";
import { IWorkspaceDescriptor } from "@gooddata/sdk-backend-spi";
import { IWorkspacePermissions } from "@gooddata/sdk-model";
export declare const convertUserProject: ({ userProject }: IUserProject) => IWorkspaceDescriptor;
export declare const convertPermissions: ({ permissions }: IProjectPermissions) => IWorkspacePermissions;
//# sourceMappingURL=WorkspaceConverter.d.ts.map