// (C) 2019-2023 GoodData Corporation
import { NoDataError, NotSupported, } from "@gooddata/sdk-backend-spi";
import { defFingerprint, defWithDimensions, defWithSorting, defWithDateFormat, idRef, isIdentifierRef, isUriRef, } from "@gooddata/sdk-model";
import isEqual from "lodash/isEqual.js";
import isEmpty from "lodash/isEmpty.js";
import { AbstractExecutionFactory } from "../toolkit/execution.js";
/**
 *
 */
export const defaultDummyBackendConfig = {
    hostname: "test",
    raiseNoDataExceptions: "without-data-view",
};
/**
 * Returns dummy backend - this backend focuses on the execution 'branch' of the SPI. it implements
 * execution factory and prepared execution so that clients receive NoData exception when trying to obtain
 * results.
 *
 * This implementation is suitable when testing code which builds and configures an instance of IPreparedExecution or
 * testing component behavior when backend returns no results.
 *
 * @remarks see {@link dummyBackendEmptyData} for a variant of dummy backend
 * @param config - Provide configuration of the backend (host/user)
 * @internal
 */
export function dummyBackend(config = defaultDummyBackendConfig) {
    const noopBackend = {
        capabilities: {
            canCalculateTotals: true,
            canCalculateSubTotals: true,
            canCalculateNativeTotals: true,
            canCalculateGrandTotals: true,
        },
        config,
        onHostname(hostname) {
            return dummyBackend(Object.assign(Object.assign({}, config), { hostname }));
        },
        withTelemetry(_component, _props) {
            return noopBackend;
        },
        withAuthentication(_) {
            return this;
        },
        organization(organizationId) {
            return new DummyOrganization(organizationId);
        },
        organizations() {
            return {
                getCurrentOrganization() {
                    return Promise.resolve(new DummyOrganization("dummy-organization-id"));
                },
            };
        },
        currentUser() {
            throw new NotSupported("not supported");
        },
        workspace(id) {
            return dummyWorkspace(id, config);
        },
        entitlements() {
            throw new NotSupported("not supported");
        },
        workspaces() {
            throw new NotSupported("not supported");
        },
        authenticate() {
            return Promise.resolve({ userId: "dummyUser" });
        },
        deauthenticate() {
            return Promise.resolve();
        },
        isAuthenticated() {
            return Promise.resolve({ userId: "dummyUser" });
        },
    };
    return noopBackend;
}
/**
 * Convenience function to create a dummy backend configured to NOT throw exceptions when client requests
 * data view. Instead, it returns an empty data view (which does not follow the SPI contract...)
 *
 * While this behavior violates contract of the SPI, a backend configured in this way is suitable for
 * particular test scenarios - for instance in tests that exercise logic which only works with IDataView's
 * execution definition.
 *
 * @internal
 */
export function dummyBackendEmptyData() {
    return dummyBackend({ hostname: "test", raiseNoDataExceptions: false });
}
/**
 * Creates a new, empty data view for the provided execution definition. The definition will be retained as-is, data
 * will be empty.
 *
 * @param definition - execution definition
 * @param result - A result to link with the data view, if not provided an execution result will be
 *  created
 * @param config - Override config that will be passed to exec result that may be created for the
 *  data view (it is needed there in order to correctly handle readAll() and read()); config will not be used
 *  if the `result` parameter is provided explicitly
 * @returns new instance of data view
 * @internal
 */
export function dummyDataView(definition, result, config = defaultDummyBackendConfig) {
    const factory = new DummyExecutionFactory(config, definition.workspace);
    const execResult = result ? result : dummyExecutionResult(definition, factory, config);
    const fp = defFingerprint(definition) + "/emptyView";
    return {
        definition,
        result: execResult,
        headerItems: [],
        data: [],
        offset: [0, 0],
        count: [0, 0],
        totalCount: [0, 0],
        fingerprint() {
            return fp;
        },
        equals(other) {
            return fp === other.fingerprint();
        },
    };
}
//
// Internals
//
function dummyWorkspace(workspace, config) {
    return {
        workspace,
        async getDescriptor() {
            return dummyDescriptor(this.workspace);
        },
        getParentWorkspace() {
            throw new NotSupported("not supported");
        },
        execution() {
            return new DummyExecutionFactory(config, workspace);
        },
        catalog() {
            return new DummyWorkspaceCatalogFactory(workspace);
        },
        attributes() {
            return new DummyWorkspaceAttributesService(workspace);
        },
        measures() {
            return new DummyWorkspaceMeasuresService(workspace);
        },
        facts() {
            throw new NotSupported("not supported");
        },
        settings() {
            return new DummyWorkspaceSettingsService(workspace);
        },
        insights() {
            throw new NotSupported("not supported");
        },
        dashboards() {
            throw new NotSupported("not supported");
        },
        styling() {
            throw new NotSupported("not supported");
        },
        datasets() {
            throw new NotSupported("not supported");
        },
        permissions() {
            throw new NotSupported("not supported");
        },
        users() {
            throw new NotSupported("not supported");
        },
        userGroups() {
            throw new NotSupported("not supported");
        },
        dateFilterConfigs() {
            throw new NotSupported("not supported");
        },
        accessControl() {
            throw new NotSupported("not supported");
        },
    };
}
function dummyDescriptor(workspaceId) {
    return {
        id: workspaceId,
        title: "Title",
        description: "Description",
        isDemo: false,
    };
}
class DummyExecutionFactory extends AbstractExecutionFactory {
    constructor(config, workspace) {
        super(workspace);
        this.config = config;
    }
    forDefinition(def) {
        return dummyPreparedExecution(def, this, this.config);
    }
}
function dummyExecutionResult(definition, executionFactory, config) {
    const fp = defFingerprint(definition) + "/emptyResult";
    function dummyRead() {
        if (config.raiseNoDataExceptions) {
            return Promise.reject(new NoDataError("Empty data view from dummy backend", config.raiseNoDataExceptions === "with-data-view"
                ? dummyDataView(definition, result, config)
                : undefined));
        }
        return Promise.resolve(dummyDataView(definition, result, config));
    }
    const result = {
        definition,
        dimensions: [],
        readAll() {
            return dummyRead();
        },
        readWindow(_1, _2) {
            return dummyRead();
        },
        fingerprint() {
            return fp;
        },
        equals(other) {
            return fp === other.fingerprint();
        },
        export(_) {
            throw new NotSupported("...");
        },
        transform() {
            return executionFactory.forDefinition(definition);
        },
    };
    return result;
}
function dummyPreparedExecution(definition, executionFactory, config) {
    const fp = defFingerprint(definition);
    return {
        definition,
        withDimensions(...dim) {
            return executionFactory.forDefinition(defWithDimensions(definition, ...dim));
        },
        withSorting(...items) {
            return executionFactory.forDefinition(defWithSorting(definition, items));
        },
        withDateFormat(dateFormat) {
            return executionFactory.forDefinition(defWithDateFormat(definition, dateFormat));
        },
        execute() {
            return Promise.resolve(dummyExecutionResult(definition, executionFactory, config));
        },
        explain() {
            console.warn("Backend does not support explain mode");
            return {
                data: () => Promise.reject(new Error(`Backend does not support explain mode data call.`)),
                download: () => Promise.resolve(),
            };
        },
        fingerprint() {
            return fp;
        },
        equals(other) {
            return isEqual(this.definition, other.definition);
        },
        withExecConfig(config) {
            if (!isEmpty(config === null || config === void 0 ? void 0 : config.dataSamplingPercentage)) {
                console.warn("Backend does not support data sampling, result will be not affected");
            }
            return executionFactory.forDefinition(definition);
        },
    };
}
class DummyWorkspaceCatalogFactory {
    constructor(workspace, options = {
        types: ["attribute", "measure", "fact", "dateDataset", "attributeHierarchy"],
        excludeTags: [],
        includeTags: [],
        loadGroups: true,
    }) {
        this.workspace = workspace;
        this.options = options;
    }
    withOptions(options) {
        const newOptions = Object.assign(Object.assign({}, this.options), options);
        return new DummyWorkspaceCatalogFactory(this.workspace, newOptions);
    }
    forDataset(dataset) {
        return this.withOptions({
            dataset,
        });
    }
    forTypes(types) {
        return this.withOptions({
            types,
        });
    }
    includeTags(tags) {
        return this.withOptions({
            includeTags: tags,
        });
    }
    excludeTags(tags) {
        return this.withOptions({
            excludeTags: tags,
        });
    }
    withGroups(loadGroups) {
        return this.withOptions({
            loadGroups,
        });
    }
    load() {
        return Promise.resolve(new DummyWorkspaceCatalog(this.workspace));
    }
}
class DummyWorkspaceCatalog {
    constructor(workspace) {
        this.workspace = workspace;
    }
    allItems() {
        return [];
    }
    attributes() {
        return [];
    }
    availableItems() {
        return new DummyWorkspaceCatalogAvailableItemsFactory(this.workspace);
    }
    dateDatasets() {
        return [];
    }
    facts() {
        return [];
    }
    groups() {
        return [];
    }
    measures() {
        return [];
    }
    attributeHierarchies() {
        return [];
    }
}
class DummyWorkspaceCatalogAvailableItemsFactory {
    constructor(workspace, options = {
        items: [],
        excludeTags: [],
        insight: undefined,
        dataset: undefined,
        production: false,
        includeDateGranularities: [],
        includeTags: [],
        loadGroups: false,
        types: [],
    }) {
        this.workspace = workspace;
        this.options = options;
    }
    excludeTags(excludeTags) {
        return this.withOptions({
            excludeTags,
        });
    }
    //eslint-disable-next-line sonarjs/no-identical-functions
    forDataset(dataset) {
        return this.withOptions({
            dataset,
        });
    }
    forInsight(insight) {
        return this.withOptions({
            insight,
        });
    }
    forItems(items) {
        return this.withOptions({
            items,
        });
    }
    //eslint-disable-next-line sonarjs/no-identical-functions
    forTypes(types) {
        return this.withOptions({
            types,
        });
    }
    includeTags(includeTags) {
        return this.withOptions({
            includeTags,
        });
    }
    load() {
        return Promise.resolve(new DummyWorkspaceCatalogWithAvailableItems(this.workspace));
    }
    //eslint-disable-next-line sonarjs/no-identical-functions
    withGroups(loadGroups) {
        return this.withOptions({
            loadGroups,
        });
    }
    withOptions(options) {
        const newOptions = Object.assign(Object.assign({}, this.options), options);
        return new DummyWorkspaceCatalogAvailableItemsFactory(this.workspace, newOptions);
    }
}
class DummyWorkspaceCatalogWithAvailableItems {
    constructor(workspace) {
        this.workspace = workspace;
    }
    allAvailableItems() {
        return [];
    }
    allItems() {
        return [];
    }
    attributes() {
        return [];
    }
    availableAttributes() {
        return [];
    }
    availableDateDatasets() {
        return [];
    }
    availableFacts() {
        return [];
    }
    availableMeasures() {
        return [];
    }
    dateDatasets() {
        return [];
    }
    facts() {
        return [];
    }
    groups() {
        return [];
    }
    measures() {
        return [];
    }
    attributeHierarchies() {
        return [];
    }
    availableAttributeHierarchies() {
        return [];
    }
}
class DummyOrganization {
    constructor(organizationId) {
        this.organizationId = organizationId;
    }
    getDescriptor() {
        return Promise.resolve({
            id: this.organizationId,
            title: "dummy organization",
        });
    }
    securitySettings() {
        return {
            scope: `/gdc/domains/${this.organizationId}`,
            isUrlValid(_url, _context) {
                return Promise.resolve(true);
            },
            isDashboardPluginUrlValid(_url, _workspace) {
                return Promise.resolve(true);
            },
        };
    }
    styling() {
        const resolveTheme = (theme) => {
            return Promise.resolve({
                type: "theme",
                id: "theme_id",
                title: "Theme 1",
                description: "",
                production: true,
                deprecated: false,
                unlisted: false,
                ref: idRef("theme_id"),
                uri: "theme_uri",
                theme: theme.theme,
            });
        };
        const resolveColorPalette = (colorPalette) => Promise.resolve({
            type: "colorPalette",
            id: "color_palette_id",
            title: "Color Palette 1",
            description: "",
            production: true,
            deprecated: false,
            unlisted: false,
            ref: idRef("color_palette_id"),
            uri: "color_palette_uri",
            colorPalette: colorPalette.colorPalette,
        });
        return {
            getThemes: () => Promise.resolve([]),
            getActiveTheme: () => Promise.resolve(undefined),
            setActiveTheme: () => Promise.resolve(),
            clearActiveTheme: () => Promise.resolve(),
            createTheme: resolveTheme,
            updateTheme: resolveTheme,
            deleteTheme: () => Promise.resolve(),
            getColorPalettes: () => Promise.resolve([]),
            getActiveColorPalette: () => Promise.resolve(undefined),
            setActiveColorPalette: () => Promise.resolve(),
            clearActiveColorPalette: () => Promise.resolve(),
            createColorPalette: resolveColorPalette,
            updateColorPalette: resolveColorPalette,
            deleteColorPalette: () => Promise.resolve(),
        };
    }
    settings() {
        return {
            setWhiteLabeling: () => Promise.resolve(),
            setLocale: () => Promise.resolve(),
            setTimezone: () => Promise.resolve(),
            setDateFormat: () => Promise.resolve(),
            setWeekStart: () => Promise.resolve(),
            setTheme: () => Promise.resolve(),
            setColorPalette: () => Promise.resolve(),
            deleteTheme: () => Promise.resolve(),
            deleteColorPalette: () => Promise.resolve(),
            getSettings: () => Promise.resolve({}),
        };
    }
}
class DummyWorkspaceSettingsService {
    constructor(workspace) {
        this.workspace = workspace;
    }
    getSettings() {
        return Promise.resolve({
            workspace: this.workspace,
            testSetting: "test_value",
        });
    }
    getSettingsForCurrentUser() {
        return Promise.resolve({
            workspace: this.workspace,
            testSetting: "test_value",
            userId: "test_user_id",
            locale: "test_locale",
            separators: {
                thousand: ",",
                decimal: ".",
            },
        });
    }
    setLocale(_locale) {
        return Promise.resolve();
    }
    setTimezone(_timezone) {
        return Promise.resolve();
    }
    setDateFormat(_dateFormat) {
        return Promise.resolve();
    }
    setWeekStart(_weekStart) {
        return Promise.resolve();
    }
}
class DummyElementsQueryResult {
    constructor(items, limit, offset, totalCount) {
        this.items = items;
        this.limit = limit;
        this.offset = offset;
        this.totalCount = totalCount;
    }
    next() {
        throw new NotSupported("not supported");
    }
    goTo(_pageIndex) {
        throw new NotSupported("not supported");
    }
    all() {
        throw new NotSupported("not supported");
    }
    allSorted(_compareFn) {
        throw new NotSupported("not supported");
    }
}
class DummyElementsQuery {
    constructor(workspace, ref) {
        this.workspace = workspace;
        this.ref = ref;
        this.offset = 0;
        this.limit = 50;
        this.query = async () => {
            return new DummyElementsQueryResult([], this.limit, this.offset, 0);
        };
    }
    withLimit(limit) {
        this.limit = limit;
        return this;
    }
    withOffset(offset) {
        this.offset = offset;
        return this;
    }
    withAttributeFilters(_filters) {
        throw new NotSupported("not supported");
    }
    withMeasures(_measures) {
        throw new NotSupported("not supported");
    }
    withOptions(_options) {
        throw new NotSupported("not supported");
    }
    withDateFilters(_filters) {
        throw new NotSupported("not supported");
    }
    withSignal(_) {
        throw new NotSupported("not supported");
    }
}
class DummyElementsQueryFactory {
    constructor(workspace) {
        this.workspace = workspace;
    }
    forDisplayForm(ref) {
        return new DummyElementsQuery(this.workspace, ref);
    }
    forFilter(_filter, _dateFilterDisplayForm) {
        throw new NotSupported("not supported");
    }
}
class DummyWorkspaceAttributesService {
    constructor(workspace) {
        this.workspace = workspace;
    }
    elements() {
        return new DummyElementsQueryFactory(this.workspace);
    }
    async getAttributeDisplayForm(ref) {
        return {
            attribute: idRef("dummyAttribute"),
            deprecated: false,
            description: "Dummy attribute",
            id: isIdentifierRef(ref) ? ref.identifier : "dummyDisplayForm",
            production: true,
            ref,
            title: "Dummy display form",
            type: "displayForm",
            unlisted: false,
            uri: isUriRef(ref) ? ref.uri : `/gdc/md/${ref.identifier}`,
        };
    }
    getAttributeDisplayForms(refs) {
        return Promise.all(refs.map((ref) => this.getAttributeDisplayForm(ref)));
    }
    getAttribute(_ref) {
        throw new NotSupported("not supported");
    }
    async getAttributeByDisplayForm(ref) {
        return {
            deprecated: false,
            description: "Dummy attribute",
            displayForms: [
                {
                    attribute: idRef("dummyAttribute"),
                    deprecated: false,
                    description: "Dummy attribute",
                    id: isIdentifierRef(ref) ? ref.identifier : "dummyDisplayForm",
                    production: true,
                    ref,
                    title: "Dummy display form",
                    type: "displayForm",
                    unlisted: false,
                    uri: isUriRef(ref) ? ref.uri : `/gdc/md/${ref.identifier}`,
                },
            ],
            id: "dummyAttribute",
            production: true,
            ref: idRef("dummyAttribute"),
            title: "Dummy attribute",
            type: "attribute",
            unlisted: false,
            uri: "/gdc/md/dummyAttribute",
        };
    }
    getAttributes(_refs) {
        throw new NotSupported("not supported");
    }
    getCommonAttributes(_attributeRefs) {
        throw new NotSupported("not supported");
    }
    getCommonAttributesBatch(_attributesRefsBatch) {
        throw new NotSupported("not supported");
    }
    getAttributeDatasetMeta(_ref) {
        throw new NotSupported("not supported");
    }
}
class DummyWorkspaceMeasuresService {
    constructor(workspace) {
        this.workspace = workspace;
    }
    createMeasure(measure) {
        return Promise.resolve({
            id: "test_metric_id",
            uri: "test_metric_id",
            ref: idRef("test_metric_id", "measure"),
            type: "measure",
            title: measure.title || "",
            description: measure.description || "",
            deprecated: measure.deprecated || false,
            expression: measure.expression || "",
            format: measure.format || "",
            production: measure.production || false,
            isLocked: measure.isLocked || false,
            unlisted: measure.unlisted || false,
        });
    }
    deleteMeasure(_measureRef) {
        return Promise.resolve(undefined);
    }
    getMeasureExpressionTokens(_ref) {
        return Promise.resolve([]);
    }
    getMeasureReferencingObjects(_measureRef) {
        return Promise.resolve({});
    }
    updateMeasure(measure) {
        return Promise.resolve(Object.assign({}, measure));
    }
}
//# sourceMappingURL=index.js.map