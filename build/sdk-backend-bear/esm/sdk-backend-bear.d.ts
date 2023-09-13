/**
 * This package provides the Analytical Backend implementation for the GoodData platform.
 *
 * @remarks
 * You can use this package to communicate with the GoodData platform in a convenient way without concerning
 * yourself with low-level details. The functionality includes but is not limited to:
 * setting and creating metadata objects, running executions, getting settings, getting available workspaces, and more.
 *
 * For similar package for GoodData Cloud and GoodData.CN, see `@gooddata/sdk-backend-tiger`.
 *
 * @packageDocumentation
 */

import { FilterContextItem } from '@gooddata/api-model-bear';
import { FilterContextItem as FilterContextItem_2 } from '@gooddata/sdk-model';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAnalyticalBackendConfig } from '@gooddata/sdk-backend-spi';
import { IAttributeFilterReference } from '@gooddata/api-model-bear';
import { IAuthenticatedPrincipal } from '@gooddata/sdk-backend-spi';
import { IAuthenticationContext } from '@gooddata/sdk-backend-spi';
import { IAuthenticationProvider } from '@gooddata/sdk-backend-spi';
import { IBucket } from '@gooddata/api-model-bear';
import { IBucket as IBucket_2 } from '@gooddata/sdk-model';
import { IDashboardDateFilterConfig } from '@gooddata/api-model-bear';
import { IDashboardDateFilterConfig as IDashboardDateFilterConfig_2 } from '@gooddata/sdk-model';
import { IDashboardFilterReference } from '@gooddata/sdk-model';
import { IDashboardLayoutSize } from '@gooddata/sdk-model';
import { IDashboardLayoutSizeByScreenSize } from '@gooddata/sdk-model';
import { IDateFilterReference } from '@gooddata/api-model-bear';
import { IDrillDefinition } from '@gooddata/api-model-bear';
import { IDrillToLegacyDashboard } from '@gooddata/sdk-model';
import { IExecution } from '@gooddata/api-model-bear';
import { IExecutionDefinition } from '@gooddata/sdk-model';
import { IFilterContext } from '@gooddata/sdk-model';
import { IFilterContextDefinition } from '@gooddata/sdk-model';
import { IFluidLayoutColSize } from '@gooddata/api-model-bear';
import { IFluidLayoutSize } from '@gooddata/api-model-bear';
import { IInsight } from '@gooddata/sdk-model';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { InsightDrillDefinition } from '@gooddata/sdk-model';
import { IReferenceItems } from '@gooddata/api-model-bear';
import { IScheduledMail } from '@gooddata/sdk-model';
import { IScheduledMailDefinition } from '@gooddata/sdk-model';
import { IUser } from '@gooddata/sdk-model';
import { IVisualization } from '@gooddata/api-model-bear';
import { IVisualizationObject } from '@gooddata/api-model-bear';
import { IWidget } from '@gooddata/sdk-model';
import { IWidgetDefinition } from '@gooddata/sdk-model';
import { IWrappedFilterContext } from '@gooddata/api-model-bear';
import { IWrappedKPI } from '@gooddata/api-model-bear';
import { IWrappedScheduledMail } from '@gooddata/api-model-bear';
import { IWrappedVisualizationWidget } from '@gooddata/api-model-bear';
import { NotAuthenticated } from '@gooddata/sdk-backend-spi';
import { NotAuthenticatedHandler } from '@gooddata/sdk-backend-spi';
import { VisualizationProperties } from '@gooddata/sdk-model';

/**
 * This is a noop implementation of bear authentication provider - it does nothing and assumes anonymous user.
 *
 * @public
 */
export declare class AnonymousAuthProvider implements IAuthenticationProvider {
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    getCurrentPrincipal(_context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    deauthenticate(_context: IAuthenticationContext): Promise<void>;
    reset(): void;
}

/**
 * Some of the convertors to bear types are exported through this so that they can be used by our
 * applications that were using bear-specific types in their state.
 *
 * All of these exports are marked as internal and can break at any time.
 *
 * @internal
 */
export declare const BackendToBearConvertors: {
    convertBucket: typeof convertBucket;
    convertVisualization: typeof convertVisualization;
    convertReferencesToUris: typeof convertReferencesToUris;
    convertFilterContext: typeof convertFilterContext;
    convertFilterContextItem: typeof convertFilterContextItem;
    convertFilterReference: typeof convertFilterReference;
    convertKpiDrill: typeof convertKpiDrill;
    convertInsight: typeof convertInsight;
    convertVisualizationWidgetDrill: typeof convertVisualizationWidgetDrill;
    convertScheduledMail: typeof convertScheduledMailFromBackend;
    convertDashboardDateFilterConfig: typeof convertDashboardDateFilterConfig;
    convertUrisToReferences: typeof convertUrisToReferences;
    serializeProperties: typeof serializeProperties;
    deserializeProperties: typeof deserializeProperties;
    convertLayoutSize: typeof convertLayoutSizeFromBackend;
    convertLayoutItemSize: typeof convertLayoutItemSizeFromBackend;
};

/**
 * Base for other IAuthenticationProvider implementations.
 *
 * @public
 */
export declare abstract class BearAuthProviderBase implements IAuthenticationProvider {
    protected principal: IAuthenticatedPrincipal | undefined;
    abstract authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
    deauthenticate(context: IAuthenticationContext): Promise<void>;
    getCurrentPrincipal(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal | null>;
    protected obtainCurrentPrincipal(context: IAuthenticationContext): Promise<void>;
}

/**
 * Client-specific configuration for the bear backend allows to specify additional telemetry information.
 *
 * @public
 */
export declare type BearBackendConfig = {
    /**
     * Name of frontend package, this will be recorded by backend as initiator of HTTP requests.
     */
    packageName?: string;
    /**
     * Version of the frontend package, this will be recorded by backend as initiator of HTTP requests.
     */
    packageVersion?: string;
};

/**
 * Returns function which creates instances of Analytical Backend implementation which works with the 'bear'
 * version of the GoodData platform.
 *
 * @param config - analytical backend configuration, may be omitted and provided later
 * @param implConfig - bear client specific configuration, may be omitted at this point but it cannot be provided later
 * @public
 */
declare function bearFactory(config?: IAnalyticalBackendConfig, implConfig?: any): IAnalyticalBackend;
export default bearFactory;

/**
 * Some of the convertors from bear types are exported through this so that they can be used by our
 * applications that were using bear-specific types in their state.
 *
 * All of these exports are marked as internal and can break at any time.
 *
 * @internal
 */
export declare const BearToBackendConvertors: {
    convertInsight: typeof convertInsight;
    convertInsightDefinition: typeof convertInsightDefinition;
    toAfmExecution: typeof toAfmExecution;
    convertScheduledMail: typeof convertScheduledMail;
    convertWidget: typeof convertWidget;
    convertLayoutSize: typeof convertLayoutSize;
    convertLayoutItemSize: typeof convertLayoutItemSize;
};

/**
 * This implementation of authentication provider defers the responsibility for performing authentication
 * to the context in which it exists.
 *
 * @remarks
 * In other words it expects that the application will take care of driving
 * the authentication and creating a correct session in which the Bear backend can make authenticated calls.
 *
 * You may use the provider's ability to use passed `NotAuthenticatedHandler` function. This will be called
 * every time a NotAuthenticated error is raised by the backend. Your application can pass a custom handler of
 * this event - typically something that will start driving the authentication from a single place.
 *
 * Note: the not authenticated handler MAY be called many times in succession so you may want to wrap it in a
 * call guard or in a debounce.
 *
 * @public
 */
export declare class ContextDeferredAuthProvider extends BearAuthProviderBase implements IAuthenticationProvider {
    private readonly notAuthenticatedHandler?;
    constructor(notAuthenticatedHandler?: NotAuthenticatedHandler | undefined);
    onNotAuthenticated: (context: IAuthenticationContext, error: NotAuthenticated) => void;
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
}

/**
 * @internal
 */
export declare const convertBucket: (bucket: IBucket) => IBucket_2;

/**
 * @internal
 */
export declare const convertDashboardDateFilterConfig: (dateFilterConfig: IDashboardDateFilterConfig) => IDashboardDateFilterConfig_2;

/**
 * @internal
 */
export declare const convertFilterContext: (filterContext: IWrappedFilterContext) => IFilterContext | IFilterContextDefinition;

/**
 * @internal
 */
export declare const convertFilterContextItem: (filterContextItem: FilterContextItem) => FilterContextItem_2;

/**
 * @internal
 */
export declare const convertFilterReference: (filterReference: IDateFilterReference | IAttributeFilterReference) => IDashboardFilterReference;

/**
 * @internal
 */
export declare const convertInsight: (insight: IInsight) => IVisualizationObject;

/**
 * @internal
 */
export declare const convertInsightDefinition: (insight: IInsightDefinition) => IVisualizationObject;

/**
 * @internal
 */
export declare const convertKpiDrill: (kpi: IWrappedKPI) => IDrillToLegacyDashboard;

/**
 * @internal
 */
export declare const convertLayoutItemSize: (column: IDashboardLayoutSizeByScreenSize) => IFluidLayoutColSize;

/**
 * @internal
 */
export declare const convertLayoutItemSizeFromBackend: (column: IFluidLayoutColSize) => IDashboardLayoutSizeByScreenSize;

/**
 * @internal
 */
export declare const convertLayoutSize: (size: IDashboardLayoutSize) => IFluidLayoutSize;

/**
 * @internal
 */
export declare const convertLayoutSizeFromBackend: (size: IFluidLayoutSize) => IDashboardLayoutSize;

/**
 * Converts URIs to reference based values
 *
 * @param conversionData - Data to convert
 * @param idGenerator - Function that returns unique ids, defaults to uuid
 *
 * @internal
 */
export declare const convertReferencesToUris: ReferenceConverter;

/**
 * @internal
 */
export declare const convertScheduledMail: (scheduledMail: IScheduledMail | IScheduledMailDefinition) => IWrappedScheduledMail;

/**
 * @internal
 */
export declare const convertScheduledMailFromBackend: (scheduledMail: IWrappedScheduledMail, userMap?: Map<string, IUser>) => IScheduledMail | IScheduledMailDefinition;

/**
 * Converts URIs to reference based values
 *
 * @param conversionData - Data to convert
 * @param idGenerator - Function that returns unique ids, defaults to uuid
 * @internal
 */
export declare const convertUrisToReferences: ReferenceConverter;

/**
 *
 * @internal
 */
export declare const convertVisualization: (visualization: IVisualization, visualizationClassUri: string, userMap?: Map<string, IUser>) => IInsight;

/**
 * @internal
 */
export declare const convertVisualizationWidgetDrill: (drill: IDrillDefinition) => InsightDrillDefinition;

/**
 * @internal
 */
export declare const convertWidget: (widget: IWidget | IWidgetDefinition) => IWrappedVisualizationWidget | IWrappedKPI;

/**
 * @internal
 */
export declare const deserializeProperties: (properties: string | undefined) => VisualizationProperties;

/**
 * This implementation of authentication provider does login with fixed username and password.
 *
 * @public
 */
export declare class FixedLoginAndPasswordAuthProvider extends BearAuthProviderBase implements IAuthenticationProvider {
    private readonly username;
    private readonly password;
    constructor(username: string, password: string);
    authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal>;
}

/**
 * @internal
 */
export declare interface IConversionData {
    properties: VisualizationProperties;
    references: IReferenceItems;
}

/**
 * @internal
 */
export declare type IdGenerator = () => string;

/**
 * @internal
 */
export declare type ReferenceConverter = (conversionData: IConversionData, idGenerator?: IdGenerator) => IConversionData;

/**
 * @internal
 */
export declare const serializeProperties: (properties: VisualizationProperties) => string;

/**
 * Converts execution definition to AFM Execution
 *
 * @param def - execution definition
 * @returns AFM Execution
 *
 * @internal
 */
export declare const toAfmExecution: (def: IExecutionDefinition) => IExecution;

export { }
