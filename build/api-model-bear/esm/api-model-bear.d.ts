/**
 * This package provides TypeScript definitions for the types of the REST API requests and responses on the GoodData platform.
 * It also provides functions that operate on those objects directly.
 *
 * @remarks
 * This is a companion package of `@gooddata/api-client-bear` that implements the actual client and uses
 * the types and functions implemented here. You should almost never need to use this package directly.
 *
 * @packageDocumentation
 */

/**
 * @public
 */
export declare type AbsoluteType = "absolute";

/**
 * @public
 */
export declare type ArithmeticMeasureOperator = "sum" | "difference" | "multiplication" | "ratio" | "change";

/**
 * @public
 */
export declare type AttributeElements = string[] | IAttributeElementsByRef | IAttributeElementsByValue;

/**
 * @public
 */
export declare type AttributeFilterItem = IPositiveAttributeFilter | INegativeAttributeFilter;

/**
 * @public
 */
export declare type AttributeFilterSelectionMode = "single" | "multi";

/**
 * @public
 */
export declare type BooleanAsString = "1" | "0";

/**
 * @public
 */
export declare type BucketItem = IVisualizationObjectMeasure | IVisualizationObjectAttribute;

/**
 * @public
 */
export declare type CatalogItem = ICatalogAttribute | ICatalogMetric | ICatalogFact;

/**
 * @public
 */
export declare type CatalogItemType = "attribute" | "metric" | "fact" | "attributeHierarchy";

/**
 * @public
 */
export declare type ComparisonConditionOperator = "GREATER_THAN" | "GREATER_THAN_OR_EQUAL_TO" | "LESS_THAN" | "LESS_THAN_OR_EQUAL_TO" | "EQUAL_TO" | "NOT_EQUAL_TO";

/**
 * @public
 */
export declare type CompatibilityFilter = IExpressionFilter | ExtendedFilter;

/**
 * @public
 */
export declare type DashboardDateFilterConfigMode = "readonly" | "hidden" | "active";

/**
 * Represents type of LDM field created from the Dataset column.
 *
 * @public
 */
export declare type DataColumnType = "ATTRIBUTE" | "FACT" | "DATE";

/**
 * Represents the current status of CSV source.
 *
 * @public
 */
export declare type DatasetLoadStatus = "RUNNING" | "OK" | "ERROR" | "CANCELLED" | "ERROR_METADATA" | "REFRESHING";

/**
 * @public
 */
export declare type DataUploadStatus = "PREPARED" | "RUNNING" | "OK" | "ERROR" | "WARNING";

/**
 * @public
 */
export declare type DataValue = null | string | number;

/**
 * @public
 */
export declare type DateFilterGranularity = "GDC.time.minute" | "GDC.time.hour" | "GDC.time.date" | "GDC.time.week_us" | "GDC.time.month" | "GDC.time.quarter" | "GDC.time.year";

/**
 * @public
 */
export declare type DateFilterItem = IAbsoluteDateFilter | IRelativeDateFilter;

/**
 * @public
 */
export declare type DateFilterType = RelativeType | AbsoluteType;

/**
 * @public
 */
export declare type DateString = string;

/**
 * @public
 */
export declare type DrillFromType = IDrillFromMeasure | IDrillFromAttribute;

/**
 * @public
 */
export declare type Email = string;

/**
 * @public
 */
export declare type ExportFormat = "xls" | "pdf" | "html" | "csv" | "xlsx";

/**
 * @public
 */
export declare type ExtendedFilter = FilterItem | IMeasureValueFilter | IRankingFilter;

/**
 * @public
 */
export declare type FilterContextItem = IFilterContextAttributeFilter | IFilterContextDateFilter;

/**
 * @public
 */
export declare type FilterItem = DateFilterItem | AttributeFilterItem;

/**
 * @public
 */
export declare function getAttributesDisplayForms(mdObject: IVisualizationObjectContent): string[];

/**
 * Generated unique identification string that is not subject to change during project copying.
 * @public
 */
export declare type GUID = string;

/**
 * @public
 */
export declare interface IAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet: ObjQualifier;
        from: string;
        to: string;
    };
}

/**
 * @public
 */
export declare interface IAccountInfo {
    login: string;
    loginMD5: string;
    firstName: string;
    lastName: string;
    organizationName: string;
    profileUri: string;
    logoutUri: string;
}

/**
 * @public
 */
export declare interface IAccountInfoResponse {
    accountInfo: IAccountInfo;
}

/**
 * @public
 */
export declare interface IAccountSetting {
    login?: Email | null;
    email?: Email | null;
    licence?: BooleanAsString;
    firstName: string;
    lastName: string;
    companyName?: string | null;
    position?: string | null;
    created?: Timestamp;
    updated?: Timestamp;
    timezone?: number | null;
    country?: string | null;
    phoneNumber?: string | null;
    old_password?: string;
    password?: string;
    verifyPassword?: string;
    authenticationModes?: Array<"SSO" | "PASSWORD">;
    ssoProvider?: string | null;
    language?: string;
    ipWhitelist?: string[] | null;
    effectiveIpWhitelist?: string[] | null;
    links?: {
        projects?: Uri;
        self?: Uri;
        domain?: Uri;
        auditEvents?: Uri;
    };
    formatLocale?: string;
}

/**
 * @public
 */
export declare interface IAdHocItemDescription {
    expression: string;
}

/**
 * @public
 */
export declare interface IAfm {
    attributes?: IAttribute[];
    measures?: IMeasure[];
    filters?: CompatibilityFilter[];
    nativeTotals?: INativeTotalItem[];
}

/**
 * @public
 */
export declare interface IAnalyticalDashboard {
    content: IAnalyticalDashboardContent;
    meta: IObjectMeta;
}

/**
 * @public
 */
export declare interface IAnalyticalDashboardContent {
    widgets: string[];
    filterContext?: string;
    layout?: Layout;
    dateFilterConfig?: IDashboardDateFilterConfig;
    plugins?: IDashboardPluginLink[];
}

/**
 * @public
 */
export declare interface IArithmeticMeasure {
    measureIdentifiers: Identifier[];
    operator: ArithmeticMeasureOperator;
}

/**
 * @public
 */
export declare interface IArithmeticMeasureDefinition {
    arithmeticMeasure: IArithmeticMeasure;
}

/**
 * @public
 */
export declare interface IAssociatedProjectPermissions {
    associatedPermissions: IProjectPermissions;
}

/**
 * @public
 */
export declare interface IAttribute {
    localIdentifier: Identifier;
    displayForm: ObjQualifier;
    alias?: string;
}

/**
 * @public
 */
export declare interface IAttributeDisplayForm extends IMetadataObject {
    content: {
        expression: MaqlExpression;
        formOf: Uri;
        ldmexpression?: string;
        type?: string;
        default?: number;
    };
    links: {
        self: string;
        elements: string;
    };
}

/**
 * @public
 */
export declare interface IAttributeElement {
    uri: string;
    title: string;
}

/**
 * @public
 */
export declare interface IAttributeElementsByRef {
    uris: string[];
}

/**
 * @public
 */
export declare interface IAttributeElementsByValue {
    values: string[];
}

/**
 * @public
 */
export declare interface IAttributeFilterReference {
    attributeFilterReference: {
        displayForm: string;
    };
}

/**
 * @public
 */
export declare interface IAttributeHeader {
    attributeHeader: {
        uri: string;
        identifier: string;
        localIdentifier: string;
        name: string;
        totalItems?: ITotalHeaderItem[];
        formOf: {
            uri: string;
            identifier: string;
            name: string;
        };
    };
}

/**
 * @public
 */
export declare interface IAttributeLocatorItem {
    attributeLocatorItem: {
        attributeIdentifier: Identifier;
        element: string;
    };
}

/**
 * @public
 */
export declare interface IAttributeSortItem {
    attributeSortItem: {
        direction: SortDirection;
        attributeIdentifier: Identifier;
        aggregation?: "sum";
    };
}

/**
 * @public
 */
export declare interface IBaseExportConfig {
    /**
     * Specify title of the exported file.
     */
    title?: string;
    /**
     * Specify format of the exported file (default CSV).
     */
    format?: "xlsx" | "csv" | "raw";
    /**
     * When exporting to XLSX, specify whether to merge table headers or not.
     */
    mergeHeaders?: boolean;
}

/**
 * @public
 */
export declare interface IBearPaging {
    offset: number;
    count: number;
    limit: number;
}

/**
 * @public
 */
export declare interface IBearPagingWithTotalCount extends IBearPaging {
    totalCount: number;
}

/**
 * @public
 */
export declare interface IBootstrapResource {
    bootstrapResource: {
        accountSetting: IAccountSetting;
        profileSetting: IProfileSetting;
        hostnameBase: string;
        settings?: IUISettings;
        current?: {
            mapboxToken?: string;
            project: IProject | null;
            projectLcm?: IProjectLcm;
            featureFlags?: IFeatureFlags;
            projectPermissions: IProjectPermissions | null;
            projectTemplates: ITemplateInfo[] | null;
            projectIcons: IProjectIcons[] | null;
            dataUploadsInfo: IDataUploadInfo | null;
            loginMD5: string | null;
            integrations: Array<IIntegration | IZendesk4Integration>;
            projectStyleSettings?: IStyleSettingsType | null;
            clusterStatus?: "ONLINE" | "OFFLINE";
            requiresRedirect: boolean;
            timezone: ITimezoneInfo | null;
            analyticalDashboards?: Uri[] | null;
            walkMe?: string | null;
            walkMeEnvironment?: string | null;
            includeTrialSnippet?: string | null;
            clientSecret?: string;
            user?: {
                passwordExpirationTimestamp?: DateString;
            };
        };
    };
}

/**
 * @public
 */
export declare interface IBucket {
    localIdentifier?: Identifier;
    items: BucketItem[];
    totals?: ITotal[];
}

/**
 * @public
 */
export declare interface ICatalogAttribute extends ICatalogItemBase {
    readonly type: "attribute";
    readonly links: {
        readonly self: string;
        readonly defaultDisplayForm: string;
        readonly geoPinDisplayForms?: string[];
    };
}

/**
 * @public
 */
export declare interface ICatalogFact extends ICatalogItemBase {
    readonly type: "fact";
}

/**
 * @public
 */
export declare interface ICatalogGroup {
    readonly title: string;
    readonly identifier: string;
}

/**
 * @public
 */
export declare interface ICatalogItemBase {
    readonly type: CatalogItemType;
    readonly title: string;
    readonly identifier: string;
    readonly summary: string;
    readonly production: boolean;
    readonly groups?: string[];
    readonly links: {
        self: string;
    };
}

/**
 * @public
 */
export declare interface ICatalogMetric extends ICatalogItemBase {
    readonly type: "metric";
    readonly expression: string;
    readonly format: string;
}

/**
 * @public
 */
export declare interface IColumnsAndDefinitions {
    columns: string[];
    definitions: Array<{
        metricDefinition: {
            identifier: string;
            uri: string;
        };
    }>;
}

/**
 * @public
 */
export declare interface IComparisonCondition {
    comparison: {
        operator: ComparisonConditionOperator;
        value: number;
        treatNullValuesAs?: number;
    };
}

/**
 * @public
 */
export declare interface IDashboardAttachment {
    dashboardAttachment: {
        uri: Uri;
        allTabs?: boolean;
        tabs: string[];
        executionContext?: Uri;
    };
}

/**
 * @public
 */
export declare interface IDashboardDateFilterAddedPresets {
    absolutePresets?: IDateFilterAbsolutePreset[];
    relativePresets?: IDateFilterRelativePreset[];
}

/**
 * @public
 */
export declare interface IDashboardDateFilterConfig {
    filterName: string;
    mode: DashboardDateFilterConfigMode;
    hideOptions?: GUID[];
    hideGranularities?: DateFilterGranularity[];
    addPresets?: IDashboardDateFilterAddedPresets;
}

/**
 * @public
 */
export declare interface IDashboardPlugin {
    content: IDashboardPluginContent;
    meta: IObjectMeta;
}

/**
 * @public
 */
export declare interface IDashboardPluginContent {
    url: string;
}

/**
 * @public
 */
export declare interface IDashboardPluginLink {
    type: string;
    parameters?: string;
}

/**
 * Dataset column with name, type and boolean flag whether the column
 * needs to be skipped while data loading or not.
 *
 * @public
 */
export declare interface IDataColumn {
    column: {
        name: string;
        type: DataColumnType;
        skip?: boolean;
        format?: string;
    };
}

/**
 * Structural information about CSV header and columns. Indicates whether the CSV file
 * contains header or not and on which row. Also contains the list of CSV columns with
 * their names and types.
 *
 * @public
 */
export declare interface IDataHeader {
    headerRowIndex?: number;
    columns: IDataColumn[];
}

/**
 * @public
 */
export declare interface IDataSet {
    meta: IObjectMeta;
    content: IDataSetContent;
    links?: {
        dataUploads: Uri | null;
        uploadConfiguration?: Uri;
    };
}

/**
 * Dataset describes a particular structure of dataset (CSV file). There may be many Loads
 * related to a single dataset - meaning multiple files with the same structure and different data.
 *
 * @public
 */
export declare interface IDataset {
    dataset: {
        name: string;
        dataHeader: IDataHeader;
        datasetId: string;
        loadedRowCount: number;
        datasetLoadStatus: DatasetLoadStatus;
        firstSuccessfulUpdate?: IDatasetLoadInfo;
        lastSuccessfulUpdate?: IDatasetLoadInfo;
        lastUpdate?: IDatasetLoadInfo;
    };
}

/**
 * @public
 */
export declare interface IDataSetContent {
    attributes: Uri[];
    facts: Uri[];
    dataLoadingColumns: Uri[];
    mode: "SLI" | "DLI" | "";
    urn?: string;
    identifierPrefix?: string;
    titleSuffix?: string;
    ties: Uri[];
    hasUploadConfiguration?: BooleanAsString;
    customUploadTimestamp?: number;
    customUploadIdentifier?: string;
    customUploadState?: string;
}

/**
 * Object wrapping basic information (owner, date created, status) about a CSV Load.
 *
 * @public
 */
export declare interface IDatasetLoadInfo {
    owner: IDatasetUser;
    status: DatasetLoadStatus;
    created: string;
}

/**
 * @public
 */
export declare interface IDatasetsResponse {
    datasets: {
        items: IDataset[];
    };
}

/**
 * Object wrapping info about the user that created CSV load. Contains their login and full name.
 *
 * @public
 */
export declare interface IDatasetUser {
    login: string;
    fullName: string;
    profileUri: string;
}

/**
 * @public
 */
export declare interface IDataUploadInfo {
    statusesCount: {
        [status in DataUploadStatus]?: number;
    };
}

/**
 * TODO: SDK8 add docs
 *
 * @public
 */
export declare interface IDateDataSet {
    relevance: number;
    availableDateAttributes?: IDateDataSetAttribute[];
    meta: IObjectMeta;
}

/**
 * TODO: SDK8 add docs
 *
 * @public
 */
export declare interface IDateDataSetAttribute {
    attributeMeta: IObjectMeta;
    defaultDisplayFormMeta: IObjectMeta;
    type: IDateDataSetAttributeGranularity;
}

/**
 * @public
 */
export declare type IDateDataSetAttributeGranularity = "GDC.time.year" | "GDC.time.week_us" | "GDC.time.week_in_year" | "GDC.time.week_in_quarter" | "GDC.time.week" | "GDC.time.euweek_in_year" | "GDC.time.euweek_in_quarter" | "GDC.time.quarter" | "GDC.time.quarter_in_year" | "GDC.time.month" | "GDC.time.month_in_quarter" | "GDC.time.month_in_year" | "GDC.time.day_in_year" | "GDC.time.day_in_quarter" | "GDC.time.day_in_month" | "GDC.time.day_in_week" | "GDC.time.day_in_euweek" | "GDC.time.date";

/**
 * Response for POST \/gdc\/internal\/projects\/$\{projectId\}\/loadDateDatasets
 * @public
 */
export declare interface IDateDataSetResponse {
    dateDataSetsResponse: {
        dateDataSets: IDateDataSet[];
        unavailableDateDataSetsCount?: number;
    };
}

/**
 * @public
 */
export declare type IDateFilterAbsoluteForm = IDateFilterBase;

/**
 * @public
 */
export declare interface IDateFilterAbsolutePreset extends IDateFilterBase {
    from: DateString;
    to: DateString;
}

/**
 * @public
 */
export declare type IDateFilterAllTime = IDateFilterBase;

/**
 * @public
 */
export declare interface IDateFilterBase {
    localIdentifier: GUID;
    name?: string;
    visible: boolean;
}

/**
 * @public
 */
export declare interface IDateFilterConfig {
    meta: IObjectMeta;
    content: IDateFilterConfigContent;
}

/**
 * @public
 */
export declare interface IDateFilterConfigContent {
    selectedOption: GUID;
    allTime?: IDateFilterAllTime;
    absoluteForm?: IDateFilterAbsoluteForm;
    relativeForm?: IDateFilterRelativeForm;
    absolutePresets?: IDateFilterAbsolutePreset[];
    relativePresets?: IDateFilterRelativePreset[];
}

/**
 * @public
 */
export declare interface IDateFilterReference {
    dateFilterReference: {
        dataSet: string;
    };
}

/**
 * @public
 */
export declare interface IDateFilterRelativeForm extends IDateFilterBase {
    granularities: DateFilterGranularity[];
}

/**
 * @public
 */
export declare interface IDateFilterRelativePreset extends IDateFilterBase {
    from: number;
    to: number;
    granularity: DateFilterGranularity;
}

/**
 * @public
 */
export declare type Identifier = string;

/**
 * @public
 */
export declare interface IDimension {
    itemIdentifiers: Identifier[];
    totals?: ITotalItem[];
}

/**
 * @public
 */
export declare type IDrillDefinition = IDrillToVisualization | IDrillToDashboard | IDrillToCustomUrl | IDrillToAttributeUrl;

/**
 * @public
 */
export declare interface IDrillFromAttribute {
    drillFromAttribute: ILocalIdentifierQualifier;
}

/**
 * @public
 */
export declare interface IDrillFromMeasure {
    drillFromMeasure: ILocalIdentifierQualifier;
}

/**
 * @public
 */
export declare interface IDrillToAttributeUrl {
    drillToAttributeUrl: {
        target: "new-window";
        from: DrillFromType;
        insightAttributeDisplayForm: IObjUriQualifier;
        drillToAttributeDisplayForm: IObjUriQualifier;
    };
}

/**
 * @public
 */
export declare interface IDrillToCustomUrl {
    drillToCustomUrl: {
        target: "new-window";
        from: DrillFromType;
        customUrl: string;
    };
}

/**
 * @public
 */
export declare interface IDrillToDashboard {
    drillToDashboard: {
        target: "in-place";
        from: DrillFromType;
        toDashboard?: Identifier;
    };
}

/**
 * @public
 */
export declare interface IDrillToVisualization {
    drillToVisualization: {
        target: "pop-up";
        from: DrillFromType;
        toVisualization: IObjUriQualifier;
    };
}

/**
 * @public
 */
export declare interface IError extends Error {
    response: Response;
}

/**
 * @public
 */
export declare interface IExecution {
    execution: {
        afm: IAfm;
        resultSpec?: IResultSpec;
    };
}

/**
 * @public
 */
export declare interface IExecutionResponse {
    links: {
        executionResult: string;
    };
    dimensions: IResultDimension[];
}

/**
 * Combination of both AFM executions responses
 *
 * `null` value as executionResult means empty response (HTTP 204)
 * @public
 */
export declare interface IExecutionResponses {
    executionResponse: IExecutionResponse;
    executionResult: IExecutionResult | null;
}

/**
 * @public
 */
export declare interface IExecutionResponseWrapper {
    executionResponse: IExecutionResponse;
}

/**
 * @public
 */
export declare interface IExecutionResult {
    headerItems?: IResultHeaderItem[][][];
    data: DataValue[][] | DataValue[];
    totals?: DataValue[][][];
    totalTotals?: DataValue[][][];
    paging: {
        count: number[];
        offset: number[];
        total: number[];
    };
    warnings?: Warning[];
}

/**
 * @public
 */
export declare interface IExecutionResultWrapper {
    executionResult: IExecutionResult;
}

/**
 * @public
 */
export declare interface IExportConfig extends IBaseExportConfig {
    /**
     * Indicate whether filters from the AFM should be included as meta-information in the
     * exported XSLX.
     */
    showFilters?: boolean;
    /**
     * When `showFilters` is true, then include AFM that was used to create execution whose data are being
     * exported.
     */
    afm?: IAfm;
}

/**
 * Result of export is an object URL pointing to a Blob of downloaded data attached to the current
 * window instance. The result also contains name of the downloaded file provided by the backend export
 * service.
 *
 * {@link URL#revokeObjectURL} method must be used when object URL is no longer needed to release
 * the blob memory.
 *
 * @public
 */
export declare interface IExportResponse {
    /** URI from which can the export be fetched again */
    uri: string;
    /** Object URL pointing to the downloaded blob of exported data */
    objectUrl: string;
    /** Name of the exported file provided by the export service */
    fileName?: string;
}

/**
 * @public
 * @deprecated Expression filter in AFM can be used only by legacy code
 */
export declare interface IExpressionFilter {
    expression: {
        value: string;
    };
}

/**
 * @public
 */
export declare interface IFact extends IMetadataObject {
    content: any;
}

/**
 * @public
 */
export declare interface IFeatureFlags {
    [key: string]: number | boolean | string;
}

/**
 * @public
 */
export declare interface IFilterContext {
    meta: IObjectMeta;
    content: {
        filters: FilterContextItem[];
    };
}

/**
 * @public
 */
export declare interface IFilterContextAttributeFilter {
    attributeFilter: {
        displayForm: string;
        negativeSelection: boolean;
        attributeElements: string[];
        localIdentifier?: string;
        title?: string;
        filterElementsBy?: Array<{
            filterLocalIdentifier: string;
            over: {
                attributes: Array<string>;
            };
        }>;
        selectionMode?: AttributeFilterSelectionMode;
    };
}

/**
 * @public
 */
export declare interface IFilterContextDateFilter {
    dateFilter: {
        type: DateFilterType;
        granularity: DateFilterGranularity;
        from?: DateString | NumberAsString;
        to?: DateString | NumberAsString;
        dataSet?: string;
        attribute?: string;
    };
}

/**
 * @public
 */
export declare interface IFluidLayout {
    fluidLayout: {
        rows: IFluidLayoutRow[];
        size?: IFluidLayoutSize;
        style?: string;
    };
}

/**
 * @public
 */
export declare interface IFluidLayoutColSize {
    xl: IFluidLayoutSize;
    xs?: IFluidLayoutSize;
    sm?: IFluidLayoutSize;
    md?: IFluidLayoutSize;
    lg?: IFluidLayoutSize;
}

/**
 * @public
 */
export declare interface IFluidLayoutColumn {
    content?: LayoutContent;
    size: IFluidLayoutColSize;
    style?: string;
}

/**
 * @public
 */
export declare interface IFluidLayoutRow {
    columns: IFluidLayoutColumn[];
    style?: string;
    header?: SectionHeader;
}

/**
 * @public
 */
export declare interface IFluidLayoutSize {
    width: number;
    height?: number;
    heightAsRatio?: number;
}

/**
 * Request params for GET /gdc/userGroups?project=\{projectId\} /gdc/projects/\{projectId\}/obj/\{objectId\}/grantees
 * @alpha
 */
export declare interface IGetGranteesParams {
    permission?: Permission;
}

/**
 * Response for GET /gdc/userGroups?project=\{projectId\} /gdc/projects/\{projectId\}/obj/\{objectId\}/grantees
 * @alpha
 */
export declare interface IGetGranteesResponse {
    grantees: {
        items: IGranteeEntry[];
    };
}

/**
 * @public
 */
export declare interface IGetObjectsUsedByManyEntry {
    uri: Uri;
    entries: IObjectLink[];
}

/**
 * @public
 */
export declare interface IGetObjectUsedBy {
    entries: IObjectLink[];
}

/**
 * @public
 */
export declare interface IGetObjectUsing {
    entries: IObjectLink[];
}

/**
 * @public
 */
export declare interface IGetObjectUsingManyEntry {
    uri: Uri;
    entries: IObjectLink[];
}

/**
 * Request params for GET /gdc/userGroups?project=\{projectId\}
 * @alpha
 */
export declare interface IGetUserGroupsParams {
    /**
     * Sets starting point for the query.
     * DANGER: It is groupId of group which should be first in the result, not the numeric index.
     */
    offset?: string;
    /**
     * Sets number of items to return per page
     */
    limit?: number;
}

/**
 * Response for GET /gdc/userGroups?project=\{projectId\}
 * @alpha
 */
export declare interface IGetUserGroupsResponse {
    userGroups: {
        paging: {
            offset?: number | null;
            limit: number;
            next?: Uri | null;
        };
        items: IWrappedUserGroupItem[];
    };
}

/**
 * Request params for GET /gdc/project/\{projectId\}/userlist
 * @public
 */
export declare interface IGetUserListParams {
    /**
     * Sets starting point for the query. Backend WILL return no data if the offset is greater than
     * total number of items
     */
    offset?: number;
    /**
     * Sets number of items to return per page
     */
    limit?: number;
    /**
     * Structured prefix filter
     * - disjunctions are separated by colon (',')
     * - conjunctions are separated by space (' ')
     * - basic form match, if it matches as prefix to any of firstName, lastName and email
     */
    prefixSearch?: string;
    /**
     * Get only active / inactive / pending users
     * Default: "ACTIVE"
     */
    userState: UserListItemState;
    /**
     * Get only users of particular group
     * - empty string means to filter users not assigned to any group
     */
    groupId?: string;
    /**
     * When specified, each user list item will contain a flag that indicates
     * whether the particular user has the permission specified here or not.
     */
    indicatePermission?: string;
}

/**
 * Response for GET /gdc/project/\{projectId\}/userlist
 * @public
 */
export declare interface IGetUserListResponse {
    userList: {
        paging: {
            offset?: number | null;
            limit: number;
            next?: Uri | null;
            count: number;
            totalCount: number;
        };
        items: IUserListItem[];
    };
}

/**
 * @alpha
 */
export declare interface IGranteeEntry {
    aclEntry: {
        permission: Permission;
        grantee: IGranteeUserInfo | IGranteeUserGroupInfo;
    };
}

/**
 * @alpha
 */
export declare interface IGranteeUserGroupInfo {
    userGroup: IUserGroupItem;
}

/**
 * @alpha
 */
export declare interface IGranteeUserInfo {
    user: IUsersItem;
}

/**
 * @public
 */
export declare interface IGridContent {
    sort: IGridContent;
    columnWidths: any[];
    columns: string[];
    metrics: IGridContentMetrics[];
    rows: IGridContentRow[];
}

/**
 * @public
 */
export declare interface IGridContentMetrics {
    alias: string;
    uri: Uri;
}

/**
 * @public
 */
export declare interface IGridContentRow {
    attribute: IGridContentRowAttribute;
}

/**
 * @public
 */
export declare interface IGridContentRowAttribute {
    alias: string;
    totals: any[][];
    uri: Uri;
}

/**
 * @public
 */
export declare type IHeader = IMeasureGroupHeader | IAttributeHeader;

/**
 * @public
 */
export declare interface IIntegration {
    projectTemplate: Uri;
    active: boolean;
}

/**
 * @public
 */
export declare interface IKPI {
    meta: IObjectMeta;
    content: IKpiContentWithoutComparison | IKpiContentWithComparison;
}

/**
 * @public
 */
export declare interface IKpiAlert extends IMetadataObject {
    content: {
        kpi: Uri;
        /**
         * KPI can be on more dashboards - we need to distinguish
         * which dashboard can be used as link in dashboard alerting email
         */
        dashboard: Uri;
        threshold: number;
        isTriggered: boolean;
        whenTriggered: "underThreshold" | "aboveThreshold";
        filterContext?: Uri;
    };
}

/**
 * @public
 */
export declare type IKpiComparisonDirection = "growIsGood" | "growIsBad";

/**
 * @public
 */
export declare type IKpiComparisonTypeComparison = "previousPeriod" | "lastYear";

/**
 * @public
 */
export declare type IKpiComparisonTypeNoComparison = "none";

/**
 * @public
 */
export declare interface IKpiConfiguration {
    description?: IKpiDescriptionConfiguration;
}

/**
 * @public
 */
export declare interface IKpiContentBase {
    metric: string;
    ignoreDashboardFilters: Array<IDateFilterReference | IAttributeFilterReference>;
    drillTo?: IKpiProjectDashboardLink;
    dateDimension?: string;
    dateDataSet?: string;
    configuration?: IKpiConfiguration;
}

/**
 * @public
 */
export declare interface IKpiContentWithComparison extends IKpiContentBase {
    comparisonType: IKpiComparisonTypeComparison;
    comparisonDirection: IKpiComparisonDirection;
}

/**
 * @public
 */
export declare interface IKpiContentWithoutComparison extends IKpiContentBase {
    comparisonType: IKpiComparisonTypeNoComparison;
}

/**
 * @public
 */
export declare interface IKpiDashboardAttachment {
    kpiDashboardAttachment: {
        uri: Uri;
        format: "pdf";
        filterContext?: Uri;
    };
}

/**
 * @public
 */
export declare interface IKpiDescriptionConfiguration {
    /**
     * Whether description should be visible or not
     */
    visible: boolean;
    /**
     * Whether description should be used from kpi or inherited from its metric
     */
    source: KpiDescriptionSourceType;
}

/**
 * @public
 */
export declare interface IKpiProjectDashboardLink {
    projectDashboard: string;
    projectDashboardTab: string;
}

/**
 * request params for POST /gdc/internal/projects/$\{projectId\}/catalog/query
 * @public
 */
export declare interface ILoadAvailableCatalogItemsParams {
    catalogQueryRequest: {
        bucketItems: ItemDescription[];
        types?: CatalogItemType[];
    };
}

/**
 * response for POST /gdc/internal/projects/$\{projectId\}/catalog/query
 * @public
 */
export declare interface ILoadAvailableCatalogItemsResponse {
    catalogAvailableItems: {
        items: string[];
    };
}

/**
 * request params for GET /gdc/internal/projects/$\{projectId\}/catalog/groups
 * @public
 */
export declare interface ILoadCatalogGroupsParams {
    readonly includeWithTags?: string[];
    readonly excludeWithTags?: string[];
    readonly production?: 1 | 0;
    readonly csvDataSets?: string[];
}

/**
 * response for GET /gdc/internal/projects/$\{projectId\}/catalog/groups
 * @public
 */
export declare interface ILoadCatalogGroupsResponse {
    catalogGroups: ICatalogGroup[];
}

/**
 * request params for GET /gdc/internal/projects/$\{projectId\}/catalog/items
 * @public
 */
export declare interface ILoadCatalogItemsParams {
    readonly types?: CatalogItemType[];
    readonly offset?: number;
    readonly limit?: number;
    readonly includeWithTags?: string[];
    readonly excludeWithTags?: string[];
    readonly production?: 1 | 0;
    readonly csvDataSets?: string[];
}

/**
 * response for GET /gdc/internal/projects/$\{projectId\}/catalog/items
 * @public
 */
export declare interface ILoadCatalogItemsResponse {
    catalogItems: {
        items: CatalogItem[];
        paging: {
            offset: number;
            limit: number;
        };
    };
}

/**
 * @public
 */
export declare interface ILoadDateDataSetsParams {
    bucketItems?: IVisualizationObjectContent;
    excludeObjectsWithTags?: string[];
    includeObjectsWithTags?: string[];
    dataSetIdentifier?: string;
    includeAvailableDateAttributes?: boolean;
    includeUnavailableDateDataSetsCount?: boolean;
    returnAllDateDataSets?: boolean;
    returnAllRelatedDateDataSets?: boolean;
    attributesMap?: Record<string, unknown>;
    includeDateGranularities?: string[];
}

/**
 * @public
 */
export declare interface ILocalIdentifierQualifier {
    localIdentifier: string;
}

/**
 * @public
 */
export declare interface IMaqlAstPosition {
    line: number;
    column: number;
}

/**
 * @public
 */
export declare interface IMaqlTree {
    type: string;
    value?: string | Date | number;
    position: IMaqlAstPosition;
    content?: IMaqlTree;
}

/**
 * @public
 */
export declare interface IMeasure {
    localIdentifier: Identifier;
    definition: MeasureDefinition;
    alias?: string;
    format?: string;
}

/**
 * @public
 */
export declare interface IMeasureContent {
    localIdentifier: Identifier;
    definition: VisualizationObjectMeasureDefinitionType;
    alias?: string;
    title?: string;
    format?: string;
}

/**
 * @public
 */
export declare interface IMeasureGroupHeader {
    measureGroupHeader: {
        items: IMeasureHeaderItem[];
        totalItems?: ITotalHeaderItem[];
    };
}

/**
 * @public
 */
export declare interface IMeasureHeaderItem {
    measureHeaderItem: {
        uri?: string;
        identifier?: string;
        localIdentifier: string;
        name: string;
        format: string;
    };
}

/**
 * @public
 */
export declare interface IMeasureLocatorItem {
    measureLocatorItem: {
        measureIdentifier: Identifier;
    };
}

/**
 * @public
 */
export declare interface IMeasureSortItem {
    measureSortItem: {
        direction: SortDirection;
        locators: LocatorItem[];
    };
}

/**
 * @public
 */
export declare interface IMeasureValueFilter {
    measureValueFilter: {
        measure: Qualifier;
        condition?: MeasureValueFilterCondition;
    };
}

/**
 * @public
 */
export declare interface IMetadataObject {
    meta: IObjectMeta;
}

/**
 * @public
 */
export declare interface IMetadataObjectAttribute extends IMetadataObject {
    content: {
        dimension?: string;
        displayForms: IAttributeDisplayForm[];
        type?: string;
        drillDownStepAttributeDF?: Uri;
        linkAttributeDF?: Uri;
    };
}

/**
 * @public
 */
export declare interface IMetadataObjectDataSet extends IMetadataObject {
    attributes: Uri[];
    dataLoadingColumns: Uri[];
    facts: Uri[];
    mode: string;
}

/**
 * @public
 */
export declare interface IMetadataObjectWrappedDataSet {
    dataSet: IMetadataObjectDataSet;
}

/**
 * @public
 */
export declare interface IMetric extends IMetadataObject {
    content: {
        expression: MaqlExpression;
        tree?: IMaqlTree;
        format?: string;
        folders?: string[];
    };
}

/**
 * @public
 */
export declare interface INativeTotalItem {
    measureIdentifier: Identifier;
    attributeIdentifiers: Identifier[];
}

/**
 * @public
 */
export declare interface INegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: AttributeElements;
    };
}

/**
 * @public
 */
export declare type IObject = IMetadataObjectAttribute | IMetric | IFact | IAttributeDisplayForm | IKpiAlert | IMetadataObjectDataSet | IPrompt | ITheme | IAnalyticalDashboard | IFilterContext | ITempFilterContext | IKPI | IScheduledMail | IProjectDashboard | IDateFilterConfig | IVisualizationWidget | IVisualizationObject | IVisualizationClass | IDataSet | IReport | IReportDefinition | IDashboardPlugin;

/**
 * @public
 */
export declare interface IObjectLink {
    link: Uri;
    title?: string;
    category?: ObjectCategory;
    summary?: string;
    tags?: string;
    author?: Uri;
    created?: Timestamp;
    contributor?: Uri;
    updated?: Timestamp;
    deprecated?: BooleanAsString;
    projectTemplate?: string;
    help?: Uri;
    identifier?: string;
    locked?: boolean;
    unlisted?: boolean;
    isProduction?: boolean;
    sharedWithSomeone?: boolean;
    flags?: string[];
}

/**
 * @public
 */
export declare interface IObjectMeta {
    category?: ObjectCategory;
    title: string;
    summary?: string;
    tags?: string;
    author?: string;
    contributor?: string;
    identifier?: string;
    uri?: string;
    deprecated?: "0" | "1";
    isProduction?: 1 | 0;
    created?: Timestamp;
    updated?: Timestamp;
    flags?: string[];
    locked?: boolean;
    projectTemplate?: string;
    sharedWithSomeone?: 1 | 0;
    unlisted?: 1 | 0;
}

/**
 * XREF entry is returned by using2 and usedBy2 resources. These contain limited subset of
 * fields.
 * @public
 */
export declare interface IObjectXrefEntry {
    category: string;
    /**
     * Link to profile of user who created the object
     */
    author: string;
    /**
     * Link to profile of user who last updated the object
     */
    contributor: string;
    /**
     * Date and time of creation (YYYY-MM-DD H:M:S)
     */
    created: string;
    /**
     * Deprecation indicator.
     *
     * String value containing 0 or 1.
     */
    deprecated: string;
    /**
     * Metadata object identifier
     */
    identifier: string;
    /**
     * Link to metadata object - objects URI
     */
    link: string;
    /**
     * Lock indicator. 0 if not locked, 1 if locked
     */
    locked: 0 | 1;
    /**
     * Metadata object description. May be empty string if no description
     */
    summary: string;
    /**
     * Metadata object title - human readable name.
     */
    title: string;
    /**
     * Indicates whether object is publicly listed or not.
     */
    unlisted: 0 | 1;
    /**
     * Date and time of last update (YYYY-MM-DD H:M:S)
     */
    updated: string;
}

/**
 * @public
 */
export declare interface IObjIdentifierQualifier {
    identifier: string;
}

/**
 * @public
 */
export declare interface IObjUriQualifier {
    uri: string;
}

/**
 * @public
 */
export declare interface IOrganization {
    organization: {
        id: string;
        name: string;
    };
}

/**
 * @public
 */
export declare interface IPersistedWidget {
    widget: {
        qualifier: ObjQualifier;
    };
}

/**
 * @public
 */
export declare interface IPopMeasure {
    measureIdentifier: Identifier;
    popAttribute: ObjQualifier;
}

/**
 * @public
 */
export declare interface IPopMeasureDefinition {
    popMeasure: IPopMeasure;
}

/**
 * @public
 */
export declare interface IPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: AttributeElements;
    };
}

/**
 * @public
 */
export declare interface IPreviousPeriodDateDataSet {
    dataSet: ObjQualifier;
    periodsAgo: number;
}

/**
 * @public
 */
export declare interface IPreviousPeriodMeasure {
    measureIdentifier: Identifier;
    dateDataSets: IPreviousPeriodDateDataSet[];
}

/**
 * @public
 */
export declare interface IPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: IPreviousPeriodMeasure;
}

/**
 * @public
 */
export declare interface IProcessBody {
    links: {
        self: Uri;
    };
    status: IStatus;
    started: TimeIso8601;
    finished: TimeIso8601;
}

/**
 * @public
 */
export declare interface IProfileSetting {
    currentProjectUri: Uri | null;
    releaseNotice: string[];
    hints: {
        [key: string]: boolean;
    };
    navigationState?: "collapsed" | "pinned" | "floating";
    projectSettings: {
        [projectUri: string]: {
            dashboard: Uri | null;
            tab: string | null;
            recentSearches: string[];
            introDisplayed?: boolean;
            manageReportsSettings?: {
                folder?: string;
                orderBy?: number;
                tags?: string[];
            };
        };
    };
    npsLastParticipation?: Timestamp;
    separators?: ISeparators;
    defaults?: {
        projectUri: string;
        dashboardUri?: string;
        tabId?: string;
        links?: {
            self: Uri;
        };
    };
    links?: {
        self: Uri;
        profile: Uri;
    };
}

/**
 * @public
 */
export declare interface IProject {
    meta: IObjectMeta;
    content: {
        guidedNavigation: BooleanAsString;
        authorizationToken?: string | null;
        state?: "PREPARING" | "PREPARED" | "LOADING" | "ENABLED" | "DISABLED" | "DELETED" | "ARCHIVED" | "MIGRATED";
        isPublic?: BooleanAsString;
        cluster?: string;
        driver?: "mysql" | "Pg" | "vertica";
        environment?: "PRODUCTION" | "DEVELOPMENT" | "TESTING";
    };
    links?: {
        self: Uri;
        users: Uri;
        userRoles?: Uri;
        userPermissions?: Uri;
        roles: Uri;
        invitations: Uri;
        ldm: Uri;
        ldm_thumbnail: Uri;
        metadata: Uri;
        publicartifacts: Uri;
        uploads?: Uri;
        templates: Uri;
        connectors: Uri;
        dataload: Uri;
        schedules: Uri;
        execute: Uri;
        clearCaches: Uri;
        projectFeatureFlags: Uri;
        config?: Uri;
    };
}

/**
 * @public
 */
export declare interface IProjectDashboard {
    content: {
        tabs: Array<{
            title: string;
            identifier: string;
        }>;
    };
    meta: IObjectMeta;
}

/**
 * @public
 */
export declare interface IProjectIcons {
    icon: string;
    integration: Uri;
}

/**
 * @public
 */
export declare interface IProjectId {
    projectId: string;
}

/**
 * @public
 */
export declare interface IProjectLcm {
    clientId?: string;
    dataProductId?: string;
    segmentId?: string;
}

/**
 * @public
 */
export declare interface IProjectLcmIdentifiers {
    projectLcm: {
        projectId?: string;
        dataProductId?: string;
        clientId?: string;
        segmentId?: string;
    };
}

/**
 * @public
 */
export declare interface IProjectPermissions {
    permissions: {
        [permission in ProjectPermission]?: BooleanAsString;
    };
    links?: {
        project: Uri;
        user: Uri;
    };
}

/**
 * @public
 */
export declare interface IPrompt extends IMetadataObject {
    content: {
        type: "scalar";
    } | {
        type: "filter";
        attribute: Uri;
    };
}

/**
 * @public
 */
export declare interface IRangeCondition {
    range: {
        operator: RangeConditionOperator;
        from: number;
        to: number;
        treatNullValuesAs?: number;
    };
}

/**
 * @public
 */
export declare interface IRankingFilter {
    rankingFilter: {
        measures: Qualifier[];
        attributes?: Qualifier[];
        operator: RankingFilterOperator;
        value: number;
    };
}

/**
 * @public
 */
export declare interface IReferenceItems {
    [identifier: string]: string;
}

/**
 * @public
 */
export declare interface IRelativeDateFilter {
    relativeDateFilter: {
        dataSet: ObjQualifier;
        granularity: string;
        from: number;
        to: number;
    };
}

/**
 * @public
 */
export declare interface IReport {
    meta: IObjectMeta;
    content: IReportContent;
}

/**
 * @public
 */
export declare interface IReportAttachment {
    reportAttachment: {
        uri?: Uri;
        formats: ExportFormat[];
        exportOptions?: IReportExportOptions;
    };
}

/**
 * @public
 */
export declare interface IReportContent {
    domains: Uri[];
    definitions: Uri[];
}

/**
 * @public
 */
export declare interface IReportDefinition {
    meta: IObjectMeta;
    content: IReportDefinitionContent;
    links?: IReportDefinitionLinks;
}

/**
 * @public
 */
export declare interface IReportDefinitionContent {
    format: ReportFormat;
    filters: IReportFilter[];
    chart?: any;
    oneNumber?: any;
    sortedLookups?: any;
    grid: IGridContent;
}

/**
 * @public
 */
export declare interface IReportDefinitionLinks {
    explain2?: string;
}

/**
 * @public
 */
export declare interface IReportExportOptions {
    pageOrientation?: "portrait" | "landscape";
    optimalColumnWidth?: "no" | "yes";
    mergeHeaders?: "no" | "yes";
    includeFilterContext?: "no" | "yes";
    urlParams: Array<{
        name: string;
        value: string;
    }>;
    scaling?: {
        pageScalePercentage?: number;
        scaleToPages?: number;
        scaleToPagesX?: number;
        scaleToPagesY?: number;
    };
}

/**
 * @public
 */
export declare interface IReportFilter {
    expression: any;
    tree?: any;
}

/**
 * @public
 */
export declare interface IResultAttributeHeaderItem {
    attributeHeaderItem: {
        uri: string;
        name: string;
    };
}

/**
 * @public
 */
export declare interface IResultDimension {
    headers: IHeader[];
}

/**
 * @public
 */
export declare type IResultHeaderItem = IResultAttributeHeaderItem | IResultMeasureHeaderItem | IResultTotalHeaderItem;

/**
 * @public
 */
export declare interface IResultMeasureHeaderItem {
    measureHeaderItem: {
        name: string;
        order: number;
    };
}

/**
 * @public
 */
export declare interface IResultSpec {
    dimensions?: IDimension[];
    sorts?: SortItem[];
}

/**
 * @public
 */
export declare interface IResultTotalHeaderItem {
    totalHeaderItem: {
        name: string;
        type: string;
    };
}

/**
 * @public
 */
export declare function isAbsoluteDateFilter(filter: CompatibilityFilter): filter is IAbsoluteDateFilter;

/**
 * @public
 */
export declare function isArithmeticMeasureDefinition(definition: MeasureDefinition): definition is IArithmeticMeasureDefinition;

/**
 * @public
 */
export declare function isAttributeDisplayForm(obj: unknown): obj is IAttributeDisplayForm;

/**
 * @public
 */
export declare function isAttributeElementsArray(attributeElements: AttributeElements): attributeElements is string[];

/**
 * @public
 */
export declare function isAttributeElementsByRef(attributeElements: AttributeElements): attributeElements is IAttributeElementsByRef;

/**
 * @public
 */
export declare function isAttributeElementsByValue(attributeElements: AttributeElements): attributeElements is IAttributeElementsByValue;

/**
 * @public
 */
export declare function isAttributeFilter(filter: CompatibilityFilter): filter is AttributeFilterItem;

/**
 * @public
 */
export declare const isAttributeFilterReference: (obj: unknown) => obj is IAttributeFilterReference;

/**
 * @public
 */
export declare function isAttributeHeader(header: IHeader): header is IAttributeHeader;

/**
 * @public
 */
export declare function isAttributeHeaderItem(header: IResultHeaderItem): header is IResultAttributeHeaderItem;

/**
 * @public
 */
export declare function isAttributeLocatorItem(locator: LocatorItem): locator is IAttributeLocatorItem;

/**
 * @public
 */
export declare function isAttributeSortItem(sortItem: SortItem): sortItem is IAttributeSortItem;

/**
 * @public
 */
export declare function isCatalogAttribute(obj: unknown): obj is ICatalogAttribute;

/**
 * @public
 */
export declare function isCatalogFact(obj: unknown): obj is ICatalogFact;

/**
 * @public
 */
export declare function isCatalogMetric(obj: unknown): obj is ICatalogMetric;

/**
 * @public
 */
export declare interface IScheduledMail {
    meta: IObjectMeta;
    content: IScheduledMailContent;
}

/**
 * @public
 */
export declare interface IScheduledMailContent {
    when: IScheduledMailWhen;
    to: Email[];
    bcc?: Email[];
    unsubscribed?: Email[];
    subject: string;
    body: string;
    attachments: ScheduledMailAttachment[];
    lastSuccessfull?: Timestamp;
}

/**
 * @public
 */
export declare interface IScheduledMailWhen {
    recurrency: string;
    startDate: DateString;
    timeZone: string;
    endDate?: DateString;
}

/**
 * @public
 */
export declare function isComparisonCondition(condition: MeasureValueFilterCondition): condition is IComparisonCondition;

/**
 * @public
 */
export declare function isDashboardPlugin(obj: unknown): obj is IWrappedDashboardPlugin;

/**
 * @public
 */
export declare function isDateFilter(filter: CompatibilityFilter): filter is DateFilterItem;

/**
 * @public
 */
export declare const isDateFilterReference: (obj: unknown) => obj is IDateFilterReference;

/**
 * @public
 */
export declare function isDrillFromAttribute(obj: DrillFromType): obj is IDrillFromAttribute;

/**
 * @public
 */
export declare function isDrillFromMeasure(obj: DrillFromType): obj is IDrillFromMeasure;

/**
 * @public
 */
export declare function isDrillToAttributeUrl(obj: unknown): obj is IDrillToAttributeUrl;

/**
 * @public
 */
export declare function isDrillToCustomUrl(obj: unknown): obj is IDrillToCustomUrl;

/**
 * @public
 */
export declare function isDrillToDashboard(obj: unknown): obj is IDrillToDashboard;

/**
 * @public
 */
export declare function isDrillToVisualization(obj: unknown): obj is IDrillToVisualization;

/**
 * @public
 */
export declare interface ISectionDescription {
    description: string;
}

/**
 * @public
 */
export declare interface ISectionHeader {
    title: string;
    description?: string;
}

/**
 * @public
 */
export declare interface ISeparators {
    decimal: string;
    thousand: string;
}

/**
 * Response for GET /gdc/account/profile/\{userId\}/settings/separators
 * @public
 */
export declare interface ISeparatorsResponse {
    separators: {
        decimal: string;
        thousand: string;
        links: {
            self: string;
        };
    };
}

/**
 * @public
 */
export declare function isExpressionFilter(filter: CompatibilityFilter): filter is IExpressionFilter;

/**
 * @public
 */
export declare function isFact(obj: unknown): obj is IFact;

/**
 * @public
 */
export declare function isFilterContext(obj: unknown): obj is IFilterContext;

/**
 * @public
 */
export declare function isFilterContextAttributeFilter(filter: FilterContextItem): filter is IFilterContextAttributeFilter;

/**
 * @public
 */
export declare function isFilterContextDateFilter(filter: FilterContextItem): filter is IFilterContextDateFilter;

/**
 * @public
 */
export declare function isFluidLayout(obj: unknown): obj is IFluidLayout;

/**
 * @public
 */
export declare interface ISimpleMeasure {
    item: ObjQualifier;
    aggregation?: MeasureAggregation;
    filters?: FilterItem[];
    computeRatio?: boolean;
}

/**
 * @public
 */
export declare interface ISimpleMeasureDefinition {
    measure: ISimpleMeasure;
}

/**
 * @public
 */
export declare function isKpi(obj: unknown): obj is IKPI;

/**
 * @public
 */
export declare function isKpiAlert(obj: unknown): obj is IKpiAlert;

/**
 * @public
 */
export declare function isKpiContentWithoutComparison(obj: unknown): obj is IKpiContentWithoutComparison;

/**
 * @public
 */
export declare function isKpiDashboardAttachment(obj: unknown): obj is IKpiDashboardAttachment;

/**
 * @public
 */
export declare function isLayoutWidget(obj: unknown): obj is IPersistedWidget;

/**
 * @public
 */
export declare function isLocalIdentifierQualifier(qualifier: unknown): qualifier is ILocalIdentifierQualifier;

/**
 * @public
 */
export declare function isMeasureGroupHeader(header: IHeader): header is IMeasureGroupHeader;

/**
 * @public
 */
export declare function isMeasureHeaderItem(header: IResultHeaderItem): header is IResultMeasureHeaderItem;

/**
 * @public
 */
export declare function isMeasureLocatorItem(locator: LocatorItem): locator is IMeasureLocatorItem;

/**
 * @public
 */
export declare function isMeasureSortItem(sortItem: SortItem): sortItem is IMeasureSortItem;

/**
 * @public
 */
export declare function isMeasureValueFilter(filter: CompatibilityFilter): filter is IMeasureValueFilter;

/**
 * @public
 */
export declare function isMetadataObjectAttribute(obj: unknown): obj is IMetadataObjectAttribute;

/**
 * @public
 */
export declare function isMetadataObjectDataSet(obj: unknown): obj is IMetadataObjectDataSet;

/**
 * @public
 */
export declare function isMetadataObjectWrappedDataSet(obj: unknown): obj is IMetadataObjectWrappedDataSet;

/**
 * @public
 */
export declare function isMetric(obj: unknown): obj is IMetric;

/**
 * @public
 */
export declare function isNegativeAttributeFilter(filter: CompatibilityFilter): filter is INegativeAttributeFilter;

/**
 * @public
 */
export declare function isObjectUriQualifier(qualifier: ObjQualifier): qualifier is IObjUriQualifier;

/**
 * @public
 */
export declare function isObjIdentifierQualifier(qualifier: ObjQualifier): qualifier is IObjIdentifierQualifier;

/**
 * @public
 */
export declare function isPopMeasureDefinition(definition: MeasureDefinition): definition is IPopMeasureDefinition;

/**
 * @public
 */
export declare function isPositiveAttributeFilter(filter: CompatibilityFilter): filter is IPositiveAttributeFilter;

/**
 * @public
 */
export declare function isPreviousPeriodMeasureDefinition(definition: MeasureDefinition): definition is IPreviousPeriodMeasureDefinition;

/**
 * @public
 */
export declare function isPrompt(obj: unknown): obj is IPrompt;

/**
 * @public
 */
export declare function isRangeCondition(condition: MeasureValueFilterCondition): condition is IRangeCondition;

/**
 * @public
 */
export declare function isRankingFilter(filter: CompatibilityFilter): filter is IRankingFilter;

/**
 * @public
 */
export declare function isRelativeDateFilter(filter: CompatibilityFilter): filter is IRelativeDateFilter;

/**
 * @public
 */
export declare function isSimpleMeasureDefinition(definition: MeasureDefinition): definition is ISimpleMeasureDefinition;

/**
 * @public
 */
export declare interface IStatus {
    code: "NEW" | "SCHEDULED" | "DOWNLOADING" | "DOWNLOADED" | "TRANSFORMING" | "TRANSFORMED" | "UPLOADING" | "UPLOADED" | "SYNCHRONIZED" | "ERROR" | "USER_ERROR";
    detail: string;
    description: string;
}

/**
 * @public
 */
export declare function isTempFilterContext(obj: unknown): obj is ITempFilterContext;

/**
 * @public
 */
export declare function isTheme(obj: unknown): obj is ITheme;

/**
 * @public
 */
export declare interface IStoredItemDescription {
    uri: string;
}

/**
 * @public
 */
export declare function isTotalHeaderItem(header: IResultHeaderItem): header is IResultTotalHeaderItem;

/**
 * @public
 */
export declare interface IStyleSettingsType {
    chartPalette: Array<{
        guid: string;
        fill: {
            r: number;
            g: number;
            b: number;
        };
    }>;
    chartFont?: {
        family: string;
    };
}

/**
 * @public
 */
export declare function isVisualization(obj: unknown): obj is IVisualization;

/**
 * @public
 */
export declare function isVisualizationObjectAbsoluteDateFilter(filter: VisualizationObjectDateFilter): filter is IVisualizationObjectAbsoluteDateFilter;

/**
 * @public
 */
export declare function isVisualizationObjectArithmeticMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectArithmeticMeasureDefinition;

/**
 * @public
 */
export declare function isVisualizationObjectAttribute(bucketItem: IVisualizationObjectMeasure | IVisualizationObjectAttribute): bucketItem is IVisualizationObjectAttribute;

/**
 * @public
 */
export declare function isVisualizationObjectAttributeFilter(filter: VisualizationObjectExtendedFilter): filter is VisualizationObjectAttributeFilter;

/**
 * @public
 */
export declare function isVisualizationObjectDateFilter(filter: VisualizationObjectExtendedFilter): filter is VisualizationObjectDateFilter;

/**
 * @public
 */
export declare function isVisualizationObjectMeasure(bucketItem: IVisualizationObjectMeasure | IVisualizationObjectAttribute): bucketItem is IVisualizationObjectMeasure;

/**
 * @public
 */
export declare function isVisualizationObjectMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectMeasureDefinition;

/**
 * @public
 */
export declare function isVisualizationObjectMeasureValueFilter(filter: VisualizationObjectExtendedFilter): filter is IVisualizationObjectMeasureValueFilter;

/**
 * @public
 */
export declare function isVisualizationObjectNegativeAttributeFilter(filter: VisualizationObjectAttributeFilter): filter is IVisualizationObjectNegativeAttributeFilter;

/**
 * @public
 */
export declare function isVisualizationObjectPoPMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectPoPMeasureDefinition;

/**
 * @public
 */
export declare function isVisualizationObjectPositiveAttributeFilter(filter: VisualizationObjectAttributeFilter): filter is IVisualizationObjectPositiveAttributeFilter;

/**
 * @public
 */
export declare function isVisualizationObjectPreviousPeriodMeasureDefinition(definition: VisualizationObjectMeasureDefinitionType): definition is IVisualizationObjectPreviousPeriodMeasureDefinition;

/**
 * @public
 */
export declare function isVisualizationObjectRankingFilter(filter: VisualizationObjectExtendedFilter): filter is IVisualizationObjectRankingFilter;

/**
 * @public
 */
export declare function isVisualizationObjectRelativeDateFilter(filter: VisualizationObjectDateFilter): filter is IVisualizationObjectRelativeDateFilter;

/**
 * @public
 */
export declare function isVisualizationWidget(obj: unknown): obj is IVisualizationWidget;

/**
 * @public
 */
export declare function isVisualizationWidgetAttachment(obj: unknown): obj is IVisualizationWidgetAttachment;

/**
 * @public
 */
export declare function isWrappedAttribute(obj: unknown): obj is IWrappedAttribute;

/**
 * @public
 */
export declare function isWrappedAttributeDisplayForm(obj: unknown): obj is IWrappedAttributeDisplayForm;

/**
 * @public
 */
export declare function isWrappedFact(obj: unknown): obj is IWrappedFact;

/**
 * @public
 */
export declare function isWrappedFilterContext(obj: unknown): obj is IWrappedFilterContext;

/**
 * @public
 */
export declare function isWrappedKpi(obj: unknown): obj is IWrappedKPI;

/**
 * @public
 */
export declare function isWrappedKpiAlert(obj: unknown): obj is IWrappedKpiAlert;

/**
 * @public
 */
export declare function isWrappedMetric(obj: unknown): obj is IWrappedMetric;

/**
 * @public
 */
export declare function isWrappedPrompt(obj: unknown): obj is IWrappedPrompt;

/**
 * @public
 */
export declare function isWrappedTempFilterContext(obj: unknown): obj is IWrappedTempFilterContext;

/**
 * @public
 */
export declare function isWrappedTheme(obj: unknown): obj is IWrappedTheme;

/**
 * @public
 */
export declare function isWrappedVisualizationWidget(obj: unknown): obj is IWrappedVisualizationWidget;

/**
 * @public
 */
export declare type ItemDescription = IStoredItemDescription | IAdHocItemDescription;

/**
 * Temporary filter context stored during exports
 * @public
 */
export declare interface ITempFilterContext {
    uri: Uri;
    created: Timestamp;
    filters: FilterContextItem[];
}

/**
 * @public
 */
export declare interface ITemplateInfo {
    version: string;
    url: Uri | null;
    urn: string;
    connectorId?: string;
    createIntegration?: string;
}

/**
 * @public
 */
export declare interface ITheme extends IMetadataObject {
    content: {
        typography?: {
            font?: ThemeFontUri;
            fontBold?: ThemeFontUri;
        };
        palette?: IThemePalette;
        button?: {
            borderRadius?: string;
            dropShadow?: boolean;
            textCapitalization?: boolean;
        };
        tooltip?: {
            backgroundColor?: ThemeColor;
            color?: ThemeColor;
        };
        modal?: {
            title?: {
                color?: ThemeColor;
                lineColor?: ThemeColor;
            };
            outsideBackgroundColor?: ThemeColor;
            dropShadow?: boolean;
            borderWidth?: string;
            borderColor?: ThemeColor;
            borderRadius?: string;
        };
        dashboards?: {
            title?: {
                color?: ThemeColor;
                backgroundColor?: ThemeColor;
                borderColor?: ThemeColor;
            };
            section?: {
                title?: {
                    color?: ThemeColor;
                    lineColor?: ThemeColor;
                };
                description?: {
                    color?: ThemeColor;
                };
            };
            filterBar?: {
                backgroundColor?: ThemeColor;
                borderColor?: ThemeColor;
                filterButton?: {
                    backgroundColor?: ThemeColor;
                };
            };
            content?: {
                backgroundColor?: ThemeColor;
                widget?: {
                    title?: {
                        color?: ThemeColor;
                        textAlign?: string;
                    };
                    backgroundColor?: ThemeColor;
                    borderColor?: ThemeColor;
                    borderWidth?: string;
                    borderRadius?: string;
                    dropShadow?: boolean;
                };
                kpiWidget?: {
                    title?: {
                        color?: ThemeColor;
                        textAlign?: string;
                    };
                    backgroundColor?: ThemeColor;
                    borderColor?: ThemeColor;
                    borderWidth?: string;
                    borderRadius?: string;
                    dropShadow?: boolean;
                    kpi?: {
                        value?: {
                            textAlign?: string;
                            positiveColor?: ThemeColor;
                            negativeColor?: ThemeColor;
                        };
                        primaryMeasureColor?: ThemeColor;
                        secondaryInfoColor?: ThemeColor;
                    };
                };
            };
            navigation?: {
                backgroundColor?: ThemeColor;
                borderColor?: ThemeColor;
                header?: {
                    color?: ThemeColor;
                };
                item?: {
                    color?: ThemeColor;
                    hoverColor?: ThemeColor;
                    selectedColor?: ThemeColor;
                    selectedBackgroundColor?: ThemeColor;
                };
            };
            editPanel?: {
                backgroundColor?: ThemeColor;
            };
        };
        analyticalDesigner?: {
            title?: {
                color?: ThemeColor;
            };
        };
    };
}

/**
 * @public
 */
export declare interface IThemeColorFamily {
    base: ThemeColor;
    light?: ThemeColor;
    dark?: ThemeColor;
    contrast?: ThemeColor;
}

/**
 * @public
 */
export declare interface IThemeComplementaryPalette {
    c0: ThemeColor;
    c1?: ThemeColor;
    c2?: ThemeColor;
    c3?: ThemeColor;
    c4?: ThemeColor;
    c5?: ThemeColor;
    c6?: ThemeColor;
    c7?: ThemeColor;
    c8?: ThemeColor;
    c9: ThemeColor;
}

/**
 * @public
 */
export declare interface IThemePalette {
    primary?: IThemeColorFamily;
    error?: IThemeColorFamily;
    warning?: IThemeColorFamily;
    success?: IThemeColorFamily;
    info?: IThemeColorFamily;
    complementary?: IThemeComplementaryPalette;
}

/**
 * @public
 */
export declare interface ITimezone {
    timezone: {
        id: string;
        displayName: string;
        shortDisplayName: string;
        currentOffsetMs: number;
    };
}

/**
 * @public
 */
export declare interface ITimezoneInfo {
    id: string;
    displayName: string;
    shortDisplayName: string;
    currentOffsetMs: number;
}

/**
 * @public
 */
export declare interface ITotal {
    type: TotalType;
    measureIdentifier: string;
    attributeIdentifier: string;
    alias?: string;
}

/**
 * @public
 */
export declare interface ITotalHeaderItem {
    totalHeaderItem: {
        name: string;
    };
}

/**
 * @public
 */
export declare interface ITotalItem {
    measureIdentifier: Identifier;
    type: TotalType;
    attributeIdentifier: Identifier;
}

/**
 * @public
 */
export declare interface IUISettings {
    applicationTitle: string;
    faviconUrl?: Uri | null;
    organizationName: string;
    displayFlashNews: boolean;
    logoUrl: Uri;
    displayProjects: boolean;
    displayAccountPage: boolean;
    isBranded: boolean;
    supportEmail?: string;
    supportForumUrl?: string;
    privacyPolicyUrl?: Uri;
    documentationUrl?: string;
    securityStatementUrl?: Uri;
    termsOfUseUrl?: Uri;
    trustUrl?: Uri;
    appleTouchIconUrl?: Uri;
    applicationBackgroundColor?: string;
    applicationBackgroundUrl?: Uri;
    skipClientRedirect?: boolean;
    hideRegistration?: boolean;
    largeLogoUrl?: Uri;
    brandColor?: string;
    headerColor?: string;
    activeColor?: string;
    highlightColor?: string;
    headerTextColor?: string;
    useOnboarding?: boolean;
    displayNPS?: boolean;
    walkMe?: string;
    walkMeEnvironment?: string;
    includeTrialSnippet?: string;
    ssoLogoutUrl?: Uri;
    ssoExpiredUrl?: Uri;
    ssoUnauthorizedUrl?: Uri;
    showSSOCustomUnauthorizedLoginPage?: boolean;
    showServiceProviderInitiatedLogin?: boolean;
}

/**
 * @public
 */
export declare interface IUserFeatureFlags {
    featureFlags: IFeatureFlags;
}

/**
 * @alpha
 */
export declare interface IUserGroupItem {
    content: {
        name: string;
        id?: string | null;
        description?: string | null;
        domain?: Uri | null;
        project?: Uri | null;
    };
    links?: {
        self: Uri;
        members: Uri;
        modifyMembers: Uri;
    };
    meta: {
        created?: Timestamp;
        updated?: Timestamp;
    };
}

/**
 * @public
 */
export declare interface IUserListItem {
    uri: Uri;
    login: Email;
    email: Email;
    firstName?: string | null;
    lastName?: string | null;
    roles?: Uri[];
    state?: UserListItemState;
    hasRequestedPermissions?: boolean;
}

/**
 * @public
 */
export declare interface IUserProject {
    userProject: {
        projectState: UserProjectState;
        userState: UserProjectState;
        projectDescription: string;
        projectTitle: string;
        links: {
            self: Uri;
        };
        demoProject?: boolean;
    };
}

/**
 * @public
 */
export declare interface IUserProjectsParams {
    limit: number;
    offset: number;
    userId: string;
    projectStates: "ENABLED";
    userState: "ENABLED";
    titleSubstring?: string;
}

/**
 * @public
 */
export declare interface IUserProjectsResponse {
    userProjects: {
        items: IUserProject[];
        paging: IBearPagingWithTotalCount;
    };
}

/**
 * @public
 */
export declare interface IUsersItem {
    content: {
        status?: UsersItemStatus;
        firstname?: string;
        lastname?: string;
        email?: Email;
        login?: Email;
        phonenumber?: string;
    };
    links?: {
        self: Uri;
        roles?: Uri;
        permissions?: Uri;
        projectRelUri?: Uri;
    };
}

/**
 * Request params for POST /gdc/md/\{projectId\}/obj/\{attributeDisplayFormMetadataObjectId\}/validElements\{params\}
 * @public
 */
export declare interface IValidElementsParams {
    limit?: number;
    offset?: number;
    order?: SortDirection;
    filter?: string;
    prompt?: string;
    uris?: string[];
    complement?: boolean;
    includeTotalCountWithoutFilters?: boolean;
    restrictiveDefinition?: string;
    restrictiveDefinitionContent?: object;
    afm?: IAfm;
}

/**
 * Response for POST /gdc/md/\{projectId\}/obj/\{attributeDisplayFormMetadataObjectId\}/validElements\{params\}
 * @public
 */
export declare interface IValidElementsResponse {
    validElements: {
        items: IWrappedAttributeElement[];
        paging: {
            /**
             * Total amount of existing elements for a given attributeDisplayForm (which match filter and request uris)
             */
            total: NumberAsString;
            /**
             * Amount of returned elements
             */
            count: number;
            /**
             * Offset of first item, starts from 0
             */
            offset: NumberAsString;
        };
        /**
         * Total count of elements (ignoring any filter or request uris)
         * Number represented as a string
         */
        totalCountWithoutFilters?: string;
        elementsMeta: {
            attribute: Uri;
            attributeDisplayForm: Uri;
            /**
             * we search only for substring of filter ie *filter*
             */
            filter: string;
            order: SortDirection;
        };
    };
}

/**
 * @public
 */
export declare interface IVisualization {
    visualizationObject: IVisualizationObject;
}

/**
 * @public
 */
export declare interface IVisualizationAttributeContent {
    localIdentifier: Identifier;
    displayForm: ObjQualifier;
    alias?: string;
    showAllValues?: boolean;
}

/**
 * @public
 */
export declare interface IVisualizationClass {
    meta: IObjectMeta;
    content: IVisualizationClassContent;
}

/**
 * @public
 */
export declare interface IVisualizationClassContent {
    url: string;
    icon: string;
    iconSelected: string;
    checksum: string;
    orderIndex?: number;
}

/**
 * @public
 */
export declare interface IVisualizationClassWrapped {
    visualizationClass: IVisualizationClass;
}

/**
 * @public
 */
export declare interface IVisualizationObject {
    meta: IObjectMeta;
    content: IVisualizationObjectContent;
}

/**
 * @public
 */
export declare interface IVisualizationObjectAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet: ObjQualifier;
        from?: string;
        to?: string;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectArithmeticMeasureDefinition {
    arithmeticMeasure: {
        measureIdentifiers: Identifier[];
        operator: ArithmeticMeasureOperator;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectAttribute {
    visualizationAttribute: IVisualizationAttributeContent;
}

/**
 * @public
 */
export declare interface IVisualizationObjectContent {
    visualizationClass: IObjUriQualifier;
    buckets: IBucket[];
    filters?: VisualizationObjectExtendedFilter[];
    properties?: string;
    references?: IReferenceItems;
}

/**
 * @public
 */
export declare interface IVisualizationObjectMeasure {
    measure: IMeasureContent;
}

/**
 * @public
 */
export declare interface IVisualizationObjectMeasureDefinition {
    measureDefinition: {
        item: ObjQualifier;
        aggregation?: MeasureAggregation;
        filters?: VisualizationObjectFilter[];
        computeRatio?: boolean;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectMeasureValueFilter {
    measureValueFilter: {
        measure: IObjUriQualifier | ILocalIdentifierQualifier;
        condition?: MeasureValueFilterCondition;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectNegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: string[];
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectPoPMeasureDefinition {
    popMeasureDefinition: {
        measureIdentifier: Identifier;
        popAttribute: ObjQualifier;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: string[];
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectPreviousPeriodMeasureDefinition {
    previousPeriodMeasure: {
        measureIdentifier: Identifier;
        dateDataSets: IPreviousPeriodDateDataSet[];
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectRankingFilter {
    rankingFilter: {
        measures: (IObjUriQualifier | ILocalIdentifierQualifier)[];
        attributes?: (IObjUriQualifier | ILocalIdentifierQualifier)[];
        operator: RankingFilterOperator;
        value: number;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectRelativeDateFilter {
    relativeDateFilter: {
        dataSet: ObjQualifier;
        granularity: string;
        from?: number;
        to?: number;
    };
}

/**
 * @public
 */
export declare interface IVisualizationObjectResponse {
    visualizationObject: IVisualizationObject;
}

/**
 * @public
 */
export declare interface IVisualizationStyle {
    visualizationStyle: {
        type: VisualizationStyleType;
        colorPalette: {
            measure?: {
                color: string;
                periodOverPeriod: string;
            };
            stack?: any;
        };
    };
}

/**
 * @public
 */
export declare interface IVisualizationWidget {
    meta: IObjectMeta;
    content: {
        visualization: string;
        dateDataSet?: string;
        ignoreDashboardFilters: Array<IDateFilterReference | IAttributeFilterReference>;
        drills?: IDrillDefinition[];
        properties?: string;
        references?: IReferenceItems;
        configuration?: IVisualizationWidgetConfiguration;
    };
}

/**
 * @public
 */
export declare interface IVisualizationWidgetAttachment {
    visualizationWidgetAttachment: {
        uri: Uri;
        dashboardUri: Uri;
        formats: ("csv" | "xlsx")[];
        filterContext?: Uri;
        exportOptions?: {
            mergeHeaders?: "yes" | "no";
            includeFilterContext?: "yes" | "no";
        };
    };
}

/**
 * @public
 */
export declare interface IVisualizationWidgetConfiguration {
    hideTitle?: boolean;
    description?: IVisualizationWidgetDescriptionConfiguration;
}

/**
 * @public
 */
export declare interface IVisualizationWidgetDescriptionConfiguration {
    visible: boolean;
    source: VisualizatioWidgetDescriptionSourceType;
    includeMetrics: boolean;
}

/**
 * @public
 */
export declare interface IWrappedAccountSetting {
    accountSetting: IAccountSetting;
}

/**
 * @public
 */
export declare interface IWrappedAnalyticalDashboard {
    analyticalDashboard: IAnalyticalDashboard;
}

/**
 * @public
 */
export declare interface IWrappedAttribute {
    attribute: IMetadataObjectAttribute;
}

/**
 * @public
 */
export declare interface IWrappedAttributeDisplayForm {
    attributeDisplayForm: IAttributeDisplayForm;
}

/**
 * @public
 */
export declare interface IWrappedAttributeElement {
    element: IAttributeElement;
}

/**
 * @public
 */
export declare interface IWrappedAttributeElements {
    attributeElements: {
        elementsMeta: {
            count: number;
            mode: "includeuris";
            filter: string;
            records: NumberAsString;
            prompt: string;
            attribute: Uri;
            order: "asc" | "desc";
            attributeDisplayForm: Uri;
            offset: NumberAsString;
        };
        elements: IAttributeElement[];
        paging: {
            next: null | string;
            count: number;
            total: NumberAsString;
            offset: NumberAsString;
        };
    };
}

/**
 * @public
 */
export declare interface IWrappedDashboardPlugin {
    dashboardPlugin: IDashboardPlugin;
}

/**
 * @public
 */
export declare interface IWrappedDataSet {
    dataSet: IDataSet;
}

/**
 * @public
 */
export declare interface IWrappedDateFilterConfig {
    dateFilterConfig: IDateFilterConfig;
}

/**
 * @public
 */
export declare interface IWrappedFact {
    fact: IFact;
}

/**
 * @public
 */
export declare interface IWrappedFilterContext {
    filterContext: IFilterContext;
}

/**
 * @public
 */
export declare interface IWrappedKPI {
    kpi: IKPI;
}

/**
 * @public
 */
export declare interface IWrappedKpiAlert {
    kpiAlert: IKpiAlert;
}

/**
 * @public
 */
export declare interface IWrappedMetric {
    metric: IMetric;
}

/**
 * @public
 */
export declare interface IWrappedProjectDashboard {
    projectDashboard: IProjectDashboard;
}

/**
 * @public
 */
export declare interface IWrappedPrompt {
    prompt: IPrompt;
}

/**
 * @public
 */
export declare interface IWrappedReport {
    report: IReport;
}

/**
 * @public
 */
export declare interface IWrappedReportDefinition {
    reportDefinition: IReportDefinition;
}

/**
 * @public
 */
export declare interface IWrappedScheduledMail {
    scheduledMail: IScheduledMail;
}

/**
 * @public
 */
export declare interface IWrappedTempFilterContext {
    tempFilterContext: ITempFilterContext;
}

/**
 * @public
 */
export declare interface IWrappedTheme {
    theme: ITheme;
}

/**
 * @alpha
 */
export declare interface IWrappedUserGroupItem {
    userGroup: IUserGroupItem;
}

/**
 * @public
 */
export declare interface IWrappedVisualizationWidget {
    visualizationWidget: IVisualizationWidget;
}

/**
 * @public
 */
export declare interface IZendesk4Integration {
    projectTemplate: Uri;
    active: boolean;
    lastFinishedProcess?: IProcessBody | null;
    lastSuccessfulProcess?: IProcessBody | null;
    runningProcess?: IProcessBody | null;
    links?: {
        self: Uri;
        processes: Uri;
        configuration: Uri;
    };
    ui?: object;
}

/**
 * @public
 */
export declare type KpiDescriptionSourceType = "kpi" | "metric";

/**
 * @public
 */
export declare type Layout = IFluidLayout;

/**
 * @public
 */
export declare type LayoutContent = Widget | Layout;

/**
 * @public
 */
export declare type LocatorItem = IAttributeLocatorItem | IMeasureLocatorItem;

/**
 * @public
 */
export declare type MaqlExpression = string;

/**
 * @public
 */
export declare type MeasureAggregation = "sum" | "count" | "avg" | "min" | "max" | "median" | "runsum";

/**
 * @public
 */
export declare type MeasureDefinition = ISimpleMeasureDefinition | IArithmeticMeasureDefinition | IPopMeasureDefinition | IPreviousPeriodMeasureDefinition;

/**
 * @public
 */
export declare type MeasureValueFilterCondition = IComparisonCondition | IRangeCondition;

/**
 * @public
 */
export declare type NumberAsString = string;

/**
 * @public
 */
export declare type ObjectCategory = "analyticalDashboard" | "attribute" | "attributeDisplayForm" | "column" | "dashboardPlugin" | "dataLoadingColumn" | "dataSet" | "dateFilterConfig" | "dimension" | "domain" | "elementMasking" | "etlFile" | "executionContext" | "fact" | "filterContext" | "filter" | "folder" | "kpi" | "kpiAlert" | "metric" | "projectDashboard" | "prompt" | "reportDefinition" | "report" | "scheduledMail" | "tableDataload" | "table" | "userFilter" | "visualizationClass" | "visualizationObject" | "visualizationWidget" | "theme" | "colorPalette" | "attributeHierarchy";

/**
 * @public
 */
export declare type ObjQualifier = IObjUriQualifier | IObjIdentifierQualifier;

/**
 * @alpha
 */
export declare type Permission = "read";

/**
 * @public
 */
export declare type ProjectPermission = "canAccessIntegration" | "canAccessWorkbench" | "canAssignUserWithRole" | "canCreateAnalyticalDashboard" | "canCreateAttribute" | "canCreateAttributeGroup" | "canCreateAttributeLabel" | "canCreateColumn" | "canCreateComment" | "canCreateDataSet" | "canCreateDomain" | "canCreateETLFile" | "canCreateExecutionContext" | "canCreateFact" | "canCreateFilterSettings" | "canCreateFolder" | "canCreateHelp" | "canCreateMetric" | "canCreateProjectDashboard" | "canCreateProjectTemplates" | "canCreatePrompt" | "canCreateReport" | "canCreateReportDefinition" | "canCreateRole" | "canCreateScheduledMail" | "canCreateTable" | "canCreateTableDataLoad" | "canCreateVisualization" | "canCreateVisualizationClass" | "canEnrichData" | "canExecute" | "canExecuteRaw" | "canExportDashboard" | "canExportReport" | "canInitData" | "canInviteUserToProject" | "canListInvitationsInProject" | "canListUsersInProject" | "canMaintainProject" | "canMaintainUserFilter" | "canMaintainUserFilterRelation" | "canManageACL" | "canManageAnalyticalDashboard" | "canManageAttribute" | "canManageAttributeGroup" | "canManageAttributeLabel" | "canManageColumn" | "canManageComment" | "canManageDataSet" | "canManageDomain" | "canManageETLFile" | "canManageExecutionContext" | "canManageFact" | "canManageFilterSettings" | "canManageFolder" | "canManageHelp" | "canManageIntegration" | "canManageIsProduction" | "canManageMetric" | "canManageProject" | "canManageProjectDashboard" | "canManagePrompt" | "canManagePublicAccessCode" | "canManageReport" | "canManageReportDefinition" | "canManageScheduledMail" | "canManageTable" | "canManageTableDataLoad" | "canManageTranslations" | "canManageVisualization" | "canRefreshData" | "canSeeOtherUserDetails" | "canSeePublicAccessCode" | "canSetLocale" | "canSetProjectVariables" | "canSetStyle" | "canSetUserVariables" | "canSuspendUserFromProject" | "canUploadNonProductionCSV" | "canValidateProject";

/**
 * @public
 */
export declare type Qualifier = ObjQualifier | ILocalIdentifierQualifier;

/**
 * @public
 */
export declare type RangeConditionOperator = "BETWEEN" | "NOT_BETWEEN";

/**
 * @public
 */
export declare type RankingFilterOperator = "TOP" | "BOTTOM";

/**
 * @public
 */
export declare type RelativeGranularityOffset = number;

/**
 * @public
 */
export declare type RelativeType = "relative";

/**
 * @public
 */
export declare type ReportFormat = "grid" | "chart" | "oneNumber";

/**
 * @public
 */
export declare function sanitizeFiltersForExport(filters: FilterContextItem[]): FilterContextItem[];

/**
 * @public
 */
export declare type ScheduledMailAttachment = IReportAttachment | IDashboardAttachment | IKpiDashboardAttachment | IVisualizationWidgetAttachment;

/**
 * @public
 */
export declare type SectionHeader = ISectionHeader | ISectionDescription;

/**
 * @public
 */
export declare type SortDirection = "asc" | "desc";

/**
 * @public
 */
export declare type SortItem = IAttributeSortItem | IMeasureSortItem;

/**
 * CSS color in hex format (f.g. #14b2e2)
 * @public
 */
export declare type ThemeColor = string;

/**
 * @public
 */
export declare type ThemeFontUri = string;

/**
 * @public
 */
export declare type TimeIso8601 = string;

/**
 * @public
 */
export declare type Timestamp = string;

/**
 * @public
 */
export declare type TotalType = "sum" | "avg" | "max" | "min" | "nat" | "med";

/**
 * @public
 */
export declare function unwrapMetadataObject(object: WrappedObject): IObject;

/**
 * @public
 */
export declare type Uri = string;

/**
 * @public
 */
export declare type UserListItemState = "ACTIVE" | "INACTIVE" | "PENDING";

/**
 * @public
 */
export declare type UserProjectState = "ENABLED" | "DISABLED";

/**
 * @public
 */
export declare type UsersItemStatus = "ENABLED" | "DISABLED";

/**
 * @public
 */
export declare type VisualizationObjectAttributeFilter = IVisualizationObjectPositiveAttributeFilter | IVisualizationObjectNegativeAttributeFilter;

/**
 * @public
 */
export declare type VisualizationObjectDateFilter = IVisualizationObjectRelativeDateFilter | IVisualizationObjectAbsoluteDateFilter;

/**
 * @public
 */
export declare type VisualizationObjectExtendedFilter = VisualizationObjectFilter | IVisualizationObjectMeasureValueFilter | IVisualizationObjectRankingFilter;

/**
 * @public
 */
export declare type VisualizationObjectFilter = VisualizationObjectDateFilter | VisualizationObjectAttributeFilter;

/**
 * @public
 */
export declare type VisualizationObjectMeasureDefinitionType = IVisualizationObjectMeasureDefinition | IVisualizationObjectArithmeticMeasureDefinition | IVisualizationObjectPoPMeasureDefinition | IVisualizationObjectPreviousPeriodMeasureDefinition;

/**
 * @public
 */
export declare type VisualizationStyleType = "common" | "table" | "line" | "column" | "bar" | "area";

/**
 * @public
 */
export declare type VisualizationType = "table" | "line" | "column" | "bar" | "pie" | "doughnut" | "combo" | "area";

/**
 * @public
 */
export declare type VisualizatioWidgetDescriptionSourceType = "widget" | "insight";

/**
 * @public
 */
export declare interface Warning {
    warningCode: string;
    message: string;
    parameters?: any[];
}

/**
 * @public
 */
export declare type Widget = IPersistedWidget;

/**
 * @public
 */
export declare type WrappedObject = IWrappedAttribute | IWrappedMetric | IWrappedFact | IWrappedAttributeDisplayForm | IWrappedKpiAlert | IMetadataObjectWrappedDataSet | IWrappedPrompt | IWrappedTheme | IWrappedAnalyticalDashboard | IWrappedFilterContext | IWrappedTempFilterContext | IWrappedKPI | IWrappedScheduledMail | IWrappedProjectDashboard | IWrappedDateFilterConfig | IWrappedVisualizationWidget | IVisualization | IVisualizationClassWrapped | IWrappedDataSet | IWrappedReport | IWrappedReportDefinition | IWrappedDashboardPlugin;

export { }
