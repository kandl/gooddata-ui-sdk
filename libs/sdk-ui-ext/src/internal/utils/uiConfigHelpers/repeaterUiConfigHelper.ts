// (C) 2024 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import forEach from "lodash/forEach.js";
import uniqueId from "lodash/uniqueId.js";
import partition from "lodash/partition.js";

import { IntlShape } from "react-intl";

import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import {
    IBucketItem,
    IExtendedReferencePoint,
    IReferencePoint,
    IUiConfig,
} from "../../interfaces/Visualization.js";

import { DEFAULT_REPEATER_UI_CONFIG, UICONFIG } from "../../constants/uiConfig.js";
import { BUCKETS } from "../../constants/bucket.js";

import { hasNoAttribute, hasNoColumns } from "../bucketRules.js";

import { getBucketItems, setBucketTitles } from "../bucketHelper.js";
import { areObjRefsEqual } from "@gooddata/sdk-model";

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
    previousReferencePoint?: IReferencePoint,
): IExtendedReferencePoint => {
    const config = cloneDeep(extendedReferencePoint);
    const { attribute, columns } = getRepeaterBucketItems(config, previousReferencePoint);

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

const getRepeaterBucketItems = (
    extendedReferencePoint: IReferencePoint,
    _previousReferencePoint: IReferencePoint,
) => {
    const config = cloneDeep(extendedReferencePoint);

    const buckets = config?.buckets ?? [];
    const attributes = getBucketItems(buckets, BucketNames.ATTRIBUTE);
    const columns = getBucketItems(buckets, BucketNames.COLUMNS);
    const [columnAttributes, _columnMeasures] = partition(columns, (column) => column.type === "attribute");
    const rowAttribute = attributes[0] ?? undefined;

    // Columns can contain any measure and only clones of the main row attribute (with the same or different display forms)
    const validColumns: IBucketItem[] = [];

    // TODO: how to handle when user removed the attribute from the columns? we should not add another clone..

    // 1. check if row attribute exists in columns and add it there if not
    const hasCloneOfRowAttribute = columnAttributes.some((columnAttribute) =>
        columnAttribute.displayForms.some((columnAttributeDf) =>
            areObjRefsEqual(columnAttributeDf.ref, rowAttribute?.dfRef),
        ),
    );

    if (rowAttribute && !hasCloneOfRowAttribute) {
        const clonedAttribute = cloneDeep(rowAttribute);
        clonedAttribute.localIdentifier = uniqueId(); // TODO: fix this to properly change the localIdentifier
        validColumns.push(clonedAttribute);
    }

    columns.forEach((column) => {
        // 2. keep all measures
        if (column.type === "metric") {
            validColumns.push(column);
        } else {
            // 3. check if there are any other attributes in columns and skip them
            const isNotClonedAttribute = !column.displayForms.some((columnAttributeDf) =>
                areObjRefsEqual(columnAttributeDf.ref, rowAttribute?.dfRef),
            );
            if (isNotClonedAttribute) {
                return;
            }
            validColumns.push(column);
        }
    });

    return {
        attribute: rowAttribute ? [rowAttribute] : [],
        columns: validColumns.length ? validColumns : [],
    };
};
