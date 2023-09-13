// (C) 2019-2023 GoodData Corporation
/**
 * This package provides domain models for GoodData.UI.
 *
 * @remarks
 * These domain models are backend-agnostic. This makes them reusable across different Analytical Backend implementations.
 * The package includes TypeScript type definitions, factory functions, functions to get or set certain
 * properties of the objects in an immutable way, and more.
 * These are used in both the `@gooddata/sdk-backend-*` and `@gooddata/sdk-ui*` packages.
 *
 * @packageDocumentation
 */
export { DateGranularity } from "./base/dateGranularities.js";
export { isAttribute, attributeLocalId, anyAttribute, idMatchAttribute, attributesFind, attributeUri, attributeIdentifier, attributeAlias, attributeShowAllValues, attributeDisplayFormRef, } from "./execution/attribute/index.js";
export { newAttribute, modifyAttribute, AttributeBuilder, } from "./execution/attribute/factory.js";
export { isUriRef, isIdentifierRef, objRefToString, isLocalIdRef, areObjRefsEqual, isObjRef, serializeObjRef, deserializeObjRef, } from "./objRef/index.js";
export { isDimension, dimensionTotals, newTwoDimensional, newDimension, MeasureGroupIdentifier, dimensionSetTotals, dimensionsFindItem, isMeasureGroupIdentifier, } from "./execution/base/dimension.js";
export { idRef, uriRef, localIdRef } from "./objRef/factory.js";
export { isTotal, newTotal, totalIsNative } from "./execution/base/totals.js";
export { isMeasureLocator, isAttributeLocator, isTotalLocator, isMeasureSort, isAttributeSort, isAttributeAreaSort, isAttributeValueSort, newMeasureSort, newMeasureSortFromLocators, newAttributeSort, newAttributeAreaSort, newAttributeLocator, sortEntityIds, sortDirection, sortMeasureLocators, attributeLocatorElement, attributeLocatorIdentifier, measureLocatorIdentifier, } from "./execution/base/sort.js";
export { isRankingFilter, isAbsoluteDateFilter, isRelativeDateFilter, isAllTimeDateFilter, attributeElementsIsEmpty, attributeElementsCount, updateAttributeElementsItems, getAttributeElementsItems, isPositiveAttributeFilter, isNegativeAttributeFilter, isDateFilter, isMeasureValueFilter, isAttributeFilter, isAttributeElementsByRef, isAttributeElementsByValue, isComparisonCondition, isComparisonConditionOperator, isFilter, isRangeCondition, isRangeConditionOperator, filterIsEmpty, filterAttributeElements, filterMeasureRef, filterObjRef, absoluteDateFilterValues, relativeDateFilterValues, measureValueFilterCondition, measureValueFilterMeasure, measureValueFilterOperator, } from "./execution/filter/index.js";
export { newAbsoluteDateFilter, newNegativeAttributeFilter, newPositiveAttributeFilter, newRelativeDateFilter, newAllTimeFilter, newMeasureValueFilter, newRankingFilter, } from "./execution/filter/factory.js";
export { mergeFilters } from "./execution/filter/filterMerge.js";
export { isMeasure, isSimpleMeasure, isInlineMeasure, isAdhocMeasure, isPoPMeasure, isPreviousPeriodMeasure, isArithmeticMeasure, isVirtualArithmeticMeasure, isMeasureDefinition, isPoPMeasureDefinition, isPreviousPeriodMeasureDefinition, isArithmeticMeasureDefinition, isVirtualArithmeticMeasureDefinition, isInlineMeasureDefinition, measureLocalId, anyMeasure, idMatchMeasure, measureDoesComputeRatio, measureItem, measureUri, measureIdentifier, measureMasterIdentifier, measureArithmeticOperands, measureAlias, measureTitle, measureArithmeticOperator, measureFormat, isMeasureFormatInPercent, measureAggregation, measureFilters, measurePopAttribute, measurePreviousPeriodDateDataSets, } from "./execution/measure/index.js";
export { ArithmeticMeasureBuilder, VirtualArithmeticMeasureBuilder, MeasureBuilder, PoPMeasureBuilder, PreviousPeriodMeasureBuilder, InlineMeasureBuilder, MeasureBuilderBase, newMeasure, modifyMeasure, modifySimpleMeasure, modifyPopMeasure, modifyPreviousPeriodMeasure, modifyInlineMeasure, newArithmeticMeasure, newVirtualArithmeticMeasure, newPopMeasure, newPreviousPeriodMeasure, newInlineMeasure, } from "./execution/measure/factory.js";
export { isBucket, idMatchBucket, anyBucket, newBucket, bucketIsEmpty, bucketAttributes, bucketAttribute, bucketAttributeIndex, bucketMeasure, bucketMeasureIndex, bucketMeasures, bucketTotals, bucketSetTotals, bucketItems, applyRatioRule, ComputeRatioRule, disableComputeRatio, bucketModifyItems, bucketItemReduce, } from "./execution/buckets/index.js";
export { bucketsFind, bucketsMeasures, bucketsIsEmpty, bucketsAttributes, bucketsFindMeasure, bucketsById, bucketsFindAttribute, bucketsItems, bucketsTotals, bucketsModifyItem, bucketsReduceItem, } from "./execution/buckets/bucketArray.js";
export { bucketItemLocalId } from "./execution/buckets/bucketItem.js";
export { defWithFilters, defFingerprint, defSetDimensions, defSetSorts, defTotals, defSetExecConfig, defSetPostProcessing, } from "./execution/executionDefinition/index.js";
export { newDefForItems, newDefForBuckets, newDefForInsight, defWithDimensions, defWithSorting, defWithPostProcessing, defWithDateFormat, defWithExecConfig, defaultDimensionsGenerator, emptyDef, } from "./execution/executionDefinition/factory.js";
export { isColorFromPalette, isRgbColor, isColorPaletteItem, colorPaletteItemToRgb, colorPaletteToColors, } from "./colors/index.js";
export { isInsight, isColorMappingItem, insightRef, insightId, insightItems, insightMeasures, insightHasMeasures, insightAttributes, insightHasAttributes, insightHasDataDefined, insightProperties, insightBuckets, insightSorts, insightBucket, insightTags, insightSummary, insightTitle, insightUri, insightIsLocked, insightCreated, insightCreatedBy, insightUpdated, insightUpdatedBy, insightTotals, insightFilters, insightVisualizationUrl, insightVisualizationType, insightSetFilters, insightSetBuckets, insightSetProperties, insightSetSorts, insightModifyItems, insightReduceItems, insightDisplayFormUsage, visClassUrl, visClassId, visClassUri, } from "./insight/index.js";
export { insightCreatedComparator, insightCreatedByComparator, insightTitleComparator, insightUpdatedComparator, insightUpdatedByComparator, } from "./insight/comparators.js";
export { newInsightDefinition, InsightDefinitionBuilder } from "./insight/factory.js";
export { insightSanitize, sanitizeBucketTotals } from "./insight/sanitization.js";
export { factoryNotationFor } from "./execution/objectFactoryNotation/index.js";
export { isAbsoluteDateFilterForm, isAbsoluteDateFilterPreset, isAllTimeDateFilterOption, isDateFilterGranularity, isRelativeDateFilterForm, isRelativeDateFilterPreset, } from "./dateFilterConfig/index.js";
export { dashboardFilterReferenceObjRef, isAllTimeDashboardDateFilter, isDashboardAttributeFilter, isSingleSelectionFilter, isNegativeAttributeFilter as isNegativeDashboardAttributeFilter, getSelectedElementsCount, isDashboardAttributeFilterReference, isDashboardDateFilter, isRelativeDashboardDateFilter, isAbsoluteDashboardDateFilter, isDashboardDateFilterReference, isFilterContext, isFilterContextDefinition, isTempFilterContext, newAbsoluteDashboardDateFilter, newAllTimeDashboardDateFilter, newRelativeDashboardDateFilter, } from "./dashboard/filterContext.js";
export { isWidgetAlert, isWidgetAlertDefinition, } from "./dashboard/alert.js";
export { isDrillFromAttribute, isDrillFromMeasure, isDrillToAttributeUrl, isDrillToCustomUrl, isDrillToDashboard, isDrillToInsight, isDrillToLegacyDashboard, } from "./dashboard/drill.js";
export { BuiltInWidgetTypes, } from "./dashboard/baseWidget.js";
export { isKpiWithComparison, isKpiWithoutComparison, isKpi, } from "./dashboard/kpi.js";
export { isCatalogAttribute, isCatalogAttributeHierarchy, isCatalogFact, isCatalogMeasure, isCatalogDateDataset, catalogItemMetadataObject, } from "./ldm/catalog/index.js";
export { isAttributeDisplayFormMetadataObject, isAttributeMetadataObject, isDataSetMetadataObject, isVariableMetadataObject, isFactMetadataObject, isMeasureMetadataObject, isMeasureMetadataObjectDefinition, isMetadataObject, metadataObjectId, isDashboardMetadataObject, attributeDisplayFormMetadataObjectAttributeRef, attributeDisplayFormMetadataObjectRef, attributeDisplayFormMetadataObjectTitle, isAttributeHierarchyMetadataObject, } from "./ldm/metadata/index.js";
export { isWidget, isWidgetDefinition, widgetUri, widgetId, widgetRef, widgetTitle, widgetType, isKpiWidgetDefinition, isKpiWidget, isInsightWidgetDefinition, isInsightWidget, } from "./dashboard/widget.js";
export { isDashboardAttachment, isWidgetAttachment, } from "./dashboard/scheduledMail.js";
export { userFullName } from "./user/index.js";
export { isDashboardLayout, isDashboardLayoutSection, isDashboardLayoutItem, isDashboardWidget, } from "./dashboard/layout.js";
export { isDashboard, isDashboardDefinition, } from "./dashboard/dashboard.js";
export { isColorDescriptor, isAttributeDescriptor, isMeasureGroupDescriptor, isTotalDescriptor, isMeasureDescriptor, isResultAttributeHeader, isResultMeasureHeader, isResultTotalHeader, resultHeaderName, attributeDescriptorLocalId, attributeDescriptorName, } from "./execution/results/index.js";
export { isUserAccess, isUserAccessGrantee, isUserGroupAccess, isUserGroupAccessGrantee, isGranularAccess, isAvailableUserGroupAccessGrantee, isAvailableUserAccessGrantee, isGranularAccessGrantee, isGranularUserAccessGrantee, isGranularUserGroupAccessGrantee, isGranularUserAccess, isGranularUserGroupAccess, } from "./accessControl/index.js";
//# sourceMappingURL=index.js.map