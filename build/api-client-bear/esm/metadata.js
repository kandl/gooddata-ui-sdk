// (C) 2007-2022 GoodData Corporation
import isPlainObject from "lodash/isPlainObject.js";
import chunk from "lodash/chunk.js";
import flatten from "lodash/flatten.js";
import pick from "lodash/pick.js";
import pickBy from "lodash/pickBy.js";
import { isWrappedAttribute, } from "@gooddata/api-model-bear";
import { getQueryEntries, handlePolling, queryString } from "./util.js";
import { ApiResponseError } from "./xhr.js";
import { stringify } from "./utils/queryString.js";
function getResponseData(r) {
    if (!r.response.ok) {
        throw new ApiResponseError(r.response.statusText, r.response, r.getData());
    }
    return r.getData();
}
/**
 * Functions for working with metadata objects
 *
 */
export class MetadataModule {
    constructor(xhr) {
        this.xhr = xhr;
    }
    /**
     * Get default display form value of provided attribute element uri
     * @param attributeElementUri - string
     */
    async getAttributeElementDefaultDisplayFormValue(attributeElementUri) {
        const uriChunks = attributeElementUri.match(/(.+)\/elements\?id=(.*)/);
        if (!uriChunks) {
            throw new Error("Provide valid attribute element uri");
        }
        const attributeUri = uriChunks[1];
        const elementId = uriChunks[2];
        const defaultDisplayForm = await this.getAttributeDefaultDisplayForm(attributeUri);
        if (!defaultDisplayForm) {
            throw new Error("Attribute of the provided element has no default display form!");
        }
        const defaultDisplayFormUri = defaultDisplayForm.meta.uri;
        const defaultDisplayFormElementValue = await this.xhr.getParsed(`${defaultDisplayFormUri}/elements?id=${elementId}`);
        return defaultDisplayFormElementValue.attributeElements.elements[0];
    }
    /**
     * Get default display form of provided attribute uri
     * @param attributeUri - string
     */
    async getAttributeDefaultDisplayForm(attributeUri) {
        const object = await this.xhr.getParsed(attributeUri);
        if (!isWrappedAttribute(object)) {
            throw new Error("Provided uri is not attribute uri!");
        }
        return (object.attribute.content.displayForms.find((displayForm) => displayForm.content.default === 1) ||
            object.attribute.content.displayForms[0]);
    }
    /**
     * Get metadata object by provided identifier
     * @param projectId - string
     * @param identifier - string
     */
    async getObjectByIdentifier(projectId, identifier) {
        const uri = await this.getObjectUri(projectId, identifier);
        return this.xhr.getParsed(uri);
    }
    /**
     * Get metadata objects by provided identifiers
     * @param projectId - string
     * @param identifiers - string[]
     */
    async getObjectsByIdentifiers(projectId, identifiers) {
        const uriIdentifierPairs = await this.getUrisFromIdentifiers(projectId, identifiers);
        const uris = uriIdentifierPairs.map((pair) => pair.uri);
        return this.getObjects(projectId, uris);
    }
    /**
     * Load all objects with given uris
     * (use bulk loading instead of getting objects one by one)
     *
     * @param projectId - id of the project
     * @param objectUris - array of uris for objects to be loaded
     * @returns array of loaded elements
     */
    getObjects(projectId, objectUris) {
        const LIMIT = 50;
        const uri = `/gdc/md/${projectId}/objects/get`;
        const objectsUrisChunks = chunk(objectUris, LIMIT);
        const promises = objectsUrisChunks.map((objectUrisChunk) => {
            const body = {
                get: {
                    items: objectUrisChunk,
                },
            };
            return this.xhr
                .post(uri, { body })
                .then((r) => {
                if (!r.response.ok) {
                    throw new ApiResponseError(r.response.statusText, r.response, r.responseBody);
                }
                return r.getData();
            })
                .then((result) => result.objects.items.map((item) => {
                if (item.visualizationObject) {
                    return {
                        visualizationObject: item.visualizationObject,
                    };
                }
                return item;
            }));
        });
        return Promise.all(promises).then(flatten);
    }
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
    getObjectsByQuery(projectId, options) {
        const getOnePage = (uri, items = []) => {
            return this.xhr
                .get(uri)
                .then((r) => r.getData())
                .then(({ objects }) => {
                items.push(...objects.items);
                const nextUri = objects.paging.next;
                return nextUri ? getOnePage(nextUri, items) : items;
            });
        };
        const deprecated = options.deprecated ? { deprecated: 1 } : {};
        const uri = `/gdc/md/${projectId}/objects/query`;
        const query = pick(Object.assign(Object.assign({ limit: 50 }, options), deprecated), [
            "category",
            "mode",
            "author",
            "limit",
            "deprecated",
        ]);
        return getOnePage(uri + queryString(query));
    }
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
    getObjectsByQueryWithPaging(projectId, options) {
        const getTotalCount = (options === null || options === void 0 ? void 0 : options.getTotalCount) ? 1 : 0;
        const uri = `/gdc/md/${projectId}/objects/query?${stringify(Object.assign(Object.assign({}, options), { getTotalCount }))}`;
        return this.xhr
            .get(uri)
            .then((r) => r.getData())
            .then(({ objects }) => objects);
    }
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
    getObjectUsing(projectId, uri, options = {}) {
        const { types = [], nearest = false } = options;
        const resourceUri = `/gdc/md/${projectId}/using2`;
        const body = {
            inUse: {
                uri,
                types,
                nearest: nearest ? 1 : 0,
            },
        };
        return this.xhr
            .post(resourceUri, { body })
            .then(getResponseData)
            .then((result) => result.entries);
    }
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
    getObjectUsingMany(projectId, uris, options = {}) {
        const { types = [], nearest = false } = options;
        const resourceUri = `/gdc/md/${projectId}/using2`;
        const body = {
            inUseMany: {
                uris,
                types,
                nearest: nearest ? 1 : 0,
            },
        };
        return this.xhr
            .post(resourceUri, { body })
            .then(getResponseData)
            .then((result) => result.useMany);
    }
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
    getObjectUsedBy(projectId, uri, options) {
        const { nearest = false, types = [] } = options;
        const body = {
            inUse: {
                nearest: nearest ? 1 : 0,
                uri,
                types,
            },
        };
        return this.xhr
            .postParsed(`/gdc/md/${projectId}/usedby2`, { body })
            .then((result) => result.entries);
    }
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
    getObjectsUsedByMany(projectId, uris, options) {
        const uri = `/gdc/md/${projectId}/usedby2`;
        const { nearest = false, types = [] } = options;
        const body = {
            inUseMany: {
                nearest: nearest ? 1 : 0,
                uris,
                types,
            },
        };
        return this.xhr
            .postParsed(uri, { body })
            .then((result) => result.useMany);
    }
    /**
     * Returns all visualizationObjects metadata in a project specified by projectId param
     *
     * @param projectId - Project identifier
     * @returns An array of visualization objects metadata
     */
    getVisualizations(projectId) {
        return this.xhr
            .get(`/gdc/md/${projectId}/query/visualizationobjects`)
            .then((apiResponse) => apiResponse.response.ok ? apiResponse.getData() : apiResponse.response)
            .then(getQueryEntries);
    }
    /**
     * Returns all attributes in a project specified by projectId param
     *
     * @param projectId - Project identifier
     * @returns An array of attribute objects
     */
    getAttributes(projectId) {
        return this.xhr
            .get(`/gdc/md/${projectId}/query/attributes`)
            .then((apiResponse) => apiResponse.response.ok ? apiResponse.getData() : apiResponse.response)
            .then(getQueryEntries);
    }
    /**
     * Returns all dimensions in a project specified by projectId param
     *
     * @param projectId - Project identifier
     * @returns An array of dimension objects
     * @see getFolders
     */
    getDimensions(projectId) {
        return this.xhr
            .get(`/gdc/md/${projectId}/query/dimensions`)
            .then((apiResponse) => apiResponse.response.ok ? apiResponse.getData() : apiResponse.response)
            .then(getQueryEntries);
    }
    /**
     * Returns project folders. Folders can be of specific types and you can specify
     * the type you need by passing and optional `type` parameter
     *
     * @param projectId - Project identifier
     * @param type - Optional, possible values are `metric`, `fact`, `attribute`
     * @returns An array of dimension objects
     */
    getFolders(projectId, type) {
        // TODO enum?
        const getFolderEntries = (pId, t) => {
            const typeURL = t ? `?type=${t}` : "";
            return this.xhr
                .get(`/gdc/md/${pId}/query/folders${typeURL}`)
                .then((r) => r.getData())
                .then(getQueryEntries);
        };
        switch (type) {
            case "fact":
            case "metric":
                return getFolderEntries(projectId, type);
            case "attribute":
                return this.getDimensions(projectId);
            default:
                return Promise.all([
                    getFolderEntries(projectId, "fact"),
                    getFolderEntries(projectId, "metric"),
                    this.getDimensions(projectId),
                ]).then(([fact, metric, attribute]) => {
                    return { fact, metric, attribute };
                });
        }
    }
    /**
     * Returns all facts in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of fact objects
     */
    getFacts(projectId) {
        return this.xhr
            .get(`/gdc/md/${projectId}/query/facts`)
            .then((apiResponse) => apiResponse.response.ok ? apiResponse.getData() : apiResponse.response)
            .then(getQueryEntries);
    }
    /**
     * Returns all metrics in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of metric objects
     */
    getMetrics(projectId) {
        return this.xhr
            .get(`/gdc/md/${projectId}/query/metrics`)
            .then((apiResponse) => apiResponse.response.ok ? apiResponse.getData() : apiResponse.response)
            .then(getQueryEntries);
    }
    /**
     * Returns all project dashboards (pixel perfect dashboards) in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of project dashboard objects
     */
    getProjectDashboards(projectId) {
        return this.xhr
            .getParsed(`/gdc/md/${projectId}/query/projectdashboards`)
            .then((dashboardsQuery) => {
            const dashboardLinks = dashboardsQuery.query.entries.map((dashboard) => dashboard.link);
            return this.getObjects(projectId, dashboardLinks);
        });
    }
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
    getAnalyticalDashboards(projectId, fetchAllListedDashboards) {
        return this.xhr
            .getParsed(`/gdc/md/${projectId}/query/analyticaldashboard?showAll=${fetchAllListedDashboards ? 1 : 0}`)
            .then((dashboardsQuery) => {
            return dashboardsQuery.query.entries;
        });
    }
    /**
     * Returns all dashboard plugins in a project specified by the given projectId
     *
     * @param projectId - Project identifier
     * @returns An array of links to dashboard plugin objects
     */
    getDashboardPlugins(projectId) {
        return this.xhr
            .getParsed(`/gdc/md/${projectId}/query/dashboardplugins`)
            .then((dashboardsQuery) => {
            return dashboardsQuery.query.entries;
        });
    }
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
    getAvailableMetrics(projectId, attrs = []) {
        return this.xhr
            .post(`/gdc/md/${projectId}/availablemetrics`, { body: attrs })
            .then((apiResponse) => apiResponse.response.ok ? apiResponse.getData() : apiResponse.response)
            .then((data) => data.entries);
    }
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
    getAvailableAttributes(projectId, metrics = []) {
        return this.xhr
            .post(`/gdc/md/${projectId}/drillcrosspaths`, { body: metrics })
            .then((apiResponse) => (apiResponse.response.ok ? apiResponse.getData() : apiResponse.response))
            .then((r) => r.drillcrosspath.links);
    }
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
    getAvailableFacts(projectId, items = []) {
        return this.xhr
            .post(`/gdc/md/${projectId}/availablefacts`, { body: items })
            .then((r) => (r.response.ok ? r.getData() : r.response))
            .then((r) => r.entries);
    }
    /**
     * Get details of a metadata object specified by its uri
     *
     * @param uri - uri of the metadata object for which details are to be retrieved
     * @returns object details
     */
    getObjectDetails(uri) {
        return this.xhr.get(uri).then((r) => r.getData());
    }
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
    getFoldersWithItems(projectId, type) {
        // fetch all folders of given type and process them
        return this.getFolders(projectId, type).then((folders) => {
            // Helper public to get details for each metric in the given
            // array of links to the metadata objects representing the metrics.
            // @returns the array of promises
            const getMetricItemsDetails = (array) => {
                return Promise.all(array.map(this.getObjectDetails)).then((metricArgs) => {
                    return metricArgs.map((item) => item.metric);
                });
            };
            // helper mapBy function
            function mapBy(array, key) {
                return array.map((item) => {
                    return item[key];
                });
            }
            // helper for sorting folder tree structure
            // sadly @returns void (sorting == mutating array in js)
            const sortFolderTree = (structure) => {
                structure.forEach((folder) => {
                    folder.items.sort((a, b) => {
                        if (a.meta.title < b.meta.title) {
                            return -1;
                        }
                        else if (a.meta.title > b.meta.title) {
                            return 1;
                        }
                        return 0;
                    });
                });
                structure.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    }
                    else if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });
            };
            const foldersLinks = mapBy(folders, "link");
            const foldersTitles = mapBy(folders, "title");
            // fetch details for each folder
            return Promise.all(foldersLinks.map(this.getObjectDetails)).then((folderDetails) => {
                // if attribute, just parse everything from what we've received
                // and resolve. For metrics, lookup again each metric to get its
                // identifier. If passing unsupported type, reject immediately.
                if (type === "attribute") {
                    // get all attributes, subtract what we have and add rest in unsorted folder
                    return this.getAttributes(projectId).then((attributes) => {
                        // get uris of attributes which are in some dimension folders
                        const attributesInFolders = [];
                        folderDetails.forEach((fd) => {
                            fd.dimension.content.attributes.forEach((attr) => {
                                attributesInFolders.push(attr.meta.uri);
                            });
                        });
                        // unsortedUris now contains uris of all attributes which aren't in a folder
                        const unsortedUris = attributes
                            .filter((item) => attributesInFolders.indexOf(item.link) === -1)
                            .map((item) => item.link);
                        // now get details of attributes in no folders
                        return Promise.all(unsortedUris.map(this.getObjectDetails)).then((unsortedAttributeArgs) => {
                            // TODO add map to r.json
                            // get unsorted attribute objects
                            const unsortedAttributes = unsortedAttributeArgs.map((attr) => attr.attribute);
                            // create structure of folders with attributes
                            const structure = folderDetails.map((folderDetail) => {
                                return {
                                    title: folderDetail.dimension.meta.title,
                                    items: folderDetail.dimension.content.attributes,
                                };
                            });
                            // and append "Unsorted" folder with attributes to the structure
                            structure.push({
                                title: "Unsorted",
                                items: unsortedAttributes,
                            });
                            sortFolderTree(structure);
                            return structure;
                        });
                    });
                }
                else if (type === "metric") {
                    const entriesLinks = folderDetails.map((entry) => mapBy(entry.folder.content.entries, "link"));
                    // get all metrics, subtract what we have and add rest in unsorted folder
                    return this.getMetrics(projectId).then((metrics) => {
                        // get uris of metrics which are in some dimension folders
                        const metricsInFolders = [];
                        folderDetails.forEach((fd) => {
                            fd.folder.content.entries.forEach((metric) => {
                                metricsInFolders.push(metric.link);
                            });
                        });
                        // unsortedUris now contains uris of all metrics which aren't in a folder
                        const unsortedUris = metrics
                            .filter((item) => metricsInFolders.indexOf(item.link) === -1)
                            .map((item) => item.link);
                        // sadly order of parameters of concat matters! (we want unsorted last)
                        entriesLinks.push(unsortedUris);
                        // now get details of all metrics
                        return Promise.all(entriesLinks.map((linkArray) => getMetricItemsDetails(linkArray))).then((tree) => {
                            // TODO add map to r.json
                            // all promises resolved, i.e. details for each metric are available
                            const structure = tree.map((treeItems, idx) => {
                                // if idx is not in folders list than metric is in "Unsorted" folder
                                return {
                                    title: foldersTitles[idx] || "Unsorted",
                                    items: treeItems,
                                };
                            });
                            sortFolderTree(structure);
                            return structure;
                        });
                    });
                }
                return Promise.reject(null);
            });
        });
    }
    /**
     * Get identifier of a metadata object identified by its uri
     *
     * @param uri - uri of the metadata object for which the identifier is to be retrieved
     * @returns object identifier
     */
    getObjectIdentifier(uri) {
        function idFinder(obj) {
            // TODO
            if (obj.attribute) {
                return obj.attribute.content.displayForms[0].meta.identifier;
            }
            else if (obj.dimension) {
                return obj.dimension.content.attributes.content.displayForms[0].meta.identifier;
            }
            else if (obj.metric) {
                return obj.metric.meta.identifier;
            }
            else if (obj.dataSet) {
                return obj.dataSet.meta.identifier;
            }
            throw Error("Unknown object!");
        }
        if (!isPlainObject(uri)) {
            return this.getObjectDetails(uri).then((data) => idFinder(data));
        }
        return Promise.resolve(idFinder(uri));
    }
    /**
     * Get uri of an metadata object, specified by its identifier and project id it belongs to
     *
     * @param projectId - id of the project
     * @param identifier - identifier of the metadata object
     * @returns uri of the metadata object
     */
    getObjectUri(projectId, identifier) {
        return this.xhr
            .post(`/gdc/md/${projectId}/identifiers`, {
            body: {
                identifierToUri: [identifier],
            },
        })
            .then((r) => {
            const data = r.getData();
            const found = data.identifiers.find((pair) => pair.identifier === identifier);
            if (found) {
                return found.uri;
            }
            // WARNING: code in sdk-backend-bear is searching for 'not found' within the message
            //  in order to determine the NotFound status. Cannot use the response status because
            //  the POST request returns 200
            throw new ApiResponseError(`Object with identifier ${identifier} not found in project ${projectId}`, r.response, r.responseBody);
        });
    }
    /**
     * Get uris specified by identifiers
     *
     * @param projectId - id of the project
     * @param identifiers - identifiers of the metadata objects
     * @returns array of identifier + uri pairs
     */
    getUrisFromIdentifiers(projectId, identifiers) {
        if (!identifiers.length) {
            return Promise.resolve([]);
        }
        return this.xhr
            .post(`/gdc/md/${projectId}/identifiers`, {
            body: {
                identifierToUri: identifiers,
            },
        })
            .then((r) => r.getData())
            .then((data) => {
            return data.identifiers;
        });
    }
    /**
     * Get identifiers specified by uris
     *
     * @param projectId - id of the project
     * @param uris - of the metadata objects
     * @returns array of identifier + uri pairs
     */
    getIdentifiersFromUris(projectId, uris) {
        return this.xhr
            .post(`/gdc/md/${projectId}/identifiers`, {
            body: {
                uriToIdentifier: uris,
            },
        })
            .then((r) => r.getData())
            .then((data) => {
            return data.identifiers;
        });
    }
    /**
     * Get attribute elements with their labels and uris.
     *
     * @param projectId - id of the project
     * @param labelUri - uri of the label (display form)
     * @param patterns - elements labels/titles (for EXACT mode), or patterns (for WILD mode)
     * @param mode - match mode, currently only EXACT supported
     * @returns array of elementLabelUri objects
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    translateElementLabelsToUris(projectId, labelUri, patterns, mode = "EXACT") {
        return this.xhr
            .post(`/gdc/md/${projectId}/labels`, {
            body: {
                elementLabelToUri: [
                    {
                        labelUri,
                        mode,
                        patterns,
                    },
                ],
            },
        })
            .then((r) => { var _a; return (r.response.ok ? (_a = r.getData()) === null || _a === void 0 ? void 0 : _a.elementLabelUri : r.response); });
    }
    /**
     * Get valid elements of an attribute, specified by its identifier and project id it belongs to
     *
     * @param projectId - id of the project
     * @param id - display form id of the metadata object
     * @param options - objects with options
     * @returns ValidElements response
     */
    getValidElements(projectId, id, options = {}) {
        const query = pickBy(pick(options, ["limit", "offset", "order", "filter", "prompt"]), (val) => val !== undefined);
        const queryParams = queryString(query);
        const pickedOptions = pick(options, [
            "uris",
            "complement",
            "includeTotalCountWithoutFilters",
            "restrictiveDefinition",
        ]);
        const { afm } = options;
        const getRequestBodyWithReportDefinition = () => this.xhr
            .post(`/gdc/app/projects/${projectId}/executeAfm/debug`, {
            body: {
                execution: {
                    afm,
                },
            },
        })
            .then((response) => response.getData())
            .then((reportDefinitionResult) => (Object.assign(Object.assign({}, pickedOptions), { restrictiveDefinitionContent: reportDefinitionResult.reportDefinitionWithInlinedMetrics.content })));
        const getOptions = afm ? getRequestBodyWithReportDefinition : () => Promise.resolve(pickedOptions);
        return getOptions().then((requestBody) => this.xhr.postParsed(`/gdc/md/${projectId}/obj/${id}/validElements${queryParams}`.replace(/\?$/, ""), {
            body: {
                validElementsRequest: requestBody,
            },
        }));
    }
    /**
     * Get visualization by Uri and process data
     *
     * @param uri - visualization URI
     */
    getVisualization(uri) {
        return this.getObjectDetails(uri).then((visualizationObject) => {
            const mdObject = visualizationObject.visualizationObject;
            return {
                visualizationObject: mdObject,
            };
        });
    }
    /**
     * Save visualization
     *
     * @param projectId - id of the project to save the visualization to
     * @param visualization - the visualization to save
     */
    saveVisualization(projectId, visualization) {
        return this.createObject(projectId, { visualizationObject: visualization.visualizationObject });
    }
    /**
     * Update visualization
     *
     * @param projectId - id of the project to update the visualization in
     * @param visualization - the visualization to update
     */
    updateVisualization(projectId, visualizationUri, visualization) {
        const objectId = visualizationUri.split("/").slice(-1)[0];
        return this.updateObject(projectId, objectId, {
            visualizationObject: visualization.visualizationObject,
        });
    }
    /**
     * Delete visualization
     *
     * @param visualizationUri - URI of the visualization to delete
     */
    deleteVisualization(visualizationUri) {
        return this.deleteObject(visualizationUri);
    }
    /**
     * Delete object
     *
     * @experimental
     * @param uri - of the object to be deleted
     */
    deleteObject(uri) {
        return this.xhr.del(uri);
    }
    /**
     * Bulk delete objects
     */
    async bulkDeleteObjects(projectId, uris, mode = "cascade") {
        const uri = `/gdc/md/${projectId}/objects/delete`;
        const data = {
            delete: {
                items: uris,
                mode,
            },
        };
        await this.xhr.post(uri, { data });
    }
    /**
     * Create object
     *
     * @experimental
     * @param projectId - id of the project to create the object in
     * @param obj - object definition
     */
    createObject(projectId, obj) {
        return this.xhr.postParsed(`/gdc/md/${projectId}/obj?createAndGet=true`, {
            body: obj,
        });
    }
    /**
     * Update object
     *
     * @experimental
     * @param projectId - id of the project to update the object in
     * @param objectId - objectId of the object to update
     * @param obj - object definition
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    updateObject(projectId, objectId, obj) {
        return this.xhr
            .put(`/gdc/md/${projectId}/obj/${objectId}`, {
            body: obj,
        })
            .then((r) => r.getData());
    }
    /**
     * Converts the visualization object to legacy report.
     * @param projectId - id of the project to perform the conversion in
     * @param mdObject - visualization object to convert
     * @returns uri to the converted report
     */
    openVisualizationAsReport(projectId, mdObject) {
        return this.xhr
            .post(`/gdc/internal/projects/${projectId}/convertVisualizationObject`, {
            body: mdObject,
        })
            .then((res) => res.getData())
            .then(({ uri }) => uri);
    }
    /**
     * LDM manage
     *
     * @experimental
     * @param projectId - id of the project to use
     * @param maql - MAQL to manage
     * @param options - for polling (maxAttempts, pollStep)
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    ldmManage(projectId, maql, options = {}) {
        return this.xhr
            .post(`/gdc/md/${projectId}/ldm/manage2`, { body: { manage: { maql } } })
            .then((r) => r.getData())
            .then((response) => {
            const manageStatusUri = response.entries[0].link;
            return handlePolling(this.xhr.get.bind(this.xhr), manageStatusUri, this.isTaskFinished, options);
        })
            .then(this.checkStatusForError);
    }
    /**
     * ETL pull
     *
     * @experimental
     * @param projectId - id of the project to use
     * @param uploadsDir - the directory to use
     * @param options - for polling (maxAttempts, pollStep)
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    etlPull(projectId, uploadsDir, options = {}) {
        return this.xhr
            .post(`/gdc/md/${projectId}/etl/pull2`, { body: { pullIntegration: uploadsDir } })
            .then((r) => r.getData())
            .then((response) => {
            const etlPullStatusUri = response.pull2Task.links.poll;
            return handlePolling(this.xhr.get.bind(this.xhr), etlPullStatusUri, this.isTaskFinished, options);
        })
            .then(this.checkStatusForError);
    }
    isTaskFinished(task) {
        const taskState = task.wTaskStatus.status;
        return taskState === "OK" || taskState === "ERROR";
    }
    checkStatusForError(response) {
        if (response.wTaskStatus.status === "ERROR") {
            return Promise.reject(response);
        }
        return response;
    }
}
//# sourceMappingURL=metadata.js.map