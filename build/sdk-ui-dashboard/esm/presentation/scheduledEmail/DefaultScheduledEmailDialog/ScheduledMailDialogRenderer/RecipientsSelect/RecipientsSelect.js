// (C) 2019-2020 GoodData Corporation
/* eslint-disable import/named,import/namespace */
import React, { useMemo, useState } from "react";
import sortBy from "lodash/sortBy.js";
import { useWorkspaceUsers } from "../../useWorkspaceUsers.js";
import { RecipientsSelectRenderer } from "./RecipientsSelectRenderer.js";
export const RecipientsSelect = (props) => {
    const { backend, workspace, author, currentUser, value, originalValue, onChange, onError, canListUsersInProject, enableKPIDashboardScheduleRecipients, allowEmptySelection, } = props;
    const [search, setSearch] = useState();
    const { result, status } = useWorkspaceUsers({ backend, workspace, search, onError });
    const options = useMemo(() => { var _a; return sortBy((_a = result === null || result === void 0 ? void 0 : result.map((user) => ({ user }))) !== null && _a !== void 0 ? _a : [], "user.email"); }, [result]);
    return (React.createElement(RecipientsSelectRenderer, { canListUsersInProject: canListUsersInProject, isMulti: enableKPIDashboardScheduleRecipients, options: options, value: value, originalValue: originalValue, onChange: onChange, author: author, currentUser: currentUser, onLoad: (queryOptions) => {
            setSearch(queryOptions === null || queryOptions === void 0 ? void 0 : queryOptions.search);
        }, isLoading: status === "loading" || status === "pending", allowEmptySelection: allowEmptySelection }));
};
//# sourceMappingURL=RecipientsSelect.js.map