import { __rest } from "tslib";
// (C) 2020-2023 GoodData Corporation
import React, { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { render } from "react-dom";
import noop from "lodash/noop";
import isEqual from "lodash/isEqual";
import compose from "lodash/flowRight";
import { injectIntl } from "react-intl";
import { insightProperties, insightTitle, insightSetProperties, } from "@gooddata/sdk-model";
import { FullVisualizationCatalog } from "../internal";
import { fillMissingTitles, fillMissingFormats, ignoreTitlesForSimpleMeasures, withContexts, DefaultLocale, LoadingComponent, ErrorComponent, IntlWrapper, } from "@gooddata/sdk-ui";
import { ExecutionFactoryUpgradingToExecByReference, ExecutionFactoryWithFixedFilters, } from "@gooddata/sdk-backend-base";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
const getElementId = () => `gd-vis-${uuidv4()}`;
const visualizationUriRootStyle = {
    height: "100%",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
};
// this needs to be a pure component as it can happen that this might be rendered multiple times
// with the same props (referentially) - this might make the rendered visualization behave unpredictably
// and is bad for performance so we need to make sure the re-renders are performed only if necessary
class InsightRendererCore extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.elementId = getElementId();
        this.containerRef = React.createRef();
        this.unmountVisualization = () => {
            if (this.visualization) {
                this.visualization.unmount();
            }
            this.visualization = undefined;
        };
        this.updateVisualization = () => {
            var _a;
            // if the container no longer exists, update was called after unmount -> do nothing
            if (!this.visualization || !this.containerRef.current) {
                return;
            }
            // if there is no insight, bail early
            if (!this.props.insight) {
                return;
            }
            const { config = {} } = this.props;
            const { responsiveUiDateFormat } = (_a = this.props.settings) !== null && _a !== void 0 ? _a : {};
            const visProps = {
                locale: this.props.locale,
                dateFormat: responsiveUiDateFormat,
                custom: {
                    drillableItems: this.props.drillableItems,
                },
                config: {
                    separators: config.separators,
                    colorPalette: this.props.colorPalette,
                    mapboxToken: config.mapboxToken,
                    forceDisableDrillOnAxes: config.forceDisableDrillOnAxes,
                    isInEditMode: config.isInEditMode,
                    isExportMode: config.isExportMode,
                },
                executionConfig: this.props.execConfig,
                customVisualizationConfig: config,
                theme: this.props.theme,
            };
            const insight = fillMissingFormats(ignoreTitlesForSimpleMeasures(fillMissingTitles(this.props.insight, this.props.locale)));
            this.visualization.update(visProps, insight, {}, this.getExecutionFactory());
        };
        this.setupVisualization = async () => {
            var _a, _b;
            // if there is no insight, bail early
            if (!this.props.insight) {
                return;
            }
            (_b = (_a = this.props).onLoadingChanged) === null || _b === void 0 ? void 0 : _b.call(_a, { isLoading: true });
            // the visualization we may have from earlier is no longer valid -> get rid of it
            this.unmountVisualization();
            const visualizationFactory = FullVisualizationCatalog.forInsight(this.props.insight).getFactory();
            this.visualization = visualizationFactory({
                backend: this.props.backend,
                callbacks: {
                    onError: (error) => {
                        var _a, _b, _c, _d;
                        (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error);
                        (_d = (_c = this.props).onLoadingChanged) === null || _d === void 0 ? void 0 : _d.call(_c, { isLoading: false });
                    },
                    onLoadingChanged: ({ isLoading }) => {
                        var _a, _b;
                        (_b = (_a = this.props).onLoadingChanged) === null || _b === void 0 ? void 0 : _b.call(_a, { isLoading });
                    },
                    pushData: this.props.pushData,
                    onDrill: this.props.onDrill,
                    onExportReady: this.onExportReadyDecorator,
                },
                configPanelElement: () => {
                    var _a, _b;
                    const rootNode = (_b = (_a = this.containerRef.current) === null || _a === void 0 ? void 0 : _a.getRootNode()) !== null && _b !== void 0 ? _b : document;
                    // this is apparently a well-know constant (see BaseVisualization)
                    return rootNode.querySelector(".gd-configuration-panel-content");
                },
                element: () => {
                    var _a, _b;
                    const rootNode = (_b = (_a = this.containerRef.current) === null || _a === void 0 ? void 0 : _a.getRootNode()) !== null && _b !== void 0 ? _b : document;
                    return rootNode.querySelector(`#${this.elementId}`);
                },
                environment: "dashboards",
                locale: this.props.locale,
                projectId: this.props.workspace,
                visualizationProperties: insightProperties(this.props.insight),
                featureFlags: this.props.settings,
                renderFun: render,
            });
        };
        this.onExportReadyDecorator = (exportFunction) => {
            if (!this.props.onExportReady) {
                return;
            }
            const decorator = (exportConfig) => {
                if (exportConfig.title || !this.props.insight) {
                    return exportFunction(exportConfig);
                }
                return exportFunction(Object.assign(Object.assign({}, exportConfig), { title: insightTitle(this.props.insight) }));
            };
            this.props.onExportReady(decorator);
        };
        this.getExecutionFactory = () => {
            const factory = this.props.backend.workspace(this.props.workspace).execution();
            if (this.props.executeByReference) {
                /*
                 * When executing by reference, decorate the original execution factory so that it
                 * transparently routes `forInsight` to `forInsightByRef` AND adds the filters
                 * from InsightView props.
                 *
                 * Code will pass this factory over to the pluggable visualizations - they will do execution
                 * `forInsight` and under the covers things will be routed and done differently without the
                 * plug viz knowing.
                 */
                return new ExecutionFactoryUpgradingToExecByReference(new ExecutionFactoryWithFixedFilters(factory, this.props.filters));
            }
            return factory;
        };
        this.componentDidMountInner = async () => {
            await this.setupVisualization();
            return this.updateVisualization();
        };
        this.componentDidUpdateInner = async (prevProps) => {
            /**
             * Ignore properties when comparing insights to determine if a new setup is needed: changes to properties
             * only will be handled using the updateVisualization without unnecessary new setup just fine.
             */
            const prevInsightForCompare = prevProps.insight && insightSetProperties(prevProps.insight, {});
            const newInsightForCompare = this.props.insight && insightSetProperties(this.props.insight, {});
            const needsNewSetup = !isEqual(newInsightForCompare, prevInsightForCompare) ||
                !isEqual(this.props.filters, prevProps.filters) ||
                !isEqual(this.props.settings, prevProps.settings) ||
                this.props.workspace !== prevProps.workspace;
            if (needsNewSetup) {
                await this.setupVisualization();
            }
            return this.updateVisualization();
        };
    }
    componentDidMount() {
        this.componentDidMountInner();
    }
    componentDidUpdate(prevProps) {
        this.componentDidUpdateInner(prevProps);
    }
    componentWillUnmount() {
        this.unmountVisualization();
    }
    render() {
        return (
        // never ever dynamically change the props of this div, otherwise bad things will happen
        // e.g. visualization being rendered multiple times, etc.
        React.createElement("div", { className: "visualization-uri-root", id: this.elementId, ref: this.containerRef, style: visualizationUriRootStyle }));
    }
}
InsightRendererCore.defaultProps = {
    ErrorComponent,
    filters: [],
    drillableItems: [],
    LoadingComponent,
    pushData: noop,
    locale: DefaultLocale,
};
export const IntlInsightRenderer = compose(injectIntl, withTheme, withContexts)(InsightRendererCore);
/**
 * Updated callback (callback with a different reference) is not properly propagated to the "visualization" instance
 * (because it only takes the callbacks provided on the first render)
 * Workaround it by storing the updated callback to the ref and calling it instead.
 */
function useUpdatableCallback(callback) {
    const pushDataCached = useRef(callback);
    useEffect(() => {
        pushDataCached.current = callback;
    }, [callback]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(((...args) => {
        if (pushDataCached.current) {
            pushDataCached.current(...args);
        }
    }), []);
}
/**
 * Renders insight passed as a parameter.
 *
 * @internal
 */
export const InsightRenderer = (props) => {
    const { pushData, onDrill: onDrillCallBack, onError: onErrorCallBack, onExportReady: onExportReadyCallback, onLoadingChanged: onLoadingChangedCallback } = props, resProps = __rest(props, ["pushData", "onDrill", "onError", "onExportReady", "onLoadingChanged"]);
    const onPushData = useUpdatableCallback(pushData);
    const onDrill = useUpdatableCallback(onDrillCallBack);
    const onError = useUpdatableCallback(onErrorCallBack);
    const onExportReady = useUpdatableCallback(onExportReadyCallback);
    const onLoadingChanged = useUpdatableCallback(onLoadingChangedCallback);
    return (React.createElement(IntlWrapper, { locale: props.locale },
        React.createElement(IntlInsightRenderer, Object.assign({ pushData: onPushData, onDrill: onDrill, onError: onError, onExportReady: onExportReady, onLoadingChanged: onLoadingChanged }, resProps))));
};
//# sourceMappingURL=InsightRenderer.js.map