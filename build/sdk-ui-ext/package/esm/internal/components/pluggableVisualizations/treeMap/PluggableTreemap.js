// (C) 2019-2022 GoodData Corporation
import React from "react";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import set from "lodash/set";
import tail from "lodash/tail";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { BUCKETS, DATE, ATTRIBUTE } from "../../../constants/bucket";
import { TREEMAP_SUPPORTED_PROPERTIES } from "../../../constants/supportedProperties";
import { getTreemapUiConfig } from "../../../constants/uiConfig";
import { configureOverTimeComparison, configurePercent } from "../../../utils/bucketConfig";
import { getAttributeItemsWithoutStacks, getMeasureItems, getStackItems, isDateBucketItem, limitNumberOfMeasuresInBuckets, removeAllArithmeticMeasuresFromDerived, removeAllDerivedMeasures, sanitizeFilters, } from "../../../utils/bucketHelper";
import { getReferencePointWithSupportedProperties } from "../../../utils/propertiesHelper";
import { removeSort } from "../../../utils/sort";
import { setTreemapUiConfig } from "../../../utils/uiConfigHelpers/treemapUiConfigHelper";
import TreeMapConfigurationPanel from "../../configurationPanels/TreeMapConfigurationPanel";
import { PluggableBaseChart } from "../baseChart/PluggableBaseChart";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown, reverseAndTrimIntersection, } from "../drillDownUtil";
/**
 * PluggableTreemap
 *
 * ## Buckets
 *
 * | Name      | Id       | Accepts             |
 * |-----------|----------|---------------------|
 * | Measures  | measures | measures only       |
 * | ViewBy    | view     | attributes or dates |
 * | SegmentBy | segment  | attributes or dates |
 *
 * ### Bucket axioms
 *
 * - |Measures| ≥ 1
 * - |ViewBy| ≥ 1 ⇒ |Measures| ≤ 1
 * - |ViewBy| = 0 ⇒ |Measures| ≤ 20
 * - |Measures| ≥ 1 ⇒ |ViewBy| = 0
 * - |Measures| ≤ 1 ⇒ |ViewBy| ≤ 1
 * - |SegmentBy| ≤ 1
 *
 * ## Dimensions
 *
 * The PluggableTreemap always creates two dimensional execution.
 *
 * - |ViewBy| + |SegmentBy| = 1 ⇒ [[MeasureGroupIdentifier], [...ViewBy, ...SegmentBy]]
 * - |ViewBy| + |SegmentBy| != 1 ⇒ [[...ViewBy, ...SegmentBy], [MeasureGroupIdentifier]]
 *
 * ## Sorts
 *
 * Unless the user specifies otherwise, the sorts used by default are:
 *
 * - |ViewBy| ≥ 1 ∧ |SegmentBy| ≥ 1 ⇒ [attributeSort(ViewBy[0]), measureSort(...Measures)]
 */
export class PluggableTreemap extends PluggableBaseChart {
    constructor(props) {
        super(props);
        this.type = VisualizationTypes.TREEMAP;
        this.supportedPropertiesList = TREEMAP_SUPPORTED_PROPERTIES;
        this.initializeProperties(props.visualizationProperties);
    }
    getBucketItemsWithMultipleDates(newReferencePoint) {
        var _a;
        const buckets = (_a = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        let measures = getMeasureItems(buckets);
        let stacks = getStackItems(buckets, [ATTRIBUTE, DATE]);
        const nonStackAttributes = getAttributeItemsWithoutStacks(buckets, [ATTRIBUTE, DATE]);
        const view = nonStackAttributes.slice(0, 1);
        if (nonStackAttributes.length > 0) {
            measures = getMeasureItems(limitNumberOfMeasuresInBuckets(buckets, 1));
        }
        if (nonStackAttributes.length > 1 && isEmpty(stacks)) {
            // first attribute is taken, find next available and put to stacks
            const attributesWithoutFirst = tail(nonStackAttributes);
            stacks = attributesWithoutFirst.slice(0, 1);
        }
        return { measures, view, stacks };
    }
    getBucketItems(newReferencePoint) {
        var _a;
        const buckets = (_a = newReferencePoint === null || newReferencePoint === void 0 ? void 0 : newReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        let measures = getMeasureItems(buckets);
        let stacks = getStackItems(buckets);
        const nonStackAttributes = getAttributeItemsWithoutStacks(buckets);
        const view = nonStackAttributes.slice(0, 1);
        if (nonStackAttributes.length > 0) {
            measures = getMeasureItems(limitNumberOfMeasuresInBuckets(buckets, 1));
        }
        if (nonStackAttributes.length > 1 && isEmpty(stacks)) {
            // first attribute is taken, find next available non-date attribute
            const attributesWithoutFirst = tail(nonStackAttributes);
            const nonDate = attributesWithoutFirst.filter((attribute) => !isDateBucketItem(attribute));
            stacks = nonDate.slice(0, 1);
        }
        return { measures, view, stacks };
    }
    configureBuckets(newReferencePoint) {
        const { measures, view, stacks } = this.isMultipleDatesEnabled()
            ? this.getBucketItemsWithMultipleDates(newReferencePoint)
            : this.getBucketItems(newReferencePoint);
        set(newReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: view,
            },
            {
                localIdentifier: BucketNames.SEGMENT,
                items: stacks,
            },
        ]);
    }
    getTreemapUIConfig(referencePoint) {
        const buckets = referencePoint === null || referencePoint === void 0 ? void 0 : referencePoint.buckets;
        const allowsMultipleDates = this.isMultipleDatesEnabled();
        const nonStackAttributes = allowsMultipleDates
            ? getAttributeItemsWithoutStacks(buckets, [ATTRIBUTE, DATE])
            : getAttributeItemsWithoutStacks(buckets);
        const measures = getMeasureItems(buckets);
        return getTreemapUiConfig(allowsMultipleDates, nonStackAttributes.length > 0, measures.length > 1);
    }
    getExtendedReferencePoint(referencePoint) {
        const clonedReferencePoint = cloneDeep(referencePoint);
        let newReferencePoint = Object.assign(Object.assign({}, clonedReferencePoint), { uiConfig: this.getTreemapUIConfig(referencePoint) });
        newReferencePoint = removeAllArithmeticMeasuresFromDerived(newReferencePoint);
        newReferencePoint = removeAllDerivedMeasures(newReferencePoint);
        this.configureBuckets(newReferencePoint);
        newReferencePoint = setTreemapUiConfig(newReferencePoint, this.intl, this.type);
        newReferencePoint = configurePercent(newReferencePoint, false);
        newReferencePoint = configureOverTimeComparison(newReferencePoint, !!this.featureFlags["enableWeekFilters"]);
        newReferencePoint = getReferencePointWithSupportedProperties(newReferencePoint, this.supportedPropertiesList);
        newReferencePoint = removeSort(newReferencePoint);
        return Promise.resolve(sanitizeFilters(newReferencePoint));
    }
    addFilters(source, drillConfig, event, backendSupportsElementUris) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
    getInsightWithDrillDownApplied(source, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFilters(source, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    renderConfigurationPanel(insight) {
        const configPanelElement = this.getConfigPanelElement();
        if (configPanelElement) {
            this.renderFun(React.createElement(TreeMapConfigurationPanel, { locale: this.locale, references: this.references, properties: this.visualizationProperties, propertiesMeta: this.propertiesMeta, insight: insight, colors: this.colors, pushData: this.handlePushData, type: this.type, isError: this.getIsError(), isLoading: this.isLoading, featureFlags: this.featureFlags }), configPanelElement);
        }
    }
}
//# sourceMappingURL=PluggableTreemap.js.map