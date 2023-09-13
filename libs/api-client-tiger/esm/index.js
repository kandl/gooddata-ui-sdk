// (C) 2019-2023 GoodData Corporation
/**
 * This package provides low-level functions for communication with GoodData Cloud and GoodData.CN.
 *
 * @remarks
 * The package is used by `@gooddata/sdk-backend-tiger`, which you should use instead of directly using
 * `@gooddata/api-client-tiger` whenever possible.
 * For the similar package for the GoodData platform, see `@gooddata/api-client-bear`.
 *
 * @packageDocumentation
 */
import { tigerClientFactory } from "./client.js";
import { axios as defaultAxios, newAxios, setAxiosAuthorizationToken, setGlobalAuthorizationToken, } from "./axios.js";
export { VisualizationObjectModelV1, VisualizationObjectModelV2, AnalyticalDashboardModelV1, AnalyticalDashboardModelV2, isAttributeHeader, isAfmObjectIdentifier, isResultAttributeHeader, isResultMeasureHeader, isResultTotalHeader, isVisualizationObjectsItem, isFilterContextData, isDashboardPluginsItem, } from "./gd-tiger-model/index.js";
export { newAxios, setAxiosAuthorizationToken, setGlobalAuthorizationToken };
export { AfmObjectIdentifierAttributeIdentifierTypeEnum, AfmObjectIdentifierCoreIdentifierTypeEnum, AfmObjectIdentifierDatasetIdentifierTypeEnum, AfmObjectIdentifierIdentifierTypeEnum, AfmObjectIdentifierLabelIdentifierTypeEnum, AfmValidObjectsQueryTypesEnum, ArithmeticMeasureDefinitionArithmeticMeasureOperatorEnum, AttributeHeaderOutAttributeHeaderGranularityEnum, ComparisonMeasureValueFilterComparisonMeasureValueFilterOperatorEnum, FilterByLabelTypeEnum, ElementsRequestSortOrderEnum, RangeMeasureValueFilterRangeMeasureValueFilterOperatorEnum, RankingFilterRankingFilterOperatorEnum, RelativeDateFilterRelativeDateFilterGranularityEnum, SimpleMeasureDefinitionMeasureAggregationEnum, SortKeyTotalTotalDirectionEnum, SortKeyValueValueDirectionEnum, SortKeyAttributeAttributeDirectionEnum, SortKeyAttributeAttributeSortTypeEnum, ActionsApiAxiosParamCreator as AfmActionsApiAxiosParamCreator, ActionsApiFp as AfmActionsApiFp, ActionsApiFactory as AfmActionsApiFactory, ActionsApi as AfmActionsApi, TotalFunctionEnum, ElementsResponseGranularityEnum, } from "./generated/afm-rest-api/api.js";
export { ActionsApiFactory as AuthActionsApiFactory, } from "./generated/auth-json-api/api.js";
export { Configuration } from "./generated/auth-json-api/configuration.js";
export * from "./generated/metadata-json-api/api.js";
export { TabularExportRequestFormatEnum, } from "./generated/export-json-api/api.js";
export { DeclarativeColumnDataTypeEnum as ScanModelDeclarativeColumnDataTypeEnum, TestDefinitionRequestTypeEnum, SqlColumnDataTypeEnum as ScanApiSqlColumnDataTypeEnum, } from "./generated/scan-json-api/api.js";
export * from "./client.js";
export { jsonApiHeaders, JSON_API_HEADER_VALUE, ValidateRelationsHeader } from "./constants.js";
export { MetadataUtilities, } from "./metadataUtilities.js";
export { OrganizationUtilities, } from "./organizationUtilities.js";
const defaultTigerClient = tigerClientFactory(defaultAxios);
export default defaultTigerClient;
//# sourceMappingURL=index.js.map