// (C) 2019-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import { EmptyAfmSdkError, isEmptyAfm, } from "../../interfaces/Visualization.js";
import { findDerivedBucketItem, hasDerivedBucketItems, isDerivedBucketItem, } from "../../utils/bucketHelper.js";
import { insightHasDataDefined, insightProperties } from "@gooddata/sdk-model";
import { DefaultLocale, isGoodDataSdkError, UnexpectedSdkError, } from "@gooddata/sdk-ui";
import { createInternalIntl } from "../../utils/internalIntlProvider.js";
import { getSupportedProperties } from "../../utils/propertiesHelper.js";
export class AbstractPluggableVisualization {
    constructor(props) {
        var _a;
        this.getIsError = () => {
            return this.hasEmptyAfm || this.hasError;
        };
        //
        // Callback delegates
        //
        this.onError = (error) => {
            var _a, _b;
            (_b = (_a = this.callbacks).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error);
            // EMPTY_AFM is handled in update as it can change on any render contrary to other error types
            // that have to be set manually or by loading
            if (!isEmptyAfm(error)) {
                this.hasError = true;
            }
            this.renderConfigurationPanel(this.currentInsight);
        };
        this.onLoadingChanged = (loadingState) => {
            var _a, _b;
            (_b = (_a = this.callbacks).onLoadingChanged) === null || _b === void 0 ? void 0 : _b.call(_a, loadingState);
            this.hasError = false;
            this.isLoading = loadingState.isLoading;
            this.renderConfigurationPanel(this.currentInsight);
        };
        this.onExportReady = (exportResult) => {
            var _a, _b;
            (_b = (_a = this.callbacks).onExportReady) === null || _b === void 0 ? void 0 : _b.call(_a, exportResult);
        };
        this.pushData = (data, options) => {
            var _a, _b;
            (_b = (_a = this.callbacks).pushData) === null || _b === void 0 ? void 0 : _b.call(_a, data, options);
        };
        this.afterRender = () => {
            var _a, _b;
            (_b = (_a = this.callbacks).afterRender) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        this.onDrill = (event) => {
            // in case onDrill is not specified, default to always firing drill events
            return this.callbacks.onDrill ? this.callbacks.onDrill(event) : true;
        };
        this.callbacks = props.callbacks;
        this.locale = (_a = props.locale) !== null && _a !== void 0 ? _a : DefaultLocale;
        this.intl = createInternalIntl(this.locale);
        this.element = props.element;
        this.configPanelElement = props.configPanelElement;
        this.propertiesAffectingReferencePoint = [];
    }
    /**
     * Get an element where the visualization should be mounted
     */
    getElement() {
        if (typeof this.element === "function") {
            return this.element();
        }
        return document.querySelector(this.element);
    }
    /**
     * Get an element where the config panel should be mounted
     */
    getConfigPanelElement() {
        if (typeof this.configPanelElement === "function") {
            return this.configPanelElement();
        }
        return document.querySelector(this.configPanelElement);
    }
    //
    // Templated implementation of update contract
    //
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
    update(options, insight, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    insightPropertiesMeta, executionFactory) {
        this.updateInstanceProperties(options, insight, insightPropertiesMeta);
        this.hasEmptyAfm = !insightHasDataDefined(insight);
        let shouldRenderVisualization;
        try {
            shouldRenderVisualization = this.checkBeforeRender(insight);
        }
        catch (e) {
            const sdkError = isGoodDataSdkError(e) ? e : new UnexpectedSdkError(undefined, e);
            this.onError(sdkError);
            return;
        }
        if (shouldRenderVisualization) {
            this.renderVisualization(options, insight, executionFactory);
        }
        this.renderConfigurationPanel(insight);
    }
    /**
     * This method will be called during the {@link update} processing. This is where internal properties of the
     * concrete plug vis class MAY be updated. If class overrides this method, it MUST call the method in
     * superclass.
     *
     * @param options - visualization options
     * @param insight - insight that is about to be rendered
     */
    updateInstanceProperties(
    // @ts-expect-error Ignoring here so that the JSDoc has the proper name (not _options)
    options, insight, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    insightPropertiesMeta) {
        this.visualizationProperties = getSupportedProperties(insightProperties(insight), this.supportedPropertiesList);
        this.propertiesMeta = insightPropertiesMeta !== null && insightPropertiesMeta !== void 0 ? insightPropertiesMeta : null;
        this.currentInsight = insight;
    }
    /**
     * This method will be called during the {@link update} processing. It can be used to influence whether
     * visualization should be rendered and optionally whether particular error should be rendered by the app.
     *
     * @param insight - insight that is about to be rendered
     * @returns when true is returned (default), visualization will be rendered, when false is returned no rendering is done
     * @throws error - if anything is thrown, visualization will not be rendered and the exception will be passed via onError callback
     */
    checkBeforeRender(insight) {
        if (!insightHasDataDefined(insight)) {
            throw new EmptyAfmSdkError();
        }
        return true;
    }
    //
    // Templated implementation of addNewDerivedBucketItems contract
    //
    addNewDerivedBucketItems(referencePoint, newDerivedBucketItems) {
        if (!referencePoint.buckets) {
            return Promise.resolve(referencePoint);
        }
        const newReferencePoint = cloneDeep(referencePoint);
        newReferencePoint.buckets = referencePoint.buckets.map((bucket) => {
            return Object.assign(Object.assign({}, bucket), { items: this.mergeDerivedBucketItems(referencePoint, bucket, newDerivedBucketItems) });
        });
        return Promise.resolve(newReferencePoint);
    }
    mergeDerivedBucketItems(referencePoint, bucket, newDerivedBucketItems) {
        return bucket.items.reduce((resultItems, bucketItem) => {
            const newDerivedBucketItem = findDerivedBucketItem(bucketItem, newDerivedBucketItems);
            const shouldAddItem = newDerivedBucketItem &&
                !isDerivedBucketItem(bucketItem) &&
                !hasDerivedBucketItems(bucketItem, referencePoint.buckets);
            if (shouldAddItem) {
                resultItems.push(newDerivedBucketItem);
            }
            resultItems.push(bucketItem);
            return resultItems;
        }, []);
    }
    /**
     * Default no-op implementation of the drill down, which just returns the original visualization.
     *
     * @param sourceVisualization - drill down source {@link IInsight}
     * @param _drillDownContext - drill context (unused in this implementation)
     * @param _backendSupportsElementUris - whether backend supports elements by uri (unused in this implementation)
     * @returns the `sourceVisualization`
     * @see {@link IVisualization.getInsightWithDrillDownApplied} for more information
     */
    getInsightWithDrillDownApplied(sourceVisualization, _drillDownContext, _backendSupportsElementUris) {
        return sourceVisualization;
    }
    /**
     * Default implementation of sort config getter returning empty object
     *
     * @param _referencePoint - reference point
     * @returns promise promise once resolved returns an sort config
     */
    getSortConfig(_referencePoint) {
        return Promise.resolve({
            defaultSort: [],
            availableSorts: [],
            supported: false,
            disabled: false,
        });
    }
    haveSomePropertiesRelevantForReferencePointChanged(currentReferencePoint, nextReferencePoint) {
        return this.propertiesAffectingReferencePoint.some((prop) => {
            var _a, _b, _c, _d;
            return ((_b = (_a = currentReferencePoint === null || currentReferencePoint === void 0 ? void 0 : currentReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.controls) === null || _b === void 0 ? void 0 : _b[prop]) !==
                ((_d = (_c = nextReferencePoint === null || nextReferencePoint === void 0 ? void 0 : nextReferencePoint.properties) === null || _c === void 0 ? void 0 : _c.controls) === null || _d === void 0 ? void 0 : _d[prop]);
        });
    }
}
//# sourceMappingURL=AbstractPluggableVisualization.js.map