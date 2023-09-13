// (C) 2021-2023 GoodData Corporation
import React, { useMemo } from "react";
import { serializeObjRef } from "@gooddata/sdk-model";
import { GranteeItemComponent } from "./GranteeItem.js";
import { GranteeListEmpty } from "./GranteeListEmpty.js";
import { useIntl } from "react-intl";
import { sortGranteeList } from "./utils.js";
/**
 * @internal
 */
export const GranteeList = (props) => {
    const { grantees, mode, areGranularPermissionsSupported, currentUserPermissions, isSharedObjectLocked, onDelete, onChange, } = props;
    const intl = useIntl();
    const sortedGrantees = useMemo(() => {
        return sortGranteeList(grantees, intl);
    }, [grantees, intl]);
    if (grantees.length === 0) {
        return React.createElement(GranteeListEmpty, null);
    }
    return (React.createElement("div", { className: "gd-share-dialog-grantee-list" }, sortedGrantees.map((grantee) => {
        return (React.createElement(GranteeItemComponent, { currentUserPermissions: currentUserPermissions, isSharedObjectLocked: isSharedObjectLocked, key: serializeObjRef(grantee.id), grantee: grantee, mode: mode, areGranularPermissionsSupported: areGranularPermissionsSupported, onDelete: onDelete, onChange: onChange }));
    })));
};
//# sourceMappingURL=GranteeList.js.map