import { IUser } from "@gooddata/sdk-model";
/**
 * @public
 */
export interface UserState {
    /** @beta */
    user?: IUser;
}
export declare const userInitialState: UserState;
