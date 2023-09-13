import { IAccountSetting, IUserListItem, IUsersItem } from "@gooddata/api-model-bear";
import { IWorkspaceUser, IUser } from "@gooddata/sdk-model";
export declare const convertUser: (user: IAccountSetting) => IUser;
export declare const convertWorkspaceUser: (user: IUserListItem) => IWorkspaceUser;
export declare const convertUsersItem: (user: IUsersItem) => IWorkspaceUser;
//# sourceMappingURL=UsersConverter.d.ts.map