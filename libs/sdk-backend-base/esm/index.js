// (C) 2019-2022 GoodData Corporation
/**
 * This package provides foundational reusable code useful for building new or decorating existing Analytical Backend implementations.
 *
 * @remarks
 * The package includes several composable backend decorators and metadata object builders.
 * You can use them to either build your own Analytical Backend implementation or enhance existing
 * implementations (by adding caching, for example).
 *
 * @packageDocumentation
 */
export { dummyBackend, dummyBackendEmptyData, dummyDataView, } from "./dummyBackend/index.js";
export { decoratedBackend, } from "./decoratedBackend/index.js";
export { DecoratedExecutionFactory, DecoratedPreparedExecution, DecoratedExecutionResult, } from "./decoratedBackend/execution.js";
export { DecoratedWorkspaceDashboardsService } from "./decoratedBackend/dashboards.js";
export { DecoratedWorkspaceCatalogFactory, DecoratedWorkspaceCatalog, } from "./decoratedBackend/catalog.js";
export { DecoratedSecuritySettingsService } from "./decoratedBackend/securitySettings.js";
export { DecoratedWorkspaceSettingsService } from "./decoratedBackend/workspaceSettings.js";
export { withEventing } from "./eventingBackend/index.js";
export { withCaching, RecommendedCachingConfiguration, } from "./cachingBackend/index.js";
export { withCustomWorkspaceSettings, } from "./workspaceSettingsBackend/index.js";
export { withNormalization, } from "./normalizingBackend/index.js";
export { Normalizer, Denormalizer, } from "./normalizingBackend/normalizer.js";
export { AuthProviderCallGuard, NoopAuthProvider, AnonymousAuthProvider, } from "./toolkit/auth.js";
export { AbstractExecutionFactory, ExecutionFactoryWithFixedFilters, ExecutionFactoryUpgradingToExecByReference, } from "./toolkit/execution.js";
export { InMemoryPaging, ServerPaging } from "./toolkit/paging.js";
export { validatePluginUrlIsSane } from "./toolkit/pluginUrlValidation.js";
export { customBackend } from "./customBackend/index.js";
export { Builder, builderFactory, resolveValueOrUpdateCallback, } from "./ldmFactories/builder.js";
export { InsightWidgetBuilder, newInsightWidget, } from "./ldmFactories/dashboard/insightWidgetFactory.js";
export { KpiWidgetBuilder, newKpiWidget, } from "./ldmFactories/dashboard/kpiWidgetFactory.js";
export { WidgetBaseBuilder } from "./ldmFactories/dashboard/widgetFactory.js";
export { CatalogAttributeBuilder, newCatalogAttribute } from "./ldmFactories/catalog/attributeFactory.js";
export { CatalogDateAttributeBuilder, CatalogDateDatasetBuilder, newCatalogDateAttribute, newCatalogDateDataset, } from "./ldmFactories/catalog/dateDatasetFactory.js";
export { CatalogFactBuilder, newCatalogFact } from "./ldmFactories/catalog/factFactory.js";
export { CatalogGroupBuilder, GroupableCatalogItemBuilder, newCatalogGroup, } from "./ldmFactories/catalog/groupFactory.js";
export { CatalogMeasureBuilder, newCatalogMeasure } from "./ldmFactories/catalog/measureFactory.js";
export { AttributeMetadataObjectBuilder, newAttributeMetadataObject, } from "./ldmFactories/metadata/attributeFactory.js";
export { DataSetMetadataObjectBuilder, newDataSetMetadataObject, } from "./ldmFactories/metadata/dataSetFactory.js";
export { AttributeDisplayFormMetadataObjectBuilder, newAttributeDisplayFormMetadataObject, } from "./ldmFactories/metadata/displayFormFactory.js";
export { MetadataObjectBuilder } from "./ldmFactories/metadata/factory.js";
export { newFactMetadataObject, FactMetadataObjectBuilder } from "./ldmFactories/metadata/factFactory.js";
export { MeasureMetadataObjectBuilder, newMeasureMetadataObject, } from "./ldmFactories/metadata/measureFactory.js";
export { newVariableMetadataObject, VariableMetadataObjectBuilder, } from "./ldmFactories/metadata/variableFactory.js";
export { newDashboardMetadataObject, DashboardMetadataObjectBuilder, } from "./ldmFactories/metadata/dashboardFactory.js";
export { transformResultHeaders } from "./convertors/fromBackend/afm/result.js";
//# sourceMappingURL=index.js.map