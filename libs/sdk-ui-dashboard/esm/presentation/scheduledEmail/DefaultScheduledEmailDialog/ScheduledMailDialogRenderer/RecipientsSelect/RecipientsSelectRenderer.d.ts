import { IUser } from "@gooddata/sdk-model";
import React from "react";
import { IWorkspaceUsersQueryOptions } from "@gooddata/sdk-backend-spi";
import { IScheduleEmailRecipient } from "../../interfaces.js";
export interface IRecipientsSelectRendererProps {
    /**
     * Author of the scheduled email - is always recipient of the scheduled email.
     */
    author: IScheduleEmailRecipient;
    /**
     * Current user creating or editing the schedule
     */
    currentUser: IUser;
    /**
     * Currently selected recipients.
     */
    value: IScheduleEmailRecipient[];
    /**
     * Originally selected recipients of a edited schedule
     */
    originalValue: IScheduleEmailRecipient[];
    /**
     * Recipients to display in the autocomplete.
     */
    options: IScheduleEmailRecipient[];
    /**
     * Allow multiple recipients to select?
     */
    isMulti?: boolean;
    /**
     * Callback to be called, when recipients are changed.
     */
    onChange?: (selectedUsers: IScheduleEmailRecipient[]) => void;
    /**
     * Callback to load autocomplete options.
     */
    onLoad?: (queryOptions?: IWorkspaceUsersQueryOptions) => void;
    /**
     * Show autocomplete loading indicator?
     */
    isLoading?: boolean;
    /**
     * Has user canListUsersInProject permission?
     */
    canListUsersInProject?: boolean;
    /**
     * Allow to remove the last recipient
     */
    allowEmptySelection?: boolean;
}
export declare class RecipientsSelectRenderer extends React.PureComponent<IRecipientsSelectRendererProps> {
    private recipientRef;
    componentDidMount(): void;
    render(): JSX.Element;
    private renderEmptyContainer;
    private getStyle;
    private renderNoOptionsContainer;
    private renderMenuOptions;
    private renderMenuOptionsContainer;
    private renderLoadingIcon;
    private currentUserIsAuthor;
    private renderOwnerValueContainer;
    private renderMultiValueItemContainer;
    private renderErrorValueContainer;
    private renderSingleValueContainer;
    private renderMultiValueContainer;
    private isOriginalExternalRecipient;
    private renderOptionLabel;
    private getNewOptionData;
    private renderRecipientValue;
    private renderInputContainer;
    private handleOnChange;
    private loadUserListItems;
    private onMenuOpen;
    private onSearchCore;
    private onSearch;
    private getMatchedRecipientEmails;
    private isRecipientAdded;
}
