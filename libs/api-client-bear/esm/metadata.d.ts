import { IAttributeElement, IAttributeDisplayForm, WrappedObject, IObjectLink, IGetObjectUsingManyEntry, ObjectCategory, IGetObjectsUsedByManyEntry, IValidElementsParams, IValidElementsResponse, IVisualization, IVisualizationObject, IWrappedProjectDashboard } from "@gooddata/api-model-bear";
import { ApiResponse, XhrModule } from "./xhr.js";
import { IGetObjectsByQueryOptions, IGetObjectUsingOptions, IGetObjectsByQueryWithPagingResponse } from "./interfaces.js";
export interface IUriIdentifierPair {
    uri: string;
    identifier: string;
}
/**
 * Functions for working with metadata objects
 *
 */
export declare class MetadataModule {
    private xhr;
    constructor(xhr: XhrModule);
    /**
     * Get default display form value of provided attribute element uri
     * @param attributeElementUri - string
     */
    getAttributeElementDefaultDisplayFormValue(attributeElementUri: string): Promise<IAttributeElement | undefined>;
    /**
     * Get default display form of provided attribute uri
     * @param attributeUri - string
     */
    getAttributeDefaultDisplayForm(attributeUri: string): Promise<IAttributeDisplayForm>;
    /**
     * Get metadata object by provided identifier
     * @param projectId - string
     * @param identifier - string
     */
    getObjectByIdentifier<T extends WrappedObject = WrappedObject>(projectId: string, identifier: string): Promise<T>;
    /**
     * Get metadata objects by provided identifiers
     * @param projectId - string
     * @param identifiers - string[]
     */
    getObjectsByIdentifiers<T extends WrappedObject = WrappedObject>(projectId: string, identifiers: string[]): Promise<T[]>;
    /**
     * Load all objects with given uris
     * (use bulk loading instead of getting objects one by one)
     *
     * @param projectId - id of the project
     * @param objectUris - array of uris for objects to be loaded
     * @returns array of loaded elements
     */
    getObjects<T extends WrappedObject = WrappedObject>(projectId: string, objectUris: string[]): Promise<T[]>;
    /**
     * Loads all objects by query (fetches all pages, one by one)
     *
     * @param projectId - id of the project
     * @param options - (see https://developer.gooddata.com/api endpoint: `/gdc/md/{project_id}/objects/query`)
     *        - category - for example 'dataSets' or 'projectDashboard'
     *        - mode - 'enriched' or 'raw'
     *        - author - the URI of the author of the metadata objects
     *        - limit - default is 50 (also maximum)
     *        - deprecated - show also deprecated objects
     * @returns array of returned objects
     */
    getObjectsByQuery<T extends WrappedObject = WrappedObject>(projectId: string, options: IGetObjectsByQueryOptions): Promise<T[]>;
    /**
     * Loads all objects by query with paging
     *
     * @param projectId - id of the project
     * @param options - (see https://developer.gooddata.com/api endpoint: `/gdc/md/{project_id}/objects/query`)
     *        - category - for example 'dataSets' or 'projectDashboard'
     *        - mode - 'enriched' or 'raw'
     *        - author - the URI of the author of the metadata objects
     *        - limit - default is 50 (also maximum)
     *        - deprecated - show also deprecated objects
     *        - orderBy - order the results by id, title or the last updated (newest first)
     *        - getTotalCount - include total count of items in the paging object
     * @returns array of returned objects
     */
    getObjectsByQueryWithPaging<T = any>(projectId: string, options: IGetObjectsByQueryOptions): Promise<IGetObjectsByQueryWithPagingResponse<T>>;
    /**
     * Get MD objects from using2 resource. Include only objects of given types
     * and take care about fetching only nearest objects if requested.
     *
     * @param projectId - id of the project
     * @param uri - uri of the object for which dependencies are to be found
     * @param options - objects with options:
     *        - types - array of strings with object types to be included
     *        - nearest - whether to include only nearest dependencies
     * @returns promise promise once resolved returns an array of
     *         entries returned by using2 resource
     */
    getObjectUsing(projectId: string, uri: string, options?: IGetObjectUsingOptions): Promise<IObjectLink[]>;
    /**
     * Get MD objects from using2 resource. Include only objects of given types
     * and take care about fetching only nearest objects if requested.
     *
     * @param projectId - id of the project
     * @param uris - uris of objects for which dependencies are to be found
     * @param options - objects with options:
     *        - types - array of strings with object types to be included
     *        - nearest - whether to include only nearest dependencies
     * @returns promise promise once resolved returns an array of
     *         entries returned by using2 resource
     */
    getObjectUsingMany(projectId: string, uris: string[], options?: IGetObjectUsingOptions): Promise<IGetObjectUsingManyEntry[]>;
    /**
     * Get MD objects from usedby2 resource. Include only objects of given types
     * and take care about fetching only nearest objects if requested.
     *
     * @param projectId - id of the project
     * @param uri - uri of the object for which dependencies are to be found
     * @param options - objects with options:
     *        - types - array of strings with object types to be included
     *        - nearest - whether to include only nearest dependencies (default is false)
     * @returns promise promise once resolved returns an array of
     *         entries returned by usedby2 resource
     */
    getObjectUsedBy(projectId: string, uri: string, options: {
        types: ObjectCategory[];
        nearest: boolean;
    }): Promise<IObjectLink[]>;
    /**
     * Get MD objects from usedby2 resource. Include only objects of given types
     * and take care about fetching only nearest objects if requested.
     *
     * @param projectId - id of the project
     * @param uris - uris of objects for which dependencies are to be found
     * @param options - objects with options:
     *        - types - array of strings with object types to be included
     *        - nearest - whether to include only nearest dependencies (default is false)
     * @returns promise promise once resolved returns an array of
     *         entries returned by usedby2 resource
     */
    getObjectsUsedByMany(projectId: string, uris: string[], options: {
        types: ObjectCategory[];
        nearest: boolean;
    }): Promise<IGetObjectsUsedByManyEntry[]>;
    /**
     * Returns all visualizationObjects metadata in a project specified by projectId param
     *
     * @param projectId - Project identifier
     * @returns An array of visualization objects metadata
     */
    getVisualizations(projectId: string): Promise<any>;
    /**
     * Returns all attributes in a project specified by projectId param
     *
     * @param projectId - Project identifier
     * @returns An array of attribute objects
     */
    getAttributes(projectId: string): Promise<any>;
    /**
     * Returns all dimensions in a project specified by projectId param
     *
     * @param projectId - Project identifier
     * @returns An array of dimension objects
     * @see getFolders
     */
    getDimensions(projectId: string): Promise<any>;
    /**
     * Returns project folders. Folders can be of specific types and you can specify
     * the type you need by passing and optional `type` parameter
     *
     * @param projectId - Project identifier
     * @param type - Optional, possible values are `metric`, `fact`, `attribute`
     * @returns An array of dimension objects
     */
    getFolders(projectId: string, type: string): Promise<any>;
    /**
     * Returns all facts in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of fact objects
     */
    getFacts(projectId: string): Promise<any>;
    /**
     * Returns all metrics in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of metric objects
     */
    getMetrics(projectId: string): Promise<any>;
    /**
     * Returns all project dashboards (pixel perfect dashboards) in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of project dashboard objects
     */
    getProjectDashboards(projectId: string): Promise<IWrappedProjectDashboard[]>;
    /**
     * Returns all analytical dashboards (kpi dashboards) in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @param fetchAllListedDashboards - Specify if also all the listed
     *  dashboards should be loaded. Note that these include not just shared dashboards and dashboards
     *  that were not shared with the user but are accessible via link, but also dashboards that cannot
     *  be accessed because there were not shared are under strict control access (only its listed record
     *  is accessible, not the whole metadata object).
     *
     * @returns An array of links to analytical dashboard objects
     */
    getAnalyticalDashboards(projectId: string, fetchAllListedDashboards?: boolean): Promise<IObjectLink[]>;
    /**
     * Returns all dashboard plugins in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of links to dashboard plugin objects
     */
    getDashboardPlugins(projectId: string): Promise<IObjectLink[]>;
    /**
     * Returns all metrics that are reachable (with respect to ldm of the project
     * specified by the given projectId) for given attributes
     *
     * @param projectId - Project identifier
     * @param attrs - An array of attribute uris for which we want to get
     * available metrics
     * @returns An array of reachable metrics for the given attrs
     * @see getAvailableAttributes
     * @see getAvailableFacts
     */
    getAvailableMetrics(projectId: string, attrs?: string[]): Promise<any>;
    /**
     * Returns all attributes that are reachable (with respect to ldm of the project
     * specified by the given projectId) for given metrics (also called as drillCrossPath)
     *
     * @param projectId - Project identifier
     * @param metrics - An array of metric uris for which we want to get
     * available attributes
     * @returns An array of reachable attributes for the given metrics
     * @see getAvailableMetrics
     * @see getAvailableFacts
     */
    getAvailableAttributes(projectId: string, metrics?: string[]): Promise<any>;
    /**
     * Returns all attributes that are reachable (with respect to ldm of the project
     * specified by the given projectId) for given metrics (also called as drillCrossPath)
     *
     * @param projectId - Project identifier
     * @param items - An array of metric or attribute uris for which we want to get
     * available facts
     * @returns An array of reachable facts for the given items
     * @see getAvailableAttributes
     * @see getAvailableMetrics
     */
    getAvailableFacts(projectId: string, items?: string[]): Promise<any>;
    /**
     * Get details of a metadata object specified by its uri
     *
     * @param uri - uri of the metadata object for which details are to be retrieved
     * @returns object details
     */
    getObjectDetails<T = any>(uri: string): Promise<T>;
    /**
     * Get folders with items.
     * Returns array of folders, each having a title and items property which is an array of
     * corresponding items. Each item is either a metric or attribute, keeping its original
     * verbose structure.
     *
     * @param type - type of folders to return
     * @returns Array of folder object, each containing title and
     * corresponding items.
     */
    getFoldersWithItems(projectId: string, type: string): Promise<any>;
    /**
     * Get identifier of a metadata object identified by its uri
     *
     * @param uri - uri of the metadata object for which the identifier is to be retrieved
     * @returns object identifier
     */
    getObjectIdentifier(uri: string): Promise<string>;
    /**
     * Get uri of an metadata object, specified by its identifier and project id it belongs to
     *
     * @param projectId - id of the project
     * @param identifier - identifier of the metadata object
     * @returns uri of the metadata object
     */
    getObjectUri(projectId: string, identifier: string): Promise<string>;
    /**
     * Get uris specified by identifiers
     *
     * @param projectId - id of the project
     * @param identifiers - identifiers of the metadata objects
     * @returns array of identifier + uri pairs
     */
    getUrisFromIdentifiers(projectId: string, identifiers: string[]): Promise<IUriIdentifierPair[]>;
    /**
     * Get identifiers specified by uris
     *
     * @param projectId - id of the project
     * @param uris - of the metadata objects
     * @returns array of identifier + uri pairs
     */
    getIdentifiersFromUris(projectId: string, uris: string[]): Promise<IUriIdentifierPair[]>;
    /**
     * Get attribute elements with their labels and uris.
     *
     * @param projectId - id of the project
     * @param labelUri - uri of the label (display form)
     * @param patterns - elements labels/titles (for EXACT mode), or patterns (for WILD mode)
     * @param mode - match mode, currently only EXACT supported
     * @returns array of elementLabelUri objects
     */
    translateElementLabelsToUris(projectId: string, labelUri: string, patterns: string[], mode?: string): Promise<any>;
    /**
     * Get valid elements of an attribute, specified by its identifier and project id it belongs to
     *
     * @param projectId - id of the project
     * @param id - display form id of the metadata object
     * @param options - objects with options
     * @returns ValidElements response
     */
    getValidElements(projectId: string, id: string, options?: IValidElementsParams): Promise<IValidElementsResponse>;
    /**
     * Get visualization by Uri and process data
     *
     * @param uri - visualization URI
     */
    getVisualization(uri: string): Promise<IVisualization>;
    /**
     * Save visualization
     *
     * @param projectId - id of the project to save the visualization to
     * @param visualization - the visualization to save
     */
    saveVisualization(projectId: string, visualization: IVisualization): Promise<{
        visualizationObject: IVisualizationObject;
    }>;
    /**
     * Update visualization
     *
     * @param projectId - id of the project to update the visualization in
     * @param visualization - the visualization to update
     */
    updateVisualization(projectId: string, visualizationUri: string, visualization: IVisualization): Promise<{
        uri: string;
    }>;
    /**
     * Delete visualization
     *
     * @param visualizationUri - URI of the visualization to delete
     */
    deleteVisualization(visualizationUri: string): Promise<ApiResponse<any>>;
    /**
     * Delete object
     *
     * @experimental
     * @param uri - of the object to be deleted
     */
    deleteObject(uri: string): Promise<ApiResponse<any>>;
    /**
     * Bulk delete objects
     */
    bulkDeleteObjects(projectId: string, uris: string[], mode?: "cascade" | "multi"): Promise<void>;
    /**
     * Create object
     *
     * @experimental
     * @param projectId - id of the project to create the object in
     * @param obj - object definition
     */
    createObject<T extends WrappedObject = WrappedObject>(projectId: string, obj: T): Promise<T>;
    /**
     * Update object
     *
     * @experimental
     * @param projectId - id of the project to update the object in
     * @param objectId - objectId of the object to update
     * @param obj - object definition
     */
    updateObject(projectId: string, objectId: string, obj: any): Promise<any>;
    /**
     * Converts the visualization object to legacy report.
     * @param projectId - id of the project to perform the conversion in
     * @param mdObject - visualization object to convert
     * @returns uri to the converted report
     */
    openVisualizationAsReport(projectId: string, mdObject: IVisualization): Promise<string>;
    /**
     * LDM manage
     *
     * @experimental
     * @param projectId - id of the project to use
     * @param maql - MAQL to manage
     * @param options - for polling (maxAttempts, pollStep)
     */
    ldmManage(projectId: string, maql: string, options?: {}): Promise<any>;
    /**
     * ETL pull
     *
     * @experimental
     * @param projectId - id of the project to use
     * @param uploadsDir - the directory to use
     * @param options - for polling (maxAttempts, pollStep)
     */
    etlPull(projectId: string, uploadsDir: string, options?: {}): Promise<any>;
    private isTaskFinished;
    private checkStatusForError;
}
//# sourceMappingURL=metadata.d.ts.map