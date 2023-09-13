const SupportedCatalogGranularity = [
    "GDC.time.day_in_week",
    "GDC.time.day_in_month",
    "GDC.time.day_in_quarter",
    "GDC.time.day_in_year",
    "GDC.time.week_in_quarter",
    "GDC.time.week_in_year",
    "GDC.time.month_in_quarter",
    "GDC.time.month_in_year",
    "GDC.time.quarter_in_year",
];
export function loadCatalog(ctx) {
    const { backend, workspace } = ctx;
    const options = {
        excludeTags: [],
        includeTags: [],
        types: ["attribute", "fact", "measure", "dateDataset", "attributeHierarchy"],
        includeDateGranularities: SupportedCatalogGranularity,
        loadGroups: false,
    };
    return backend.workspace(workspace).catalog().withOptions(options).load();
}
//# sourceMappingURL=loadCatalog.js.map