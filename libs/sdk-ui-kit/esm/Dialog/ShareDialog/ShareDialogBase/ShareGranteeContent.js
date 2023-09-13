// (C) 2021-2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { Typography } from "../../../Typography/index.js";
import { AddUserOrGroupButton } from "./AddGranteeButton.js";
import { GranteeList } from "./GranteeList.js";
import { GranteeListLoading } from "./GranteeListLoading.js";
/**
 * @internal
 */
export const ShareGranteeContent = (props) => {
    const { isLoading, grantees, areGranularPermissionsSupported, currentUserPermissions, isSharedObjectLocked, onAddGrantee, onChange, onDelete, } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "gd-share-dialog-grantee-content-header" },
            React.createElement(Typography, { tagName: "h3" },
                React.createElement(FormattedMessage, { id: "shareDialog.share.grantee.list.title" })),
            React.createElement(AddUserOrGroupButton, { onClick: onAddGrantee, isDisabled: isLoading })),
        isLoading ? (React.createElement(GranteeListLoading, null)) : (React.createElement(GranteeList, { currentUserPermissions: currentUserPermissions, isSharedObjectLocked: isSharedObjectLocked, grantees: grantees, mode: "ShareGrantee", areGranularPermissionsSupported: areGranularPermissionsSupported, onChange: onChange, onDelete: onDelete }))));
};
//# sourceMappingURL=ShareGranteeContent.js.map