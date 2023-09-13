// (C) 2019-2023 GoodData Corporation
/* eslint-disable import/named,import/namespace */
import { areObjRefsEqual } from "@gooddata/sdk-model";
import React from "react";
import { FormattedMessage } from "react-intl";
import CreatableSelect from "react-select/creatable";
import { components as ReactSelectComponents, } from "react-select";
import debounce from "lodash/debounce.js";
import isEmpty from "lodash/isEmpty.js";
import isEqual from "lodash/isEqual.js";
import includes from "lodash/includes.js";
import { Bubble, BubbleHoverTrigger, Message, LoadingMask } from "@gooddata/sdk-ui-kit";
import { isEmail } from "../../utils/validate.js";
import { isScheduleEmailExistingRecipient, isScheduleEmailExternalRecipient, } from "../../interfaces.js";
import { getScheduledEmailRecipientDisplayName, getScheduledEmailRecipientEmail, getScheduledEmailRecipientUniqueIdentifier, splitScheduledEmailRecipients, uniqueScheduledEmailRecipients, } from "../../utils/scheduledMailRecipients.js";
import { messages } from "../../../../../locales.js";
const MAXIMUM_RECIPIENTS_RECEIVE = 60;
const DELAY_TIME = 500;
const PADDING = 16;
const REMOVE_ICON_WIDTH = 21;
const LOADING_MENU_HEIGHT = 50;
const CREATE_OPTION = "create-option";
const SELECT_OPTION = "select-option";
const { Menu, Input } = ReactSelectComponents;
const bubbleAlignPoints = [{ align: "cr cl" }];
export class RecipientsSelectRenderer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.recipientRef = React.createRef();
        this.renderEmptyContainer = () => {
            return null;
        };
        this.renderNoOptionsContainer = (commonProps) => {
            const { selectProps: { inputValue }, } = commonProps;
            if (inputValue) {
                return (React.createElement(Message, { className: "gd-recipient-existed s-gd-recipient-existed", type: "warning", contrast: true },
                    React.createElement(FormattedMessage, { id: "options.menu.schedule.email.recipient.warning.existed" })));
            }
            return this.renderEmptyContainer();
        };
        this.renderMenuOptions = (menuProps) => {
            const { isLoading, author } = this.props;
            const { options, getValue, selectProps: { inputValue }, } = menuProps;
            const selectedValues = getValue() || [];
            const selectedItemsCount = selectedValues.length;
            const areAllValuesSelected = options.length &&
                options.every((option) => (isScheduleEmailExistingRecipient(option) && isEqual(option, author)) ||
                    this.isRecipientAdded(selectedValues, getScheduledEmailRecipientEmail(option)));
            if (isLoading) {
                return this.renderLoadingIcon(menuProps);
            }
            if (!inputValue && (selectedItemsCount >= MAXIMUM_RECIPIENTS_RECEIVE || areAllValuesSelected)) {
                return this.renderEmptyContainer();
            }
            return this.renderMenuOptionsContainer(menuProps);
        };
        this.renderMenuOptionsContainer = (menuProps) => {
            return (React.createElement(Menu, Object.assign({ className: "s-gd-recipients-menu-container" }, menuProps), menuProps.children));
        };
        this.renderLoadingIcon = (menuProps) => {
            return (React.createElement(Menu, Object.assign({ className: "s-gd-recipients-menu-container" }, menuProps),
                React.createElement(LoadingMask, { height: LOADING_MENU_HEIGHT })));
        };
        this.renderOwnerValueContainer = (name, email) => {
            const { isMulti } = this.props;
            const selectTypeClassName = isMulti ? "multiple-value" : "single-value";
            // when editing schedule created by another user, the owner should be rendered as email address
            const value = this.currentUserIsAuthor() ? name : email;
            return (React.createElement("div", { style: this.getStyle(), className: `gd-recipient-value-item s-gd-recipient-value-item ${selectTypeClassName} gd-owner-user` },
                React.createElement("div", { className: "gd-recipient-label" }, value)));
        };
        this.renderMultiValueItemContainer = (label, removeIcon) => {
            return (React.createElement("div", { className: "gd-recipient-value-item s-gd-recipient-value-item multiple-value" },
                React.createElement("div", { style: this.getStyle(), className: "gd-recipient-label" }, label),
                React.createElement("div", { "aria-label": "remove-icon", className: "s-gd-recipient-remove" }, removeIcon)));
        };
        this.renderErrorValueContainer = (label, removeIcon, bubbleMessageTranslationId) => {
            return (React.createElement("div", { className: "gd-recipient-value-item s-gd-recipient-value-item multiple-value not-valid" },
                React.createElement(BubbleHoverTrigger, { className: "gd-recipient-not-valid-bubble", showDelay: 0, hideDelay: 0 },
                    React.createElement("div", { className: "recipient-item-not-valid" },
                        React.createElement("div", { style: this.getStyle(), className: "gd-recipient-label" }, label),
                        React.createElement("div", { className: "s-gd-recipient-remove" }, removeIcon)),
                    React.createElement(Bubble, { className: "bubble-negative s-gd-recipient-not-valid-email", alignPoints: bubbleAlignPoints },
                        React.createElement(FormattedMessage, { id: bubbleMessageTranslationId })))));
        };
        this.renderSingleValueContainer = (singleValueProps) => {
            const { data } = singleValueProps;
            const displayName = getScheduledEmailRecipientDisplayName(data);
            const email = getScheduledEmailRecipientEmail(data);
            return this.renderOwnerValueContainer(displayName, email);
        };
        this.renderMultiValueContainer = (multiValueProps) => {
            const { data, children } = multiValueProps;
            // MultiValueRemove component from react-select
            const removeIcon = children[1];
            if (isScheduleEmailExistingRecipient(data) && isEqual(data, this.props.author)) {
                const displayName = getScheduledEmailRecipientDisplayName(data);
                const email = getScheduledEmailRecipientEmail(data);
                return this.renderOwnerValueContainer(displayName, email);
            }
            const email = getScheduledEmailRecipientEmail(data);
            if (!isEmail(email)) {
                return this.renderErrorValueContainer(email, removeIcon, messages.scheduleEmailOptionRecepientInvalid.id);
            }
            // don't allow adding external recipients to schedules created by somebody else than the current user
            if (!this.currentUserIsAuthor() &&
                isScheduleEmailExternalRecipient(data) &&
                !this.isOriginalExternalRecipient(data)) {
                return this.renderErrorValueContainer(email, removeIcon, messages.scheduleEmailOptionRecepientExternalNotAllowed.id);
            }
            return this.renderMultiValueItemContainer(email, removeIcon);
        };
        this.renderOptionLabel = (recipient) => {
            const email = getScheduledEmailRecipientEmail(recipient);
            const isExternalUser = isScheduleEmailExternalRecipient(recipient);
            const isExternalUserMatchingExistingEmail = isExternalUser &&
                this.props.options.some((option) => getScheduledEmailRecipientEmail(option) === email);
            // When we are typing in react-select, it creates a new option on the background (check this.getNewOptionData)
            // To avoid displaying duplicities in the options, do not render external user option,
            // when it matches existing user email.
            if (isExternalUserMatchingExistingEmail) {
                return null;
            }
            if (isEmail(email) && isExternalUser) {
                if (this.currentUserIsAuthor()) {
                    // Render warning message, when it's an external recipient
                    return (React.createElement("div", { className: "s-gd-recipient-option-item s-recipient-not-in-workspace-warning" },
                        React.createElement(Message, { type: "warning", contrast: true },
                            React.createElement(FormattedMessage, { id: "options.menu.schedule.email.recipient.warning.belong.workspace" }))));
                }
                else {
                    // Render warning message, when it's an external recipient and the current user is not the author
                    // Other users cannot add external recipients
                    return (React.createElement("div", { className: "s-gd-recipient-option-item s-external-recipient-not-allowed" },
                        React.createElement(Message, { type: "error", contrast: true },
                            React.createElement(FormattedMessage, { id: "options.menu.schedule.email.recipient.external.not.allowed" }))));
                }
            }
            return (React.createElement("div", { className: "gd-recipient-option-item s-gd-recipient-option-item" },
                React.createElement("span", { className: "gd-recipient-option-label-item s-gd-recipient-option-label-item" }, email),
                this.renderRecipientValue(recipient)));
        };
        this.getNewOptionData = (inputValue) => ({
            email: inputValue,
        });
        this.renderRecipientValue = (recipient) => {
            const isExternalUser = isScheduleEmailExternalRecipient(recipient);
            const email = getScheduledEmailRecipientEmail(recipient);
            if (!isExternalUser && isEmail(email)) {
                return (React.createElement("span", { className: "gd-recipient-option-value-item s-gd-recipient-option-value-item" }, getScheduledEmailRecipientDisplayName(recipient)));
            }
            return this.renderEmptyContainer();
        };
        this.renderInputContainer = (inputProps) => {
            const { isMulti } = this.props;
            if (!isMulti) {
                return this.renderEmptyContainer();
            }
            return (React.createElement("div", { className: "gd-recipient-input s-gd-recipient-input" },
                React.createElement(Input, Object.assign({}, inputProps))));
        };
        this.handleOnChange = (selectedValues, actionTypes) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const splittedSelectedValues = splitScheduledEmailRecipients(selectedValues);
            const newSelectedValues = uniqueScheduledEmailRecipients(splittedSelectedValues);
            const { value, allowEmptySelection } = this.props;
            const { action } = actionTypes;
            if (value.length >= MAXIMUM_RECIPIENTS_RECEIVE &&
                (action === CREATE_OPTION || action === SELECT_OPTION)) {
                (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
                return;
            }
            if (newSelectedValues === null) {
                if (allowEmptySelection) {
                    (_d = (_c = this.props).onChange) === null || _d === void 0 ? void 0 : _d.call(_c, []);
                }
                else {
                    (_f = (_e = this.props).onChange) === null || _f === void 0 ? void 0 : _f.call(_e, [value[0]]);
                }
                return;
            }
            (_h = (_g = this.props).onChange) === null || _h === void 0 ? void 0 : _h.call(_g, newSelectedValues);
        };
        this.loadUserListItems = (searchString) => {
            const { options, value, canListUsersInProject, onLoad } = this.props;
            const matchedUserList = this.getMatchedRecipientEmails(options, searchString);
            const matchedUserListCount = matchedUserList.length;
            const isRecipientAdded = this.isRecipientAdded(value, searchString);
            if (!canListUsersInProject || isRecipientAdded || matchedUserListCount > 0) {
                return;
            }
            this.setState({ isLoading: true });
            onLoad === null || onLoad === void 0 ? void 0 : onLoad({ search: searchString });
        };
        this.onMenuOpen = () => {
            const { onLoad, canListUsersInProject, options } = this.props;
            const userListCount = options.length;
            if (!userListCount && canListUsersInProject) {
                onLoad === null || onLoad === void 0 ? void 0 : onLoad();
            }
        };
        this.onSearchCore = (searchString) => {
            this.loadUserListItems(searchString);
        };
        this.onSearch = debounce(this.onSearchCore, DELAY_TIME);
        this.isRecipientAdded = (value, searchKey) => {
            return value.some((recipient) => isEqual(getScheduledEmailRecipientUniqueIdentifier(recipient), searchKey));
        };
    }
    componentDidMount() {
        const { current } = this.recipientRef;
        if (!current) {
            return;
        }
        // update owner component style after recipient rendered
        const ownerContainer = current.querySelector(".gd-owner-user");
        const style = this.getStyle();
        if (ownerContainer && style) {
            ownerContainer.setAttribute("style", `max-width: ${style.maxWidth}px`);
        }
    }
    render() {
        const { isMulti, options, value } = this.props;
        const creatableSelectComponent = Object.assign(Object.assign({}, ReactSelectComponents), { IndicatorsContainer: this.renderEmptyContainer, Input: this.renderInputContainer, MultiValueContainer: this.renderMultiValueContainer, Menu: this.renderMenuOptions, Placeholder: this.renderEmptyContainer, SingleValue: this.renderSingleValueContainer, NoOptionsMessage: this.renderNoOptionsContainer });
        return (React.createElement("div", { className: "gd-input-component gd-recipients-field s-gd-schedule-email-dialog-recipients" },
            React.createElement("label", { className: "gd-label" },
                React.createElement(FormattedMessage, { id: "dialogs.schedule.email.to.label" })),
            React.createElement("div", { ref: this.recipientRef, className: "gd-input s-gd-recipients-value" },
                React.createElement(CreatableSelect, { className: "gd-recipients-container", classNamePrefix: "gd-recipients", components: creatableSelectComponent, getNewOptionData: this.getNewOptionData, formatOptionLabel: this.renderOptionLabel, isClearable: false, isDisabled: !isMulti, isMulti: isMulti, onChange: 
                    // using as any as it would be too tricky to type properly
                    this.handleOnChange, onInputChange: this.onSearch, onMenuOpen: this.onMenuOpen, options: options, value: value, getOptionValue: getScheduledEmailRecipientUniqueIdentifier, getOptionLabel: getScheduledEmailRecipientEmail }))));
    }
    getStyle() {
        const { current } = this.recipientRef;
        const { width } = (!isEmpty(current) && current.getBoundingClientRect()) || { width: undefined };
        return {
            maxWidth: width
                ? width - PADDING - REMOVE_ICON_WIDTH // label item width equal value item container - padding - remove icon
                : "100%",
        };
    }
    currentUserIsAuthor() {
        const { currentUser, author } = this.props;
        return isScheduleEmailExistingRecipient(author) && areObjRefsEqual(author.user.ref, currentUser.ref);
    }
    isOriginalExternalRecipient(recipient) {
        return this.props.originalValue.some((option) => {
            return isScheduleEmailExternalRecipient(option) && option.email === recipient.email;
        });
    }
    getMatchedRecipientEmails(options, searchKey) {
        return searchKey
            ? options.filter((recipient) => includes(getScheduledEmailRecipientEmail(recipient), searchKey))
            : [];
    }
}
//# sourceMappingURL=RecipientsSelectRenderer.js.map