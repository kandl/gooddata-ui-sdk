// (C) 2021-2023 GoodData Corporation
import { getGranteeLabel, GranteeGroupAll, hasGroupAll, sortGranteesByName } from "../utils.js";
import { mapWorkspaceUserGroupToGrantee, mapWorkspaceUserToGrantee } from "../../shareDialogMappers.js";
import { isAvailableUserGroupAccessGrantee, isAvailableUserAccessGrantee, } from "@gooddata/sdk-model";
const createErrorOption = (intl) => {
    return [
        {
            isDisabled: true,
            type: "error",
            label: intl.formatMessage({
                id: "shareDialog.share.grantee.add.search.error.message",
            }),
        },
    ];
};
const matchAllGroupQueryString = (query, allGroupLabel) => {
    return allGroupLabel.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
};
/**
 * @internal
 */
export const loadGranteeOptionsPromise = (currentUser, sharedObjectRef, appliedGrantees, backend, workspace, intl, onGranteesLoaded) => async (inputValue) => {
    try {
        const availableGrantees = await backend
            .workspace(workspace)
            .accessControl()
            .getAvailableGrantees(sharedObjectRef, inputValue);
        const mappedUsers = availableGrantees
            .filter(isAvailableUserAccessGrantee)
            .map((availableGrantee) => mapWorkspaceUserToGrantee(availableGrantee, currentUser))
            .sort(sortGranteesByName(intl))
            .map((user) => {
            return {
                label: getGranteeLabel(user, intl),
                value: user,
            };
        });
        let mappedGroups = availableGrantees
            .filter(isAvailableUserGroupAccessGrantee)
            .map((availableGrantee) => mapWorkspaceUserGroupToGrantee(availableGrantee))
            .sort(sortGranteesByName(intl))
            .map((group) => {
            return {
                label: getGranteeLabel(group, intl),
                value: group,
            };
        });
        const allGroupLabel = getGranteeLabel(GranteeGroupAll, intl);
        const supportsEveryoneUserGroupForAccessControl = backend.capabilities.supportsEveryoneUserGroupForAccessControl;
        if (!hasGroupAll(appliedGrantees) &&
            matchAllGroupQueryString(inputValue, allGroupLabel) &&
            supportsEveryoneUserGroupForAccessControl) {
            const groupAllOption = {
                label: allGroupLabel,
                value: GranteeGroupAll,
            };
            mappedGroups = [groupAllOption, ...mappedGroups];
        }
        onGranteesLoaded([...mappedUsers, ...mappedGroups].length);
        return [
            {
                label: intl.formatMessage({ id: "shareDialog.share.grantee.add.label.group" }),
                options: mappedGroups,
            },
            {
                label: intl.formatMessage({ id: "shareDialog.share.grantee.add.label.user" }),
                options: mappedUsers,
            },
        ];
    }
    catch (_a) {
        return createErrorOption(intl);
    }
};
//# sourceMappingURL=loadGranteeOptionsPromise.js.map