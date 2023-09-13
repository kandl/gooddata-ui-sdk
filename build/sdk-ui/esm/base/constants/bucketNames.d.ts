/**
 * Standard bucket names used in the different visualizations.
 * @internal
 */
export declare const BucketNames: {
    readonly MEASURES: "measures";
    readonly SECONDARY_MEASURES: "secondary_measures";
    readonly TERTIARY_MEASURES: "tertiary_measures";
    readonly ATTRIBUTE: "attribute";
    readonly ATTRIBUTES: "attributes";
    readonly ATTRIBUTE_FROM: "attribute_from";
    readonly ATTRIBUTE_TO: "attribute_to";
    readonly VIEW: "view";
    readonly STACK: "stack";
    readonly TREND: "trend";
    readonly SEGMENT: "segment";
    readonly COLUMNS: "columns";
    readonly LOCATION: "location";
    readonly LONGITUDE: "longitude";
    readonly LATITUDE: "latitude";
    readonly SIZE: "size";
    readonly COLOR: "color";
    readonly TOOLTIP_TEXT: "tooltipText";
};
/**
 * @internal
 */
export type BucketNameKeys = keyof typeof BucketNames;
/**
 * @internal
 */
export type BucketNameValues = typeof BucketNames[BucketNameKeys];
//# sourceMappingURL=bucketNames.d.ts.map