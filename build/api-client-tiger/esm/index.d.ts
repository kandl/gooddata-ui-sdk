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
import { ITigerClient } from "./client.js";
import { newAxios, setAxiosAuthorizationToken, setGlobalAuthorizationToken } from "./axios.js";
export { VisualizationObjectModelV1, VisualizationObjectModelV2, AnalyticalDashboardModelV1, AnalyticalDashboardModelV2, isAttributeHeader, isAfmObjectIdentifier, isResultAttributeHeader, isResultMeasureHeader, isResultTotalHeader, isVisualizationObjectsItem, isFilterContextData, isDashboardPluginsItem, } from "./gd-tiger-model/index.js";
export { newAxios, setAxiosAuthorizationToken, setGlobalAuthorizationToken };
export { AFM, AfmIdentifier, AfmLocalIdentifier, AfmObjectIdentifierAttributeIdentifier, AfmObjectIdentifierAttributeIdentifierTypeEnum, AfmObjectIdentifierCore, AfmObjectIdentifierCoreIdentifier, AfmObjectIdentifierCoreIdentifierTypeEnum, AfmObjectIdentifierDataset, AfmObjectIdentifierDatasetIdentifier, AfmObjectIdentifierDatasetIdentifierTypeEnum, AfmObjectIdentifierIdentifier, AfmObjectIdentifierIdentifierTypeEnum, AfmObjectIdentifierLabel, AfmObjectIdentifierAttribute, AfmObjectIdentifierLabelIdentifier, AfmObjectIdentifierLabelIdentifierTypeEnum, AbsoluteDateFilter, AbsoluteDateFilterAbsoluteDateFilter, AbstractMeasureValueFilter, AfmExecution, AfmExecutionResponse, AfmObjectIdentifier, AfmValidObjectsQuery, AfmValidObjectsQueryTypesEnum, AfmValidObjectsResponse, ArithmeticMeasureDefinition, ArithmeticMeasureDefinitionArithmeticMeasure, ArithmeticMeasureDefinitionArithmeticMeasureOperatorEnum, AttributeExecutionResultHeader, AttributeFilter, AttributeFilterElements, AttributeHeaderOut, AttributeHeaderOutAttributeHeader, AttributeHeaderOutAttributeHeaderGranularityEnum, AttributeItem, AttributeResultHeader, ComparisonMeasureValueFilter, ComparisonMeasureValueFilterComparisonMeasureValueFilter, ComparisonMeasureValueFilterComparisonMeasureValueFilterOperatorEnum, DataColumnLocator, DataColumnLocators, DateFilter, Dimension, DimensionHeader, Element, ElementsRequest, FilterBy, FilterByLabelTypeEnum, ElementsRequestSortOrderEnum, ElementsResponse, ExecutionLinks, ExecutionResponse, ExecutionResult, ExecutionResultGrandTotal, ExecutionResultHeader, ExecutionResultPaging, ExecutionSettings, FilterDefinition, FilterDefinitionForSimpleMeasure, HeaderGroup, InlineFilterDefinition, InlineFilterDefinitionInline, InlineMeasureDefinition, InlineMeasureDefinitionInline, MeasureDefinition, MeasureExecutionResultHeader, MeasureGroupHeaders, MeasureHeaderOut, MeasureItem, MeasureResultHeader, MeasureValueFilter, NegativeAttributeFilter, NegativeAttributeFilterNegativeAttributeFilter, Paging, PopDataset, PopMeasureDefinition, PopDatasetMeasureDefinition, PopDatasetMeasureDefinitionPreviousPeriodMeasure, PopDate, PopDateMeasureDefinition, PopDateMeasureDefinitionOverPeriodMeasure, PositiveAttributeFilter, PositiveAttributeFilterPositiveAttributeFilter, RangeMeasureValueFilter, RangeMeasureValueFilterRangeMeasureValueFilter, RangeMeasureValueFilterRangeMeasureValueFilterOperatorEnum, RankingFilter, RankingFilterRankingFilter, RankingFilterRankingFilterOperatorEnum, RelativeDateFilter, RelativeDateFilterRelativeDateFilter, RelativeDateFilterRelativeDateFilterGranularityEnum, ResultCacheMetadata, ResultDimension, ResultDimensionHeader, ResultSpec, SimpleMeasureDefinition, SimpleMeasureDefinitionMeasure, SimpleMeasureDefinitionMeasureAggregationEnum, SortKey, SortKeyAttribute, SortKeyAttributeAttribute, SortKeyTotal, SortKeyTotalTotal, SortKeyTotalTotalDirectionEnum, SortKeyValue, SortKeyValueValue, SortKeyValueValueDirectionEnum, SortKeyAttributeAttributeDirectionEnum, SortKeyAttributeAttributeSortTypeEnum, TotalExecutionResultHeader, TotalResultHeader, ActionsApiAxiosParamCreator as AfmActionsApiAxiosParamCreator, ActionsApiFp as AfmActionsApiFp, ActionsApiFactory as AfmActionsApiFactory, ActionsApiInterface as AfmActionsApiInterface, ActionsApi as AfmActionsApi, ActionsApiComputeLabelElementsPostRequest, ActionsApiComputeReportRequest, ActionsApiComputeValidObjectsRequest, ActionsApiExplainAFMRequest, ActionsApiRetrieveResultRequest, ActionsApiRetrieveExecutionMetadataRequest, RestApiIdentifier, Total, TotalDimension, TotalFunctionEnum, AttributeFormat, ElementsResponseGranularityEnum, ActionsApiComputeValidDescendantsRequest, AfmValidDescendantsQuery, AfmValidDescendantsResponse, } from "./generated/afm-rest-api/api.js";
export { ActionsApiFactory as AuthActionsApiFactory, ActionsApiInterface as AuthActionsApiInterface, ActionsApiProcessInvitationRequest, Invitation, } from "./generated/auth-json-api/api.js";
export { Configuration, ConfigurationParameters } from "./generated/auth-json-api/configuration.js";
export * from "./generated/metadata-json-api/api.js";
export { ActionsApiCreatePdfExportRequest, ActionsApiGetExportedFileRequest, ActionsApiGetMetadataRequest, ExportResponse, TabularExportRequestFormatEnum, Settings, CustomOverride, CustomLabel, CustomMetric, PdfExportRequest, } from "./generated/export-json-api/api.js";
export { ActionsApiGetDataSourceSchemataRequest, ActionsApiScanDataSourceRequest, ActionsApiTestDataSourceDefinitionRequest, ActionsApiTestDataSourceRequest, DataSourceSchemata, DeclarativeColumn as ScanModelDeclarativeColumn, DeclarativeColumnDataTypeEnum as ScanModelDeclarativeColumnDataTypeEnum, DeclarativeTable as ScanModelDeclarativeTable, DeclarativeTables as ScanModelDeclarativeTables, ScanRequest, ScanResultPdm, TableWarning, TestDefinitionRequest, TestDefinitionRequestTypeEnum, TestQueryDuration, TestResponse, ColumnWarning, DataSourceParameter, TestRequest, ScanSqlResponse, ActionsApiScanSqlRequest, SqlColumnDataTypeEnum as ScanApiSqlColumnDataTypeEnum, SqlColumn as ScanApiSqlColumn, ScanSqlRequest, } from "./generated/scan-json-api/api.js";
export * from "./client.js";
export { jsonApiHeaders, JSON_API_HEADER_VALUE, ValidateRelationsHeader } from "./constants.js";
export { MetadataUtilities, MetadataGetEntitiesResult, MetadataGetEntitiesFn, MetadataGetEntitiesOptions, MetadataGetEntitiesParams, MetadataGetEntitiesThemeParams, MetadataGetEntitiesColorPaletteParams, MetadataGetEntitiesWorkspaceParams, MetadataGetEntitiesUserParams, } from "./metadataUtilities.js";
export { OrganizationUtilities, OrganizationGetEntitiesResult, OrganizationGetEntitiesSupportingIncludedResult, OrganizationGetEntitiesFn, OrganizationGetEntitiesParams, } from "./organizationUtilities.js";
declare const defaultTigerClient: ITigerClient;
export default defaultTigerClient;
//# sourceMappingURL=index.d.ts.map