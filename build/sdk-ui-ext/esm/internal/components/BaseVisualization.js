import { insightProperties, visClassUrl, } from "@gooddata/sdk-model";
import React from "react";
import { render } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { ConfigPanelClassName, } from "../interfaces/Visualization.js";
import { FullVisualizationCatalog } from "./VisualizationCatalog.js";
import isEmpty from "lodash/isEmpty.js";
import isEqual from "lodash/isEqual.js";
import noop from "lodash/noop.js";
import omit from "lodash/omit.js";
import { unmountComponentsAtNodes } from "../utils/domHelper.js";
import { _createRoot } from "../createRootProvider.js";
class BaseVisualization extends React.PureComponent {
    constructor(props) {
        super(props);
        /**
         * The component may render both visualization and config panel. In React18 we therefore need two
         * roots with their respective render methods. This Map holds the roots for both and provides
         * render and unmount methods whenever needed.
         */
        this.reactRootsMap = new Map();
        this.getReactRenderFunction = () => {
            if (_createRoot) {
                return (children, element) => {
                    if (!this.reactRootsMap.get(element)) {
                        this.reactRootsMap.set(element, _createRoot(element));
                    }
                    this.reactRootsMap.get(element).render(children);
                };
            }
            else {
                return render;
            }
        };
        this.getReactUnmountFunction = () => {
            if (_createRoot) {
                return () => this.reactRootsMap.forEach((root) => root.render(null));
            }
            else {
                return (elementsOrSelectors) => unmountComponentsAtNodes(elementsOrSelectors);
            }
        };
        this.visElementId = uuidv4();
        this.executionFactory = props.backend.workspace(props.projectId).execution();
        this.containerRef = React.createRef();
    }
    componentWillUnmount() {
        if (this.visualization) {
            this.visualization.unmount();
        }
        if (_createRoot) {
            // In order to avoid race conditions when mounting and unmounting synchronously,
            // we use timeout for React18.
            // https://github.com/facebook/react/issues/25675
            this.reactRootsMap.forEach((root) => setTimeout(() => root.unmount(), 0));
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const newDerivedBucketItemsChanged = !isEmpty(nextProps.newDerivedBucketItems) &&
            !isEqual(nextProps.newDerivedBucketItems, this.props.newDerivedBucketItems);
        if (newDerivedBucketItemsChanged) {
            this.triggerPlaceNewDerivedBucketItems(nextProps);
            return;
        }
        const visualizationClassChanged = !isEqual(nextProps.visualizationClass, this.props.visualizationClass);
        const referencePointChanged = BaseVisualization.bucketReferencePointHasChanged(this.props.referencePoint, nextProps.referencePoint);
        const relevantPropertiesChanged = this.somePropertiesRelevantForReferencePointChanged(this.props.referencePoint, nextProps.referencePoint);
        const propertiesControlsChanged = BaseVisualization.propertiesControlsHasChanged(this.props.referencePoint, nextProps.referencePoint);
        if (visualizationClassChanged) {
            this.visElementId = uuidv4();
            this.setupVisualization(nextProps);
        }
        if (referencePointChanged || relevantPropertiesChanged || visualizationClassChanged) {
            this.triggerExtendedReferencePointChanged(nextProps, 
            // only pass current props if the visualization class is the same (see getExtendedReferencePoint JSDoc)
            visualizationClassChanged ? undefined : this.props);
            // Some of the properties eg. stacking of measures, dual axes influence sorting
        }
        else if (propertiesControlsChanged) {
            this.triggerPropertiesChanged(nextProps, this.props);
        }
    }
    componentDidMount() {
        this.setupVisualization(this.props);
        this.updateVisualization();
        this.triggerExtendedReferencePointChanged(this.props);
    }
    componentDidUpdate() {
        if (this.props.isMdObjectValid) {
            this.updateVisualization();
        }
    }
    render() {
        return (React.createElement("div", { "aria-label": "base-visualization", key: this.visElementId, style: { height: "100%" }, className: this.getClassName(), ref: this.containerRef }));
    }
    getVisElementClassName() {
        return `gd-vis-${this.visElementId}`;
    }
    getClassName() {
        return `gd-base-visualization ${this.getVisElementClassName()}`;
    }
    setupVisualization(props) {
        const { visualizationClass, environment, locale, featureFlags, projectId, configPanelClassName, renderer, unmount, } = props;
        if (this.visualization) {
            this.visualization.unmount();
        }
        const visUri = visClassUrl(visualizationClass);
        let visFactory;
        try {
            visFactory = this.props.visualizationCatalog.forUri(visUri).getFactory();
        }
        catch (e) {
            console.error(`Error: unsupported visualization type - ${visUri}`);
        }
        if (visFactory) {
            const constructorParams = {
                projectId,
                locale,
                environment,
                backend: props.backend,
                element: () => {
                    var _a, _b;
                    const rootNode = (_b = (_a = this.containerRef.current) === null || _a === void 0 ? void 0 : _a.getRootNode()) !== null && _b !== void 0 ? _b : document;
                    return rootNode.querySelector(`.${this.getVisElementClassName()}`);
                },
                configPanelElement: () => {
                    var _a, _b;
                    const rootNode = (_b = (_a = this.containerRef.current) === null || _a === void 0 ? void 0 : _a.getRootNode()) !== null && _b !== void 0 ? _b : document;
                    return rootNode.querySelector(`.${configPanelClassName}`);
                },
                callbacks: {
                    afterRender: props.afterRender,
                    onLoadingChanged: props.onLoadingChanged,
                    onError: props.onError,
                    onExportReady: props.onExportReady,
                    pushData: props.pushData,
                    onDrill: props.onDrill,
                },
                featureFlags,
                visualizationProperties: insightProperties(props.insight),
                renderFun: renderer !== null && renderer !== void 0 ? renderer : this.getReactRenderFunction(),
                unmountFun: unmount !== null && unmount !== void 0 ? unmount : this.getReactUnmountFunction(),
            };
            this.visualization = visFactory(constructorParams);
        }
    }
    updateVisualization() {
        if (!this.visualization) {
            return;
        }
        this.visualization.update(this.getVisualizationProps(), this.props.insight, this.props.insightPropertiesMeta, this.executionFactory);
    }
    triggerPlaceNewDerivedBucketItems(props) {
        const { newDerivedBucketItems, referencePoint, onNewDerivedBucketItemsPlaced } = props;
        if (this.visualization && referencePoint && newDerivedBucketItems && onNewDerivedBucketItemsPlaced) {
            this.visualization
                .addNewDerivedBucketItems(referencePoint, newDerivedBucketItems)
                .then(onNewDerivedBucketItemsPlaced);
        }
    }
    triggerExtendedReferencePointChanged(newProps, currentProps) {
        const { referencePoint: newReferencePoint, onExtendedReferencePointChanged } = newProps;
        if (this.visualization && newReferencePoint && onExtendedReferencePointChanged) {
            this.visualization
                .getExtendedReferencePoint(newReferencePoint, currentProps === null || currentProps === void 0 ? void 0 : currentProps.referencePoint)
                .then(async (extendedReferencePoint) => {
                const sortConfig = await this.visualization.getSortConfig(extendedReferencePoint);
                // new sort config needs to be sent together with new reference point to avoid double executions with old invalid sort until new one arrives by its own handler
                onExtendedReferencePointChanged(extendedReferencePoint, sortConfig);
            });
        }
    }
    triggerPropertiesChanged(newProps, currentProps) {
        const { referencePoint: newReferencePoint, onSortingChanged } = newProps;
        // Some of the properties eg. stacking of measures, dual axes influence sorting
        if (this.visualization && newReferencePoint && onSortingChanged) {
            this.visualization
                .getExtendedReferencePoint(newReferencePoint, currentProps === null || currentProps === void 0 ? void 0 : currentProps.referencePoint)
                .then((extendedRefPoint) => {
                this.visualization.getSortConfig(extendedRefPoint).then(onSortingChanged);
            });
        }
    }
    static bucketReferencePointHasChanged(currentReferencePoint, nextReferencePoint) {
        return !isEqual(omit(currentReferencePoint, ["properties", "availableSorts"]), omit(nextReferencePoint, ["properties", "availableSorts"]));
    }
    static propertiesControlsHasChanged(currentReferencePoint, nextReferencePoint) {
        var _a, _b;
        return !isEqual((_a = currentReferencePoint === null || currentReferencePoint === void 0 ? void 0 : currentReferencePoint.properties) === null || _a === void 0 ? void 0 : _a.controls, (_b = nextReferencePoint === null || nextReferencePoint === void 0 ? void 0 : nextReferencePoint.properties) === null || _b === void 0 ? void 0 : _b.controls);
    }
    somePropertiesRelevantForReferencePointChanged(currentReferencePoint, nextReferencePoint) {
        if (this.visualization) {
            return this.visualization.haveSomePropertiesRelevantForReferencePointChanged(currentReferencePoint, nextReferencePoint);
        }
        return false;
    }
    getVisualizationProps() {
        return {
            locale: this.props.locale,
            dateFormat: this.props.dateFormat,
            dimensions: {
                width: this.props.width,
                height: this.props.height,
            },
            custom: {
                drillableItems: this.props.drillableItems,
                totalsEditAllowed: this.props.totalsEditAllowed,
                lastSavedVisClassUrl: this.props.lastSavedVisClassUrl,
            },
            config: this.props.config,
            theme: this.props.theme,
            executionConfig: this.props.executionConfig,
        };
    }
    getInsightWithDrillDownApplied(sourceVisualization, drillDownContext) {
        var _a;
        return this.visualization.getInsightWithDrillDownApplied(sourceVisualization, drillDownContext, (_a = this.props.backend.capabilities.supportsElementUris) !== null && _a !== void 0 ? _a : true);
    }
    getExecution() {
        if (!this.visualization) {
            this.setupVisualization(this.props);
        }
        return this.visualization.getExecution(this.getVisualizationProps(), this.props.insight, this.executionFactory);
    }
}
BaseVisualization.defaultProps = {
    visualizationCatalog: FullVisualizationCatalog,
    newDerivedBucketItems: [],
    referencePoint: null,
    onExtendedReferencePointChanged: noop,
    onNewDerivedBucketItemsPlaced: noop,
    isMdObjectValid: true,
    configPanelClassName: ConfigPanelClassName,
    featureFlags: {},
};
export { BaseVisualization };
//# sourceMappingURL=BaseVisualization.js.map