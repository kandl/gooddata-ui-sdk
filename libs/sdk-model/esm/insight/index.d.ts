import { ISortItem } from "../execution/base/sort.js";
import { BucketItemModifications, BucketItemReducer, BucketPredicate, IAttributeOrMeasure, IBucket } from "../execution/buckets/index.js";
import { IFilter } from "../execution/filter/index.js";
import { IMeasure, MeasurePredicate } from "../execution/measure/index.js";
import { AttributePredicate, IAttribute } from "../execution/attribute/index.js";
import { ITotal } from "../execution/base/totals.js";
import { IColor } from "../colors/index.js";
import { ObjRef } from "../objRef/index.js";
import { IUser } from "../user/index.js";
import { IAuditable } from "../base/metadata.js";
/**
 * Represents an Insight defined in GoodData platform. Insight is typically created using Analytical Designer
 * and can be embedded using UI SDK.
 *
 * @remarks
 * Insight contains all metadata needed to construct its visualization and perform execution to obtain data
 * for that visualization.
 *
 * @public
 */
export type IInsight = IInsightDefinition & {
    insight: IAuditable & {
        /**
         * Unique identifier of the Insight
         */
        identifier: string;
        /**
         * Link to the insight.
         */
        uri: string;
        /**
         * Object to use when referencing insight.
         */
        ref: ObjRef;
        /**
         * Insight is locked for editing & deleting
         */
        isLocked?: boolean;
    };
};
/**
 * Insight definition specifies what and how should be visualized by an insight.
 *
 * @public
 */
export type IInsightDefinition = {
    insight: {
        /**
         * User-assigned title of this insight
         */
        title: string;
        /**
         * Insight tags.
         *
         * @remarks
         * This property is optional for backwards compatibility reasons, but for newly created insights,
         * you can expect this to always be defined (an empty array in case there are no tags).
         *
         * Added in 8.6.0
         */
        tags?: string[];
        /**
         * Insight summary.
         *
         * @remarks
         * This property is optional for backwards compatibility reasons, but for newly created insights,
         * you can expect this to always be defined (an empty string in case there are no summary).
         *
         * Added in 8.9.0
         */
        summary?: string;
        /**
         * URL of visualization that should be used to render this insight. This is a link to the location
         * where the visualization assets are stored and where they should be loaded and linked from.
         *
         * Note: at the moment, the SDK supports only compile-time linkage; for this the visualization URL
         * is in format "local:visName" (as in "local:bar" for BarChart)
         *
         * @alpha
         */
        visualizationUrl: string;
        /**
         * Buckets of attributes, measures and totals to render on the visualization.
         */
        buckets: IBucket[];
        /**
         * Filters to apply on the data.
         */
        filters: IFilter[];
        /**
         * Sorting to apply on the data.
         */
        sorts: ISortItem[];
        /**
         * Visualization-specific properties. This object MAY contain customization metadata for this insight such as:
         *
         * - what axis to display on a chart
         * - whether to display legend
         * - how to color the chart
         *
         * These properties vary from visualization to visualization. Backend does not process the properties in
         * any way.
         */
        properties: VisualizationProperties;
    };
};
/**
 * Object defining the {@link IVisualizationClass} object body.
 *
 * @public
 */
export interface IVisualizationClassBody {
    /**
     * Unique identifier of the visualization.
     */
    identifier: string;
    /**
     * Link to visualization class object.
     */
    uri: string;
    /**
     * Human readable name of the visualization (Bar Chart, Pivot Table)
     */
    title: string;
    /**
     * Link to where visualization's assets reside.
     *
     * This MAY contain URLs such as 'local:bar', 'local:table' - such URLs indicate that the visualization
     * is bundled with the GoodData.UI SDK.
     */
    url: string;
    /**
     * Visualization icon to display in Analytical Designer.
     */
    icon: string;
    /**
     * Visualization icon to display when user selects the visualization in Analytical Designer.
     */
    iconSelected: string;
    /**
     * Checksum for subresource integrity checking.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity}
     */
    checksum: string;
    /**
     * Override ordering in the visualization catalog.
     */
    orderIndex?: number;
}
/**
 * Visualization class is essentially a descriptor for particular type of visualization - say bar chart
 * or table.
 *
 * @remarks
 * Each available visualization type is described by a class stored in the metadata. The available
 * classes influence what visualizations can users select in Analytical Designer.
 *
 * @public
 */
export interface IVisualizationClass {
    visualizationClass: IVisualizationClassBody;
}
/**
 * Visualization-specific properties.
 *
 * @remarks
 * These are modelled in generic fashion as they vary visualization by visualization.
 *
 * @privateRemarks
 * TODO: add links to properties supported by our visualizations.
 *
 * @public
 */
export type VisualizationProperties = {
    [key: string]: any;
};
/**
 * An item in color mapping definition for an insight. The color mapping is stored in properties of those
 * insights that can be colored AND have color mapping specified by the user.
 *
 * @public
 */
export interface IColorMappingItem {
    id: string;
    color: IColor;
}
/**
 * Type guard checking whether the provided object is an {@link IColorMappingItem}.
 *
 * @public
 */
export declare function isColorMappingItem(obj: unknown): obj is IColorMappingItem;
/**
 * Type guard checking whether the provided object is an Insight.
 *
 * @public
 */
export declare function isInsight(obj: unknown): obj is IInsight;
/**
 * Finds bucket matching the provided predicate in an insight.
 *
 * @remarks
 * This function also provides convenience to find bucket by its local identifier - if you pass predicate as
 * string the function will automatically create idMatchBucket predicate.
 *
 * @param insight - insight to work with
 * @param idOrFun - local identifier or bucket predicate
 * @returns undefined if none match
 * @public
 */
export declare function insightBucket(insight: IInsightDefinition, idOrFun?: string | BucketPredicate): IBucket | undefined;
/**
 * Gets buckets for the insight. If ids are provided, then only returns buckets matching the ids.
 *
 * @param insight - insight to work with
 * @param ids - local identifiers of buckets
 * @returns empty list if none match
 * @public
 */
export declare function insightBuckets(insight: IInsightDefinition, ...ids: string[]): IBucket[];
/**
 * Gets all attributes and measures used in the provided insight.
 *
 * @param insight - insight to work with
 * @returns empty if none
 * @public
 */
export declare function insightItems(insight: IInsightDefinition): IAttributeOrMeasure[];
/**
 * Gets all measures used in the provided insight.
 *
 * @param insight - insight to work with
 * @param measurePredicate - predicate to select measures satisfying some conditions
 * @returns empty if none
 * @public
 */
export declare function insightMeasures(insight: IInsightDefinition, measurePredicate?: MeasurePredicate): IMeasure[];
/**
 * Tests whether insight uses any measures.
 *
 * @param insight - insight to test
 * @returns true if any measures, false if not
 * @public
 */
export declare function insightHasMeasures(insight: IInsightDefinition): boolean;
/**
 * Gets all attributes used in the provided insight
 *
 * @param insight - insight to work with
 * @param attributePredicate - predicate to select attributes satisfying some conditions
 * @returns empty if none
 * @public
 */
export declare function insightAttributes(insight: IInsightDefinition, attributePredicate?: AttributePredicate): IAttribute[];
/**
 * Tests whether insight uses any attributes
 *
 * @param insight - insight to test
 * @returns true if any measures, false if not
 * @public
 */
export declare function insightHasAttributes(insight: IInsightDefinition): boolean;
/**
 * Tests whether insight contains valid definition of data to visualise - meaning at least one attribute or
 * one measure is defined in the insight.
 *
 * @param insight - insight to test
 * @returns true if at least one measure or attribute, false if none
 * @public
 */
export declare function insightHasDataDefined(insight: IInsightDefinition): boolean;
/**
 * Gets filters used in an insight.
 *
 * @param insight - insight to work with
 * @public
 */
export declare function insightFilters(insight: IInsightDefinition): IFilter[];
/**
 * Gets sorting defined in the insight.
 *
 * @remarks
 * Note: this function ensures that only sorts working on top of attributes and measures defined in the
 * insight will be returned. Any invalid entries will be stripped.
 *
 * @param insight - insight to get sorts from
 * @returns array of valid sorts
 * @public
 */
export declare function insightSorts(insight: IInsightDefinition): ISortItem[];
/**
 * Gets all totals defined in the insight
 *
 * @param insight - insight to get totals from
 * @returns empty if none
 * @public
 */
export declare function insightTotals(insight: IInsightDefinition): ITotal[];
/**
 * Gets visualization properties of an insight.
 *
 * @param insight - insight to get vis properties for
 * @returns empty object is no properties
 * @public
 */
export declare function insightProperties(insight: IInsightDefinition): VisualizationProperties;
/**
 * Gets URL of visualization that should be used to render this insight. This is a link to the location
 * where the visualization assets are stored and where they should be loaded and linked from.
 *
 * Note: at the moment, the SDK supports only compile-time linkage; for this the visualization URL
 * is in format "local:visName" (as in "local:bar" for BarChart)
 *
 * @param insight - insight to get visualization URL from
 * @alpha
 */
export declare function insightVisualizationUrl(insight: IInsightDefinition): string;
/**
 *
 * @param insight - insight to get visualization type
 * @alpha
 */
export declare function insightVisualizationType(insight: IInsightDefinition): string;
/**
 * Gets the insight title
 *
 * @param insight - insight to get title of
 * @returns the insight title
 * @public
 */
export declare function insightTitle(insight: IInsightDefinition): string;
/**
 * Gets the insights tags from the tagging system
 *
 * @param insight - insight to get the tags of
 * @returns the insight tags or aan empty array if none are specified
 * @public
 */
export declare function insightTags(insight: IInsightDefinition): string[];
/**
 * Gets the insights summary
 *
 * @param insight - insight to get the summary of
 * @returns the insight summary or an empty string if is not specified
 * @public
 */
export declare function insightSummary(insight: IInsightDefinition): string;
/**
 * Gets opaque reference to the insight.
 *
 * @param insight - insight to get ref of
 * @public
 */
export declare function insightRef(insight: IInsight): ObjRef;
/**
 * Gets the insight id
 *
 * @param insight - insight to get id of
 * @returns the insight id
 * @public
 */
export declare function insightId(insight: IInsight): string;
/**
 * Gets the insight uri
 *
 * @param insight - insight to get uri of
 * @returns the insight uri
 * @public
 */
export declare function insightUri(insight: IInsight): string;
/**
 * Gets the date when the insight was created
 *
 * @param insight - insight
 * @returns string - YYYY-MM-DD HH:mm:ss
 * @public
 */
export declare function insightCreated(insight: IInsight): string | undefined;
/**
 * Gets the user that created the insight
 *
 * @param insight - insight
 * @returns string
 * @public
 */
export declare function insightCreatedBy(insight: IInsight): IUser | undefined;
/**
 * Gets the date of the last insight update
 *
 * @param insight - insight
 * @returns string - YYYY-MM-DD HH:mm:ss
 * @public
 */
export declare function insightUpdated(insight: IInsight): string | undefined;
/**
 * Gets the user that last updated the insight
 *
 * @param insight - insight
 * @returns string
 * @public
 */
export declare function insightUpdatedBy(insight: IInsight): IUser | undefined;
/**
 * Checks if insight is locked
 *
 * @param insight - insight
 * @returns boolean
 * @public
 */
export declare function insightIsLocked(insight: IInsight): boolean;
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different properties.
 *
 * @remarks
 * New properties will be used in the new insight as-is, no merging with existing properties.
 *
 * @param insight - insight to work with
 * @param properties - new properties to have on the new insight
 * @returns always new instance
 * @public
 */
export declare function insightSetProperties<T extends IInsightDefinition>(insight: T, properties?: VisualizationProperties): T;
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different sorts.
 *
 * @remarks
 * New sorts will be used in the new insight as-is, no merging with existing sorts.
 *
 * @param insight - insight to work with
 * @param sorts - new sorts to apply
 * @returns always new instance
 * @public
 */
export declare function insightSetSorts<T extends IInsightDefinition>(insight: T, sorts?: ISortItem[]): T;
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different filters.
 *
 * @remarks
 * New filters will be used in the new insight as-is, no merging with existing filters.
 *
 * @param insight - insight to work with
 * @param filters - new filters to apply
 * @returns always new instance
 * @public
 */
export declare function insightSetFilters<T extends IInsightDefinition>(insight: T, filters?: IFilter[]): T;
/**
 * Gets a new insight that 'inherits' all data from the provided insight but has different buckets.
 *
 * @remarks
 * New buckets will be used in the new insight as-is, no merging with existing buckets.
 *
 * @param insight - insight to work with
 * @param buckets - new buckets to apply
 * @returns always new instance
 * @public
 */
export declare function insightSetBuckets<T extends IInsightDefinition>(insight: T, buckets?: IBucket[] | undefined): T;
/**
 * Creates a new insight with modified bucket items (retrieved by applying the modifications function to each bucketItem in the insight).
 *
 * @remarks
 * Note: the bucket item modification function SHOULD NOT modify bucket item's localId.
 * The localId MAY be used to reference the item from other places in the insight (for example from sorts).
 * Changing the item localId has potential to break the insight: as-is this function does not concern itself with changing the references.
 *
 * @param insight - insight to use as template for the new insight
 * @param modifications - modifications to apply to the bucket items
 * @returns always new instance
 * @public
 */
export declare function insightModifyItems<T extends IInsightDefinition>(insight: T, modifications?: BucketItemModifications): T;
/**
 * Creates a new insight with reduced bucket items (retrieved by applying the modifications function).
 *
 * @remarks
 * Note: the bucket item modification function SHOULD NOT modify bucket item's localId.
 * The localId MAY be used to reference the item from other places in the insight (for example from sorts).
 * Changing the item localId has potential to break the insight: as-is this function does not concern itself with changing the references.
 *
 * @param insight - insight to use as template for the new insight
 * @param reducer - reduce function to apply to the bucket items
 * @returns always new instance
 * @public
 */
export declare function insightReduceItems<T extends IInsightDefinition>(insight: T, reducer?: BucketItemReducer): T;
/**
 * Contains breakdown of what display forms are used in an insight.
 *
 * @public
 */
export type InsightDisplayFormUsage = {
    /**
     * References to display forms used for slicing and dicing the results.
     */
    inAttributes: ObjRef[];
    /**
     * References to display forms used to filter the entire insight.
     */
    inFilters: ObjRef[];
    /**
     * References to display forms used to filter particular measures.
     */
    inMeasureFilters: ObjRef[];
};
/**
 * Gets references to all display forms used by the insight.
 *
 * @remarks
 * The display forms may be used for slicing or dicing the
 * data, for filtering the entire insight or for filtering just some measures.
 *
 * @param insight - insight to get the display form usage from
 * @public
 */
export declare function insightDisplayFormUsage<T extends IInsightDefinition>(insight: T): InsightDisplayFormUsage;
/**
 * For given visualization class, return URL where the vis assets are stored.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export declare function visClassUrl(vc: IVisualizationClass): string;
/**
 * For given visualization class, return its URI.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export declare function visClassUri(vc: IVisualizationClass): string;
/**
 * For given visualization class, return its identifier.
 *
 * @param vc - visualization class
 * @returns never null, never empty
 * @public
 */
export declare function visClassId(vc: IVisualizationClass): string;
//# sourceMappingURL=index.d.ts.map