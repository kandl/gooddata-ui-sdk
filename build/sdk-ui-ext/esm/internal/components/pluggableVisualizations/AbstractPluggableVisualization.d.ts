import { IBucketItem, IBucketOfFun, IExtendedReferencePoint, IReferencePoint, IVisConstruct, IVisProps, IVisualization, IVisualizationOptions, IVisualizationProperties, IDrillDownContext } from "../../interfaces/Visualization.js";
import { IInsight, IInsightDefinition } from "@gooddata/sdk-model";
import { IExecutionFactory, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import { GoodDataSdkError, IDrillEvent, IExportFunction, ILoadingState, ILocale, IPushData } from "@gooddata/sdk-ui";
import { IntlShape } from "react-intl";
import { ISortConfig } from "../../interfaces/SortConfig.js";
export declare abstract class AbstractPluggableVisualization implements IVisualization {
    protected intl: IntlShape;
    protected locale: ILocale;
    /**
     * Standard callback
     */
    private readonly callbacks;
    /**
     * Insight that is currently rendered by the pluggable visualization. This field is set during
     * every call to {@link update} and will remain the same until the next update() call.
     */
    protected currentInsight: IInsightDefinition;
    protected visualizationProperties: IVisualizationProperties;
    protected supportedPropertiesList: string[];
    protected propertiesMeta: any;
    /**
     * List of properties which affect content of reference point and when these changed, reference point needs to be re-generated
     *
     * Note: Object reference equality is being used and no deep object value comparison is being made.
     */
    protected propertiesAffectingReferencePoint: string[];
    /**
     * Classname or a getter function of the element where visualization should be mounted
     */
    private readonly element;
    /**
     * Classname or a getter of the element where config panel should be mounted
     */
    private readonly configPanelElement;
    private hasError;
    private hasEmptyAfm;
    protected isLoading: boolean;
    protected getIsError: () => boolean;
    protected constructor(props: IVisConstruct);
    /**
     * Get an element where the visualization should be mounted
     */
    protected getElement(): HTMLElement;
    /**
     * Get an element where the config panel should be mounted
     */
    protected getConfigPanelElement(): HTMLElement;
    abstract unmount(): void;
    abstract getExtendedReferencePoint(referencePoint: IReferencePoint): Promise<IExtendedReferencePoint>;
    /**
     * Templated implementation of the update method. Given options, insight to render and the execution
     * factory, this function will drive the update process. It consists of the following:
     *
     * 1. call to {@link updateInstanceProperties} - this method should update any internal state
     *    of the instance's properties. Subclasses MAY override this to update state of their own private
     *    properties.
     *
     * 2. call to {@link checkBeforeRender} - this method is called as a hook to perform final check before
     *    the actual rendering is triggered:
     *    - if hook returns true, vis will be rendered
     *    - if hook returns false, vis will not be rendered
     *    - if hook throws an exception, it will be sent via onError callback; vis will not be rendered
     *
     * 3. vis rendering is triggered (unless step 2 determines it should not be)
     *
     * 4. configuration panel is rendered (always)
     *
     * Note: do not override this method.
     */
    update(options: IVisProps, insight: IInsightDefinition, insightPropertiesMeta: any, executionFactory: IExecutionFactory): void;
    /**
     * Get visualization execution based on provided options, insight and execution factory.
     *
     * @param options - visualization options
     * @param insight - insight to be executed
     * @param executionFactory - execution factory to use when triggering calculation on backend
     */
    abstract getExecution(options: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): IPreparedExecution;
    /**
     * This method will be called during the {@link update} processing. This is where internal properties of the
     * concrete plug vis class MAY be updated. If class overrides this method, it MUST call the method in
     * superclass.
     *
     * @param options - visualization options
     * @param insight - insight that is about to be rendered
     */
    protected updateInstanceProperties(options: IVisProps, insight: IInsightDefinition, insightPropertiesMeta: any): void;
    /**
     * This method will be called during the {@link update} processing. It can be used to influence whether
     * visualization should be rendered and optionally whether particular error should be rendered by the app.
     *
     * @param insight - insight that is about to be rendered
     * @returns when true is returned (default), visualization will be rendered, when false is returned no rendering is done
     * @throws error - if anything is thrown, visualization will not be rendered and the exception will be passed via onError callback
     */
    protected checkBeforeRender(insight: IInsightDefinition): boolean;
    /**
     * Render visualization of the insight under the {@link element} node. Use the provided execution factory
     * to create execution to obtain data for the insight.
     *
     * @param options - visualization options to use
     * @param insight - insight to render
     * @param executionFactory - execution factory to construct execution that will obtain the necessary data
     */
    protected abstract renderVisualization(options: IVisProps, insight: IInsightDefinition, executionFactory: IExecutionFactory): void;
    /**
     * Render configuration panel under the {@link configPanelElement} node. The values of visualization properties
     * are stored in {@link visualizationProperties}.
     *
     * @param insight - insight that is rendered
     */
    protected abstract renderConfigurationPanel(insight: IInsightDefinition): void;
    protected onError: (error: GoodDataSdkError) => void;
    protected onLoadingChanged: (loadingState: ILoadingState) => void;
    protected onExportReady: (exportResult: IExportFunction) => void;
    protected pushData: (data: IPushData, options?: IVisualizationOptions) => void;
    protected afterRender: () => void;
    protected onDrill: (event: IDrillEvent) => void | boolean;
    addNewDerivedBucketItems(referencePoint: IReferencePoint, newDerivedBucketItems: IBucketItem[]): Promise<IReferencePoint>;
    protected mergeDerivedBucketItems(referencePoint: IReferencePoint, bucket: IBucketOfFun, newDerivedBucketItems: IBucketItem[]): IBucketItem[];
    /**
     * Default no-op implementation of the drill down, which just returns the original visualization.
     *
     * @param sourceVisualization - drill down source {@link IInsight}
     * @param _drillDownContext - drill context (unused in this implementation)
     * @param _backendSupportsElementUris - whether backend supports elements by uri (unused in this implementation)
     * @returns the `sourceVisualization`
     * @see {@link IVisualization.getInsightWithDrillDownApplied} for more information
     */
    getInsightWithDrillDownApplied(sourceVisualization: IInsight, _drillDownContext: IDrillDownContext, _backendSupportsElementUris: boolean): IInsight;
    /**
     * Default implementation of sort config getter returning empty object
     *
     * @param _referencePoint - reference point
     * @returns promise promise once resolved returns an sort config
     */
    getSortConfig(_referencePoint: IReferencePoint): Promise<ISortConfig>;
    haveSomePropertiesRelevantForReferencePointChanged(currentReferencePoint: IReferencePoint, nextReferencePoint: IReferencePoint): boolean;
}
//# sourceMappingURL=AbstractPluggableVisualization.d.ts.map