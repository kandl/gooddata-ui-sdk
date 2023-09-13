// (C) 2021-2022 GoodData Corporation
/**
 * This function convert IDashboard into IListedDashboard
 * @internal
 */
export const createListedDashboard = (dashboard) => {
    const { created, description, identifier, ref, title, updated, uri, tags, shareStatus, isLocked } = dashboard;
    return {
        created,
        description,
        identifier,
        ref,
        title,
        updated,
        uri,
        tags,
        shareStatus,
        isLocked,
        availability: "full",
    };
};
//# sourceMappingURL=listedDashboardUtils.js.map