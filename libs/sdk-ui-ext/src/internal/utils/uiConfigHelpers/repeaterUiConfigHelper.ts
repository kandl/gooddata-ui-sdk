// (C) 2024 GoodData Corporation

import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import forEach from "lodash/forEach.js";
import { IntlShape } from "react-intl";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { IExtendedReferencePoint, IReferencePoint, IUiConfig } from "../../interfaces/Visualization.js";
import { DEFAULT_REPEATER_UI_CONFIG, UICONFIG } from "../../constants/uiConfig.js";
import { BUCKETS } from "../../constants/bucket.js";
import { hasNoAttribute, hasNoColumns } from "../bucketRules.js";
import { getBucketItems, getMainRowAttribute, setBucketTitles } from "../bucketHelper.js";

export const getDefaultRepeaterUiConfig = (): IUiConfig => cloneDeep(DEFAULT_REPEATER_UI_CONFIG);

// If you need to edit these icons
// reflect changes also in gdc-analytical-designer
// https://github.com/gooddata/gdc-analytical-designer/blob/develop/app/components/buckets/BucketIcon.tsx
const repeaterRowsIcon = "local:repeater/bucket-title-rows.svg";
const repeaterColumnsIcon = "local:repeater/bucket-title-columns.svg";

function setRepeaterBucketWarningMessages(referencePoint: IExtendedReferencePoint, _intl?: IntlShape) {
    const buckets = referencePoint?.buckets || [];
    const updatedUiConfig = cloneDeep(referencePoint?.uiConfig);
    // const viewItems = getViewItems(buckets, [ATTRIBUTE, DATE]);

    forEach(buckets, (bucket) => {
        const localIdentifier = bucket?.localIdentifier ?? "";
        const bucketUiConfig = updatedUiConfig?.buckets?.[localIdentifier];

        // skip disabled buckets
        if (!bucketUiConfig?.enabled) {
            return;
        }

        if (!bucketUiConfig?.canAddItems) {
            // let warningMessage;
            // if (bucket.localIdentifier === BucketNames.ATTRIBUTE) {
            //     warningMessage = getTranslation(messages.category.id, intl);
            // }
            // if (bucket.localIdentifier === BucketNames.COLUMNS) {
            //     warningMessage = getBucketItemsWarningMessage(messages.columns.id, intl, viewItems);
            // }
            // if (warningMessage) {
            //     set(updatedUiConfig, [BUCKETS, localIdentifier, "warningMessage"], warningMessage);
            // }
        }
    });

    return updatedUiConfig;
}

export function setRepeaterUiConfig(
    referencePoint: IExtendedReferencePoint,
    intl: IntlShape,
): IExtendedReferencePoint {
    const referencePointConfigured = cloneDeep(referencePoint);
    const buckets = referencePointConfigured?.buckets ?? [];

    const attributeCanAddItems = hasNoAttribute(buckets);
    const emptyColumns = hasNoColumns(buckets);
    const columnsCanAddItems = !attributeCanAddItems || !emptyColumns;

    set(
        referencePointConfigured,
        UICONFIG,
        setBucketTitles(referencePoint, VisualizationTypes.REPEATER, intl),
    );
    set(
        referencePointConfigured,
        [UICONFIG, BUCKETS, BucketNames.ATTRIBUTE, "canAddItems"],
        attributeCanAddItems,
    );
    set(
        referencePointConfigured,
        [UICONFIG, BUCKETS, BucketNames.COLUMNS, "canAddItems"],
        columnsCanAddItems,
    );
    set(referencePointConfigured, UICONFIG, setRepeaterBucketWarningMessages(referencePointConfigured, intl));

    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.ATTRIBUTE, "icon"], repeaterRowsIcon);
    set(referencePointConfigured, [UICONFIG, BUCKETS, BucketNames.COLUMNS, "icon"], repeaterColumnsIcon);

    return referencePointConfigured;
}

export const configRepeaterBuckets = (
    extendedReferencePoint: IExtendedReferencePoint,
): IExtendedReferencePoint => {
    const config = cloneDeep(extendedReferencePoint);
    const { attribute, columns } = getRepeaterBucketItems(config);

    set(config, BUCKETS, [
        {
            localIdentifier: BucketNames.ATTRIBUTE,
            items: attribute,
        },
        {
            localIdentifier: BucketNames.COLUMNS,
            items: columns,
        },
    ]);

    return config;
};

const getRepeaterBucketItems = (extendedReferencePoint: IReferencePoint) => {
    const config = cloneDeep(extendedReferencePoint);
    const buckets = config?.buckets ?? [];
    const rowAttribute = getMainRowAttribute(buckets);
    const columns = getBucketItems(buckets, BucketNames.COLUMNS);

    return {
        attribute: rowAttribute ? [rowAttribute] : [],
        columns: columns.length ? columns : [],
    };
};
