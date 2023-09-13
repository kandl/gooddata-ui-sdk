// (C) 2021-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import cx from "classnames";
import { isGranteeUser, isGranteeGroup, isGranteeGroupAll, isGranularGranteeUser, isGranularGranteeGroup, } from "./types.js";
import { getGranteeLabel, getGranteeItemTestId } from "./utils.js";
import { GranteeGroupIcon, GranteeOwnerRemoveIcon, GranteeRemoveIcon, GranteeUserIcon, GranteeUserInactiveIcon, } from "./GranteeIcons.js";
import { Button } from "../../../Button/index.js";
import { GranularGranteeUserItem } from "./GranularPermissions/GranularGranteeUserItem.js";
import { GranularGranteeGroupItem } from "./GranularPermissions/GranularGranteeGroupItem.js";
import { invariant } from "ts-invariant";
const granteeUserTitleRenderer = (grantee, intl) => {
    const userName = getGranteeLabel(grantee, intl);
    if (grantee.status === "Inactive") {
        const inactiveLabel = ` (${intl.formatMessage({
            id: "shareDialog.share.grantee.item.user.inactive",
        })})`;
        return (React.createElement(React.Fragment, null,
            userName,
            React.createElement("span", { className: "gd-grantee-content-label-inactive" }, inactiveLabel)));
    }
    return React.createElement(React.Fragment, null,
        " ",
        userName,
        " ");
};
const GranteeUserItem = (props) => {
    const { grantee, mode, onDelete } = props;
    const intl = useIntl();
    const onClick = useCallback(() => {
        onDelete(grantee);
    }, [grantee, onDelete]);
    const itemClassName = cx({ "s-share-dialog-owner": grantee.isOwner, "s-share-dialog-current-user": grantee.isCurrentUser }, "gd-share-dialog-grantee-item", getGranteeItemTestId(grantee));
    return (React.createElement("div", { className: itemClassName },
        grantee.isOwner ? (React.createElement(GranteeOwnerRemoveIcon, null)) : (React.createElement(GranteeRemoveIcon, { mode: mode, onClick: onClick })),
        React.createElement("div", { className: "gd-grantee-content" },
            React.createElement("div", { className: "gd-grantee-content-label" }, granteeUserTitleRenderer(grantee, intl)),
            React.createElement("div", { className: "gd-grantee-content-label gd-grantee-content-email" }, grantee.email)),
        grantee.status === "Active" ? React.createElement(GranteeUserIcon, null) : React.createElement(GranteeUserInactiveIcon, null)));
};
const GranteeUserInactiveItem = (props) => {
    const { grantee } = props;
    const intl = useIntl();
    const granteeLabel = useMemo(() => {
        return getGranteeLabel(grantee, intl);
    }, [grantee, intl]);
    const itemClassName = cx("gd-share-dialog-grantee-item", "s-share-dialog-inactive-owner", getGranteeItemTestId(grantee));
    return (React.createElement("div", { className: itemClassName },
        React.createElement(GranteeOwnerRemoveIcon, null),
        React.createElement("div", { className: "gd-grantee-content" },
            React.createElement("div", { className: "gd-grantee-content-label-inactive" }, granteeLabel),
            React.createElement("div", { className: "gd-grantee-content-label-inactive gd-grantee-content-inactive" },
                React.createElement(FormattedMessage, { id: "shareDialog.share.grantee.item.user.inactive.description" }))),
        React.createElement(GranteeUserInactiveIcon, null)));
};
const GranteeGroupItem = (props) => {
    const { grantee, onDelete, mode } = props;
    const intl = useIntl();
    const onClick = useCallback(() => {
        onDelete(grantee);
    }, [grantee, onDelete]);
    const groupName = useMemo(() => getGranteeLabel(grantee, intl), [grantee, intl]);
    const numOfUsers = useMemo(() => {
        if (grantee.memberCount) {
            return intl.formatMessage({
                id: "shareDialog.share.grantee.item.users.count",
            }, { granteeCount: grantee.memberCount });
        }
    }, [grantee, intl]);
    const itemClassName = cx("gd-share-dialog-grantee-item", getGranteeItemTestId(grantee));
    return (React.createElement("div", { className: itemClassName },
        React.createElement(GranteeRemoveIcon, { mode: mode, onClick: onClick }),
        React.createElement("div", { className: "gd-grantee-content" },
            React.createElement("div", { className: "gd-grantee-content-label" }, groupName),
            numOfUsers ? (React.createElement("div", { className: "gd-grantee-count-button" },
                React.createElement(Button, { className: "gd-button-link-dimmed gd-button gd-grantee-content-user-count s-grantee-content-user-count", value: numOfUsers }))) : null),
        React.createElement(GranteeGroupIcon, null)));
};
/**
 * @internal
 */
export const GranteeItemComponent = (props) => {
    const { grantee, mode, currentUserPermissions, isSharedObjectLocked, onDelete, onChange } = props;
    if (isGranularGranteeUser(grantee)) {
        return (React.createElement(GranularGranteeUserItem, { currentUserPermissions: currentUserPermissions, isSharedObjectLocked: isSharedObjectLocked, grantee: grantee, onChange: onChange, onDelete: onDelete, mode: mode }));
    }
    else if (isGranularGranteeGroup(grantee)) {
        return (React.createElement(GranularGranteeGroupItem, { currentUserPermissions: currentUserPermissions, isSharedObjectLocked: isSharedObjectLocked, grantee: grantee, onChange: onChange, onDelete: onDelete, mode: mode }));
    }
    else if (isGranteeUser(grantee)) {
        return React.createElement(GranteeUserItem, { grantee: grantee, mode: mode, onDelete: onDelete });
    }
    else if (grantee.type === "inactive_owner") {
        return React.createElement(GranteeUserInactiveItem, { grantee: grantee });
    }
    else if (isGranteeGroup(grantee) || isGranteeGroupAll(grantee)) {
        return React.createElement(GranteeGroupItem, { grantee: grantee, mode: mode, onDelete: onDelete });
    }
    else {
        invariant(grantee, "Illegal grantee used.");
    }
};
//# sourceMappingURL=GranteeItem.js.map