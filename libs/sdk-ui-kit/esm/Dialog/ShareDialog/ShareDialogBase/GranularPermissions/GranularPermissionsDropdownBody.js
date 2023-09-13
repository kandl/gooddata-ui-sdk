// (C) 2022-2023 GoodData Corporation
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { GranularPermissionSelectItemWithBubble } from "./GranularPermissionItem.js";
import { ItemsWrapper, Separator } from "../../../../List/index.js";
import { Overlay } from "../../../../Overlay/index.js";
import { withBubble } from "../../../../Bubble/index.js";
import { granularPermissionMessageLabels } from "../../../../locales.js";
import { useShareDialogInteraction } from "../ComponentInteractionContext.js";
const overlayAlignPoints = [{ align: "br tr" }];
const RemoveItem = ({ disabled, tooltipId, onClick, }) => {
    const className = cx("gd-list-item gd-menu-item", "s-granular-permission-remove", {
        "is-disabled": disabled,
    });
    const FormattedMessageWithBubble = withBubble(FormattedMessage);
    return (React.createElement("div", { className: className, onClick: onClick },
        React.createElement(FormattedMessageWithBubble, { id: granularPermissionMessageLabels.remove.id, showBubble: disabled, bubbleTextId: tooltipId })));
};
export const GranularPermissionsDropdownBody = ({ grantee, granteePossibilities, alignTo, isShowDropdown, selectedPermission, toggleDropdown, onChange, onDelete, handleSetSelectedPermission, mode, }) => {
    const { permissionsChangeInteraction, permissionsRemoveInteraction } = useShareDialogInteraction();
    const handleOnDelete = useCallback(() => {
        if (granteePossibilities.remove.enabled) {
            const changedGrantee = Object.assign(Object.assign({}, grantee), { permissions: [], inheritedPermissions: [] });
            onDelete(changedGrantee);
            permissionsRemoveInteraction(grantee, mode === "ShareGrantee", granteePossibilities.assign.effective);
            toggleDropdown();
        }
    }, [grantee, onDelete, toggleDropdown, mode, granteePossibilities, permissionsRemoveInteraction]);
    const handleOnChange = useCallback((changedGrantee) => {
        permissionsChangeInteraction(grantee, mode === "ShareGrantee", granteePossibilities.assign.effective, changedGrantee.permissions[0]);
        onChange(changedGrantee);
    }, [grantee, onChange, mode, granteePossibilities, permissionsChangeInteraction]);
    if (!isShowDropdown) {
        return null;
    }
    return (React.createElement(Overlay, { key: "GranularPermissionsSelect", alignTo: `.${alignTo}`, alignPoints: overlayAlignPoints, className: "s-granular-permissions-overlay", closeOnMouseDrag: true, closeOnOutsideClick: true, closeOnParentScroll: true, onClose: toggleDropdown },
        React.createElement(ItemsWrapper, { smallItemsSpacing: true },
            granteePossibilities.assign.items.map((permissionItem) => {
                return (!permissionItem.hidden && (React.createElement(GranularPermissionSelectItemWithBubble, { grantee: grantee, key: permissionItem.id, permission: permissionItem, selectedPermission: selectedPermission, toggleDropdown: toggleDropdown, onChange: handleOnChange, handleSetSelectedPermission: handleSetSelectedPermission, bubbleTextId: permissionItem.tooltip, showBubble: !permissionItem.enabled })));
            }),
            React.createElement(Separator, null),
            React.createElement(RemoveItem, { disabled: !granteePossibilities.remove.enabled, onClick: handleOnDelete, tooltipId: granteePossibilities.remove.tooltip }))));
};
//# sourceMappingURL=GranularPermissionsDropdownBody.js.map