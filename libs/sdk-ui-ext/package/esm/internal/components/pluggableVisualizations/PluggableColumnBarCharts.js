// (C) 2019-2022 GoodData Corporation
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { bucketIsEmpty, bucketsItems, insightBucket, insightBuckets, } from "@gooddata/sdk-model";
import { arrayUtils } from "@gooddata/util";
import { BucketNames, getIntersectionPartAfter, } from "@gooddata/sdk-ui";
import { AXIS } from "../../constants/axis";
import { ATTRIBUTE, BUCKETS, DATE } from "../../constants/bucket";
import { COLUMN_BAR_CHART_UICONFIG, COLUMN_BAR_CHART_UICONFIG_WITH_MULTIPLE_DATES, MAX_CATEGORIES_COUNT, MAX_STACKS_COUNT, } from "../../constants/uiConfig";
import { drillDownFromAttributeLocalId } from "../../utils/ImplicitDrillDownHelper";
import { getAllCategoriesAttributeItems, getDateItems, getFilteredMeasuresForStackedCharts, getMainDateItem, getStackItems, removeDivergentDateItems, isDateBucketItem, isNotDateBucketItem, hasSameDateDimension, } from "../../utils/bucketHelper";
import { getReferencePointWithSupportedProperties, isStackingMeasure, isStackingToPercent, removeImmutableOptionalStackingProperties, setSecondaryMeasures, getReferencePointWithTotalLabelsInitialized, } from "../../utils/propertiesHelper";
import { setColumnBarChartUiConfig } from "../../utils/uiConfigHelpers/columnBarChartUiConfigHelper";
import { PluggableBaseChart } from "./baseChart/PluggableBaseChart";
import { addIntersectionFiltersToInsight, modifyBucketsAttributesForDrillDown } from "./drillDownUtil";
export class PluggableColumnBarCharts extends PluggableBaseChart {
    constructor(props) {
        super(props);
        // set default to DUAL to get the full supported props list
        // and will be updated in getExtendedReferencePoint
        this.axis = AXIS.DUAL;
        this.supportedPropertiesList = this.getSupportedPropertiesList();
    }
    getUiConfig() {
        const config = this.isMultipleDatesEnabled()
            ? COLUMN_BAR_CHART_UICONFIG_WITH_MULTIPLE_DATES
            : COLUMN_BAR_CHART_UICONFIG;
        return cloneDeep(config);
    }
    getExtendedReferencePoint(referencePoint) {
        // reset the list to retrieve full 'referencePoint.properties.controls'
        this.supportedPropertiesList = this.getSupportedPropertiesList();
        return super.getExtendedReferencePoint(referencePoint).then((ext) => {
            var _a, _b;
            let newExt = setSecondaryMeasures(ext, this.secondaryAxis);
            this.axis = (_b = (_a = newExt === null || newExt === void 0 ? void 0 : newExt.uiConfig) === null || _a === void 0 ? void 0 : _a.axis) !== null && _b !== void 0 ? _b : AXIS.PRIMARY;
            // filter out unnecessary stacking props for some specific cases such as one measure or empty stackBy
            this.supportedPropertiesList = removeImmutableOptionalStackingProperties(newExt, this.getSupportedPropertiesList());
            newExt = getReferencePointWithSupportedProperties(newExt, this.supportedPropertiesList);
            if (this.featureFlags.enableSeparateTotalLabels) {
                newExt = getReferencePointWithTotalLabelsInitialized(newExt);
            }
            return setColumnBarChartUiConfig(newExt, this.intl);
        });
    }
    isOpenAsReportSupported() {
        return (super.isOpenAsReportSupported() &&
            !haveManyViewItems(this.currentInsight) &&
            !isStackingMeasure(this.visualizationProperties) &&
            !isStackingToPercent(this.visualizationProperties));
    }
    adjustIntersectionForColumnBar(source, event) {
        const stackBucket = insightBucket(source, BucketNames.STACK);
        const hasStackByAttributes = stackBucket && !bucketIsEmpty(stackBucket);
        const intersection = event.drillContext.intersection;
        return hasStackByAttributes ? arrayUtils.shiftArrayRight(intersection) : intersection;
    }
    addFiltersForColumnBar(source, drillConfig, event, backendSupportsElementUris) {
        const clicked = drillDownFromAttributeLocalId(drillConfig);
        const reorderedIntersection = this.adjustIntersectionForColumnBar(source, event);
        const cutIntersection = getIntersectionPartAfter(reorderedIntersection, clicked);
        return addIntersectionFiltersToInsight(source, cutIntersection, backendSupportsElementUris);
    }
    getInsightWithDrillDownApplied(source, drillDownContext, backendSupportsElementUris) {
        const withFilters = this.addFiltersForColumnBar(source, drillDownContext.drillDefinition, drillDownContext.event, backendSupportsElementUris);
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }
    configureBuckets(extendedReferencePoint) {
        var _a, _b, _c, _d, _e;
        if (this.isMultipleDatesEnabled()) {
            this.configureBucketsWithMultipleDates(extendedReferencePoint);
            return;
        }
        const buckets = (_a = extendedReferencePoint === null || extendedReferencePoint === void 0 ? void 0 : extendedReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const measures = getFilteredMeasuresForStackedCharts(buckets);
        const dateItems = getDateItems(buckets);
        const mainDateItem = getMainDateItem(dateItems);
        const categoriesCount = (_e = (_d = (_c = (_b = extendedReferencePoint.uiConfig) === null || _b === void 0 ? void 0 : _b.buckets) === null || _c === void 0 ? void 0 : _c[BucketNames.VIEW]) === null || _d === void 0 ? void 0 : _d.itemsLimit) !== null && _e !== void 0 ? _e : MAX_CATEGORIES_COUNT;
        const allAttributesWithoutStacks = getAllCategoriesAttributeItems(buckets);
        const allAttributesWithoutStacksWithDatesHandled = removeDivergentDateItems(allAttributesWithoutStacks, mainDateItem);
        let views = allAttributesWithoutStacksWithDatesHandled.slice(0, categoriesCount);
        const hasDateItemInViewByBucket = views.some(isDateBucketItem);
        let stackItemIndex = categoriesCount;
        let stacks = getStackItems(buckets);
        if (dateItems.length && !hasDateItemInViewByBucket) {
            const extraViewItems = allAttributesWithoutStacksWithDatesHandled.slice(0, categoriesCount - 1);
            views = [mainDateItem, ...extraViewItems];
            stackItemIndex = categoriesCount - 1;
        }
        const hasSomeRemainingAttributes = allAttributesWithoutStacksWithDatesHandled.length > stackItemIndex;
        if (!stacks.length && measures.length <= 1 && hasSomeRemainingAttributes) {
            stacks = allAttributesWithoutStacksWithDatesHandled
                .slice(stackItemIndex, allAttributesWithoutStacksWithDatesHandled.length)
                .filter(isNotDateBucketItem)
                .slice(0, MAX_STACKS_COUNT);
        }
        set(extendedReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: views,
            },
            {
                localIdentifier: BucketNames.STACK,
                items: stacks,
            },
        ]);
    }
    configureBucketsWithMultipleDates(extendedReferencePoint) {
        const { measures, views, stacks } = this.getMeasuresViewStackBucketItems(extendedReferencePoint);
        set(extendedReferencePoint, BUCKETS, [
            {
                localIdentifier: BucketNames.MEASURES,
                items: measures,
            },
            {
                localIdentifier: BucketNames.VIEW,
                items: views,
            },
            {
                localIdentifier: BucketNames.STACK,
                items: stacks,
            },
        ]);
    }
    canPutAttributeToViewBy(currentAttribute, firstAttribute, viewByCount, viewByMaxItemCount) {
        const isFirstAttributeDate = isDateBucketItem(firstAttribute);
        const isCurrentAttributeDate = isDateBucketItem(currentAttribute);
        const sameDateDimension = hasSameDateDimension(firstAttribute, currentAttribute);
        return ((!isFirstAttributeDate || !isCurrentAttributeDate || sameDateDimension) &&
            viewByCount < viewByMaxItemCount);
    }
    getMeasuresViewStackBucketItems(extendedReferencePoint) {
        var _a;
        const buckets = (_a = extendedReferencePoint === null || extendedReferencePoint === void 0 ? void 0 : extendedReferencePoint.buckets) !== null && _a !== void 0 ? _a : [];
        const measures = getFilteredMeasuresForStackedCharts(buckets);
        const viewByMaxItemCount = this.getViewByMaxItemCount(extendedReferencePoint);
        const stackByMaxItemCount = this.getStackByMaxItemCount(extendedReferencePoint);
        const allAttributesWithoutStacks = getAllCategoriesAttributeItems(buckets);
        const stacks = getStackItems(buckets, [ATTRIBUTE, DATE]);
        const [firstAttribute, ...remainingAttributes] = allAttributesWithoutStacks;
        const views = firstAttribute ? [firstAttribute] : [];
        const possibleStacks = [];
        for (const currentAttribute of remainingAttributes) {
            const canPutToViewBy = this.canPutAttributeToViewBy(currentAttribute, firstAttribute, views.length, viewByMaxItemCount);
            if (canPutToViewBy) {
                views.push(currentAttribute);
            }
            else {
                possibleStacks.push(currentAttribute);
            }
        }
        if (!stacks.length && measures.length <= 1) {
            const finalStacks = [...stacks, ...possibleStacks].slice(0, stackByMaxItemCount);
            return { measures, views, stacks: finalStacks };
        }
        return { measures, views, stacks };
    }
    getViewByMaxItemCount(extendedReferencePoint) {
        var _a, _b, _c, _d;
        return ((_d = (_c = (_b = (_a = extendedReferencePoint.uiConfig) === null || _a === void 0 ? void 0 : _a.buckets) === null || _b === void 0 ? void 0 : _b[BucketNames.VIEW]) === null || _c === void 0 ? void 0 : _c.itemsLimit) !== null && _d !== void 0 ? _d : MAX_CATEGORIES_COUNT);
    }
    getStackByMaxItemCount(extendedReferencePoint) {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = extendedReferencePoint.uiConfig) === null || _a === void 0 ? void 0 : _a.buckets) === null || _b === void 0 ? void 0 : _b[BucketNames.STACK]) === null || _c === void 0 ? void 0 : _c.itemsLimit) !== null && _d !== void 0 ? _d : MAX_STACKS_COUNT;
    }
}
function haveManyViewItems(insight) {
    return bucketsItems(insightBuckets(insight, BucketNames.VIEW)).length > 1;
}
//# sourceMappingURL=PluggableColumnBarCharts.js.map