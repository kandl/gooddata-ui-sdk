import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ISettings, ITheme, IInsight, IInsightDefinition, IVisualizationClass, IExecutionConfig } from "@gooddata/sdk-model";
import React from "react";
import { ExplicitDrill, ILocale, OnError, OnExportReady, OnLoadingChanged, VisualizationEnvironment } from "@gooddata/sdk-ui";
import { IBucketItem, IGdcConfig, IReferencePoint, IVisCallbacks, IDrillDownContext, IExtendedReferencePoint } from "../interfaces/Visualization.js";
import { IVisualizationCatalog } from "./VisualizationCatalog.js";
import { ISortConfig } from "../interfaces/SortConfig.js";
export interface IBaseVisualizationProps extends IVisCallbacks {
    backend: IAnalyticalBackend;
    projectId: string;
    insight: IInsightDefinition;
    insightPropertiesMeta?: any;
    config?: IGdcConfig;
    executionConfig?: IExecutionConfig;
    visualizationClass: IVisualizationClass;
    environment?: VisualizationEnvironment;
    width?: number;
    height?: number;
    locale?: ILocale;
    dateFormat?: string;
    drillableItems?: ExplicitDrill[];
    totalsEditAllowed?: boolean;
    featureFlags?: ISettings;
    visualizationCatalog?: IVisualizationCatalog;
    newDerivedBucketItems?: IBucketItem[];
    referencePoint?: IReferencePoint;
    onError: OnError;
    onExportReady?: OnExportReady;
    onLoadingChanged: OnLoadingChanged;
    isMdObjectValid?: boolean;
    configPanelClassName?: string;
    theme?: ITheme;
    lastSavedVisClassUrl?: string;
    onExtendedReferencePointChanged?(referencePoint: IExtendedReferencePoint, sortConfig?: ISortConfig): void;
    onSortingChanged?(sortConfig: ISortConfig): void;
    onNewDerivedBucketItemsPlaced?(): void;
    renderer?(component: any, target: Element): void;
    unmount?(): void;
}
export declare class BaseVisualization extends React.PureComponent<IBaseVisualizationProps> {
    static defaultProps: Pick<IBaseVisualizationProps, "visualizationCatalog" | "newDerivedBucketItems" | "referencePoint" | "onExtendedReferencePointChanged" | "onNewDerivedBucketItemsPlaced" | "isMdObjectValid" | "configPanelClassName" | "featureFlags">;
    private visElementId;
    private visualization;
    private executionFactory;
    private containerRef;
    /**
     * The component may render both visualization and config panel. In React18 we therefore need two
     * roots with their respective render methods. This Map holds the roots for both and provides
     * render and unmount methods whenever needed.
     */
    private reactRootsMap;
    constructor(props: IBaseVisualizationProps);
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IBaseVisualizationProps): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private getVisElementClassName;
    private getClassName;
    private setupVisualization;
    private getReactRenderFunction;
    private getReactUnmountFunction;
    private updateVisualization;
    private triggerPlaceNewDerivedBucketItems;
    private triggerExtendedReferencePointChanged;
    private triggerPropertiesChanged;
    private static bucketReferencePointHasChanged;
    private static propertiesControlsHasChanged;
    private somePropertiesRelevantForReferencePointChanged;
    private getVisualizationProps;
    getInsightWithDrillDownApplied(sourceVisualization: IInsight, drillDownContext: IDrillDownContext): IInsight;
    getExecution(): import("@gooddata/sdk-backend-spi").IPreparedExecution;
}
//# sourceMappingURL=BaseVisualization.d.ts.map