// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";
import { withBubble } from "../../../../Bubble/index.js";
import { granularPermissionMessageLabels } from "../../../../locales.js";
const GranularPermissionSelectItem = ({ permission, grantee, selectedPermission, toggleDropdown, handleSetSelectedPermission, onChange, }) => {
    const intl = useIntl();
    const handleOnChange = useCallback((permission) => {
        toggleDropdown();
        if (permission.id !== selectedPermission) {
            handleSetSelectedPermission(permission.id);
            onChange(Object.assign(Object.assign({}, grantee), { permissions: [permission.id] }));
        }
    }, [grantee, toggleDropdown, handleSetSelectedPermission, onChange, selectedPermission]);
    const isSelected = useMemo(() => permission.id === selectedPermission, [permission, selectedPermission]);
    return (React.createElement("div", { onClick: () => {
            if (permission.enabled) {
                handleOnChange(permission);
            }
        }, className: cx("gd-list-item", "gd-menu-item", "gd-granular-permission-select-item", "s-granular-permission-item", {
            "is-disabled": !permission.enabled,
            "is-selected": isSelected,
        }) },
        React.createElement("div", null, intl.formatMessage(granularPermissionMessageLabels[permission.id]))));
};
export const GranularPermissionSelectItemWithBubble = withBubble(GranularPermissionSelectItem);
//# sourceMappingURL=GranularPermissionItem.js.map