// (C) 2022 GoodData Corporation
import { isDrillFromAttribute, isDrillToAttributeUrl, isDrillToCustomUrl, isDrillToDashboard, isDrillToInsight, } from "@gooddata/sdk-model";
import { defineMessage } from "react-intl";
import { getDrillOriginLocalIdentifier, getLocalIdentifierOrDie, getValidDrillOriginAttributes, } from "../../../../../_staging/drills/drillingUtils.js";
import { DRILL_TARGET_TYPE, isDrillToUrl, } from "../../../../drill/types.js";
function getTitleFromDrillableItemPushData(items, itemId) {
    const measureItems = items.measures || [];
    const measureResult = measureItems.find((measureResult) => measureResult.measure.measureHeaderItem.localIdentifier === itemId);
    if (measureResult) {
        return measureResult.measure.measureHeaderItem.name;
    }
    const attributeItems = items.attributes || [];
    const attributeResult = attributeItems.find((attributeItem) => attributeItem.attribute.attributeHeader.localIdentifier === itemId);
    return attributeResult ? attributeResult.attribute.attributeHeader.formOf.name : "";
}
const buildUrlDrillTarget = (drillData) => {
    if (isDrillToCustomUrl(drillData)) {
        const customUrl = drillData.target.url;
        return {
            customUrl,
        };
    }
    if (isDrillToAttributeUrl(drillData)) {
        const { displayForm: insightAttributeDisplayForm, hyperlinkDisplayForm: drillToAttributeDisplayForm, } = drillData.target;
        return {
            insightAttributeDisplayForm,
            drillToAttributeDisplayForm,
        };
    }
    throw new Error("Unsupported URL drill type!");
};
const createInsightConfig = (drillData, supportedItemsForWidget) => {
    var _a, _b;
    const localIdentifier = isDrillFromAttribute(drillData.origin)
        ? getLocalIdentifierOrDie((_a = drillData.origin) === null || _a === void 0 ? void 0 : _a.attribute)
        : getLocalIdentifierOrDie((_b = drillData.origin) === null || _b === void 0 ? void 0 : _b.measure);
    return {
        type: isDrillFromAttribute(drillData.origin) ? "attribute" : "measure",
        localIdentifier,
        title: getTitleFromDrillableItemPushData(supportedItemsForWidget, localIdentifier),
        attributes: getValidDrillOriginAttributes(supportedItemsForWidget, localIdentifier),
        drillTargetType: DRILL_TARGET_TYPE.DRILL_TO_INSIGHT,
        insightRef: drillData.target,
        complete: true,
    };
};
const createDashboardConfig = (drillData, supportedItemsForWidget) => {
    var _a, _b;
    const localIdentifier = isDrillFromAttribute(drillData.origin)
        ? getLocalIdentifierOrDie((_a = drillData.origin) === null || _a === void 0 ? void 0 : _a.attribute)
        : getLocalIdentifierOrDie((_b = drillData.origin) === null || _b === void 0 ? void 0 : _b.measure);
    return {
        type: isDrillFromAttribute(drillData.origin) ? "attribute" : "measure",
        localIdentifier,
        title: getTitleFromDrillableItemPushData(supportedItemsForWidget, localIdentifier),
        attributes: getValidDrillOriginAttributes(supportedItemsForWidget, localIdentifier),
        drillTargetType: DRILL_TARGET_TYPE.DRILL_TO_DASHBOARD,
        dashboard: drillData.target,
        complete: true,
    };
};
const invalidUrlMessage = defineMessage({
    id: "configurationPanel.drillConfig.drillIntoUrl.invalidCustomUrl",
});
const createUrlConfig = (drillData, supportedItemsForWidget, invalidCustomUrlDrillLocalIds) => {
    const localIdentifier = getDrillOriginLocalIdentifier(drillData);
    const hasWarning = invalidCustomUrlDrillLocalIds.includes(localIdentifier);
    return {
        type: isDrillFromAttribute(drillData.origin) ? "attribute" : "measure",
        localIdentifier,
        title: getTitleFromDrillableItemPushData(supportedItemsForWidget, localIdentifier),
        attributes: getValidDrillOriginAttributes(supportedItemsForWidget, localIdentifier),
        drillTargetType: DRILL_TARGET_TYPE.DRILL_TO_URL,
        urlDrillTarget: buildUrlDrillTarget(drillData),
        complete: true,
        warning: hasWarning ? invalidUrlMessage.id : undefined,
    };
};
const createImplicitConfig = () => {
    return null;
};
const createConfig = (drillData, supportedItemsForWidget, invalidCustomUrlDrillLocalIds) => {
    if (isDrillToInsight(drillData)) {
        return createInsightConfig(drillData, supportedItemsForWidget);
    }
    if (isDrillToDashboard(drillData)) {
        return createDashboardConfig(drillData, supportedItemsForWidget);
    }
    if (isDrillToUrl(drillData)) {
        return createUrlConfig(drillData, supportedItemsForWidget, invalidCustomUrlDrillLocalIds);
    }
    return createImplicitConfig();
};
/**
 * @internal
 */
export const getMappedConfigForWidget = (configForWidget, supportedItemsForWidget, invalidCustomUrlDrillLocalIds) => {
    return configForWidget.map((item) => createConfig(item, supportedItemsForWidget, invalidCustomUrlDrillLocalIds));
};
//# sourceMappingURL=drillConfigMapper.js.map