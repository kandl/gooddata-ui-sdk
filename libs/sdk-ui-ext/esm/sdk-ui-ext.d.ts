/**
 * This package contains various extensions on top of the stable components included in GoodData.UI.
 *
 * @remarks
 * The extensions land here instead of their own project as part of their staged development.
 *
 * Notable member of the package is InsightView, the component that allows you to embed
 * Analytical Designer insights.
 *
 * @packageDocumentation
 */

/// <reference types="react" />

import { CopyCodeOriginType } from '@gooddata/sdk-ui-kit';
import { EmbedType } from '@gooddata/sdk-ui-kit';
import { ExplicitDrill } from '@gooddata/sdk-ui';
import { GoodDataSdkError } from '@gooddata/sdk-ui';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IChartConfig } from '@gooddata/sdk-ui-charts';
import { IColorPalette } from '@gooddata/sdk-model';
import { IDrillEvent } from '@gooddata/sdk-ui';
import { IDrillEventIntersectionElement } from '@gooddata/sdk-ui';
import { IErrorProps } from '@gooddata/sdk-ui';
import { IExecutionConfig } from '@gooddata/sdk-model';
import { IFilter } from '@gooddata/sdk-model';
import { IGeoConfig } from '@gooddata/sdk-ui-geo';
import { IInsight } from '@gooddata/sdk-model';
import { IInsightDefinition } from '@gooddata/sdk-model';
import { ILoadingProps } from '@gooddata/sdk-ui';
import { ILocale } from '@gooddata/sdk-ui';
import { IPivotTableConfig } from '@gooddata/sdk-ui-pivot';
import { ISettings } from '@gooddata/sdk-model';
import { ITheme } from '@gooddata/sdk-model';
import { IUserWorkspaceSettings } from '@gooddata/sdk-backend-spi';
import { IVisualizationCallbacks } from '@gooddata/sdk-ui';
import { LocalIdRef } from '@gooddata/sdk-model';
import { ObjRef } from '@gooddata/sdk-model';
import { OnError } from '@gooddata/sdk-ui';
import { default as React_2 } from 'react';
import { WithIntlProps } from 'react-intl';
import { WrappedComponentProps } from 'react-intl';

/**
 * @internal
 */
export declare function addIntersectionFiltersToInsight(source: IInsight, intersection: IDrillEventIntersectionElement[], backendSupportsElementUris: boolean): IInsight;

/**
 * Clears all the caches used by the InsightView components.
 *
 * @public
 */
export declare function clearInsightViewCaches(): void;

/**
 * React18 createRoot function type.
 *
 * @public
 */
export declare type CreateRoot = (container: Element | DocumentFragment, options?: any) => Root;

/**
 * @internal
 */
export declare const DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT_PX = 450;

/**
 * @internal
 */
export declare const EmbedInsightDialog: React_2.VFC<IEmbedInsightDialogProps>;

/**
 * @alpha
 */
export declare class EmptyAfmSdkError extends GoodDataSdkError {
    readonly pveType: PluggableVisualizationErrorType;
    constructor(cause?: Error);
    getErrorCode(): string;
}

/**
 * @alpha
 */
export declare class FluidLayoutDescriptor implements IFluidLayoutDescriptor {
    type: "fluid";
    gridColumnsCount: number;
    gridRowHeight: number;
    toGridHeight(heightPx: number): number;
    toHeightInPx(height: number): number;
}

/**
 * @alpha
 */
export declare const fluidLayoutDescriptor: FluidLayoutDescriptor;

/**
 * @internal
 */
export declare function getInsightSizeInfo(insight: IInsightDefinition, settings: ISettings): IVisualizationSizeInfo;

/**
 * @internal
 */
export declare function getInsightVisualizationMeta(insight: IInsightDefinition): IVisualizationMeta;

/**
 * @internal
 */
export declare function getInsightWithAppliedDrillDown(insight: IInsight, drillEvent: IDrillEvent, drillDefinition: IDrillDownDefinition, backendSupportsElementUris: boolean): IInsight;

/**
 * Information about the DrillDown interaction - the attribute that is next in the drill down hierarchy.
 * @beta
 */
export declare interface IDrillDownDefinition {
    type: "drillDown";
    /**
     * Local identifier of the attribute that triggered the drill down.
     */
    origin: LocalIdRef;
    /**
     * Target attribute display form for drill down.
     */
    target: ObjRef;
}

/**
 * @internal
 */
export declare interface IEmbedInsightDialogProps {
    insight: IInsight;
    locale?: string;
    backend?: IAnalyticalBackend;
    reactIntegrationDocLink?: string;
    webComponentIntegrationDocLink?: string;
    saveInsightDocLink?: string;
    settings?: IUserWorkspaceSettings;
    colorPalette?: IColorPalette;
    executionConfig?: IExecutionConfig;
    workspaceId?: string;
    showWebComponentsTab?: boolean;
    openSaveInsightDialog: () => void;
    onClose: () => void;
    onCopyCode: (code: string, type: CopyCodeOriginType, codeType: EmbedType) => void;
}

/**
 * Fluid Layout descriptor.
 * Provides parameters of fluid layout.
 *
 * @alpha
 */
export declare interface IFluidLayoutDescriptor extends ILayoutDescriptor {
    type: "fluid";
    /**
     * Total number of grid columns. Used if visualization should take 100% width by its size
     */
    gridColumnsCount: number;
    /**
     * Height of one grid row in px. It is used for conversion of height between grid rows and px
     */
    gridRowHeight: number;
    /**
     * Converts height in px to the height in layout units
     */
    toGridHeight(heightPx: number): number;
    /**
     * Converts height in layout units to the height in px
     */
    toHeightInPx(height: number): number;
}

/**
 * @internal
 */
export declare interface IInsightErrorProps {
    error: GoodDataSdkError;
    ErrorComponent?: React_2.ComponentType<IErrorProps>;
    height?: number | string | null;
    clientHeight?: number;
}

/**
 * @internal
 */
export declare interface IInsightRendererProps extends Omit<IInsightViewProps, "insight" | "TitleComponent" | "onInsightLoaded" | "showTitle" | "afterRender"> {
    insight: IInsightDefinition | undefined;
    locale: ILocale;
    settings: IUserWorkspaceSettings | undefined;
    colorPalette: IColorPalette | undefined;
    onError?: OnError;
    theme?: ITheme;
}

/**
 * @public
 */
export declare interface IInsightTitleProps {
    title: string;
}

/**
 * @public
 */
export declare interface IInsightViewProps extends Partial<IVisualizationCallbacks> {
    /**
     * Backend to work with.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;
    /**
     * Workspace where the insight exists.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;
    /**
     * Reference to the insight to render. This can be specified by either object reference using URI or using identifier.
     *
     * For convenience it is also possible to specify just the identifier of the insight.
     */
    insight: ObjRef | string;
    /**
     * Additional filters to apply on top of the insight.
     */
    filters?: IFilter[];
    /**
     * Configure chart drillability; e.g. which parts of the charts can be clicked.
     */
    drillableItems?: ExplicitDrill[];
    /**
     * Configure color palette to use for the chart. If you do not specify this, then the palette will be
     * obtained from style settings stored on the backend.
     */
    colorPalette?: IColorPalette;
    /**
     * When embedding insight rendered by a chart, you can specify extra options to merge with existing
     * options saved for the insight.
     */
    config?: IChartConfig | IGeoConfig | IPivotTableConfig | any;
    /**
     * execConfig will provide the execution with necessary settings before initiating execution.
     */
    execConfig?: IExecutionConfig;
    /**
     * Locale to use for localization of texts appearing in the chart.
     *
     * Note: text values coming from the data itself are not localized.
     */
    locale?: ILocale;
    /**
     * Indicates that the execution to obtain the data for the insight should be an 'execution by reference'.
     *
     * Execution by reference means that the InsightView will ask analytical backend to compute results for an insight
     * which is stored on the backend by specifying link to the insight, additional filters and description how
     * to organize the data.
     *
     * Otherwise, a freeform execution is done, in which the InsightView will send to backend the full execution
     * definition of what to compute.
     *
     * This distinction is in place because some backends MAY want to prohibit users from doing freeform executions
     * and only allow computing data for set of insights created by admins.
     *
     * Note: the need for execute by reference is rare. You will typically be notified by the solution admin to use
     * this mode.
     */
    executeByReference?: boolean;
    /**
     * In case this property is boolean it indicates that the title component will be rendered if specified in
     * components properties. In case the property is string, this string must not be empty and will be shown as insight
     * title. In case the property is a function, it should be implemented to take the loaded insight object and return
     * modified title in string representation.
     */
    showTitle?: boolean | string | ((insight: IInsight) => string | undefined);
    /**
     * Called when the insight is loaded. This is to allow the embedding code to read the insight data.
     */
    onInsightLoaded?: (insight: IInsight) => void;
    /**
     * Component to render if embedding fails.
     */
    ErrorComponent?: React_2.ComponentType<IErrorProps>;
    /**
     * Component to render while the insight is loading.
     */
    LoadingComponent?: React_2.ComponentType<ILoadingProps>;
    /**
     * Component to render insight title.
     */
    TitleComponent?: React_2.ComponentType<IInsightTitleProps>;
}

/**
 * Layout descriptor.
 * Provides parameters of used layout.
 *
 * @alpha
 */
export declare interface ILayoutDescriptor {
    type: LayoutType;
}

/**
 * @internal
 */
export declare const INSIGHT_WIDGET_SIZE_INFO_DEFAULT: IVisualizationDefaultSizeInfo;

/**
 * @internal
 */
export declare const INSIGHT_WIDGET_SIZE_INFO_DEFAULT_LEGACY: IVisualizationDefaultSizeInfo;

/**
 * @internal
 */
export declare const InsightError: React_2.FC<WithIntlProps<IInsightErrorProps & WrappedComponentProps>> & {
    WrappedComponent: React_2.ComponentType<IInsightErrorProps & WrappedComponentProps>;
};

/**
 * Renders insight passed as a parameter.
 *
 * @internal
 */
export declare const InsightRenderer: React_2.FC<IInsightRendererProps>;

/**
 * Renders insight which was previously created and saved in the Analytical Designer.
 *
 * @public
 */
export declare class InsightView extends React_2.Component<IInsightViewProps> {
    render(): JSX.Element;
}

/**
 * Type-guard testing whether the provided object is an instance of {@link IDrillDownDefinition}.
 * @beta
 */
export declare function isDrillDownDefinition(obj: unknown): obj is IDrillDownDefinition;

/**
 * @alpha
 */
export declare function isEmptyAfm(obj: unknown): obj is EmptyAfmSdkError;

/**
 * Info about min, max and default in layout units.
 * If no value is provided for min/max/default layout will use its generic defaults for it.
 *
 * @alpha
 */
export declare interface ISizeInfo {
    default?: number;
    min?: number;
    max?: number;
}

/**
 * Info about min, max and default in layout units with required default value.
 *
 * @alpha
 */
export declare type ISizeInfoDefault = ISizeInfo & {
    default: number;
};

/**
 * Info about visualization's min, max and default for width and height with required default value.
 *
 * @alpha
 */
export declare interface IVisualizationDefaultSizeInfo {
    width: ISizeInfoDefault;
    height: ISizeInfoDefault;
}

/**
 * Metadata of the visualization.
 *
 * @privateRemarks
 * This should probably come from the visualizationClass objects, but that is not feasible right now.
 *
 * @alpha
 */
export declare interface IVisualizationMeta {
    /**
     * URL where documentation of the visualization can be found.
     */
    documentationUrl?: string;
    /**
     * If true, the visualization supports being exported (if the currently used backend supports exports as well).
     */
    supportsExport: boolean;
    /**
     * If true, the visualization supports zoom to detailed view.
     */
    supportsZooming: boolean;
}

/**
 * Info about visualization's min, max and default for width and height.
 *
 * @alpha
 */
export declare interface IVisualizationSizeInfo {
    width: ISizeInfo;
    height: ISizeInfo;
}

/**
 * @internal
 */
export declare const KPI_WIDGET_SIZE_INFO_DEFAULT: IVisualizationDefaultSizeInfo;

/**
 * @internal
 */
export declare const KPI_WIDGET_SIZE_INFO_DEFAULT_LEGACY: IVisualizationDefaultSizeInfo;

/**
 * @alpha
 */
export declare type LayoutType = "fluid";

/**
 * @alpha
 */
export declare const PluggableVisualizationErrorCodes: {
    /**
     * If pluggable visualization is asked to render itself but its buckets do not contain the right 'stuff',
     * then this is the error code to communicate the fact.
     */
    INVALID_BUCKETS: string;
    /**
     * This error means that empty AFM was went to the GoodData.UI and as such can't be executed.
     */
    EMPTY_AFM: string;
};

/**
 * @alpha
 */
export declare type PluggableVisualizationErrorType = keyof typeof PluggableVisualizationErrorCodes;

/**
 * In order to use React18 for visualization rendering, one has to provide createRoot function.
 * Older React17 render is used by default.
 *
 * @public
 */
export declare function provideCreateRoot(createRoot: CreateRoot): void;

/**
 * React18 Root type.
 *
 * @public
 */
export declare interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
}

/**
 * @internal
 */
export declare const WIDGET_DROPZONE_SIZE_INFO_DEFAULT: IVisualizationDefaultSizeInfo;

export { }
