// (C) 2021-2023 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button } from "../../../Button/index.js";
import { ConfirmDialogBase } from "../../ConfirmDialogBase.js";
import { AddGranteeContent } from "./AddGranteeContent.js";
import { ContentDivider } from "./ContentDivider.js";
const BackButton = (props) => {
    const { onClick: onBackClick } = props;
    return (React.createElement(Button, { value: "", className: "gd-button-primary gd-button-icon-only gd-icon-navigateleft gd-share-dialog-header-back-button s-share-dialog-navigate-back", onClick: onBackClick }));
};
/**
 * @internal
 */
export const AddGranteeBase = (props) => {
    const { appliedGrantees, addedGrantees, currentUser, isDirty, currentUserPermissions, sharedObject, onCancel, onSubmit, onBackClick, onAddUserOrGroups, onDelete, onGranularGranteeChange, } = props;
    const intl = useIntl();
    const { isLocked: isSharedObjectLocked, ref: sharedObjectRef, areGranularPermissionsSupported, } = sharedObject;
    const backButtonRenderer = useCallback(() => {
        return React.createElement(BackButton, { onClick: onBackClick });
    }, [onBackClick]);
    return (React.createElement(ConfirmDialogBase, { className: "gd-share-dialog gd-share-dialog-add-users s-gd-share-add-grantees", displayCloseButton: true, isPositive: true, isSubmitDisabled: !isDirty, headline: intl.formatMessage({ id: "shareDialog.share.grantee.add.info" }), cancelButtonText: intl.formatMessage({ id: "cancel" }), submitButtonText: intl.formatMessage({ id: "shareDialog.share.grantee.share" }), onCancel: onBackClick, onSubmit: onSubmit, onClose: onCancel, headerLeftButtonRenderer: backButtonRenderer },
        React.createElement(AddGranteeContent, { currentUserPermissions: currentUserPermissions, isSharedObjectLocked: isSharedObjectLocked, currentUser: currentUser, addedGrantees: addedGrantees, appliedGrantees: appliedGrantees, areGranularPermissionsSupported: areGranularPermissionsSupported, sharedObjectRef: sharedObjectRef, onAddUserOrGroups: onAddUserOrGroups, onDelete: onDelete, onGranularGranteeChange: onGranularGranteeChange }),
        React.createElement(ContentDivider, null)));
};
//# sourceMappingURL=AddGranteeBase.js.map