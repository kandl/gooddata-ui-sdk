// (C) 2024 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import set from "lodash/set.js";
import forEach from "lodash/forEach.js";
import uniqueId from "lodash/uniqueId.js";

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

import { getBucketItems, getMainRowAttribute, setBucketTitles } from "../bucketHelper.js";
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
    const previousConfig = cloneDeep(previousReferencePoint);
    const { attribute, columns } = getRepeaterBucketItems(config, previousConfig);

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
    previousReferencePoint: IReferencePoint,
) => {
    const config = cloneDeep(extendedReferencePoint);
    const previousConfig = cloneDeep(previousReferencePoint);

    const buckets = config?.buckets ?? [];
    const rowAttribute = getMainRowAttribute(buckets);
    const columns = getBucketItems(buckets, BucketNames.COLUMNS);
    const columnAttributes = columns.filter((column) => column.type === "attribute");

    // Columns can contain any measure and only clones of the main row attribute (with the same or different display forms)
    const validColumns: IBucketItem[] = [];

    // TODO: everytime we clone attribute, the reference point does not change properly and the cloned attribute is missing there..
    // 1. clone row attribute into columns if needed
    if (rowAttribute) {
        const clonedAttribute = cloneDeep(rowAttribute);
        clonedAttribute.localIdentifier = uniqueId(); // TODO: fix this to properly change the localIdentifier
        const previousBuckets = previousConfig?.buckets ?? [];
        const previousRowAttribute = getMainRowAttribute(previousBuckets);
        const isCurrentRowAttributeChanged =
            previousRowAttribute && !areObjRefsEqual(previousRowAttribute.dfRef, rowAttribute.dfRef);
        const alreadyHasCloneOfCurrentRowAttribute = columnAttributes.some((columnAttribute) =>
            columnAttribute.displayForms.some((columnAttributeDf) =>
                areObjRefsEqual(columnAttributeDf.ref, rowAttribute?.dfRef),
            ),
        );

        if (
            (!previousRowAttribute && !alreadyHasCloneOfCurrentRowAttribute) ||
            isCurrentRowAttributeChanged
        ) {
            validColumns.push(clonedAttribute);
        }
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
