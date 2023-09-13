// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { GranteeGroupIcon } from "../GranteeIcons.js";
import { getGranteeItemTestId, getGranteeLabel } from "../utils.js";
import { GranularPermissionsDropdownWithBubble } from "./GranularPermissionsDropdown.js";
import { usePermissionsDropdownState } from "./usePermissionsDropdownState.js";
import { getGranteePossibilities } from "./permissionsLogic.js";
import { useShareDialogInteraction } from "../ComponentInteractionContext.js";
export const GranularGranteeGroupItem = (props) => {
    const { grantee, currentUserPermissions, isSharedObjectLocked, onChange, onDelete, mode } = props;
    const { isDropdownOpen, toggleDropdown } = usePermissionsDropdownState();
    const { permissionsDropdownOpenInteraction } = useShareDialogInteraction();
    const intl = useIntl();
    const itemClassName = cx("s-share-dialog-grantee-item", "gd-share-dialog-grantee-item", getGranteeItemTestId(grantee), {
        "is-active": isDropdownOpen,
    });
    const label = useMemo(() => getGranteeLabel(grantee, intl), [grantee, intl]);
    const granteePossibilities = useMemo(() => getGranteePossibilities(grantee, currentUserPermissions, isSharedObjectLocked), [grantee, currentUserPermissions, isSharedObjectLocked]);
    const handleToggleDropdown = useCallback(() => {
        toggleDropdown();
        if (!isDropdownOpen) {
            permissionsDropdownOpenInteraction(grantee, mode === "ShareGrantee", granteePossibilities.assign.effective);
        }
    }, [
        toggleDropdown,
        isDropdownOpen,
        grantee,
        mode,
        permissionsDropdownOpenInteraction,
        granteePossibilities,
    ]);
    return (React.createElement("div", { className: itemClassName },
        React.createElement(GranularPermissionsDropdownWithBubble, { grantee: grantee, granteePossibilities: granteePossibilities, isDropdownOpen: isDropdownOpen, toggleDropdown: handleToggleDropdown, onChange: onChange, onDelete: onDelete, isDropdownDisabled: !granteePossibilities.change.enabled, bubbleTextId: granteePossibilities.change.tooltip, className: "gd-grantee-granular-permission", triggerClassName: "gd-grantee-granular-permission-bubble-trigger", mode: mode }),
        React.createElement("div", { className: "gd-grantee-content" },
            React.createElement("div", { className: "gd-grantee-content-label" }, label)),
        React.createElement(GranteeGroupIcon, null)));
};
//# sourceMappingURL=GranularGranteeGroupItem.js.map