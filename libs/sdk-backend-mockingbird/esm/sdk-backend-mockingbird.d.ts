/**
 * This package provides a mock Analytical Backend implementation used mainly for testing.
 *
 * @remarks
 * For the GoodData platform version, see `@gooddata/sdk-backend-bear`.
 * For the GoodData Cloud and GoodData.CN version, see `@gooddata/sdk-backend-tiger`.
 *
 * @packageDocumentation
 */

import { AccessGranteeDetail } from '@gooddata/sdk-model';
import { CatalogItem } from '@gooddata/sdk-model';
import { dummyBackend } from '@gooddata/sdk-backend-base';
import { dummyBackendEmptyData } from '@gooddata/sdk-backend-base';
import { dummyDataView } from '@gooddata/sdk-backend-base';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAnalyticalBackendConfig } from '@gooddata/sdk-backend-spi';
import { IAttributeDisplayFormMetadataObject } from '@gooddata/sdk-model';
import { IAttributeElement } from '@gooddata/sdk-model';
import { IAttributeFilter } from '@gooddata/sdk-model';
import { IAvailableAccessGrantee } from '@gooddata/sdk-model';
import { IBackendCapabilities } from '@gooddata/sdk-backend-spi';
import { ICatalogAttribute } from '@gooddata/sdk-model';
import { ICatalogAttributeHierarchy } from '@gooddata/sdk-model';
import { ICatalogDateDataset } from '@gooddata/sdk-model';
import { ICatalogFact } from '@gooddata/sdk-model';
import { ICatalogGroup } from '@gooddata/sdk-model';
import { ICatalogMeasure } from '@gooddata/sdk-model';
import { IColorPalette } from '@gooddata/sdk-model';
import { IDashboardWithReferences } from '@gooddata/sdk-backend-spi';
import { IDataView } from '@gooddata/sdk-backend-spi';
import { IDateFilter } from '@gooddata/sdk-model';
import { IDateFilterConfig } from '@gooddata/sdk-model';
import { Identifier } from '@gooddata/sdk-model';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IInsight } from '@gooddata/sdk-model';
import { IMeasure } from '@gooddata/sdk-model';
import { IMeasureDefinition } from '@gooddata/sdk-model';
import { ISettings } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { IUser } from '@gooddata/sdk-model';
import { IVisualizationClass } from '@gooddata/sdk-model';
import { IWidgetAlert } from '@gooddata/sdk-model';
import { IWorkspaceDescriptor } from '@gooddata/sdk-backend-spi';
import { IWorkspaceUser } from '@gooddata/sdk-model';
import { IWorkspaceUserGroup } from '@gooddata/sdk-model';
import { ObjRef } from '@gooddata/sdk-model';
import { ValidationContext } from '@gooddata/sdk-backend-spi';

/**
 * @internal
 */
export declare type AttributeElementsFiltering = {
    attributeFilters?: Record<Identifier, AttributeElementsFilteringPredicate<IAttributeFilter>>;
    dateFilters?: Record<Identifier, AttributeElementsFilteringPredicate<IDateFilter>>;
    measures?: Record<Identifier, AttributeElementsFilteringPredicate<IMeasure>>;
};

/**
 * @internal
 */
export declare type AttributeElementsFilteringPredicate<T> = (item: IAttributeElement, index: number, scopingItem: T) => boolean;

/**
 * @internal
 */
export declare type CatalogRecording = {
    items: CatalogItem[];
    groups: ICatalogGroup[];
};

/**
 * Creates a composite backend from one or more other test backends, each serving a test data for different
 * workspace. Composite backend will delegate all workspace services to the instance of backend which declares
 * that it has data for that workspace. If no backend is found during lookup, composite backend will fall-back to
 * the first backend on the list and whatever happens, happens (NO_DATA etc).
 *
 * For all other services available on the top-level backend API, the composite backend delegates to the first backend
 * on the list.
 *
 * Note on backend capabilities: the composite backend will inherit capabilities from the first backend component. It
 * will not do any other processing in regards to capabilities. This can potentially be limiting and breaking in
 * situations when the backend is composed from multiple different implementations, each with different capabilities.
 *
 * @param components - backends to compose from, must contain at least one backend
 * @internal
 */
export declare function compositeBackend(...components: CompositeBackendPart[]): IAnalyticalBackend;

/**
 * @internal
 */
export declare type CompositeBackendPart = {
    /**
     * Specify workspace for which this backend has data.
     */
    workspace: string;
    /**
     * The instance of backend.
     */
    backend: IAnalyticalBackend;
};

/**
 * @internal
 */
export declare type DashboardRecording = {
    obj: IDashboardWithReferences;
    alerts: IWidgetAlert[];
};

/**
 * @internal
 */
export declare const DataViewAll: string;

/**
 * @internal
 */
export declare const DataViewFirstPage: string;

/**
 * @internal
 */
export declare const dataViewWindow: (offset: number[], size: number[]) => string;

/**
 * @internal
 */
export declare const defaultRecordedBackendCapabilities: IBackendCapabilities;

/**
 * @internal
 */
export declare type DisplayFormRecording = {
    obj: IAttributeDisplayFormMetadataObject;
    elements: IAttributeElement[];
};

export { dummyBackend }

export { dummyBackendEmptyData }

export { dummyDataView }

/**
 * @internal
 */
export declare type ExecutionRecording = {
    scenarios?: any[];
    definition: IExecutionDefinition;
    executionResult: any;
    [dataViews: string]: any;
};

/**
 * @internal
 */
export declare type IAccessControl = {
    accessList?: AccessGranteeDetail[];
    availableGrantees?: IAvailableAccessGrantee[];
};

/**
 * @internal
 */
export declare type InsightRecording = {
    obj: IInsight;
};

/**
 * @internal
 */
export declare type IUserGroup = {
    userGroups?: IWorkspaceUserGroup[];
};

/**
 * @internal
 */
export declare type IUserManagement = {
    /**
     * Specify currently authenticated user
     * Response of IUserService
     */
    user?: IUser;
    /**
     * Specify respond of Service to manage access to the objects.
     * IWorkspaceAccessControlService
     *
     */
    accessControl?: IAccessControl;
    /**
     *  Specify respond of Service to query user groups for current workspace
     *  IWorkspaceUserGroupsQuery
     */
    userGroup?: IUserGroup;
    /**
     * Specify users for current workspace
     * IWorkspaceUsersQuery
     */
    users?: IUsers;
};

/**
 * @internal
 */
export declare type IUsers = {
    users?: IWorkspaceUser[];
};

/**
 * Each recording in the master index has these 3 entries
 *
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare type LegacyExecutionRecording = {
    definition: IExecutionDefinition;
    response: any;
    result: any;
};

/**
 * This is legacy implementation of the recorded backend. Do not use for new tests.
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare function legacyRecordedBackend(index: LegacyRecordingIndex, config?: IAnalyticalBackendConfig): IAnalyticalBackend;

/**
 * Creates a new data view facade for the provided recording.
 *
 * This is legacy implementation of recorded backend. Do not use for new tests.
 *
 * @param recording - recorded definition, AFM response and AFM result
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare function legacyRecordedDataView(recording: LegacyExecutionRecording): IDataView;

/**
 * Master Index is the input needed to initialize the recorded backend.
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare type LegacyRecordingIndex = {
    [workspace: string]: LegacyWorkspaceRecordings;
};

/**
 * Workspace-specific recordings
 *
 * @internal
 * @deprecated this implementation is deprecated, use non-legacy recorded backend
 */
export declare type LegacyWorkspaceRecordings = {
    execution?: {
        [fp: string]: LegacyExecutionRecording;
    };
    metadata?: {
        attributeDisplayForm?: {
            [id: string]: IAttributeDisplayFormMetadataObject;
        };
    };
    elements?: {
        [id: string]: IAttributeElement[];
    };
};

/**
 * @internal
 */
export declare type NamedDataView = {
    name: string;
    dataView: IDataView;
};

/**
 * @internal
 */
export declare function newAttributeFilterLimitingItem(attributeFilter: IAttributeFilter, predicate: AttributeElementsFilteringPredicate<IAttributeFilter>): Record<Identifier, AttributeElementsFilteringPredicate<IAttributeFilter>>;

/**
 * @internal
 */
export declare function newDateFilterLimitingItem(dateFilter: IDateFilter, predicate: AttributeElementsFilteringPredicate<IDateFilter>): Record<Identifier, AttributeElementsFilteringPredicate<IDateFilter>>;

/**
 * @internal
 */
export declare function newMeasureLimitingItem(measure: IMeasure<IMeasureDefinition>, predicate: AttributeElementsFilteringPredicate<IMeasure>): Record<Identifier, AttributeElementsFilteringPredicate<IMeasure>>;

/**
 * This function should be used to obtain keys for certain {@link RecordedBackendConfig} settings.
 *
 * @internal
 */
export declare function objRefsToStringKey(refs: ObjRef[]): string;

/**
 * Creates new backend that will be providing recorded results to the caller. The recorded results are provided
 * to the backend in the form of RecordingIndex. This contains categorized recordings for the different service
 * calls.
 *
 * Note that:
 * - the 'tools/mock-handling' program can be used to create recordings AND the recording index.
 * - typically you want to use this recordedBackend with the recordings from the reference workspace; there
 *   is already tooling and infrastructure around populating that project
 *
 * @param index - recording index
 * @param config - backend config, for now just for compatibility sakes with the analytical backend config
 * @param capabilities - backend capabilities to use
 * @internal
 */
export declare function recordedBackend(index: RecordingIndex, config?: RecordedBackendConfig, capabilities?: IBackendCapabilities): IAnalyticalBackend;

/**
 * Recorded backend allows convenient programmatic configuration of some services outcomes.
 *
 * @internal
 */
export declare type RecordedBackendConfig = IAnalyticalBackendConfig & {
    /**
     * Specify settings that will be returned by any settings service (e.g. workspace settings)
     */
    globalSettings?: ISettings;
    /**
     * Specify color palette to return
     */
    globalPalette?: IColorPalette;
    /**
     * Specify date filter config to return. If not specified, then the date filter config
     * resolves empty result.
     */
    dateFilterConfig?: IDateFilterConfig;
    /**
     * Specify descriptor for workspace
     */
    workspaceDescriptor?: Partial<Pick<IWorkspaceDescriptor, "title" | "description" | "isDemo">>;
    /**
     * Specify theme to return
     */
    theme?: ITheme;
    /**
     * Specify which ref type should be added to recorded entities. Recording infrastructure does not
     * store 'ref'. Instead, the recorded backend can return refs as either uri or identifier, thus allowing
     * to simulate behavior of the different backend types.
     *
     * Note: this is currently implemented for executions and insights. it is not yet supported in catalog
     *
     * Default: 'uri'
     */
    useRefType?: RecordedRefType;
    /**
     * Specify validator that returns boolean for provided URL value and validation context type.
     *
     * The backend responds with `true` for every validation request when this custom validator is not setup.
     */
    securitySettingsUrlValidator?: SecuritySettingsUrlValidator;
    /**
     * Specify validator that returns boolean for provided plugin URL value and workspace where the plugin is being loaded.
     *
     * The backend responds with `true` for every validation request when this custom validator is not setup.
     */
    securitySettingsPluginUrlValidator?: SecuritySettingsPluginUrlValidator;
    /**
     * Specify function that builds organization scope from organization ID.
     *
     * The scope accessible on `ISecuritySettingsService` is constructed as `/gdc/domains/${organizationId}`
     * when this custom factory is not setup.
     */
    securitySettingsOrganizationScope?: SecuritySettingsOrganizationScope;
    /**
     * Specify responses to the getCommonAttributes calls. The key of the map MUST be created using the {@link objRefsToStringKey} function.
     */
    getCommonAttributesResponses?: Record<string, ObjRef[]>;
    /**
     * Specify functions to apply on different types of catalog items when determining item availability.
     */
    catalogAvailability?: {
        availableAttributes?: (attributes: ICatalogAttribute[]) => ICatalogAttribute[];
        availableMeasures?: (measures: ICatalogMeasure[]) => ICatalogMeasure[];
        availableFacts?: (facts: ICatalogFact[]) => ICatalogFact[];
        availableDateDatasets?: (datasets: ICatalogDateDataset[]) => ICatalogDateDataset[];
        availableAttributeHierarchies?: (attributeHierarchies: ICatalogAttributeHierarchy[]) => ICatalogAttributeHierarchy[];
    };
    /**
     * Specify currently authenticated user or workspace users or groups or access to the objects
     */
    userManagement?: IUserManagement;
    /**
     * Specify how attribute elements should be filtered when using limiting measures or filters.
     */
    attributeElementsFiltering?: AttributeElementsFiltering;
};

/**
 * Creates a new data view facade for the provided recording. If the recording contains multiple sets of dataViews
 * (e.g. for different windows etc), then it is possible to provide dataViewId to look up the particular view. By default,
 * the data view with all data is wrapped in the facade.
 *
 * The returned view is linked to a valid result; calling transform() returns an instance of prepared execution which
 * is executable as-is (and leads to the same result). However any modification to this prepared execution would
 * lead a NO_DATA errors (because that different data is not included in the index)
 *
 * @remarks see {@link dataViewWindow}
 *
 * @param recording - recording (as obtained from the index, typically using the Scenario mapping)
 * @param dataViewId - Identifier of the data view; defaults to view with all data
 * @param resultRefType - Specify what types of refs should the backend create in the result's dimension descriptors (uri refs returned by bear, id refs returned by tiger)
 * @internal
 */
export declare function recordedDataView(recording: ScenarioRecording, dataViewId?: string, resultRefType?: RecordedRefType): IDataView;

/**
 * Given recording index with executions, this function will return named DataView instances for executions
 * that match the following criteria:
 *
 * 1.  Executions specify test scenarios to which they belong - the test scenarios are used to obtain
 *     name of the data view
 *
 * 2.  Executions contain `DataViewAll` recording = all data for the test scenario.
 *
 * @param recordings - recording index (as created by mock-handling tooling)
 * @returns list of named data views; names are derived from test scenarios to which the data views belong
 * @internal
 */
export declare function recordedDataViews(recordings: RecordingIndex): NamedDataView[];

/**
 * Given insight recording (as accessible through Recordings.Insights), this function returns instance of IInsight.
 *
 * @param recording - insight recording
 * @param refType - ref type to have in the insight, default is uri
 * @internal
 */
export declare function recordedInsight(recording: InsightRecording, refType?: RecordedRefType): IInsight;

/**
 * Given recording index with insight metadata, this function will return IInsight objects for every recording there.
 *
 * @param recordings - recording index (as created by mock-handling tooling)
 * @param refType - ref type to have in the insight, default is uri
 * @internal
 */
export declare function recordedInsights(recordings: RecordingIndex, refType?: RecordedRefType): IInsight[];

/**
 * @internal
 */
export declare type RecordedRefType = "id" | "uri";

/**
 * @internal
 */
export declare type RecordingIndex = {
    executions?: {
        [fp: string]: ExecutionRecording;
    };
    metadata?: {
        catalog?: CatalogRecording;
        displayForms?: Record<string, DisplayFormRecording>;
        insights?: Record<string, InsightRecording>;
        visClasses?: VisClassesRecording;
        dashboards?: Record<string, DashboardRecording>;
    };
};

/**
 * @internal
 */
export declare type ScenarioRecording = {
    execution: ExecutionRecording;
    scenarioIndex: number;
};

/**
 * @internal
 */
export declare type SecuritySettingsOrganizationScope = (organizationId: string) => string;

/**
 * @internal
 */
export declare type SecuritySettingsPluginUrlValidator = (url: string, workspace: string) => boolean;

/**
 * @internal
 */
export declare type SecuritySettingsUrlValidator = (url: string, context: ValidationContext) => boolean;

/**
 * @internal
 */
export declare type VisClassesRecording = {
    items: IVisualizationClass[];
};

export { }
