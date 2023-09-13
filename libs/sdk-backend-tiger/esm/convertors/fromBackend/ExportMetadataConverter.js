// (C) 2023 GoodData Corporation
export const convertExportMetadata = (exportMetadata) => {
    return {
        filters: exportMetadata === null || exportMetadata === void 0 ? void 0 : exportMetadata.filters,
    };
};
//# sourceMappingURL=ExportMetadataConverter.js.map