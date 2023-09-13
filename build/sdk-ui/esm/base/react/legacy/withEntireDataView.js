// (C) 2019 GoodData Corporation
import { isNoDataError, isUnexpectedResponseError, } from "@gooddata/sdk-backend-spi";
import { defFingerprint } from "@gooddata/sdk-model";
import React from "react";
import { injectIntl } from "react-intl";
import noop from "lodash/noop.js";
import omit from "lodash/omit.js";
import { DataTooLargeToDisplaySdkError, NegativeValuesSdkError, } from "../../errors/GoodDataSdkError.js";
import { createExportErrorFunction, createExportFunction } from "../../vis/export.js";
import { DataViewFacade } from "../../results/facade.js";
import { convertError } from "../../errors/errorHandling.js";
import { IntlWrapper } from "../../localization/IntlWrapper.js";
import { getAvailableDrillTargets } from "./availableDrillTargets.js";
/**
 * A HOC to wrap data visualization components with loading / error handling.
 *
 * Note: this is a legacy HOC with a long history. In v7 we had VisualizationLoadingHOC - that one was used for
 * all components and was linked to AFM and the paging and everything. We took this and gutted it out, changed to
 * work with executions and to only support reading all the data.
 *
 * @param InnerComponent - component to wrap
 * @internal
 */
export function withEntireDataView(InnerComponent) {
    class LoadingHOCWrapped extends React.Component {
        constructor(props) {
            super(props);
            this.hasUnmounted = false;
            /**
             * Fingerprint of the last execution definition the initialize was called with.
             */
            this.lastInitRequestFingerprint = null;
            this.stripWorkspace = (props) => {
                return omit(props, ["workspace"]);
            };
            this.state = {
                isLoading: false,
                error: null,
                executionResult: null,
                dataView: null,
            };
            this.onLoadingChanged = this.onLoadingChanged.bind(this);
            this.onDataTooLarge = this.onDataTooLarge.bind(this);
            this.onNegativeValues = this.onNegativeValues.bind(this);
        }
        componentDidMount() {
            this.initDataLoading(this.props.execution);
        }
        render() {
            const { isLoading, error, dataView } = this.state;
            const { intl } = this.props;
            // lower-level components do not need workspace
            const props = this.stripWorkspace(this.props);
            return (React.createElement(InnerComponent, Object.assign({}, props, { dataView: dataView, onDataTooLarge: this.onDataTooLarge, onNegativeValues: this.onNegativeValues, error: error, isLoading: isLoading, intl: intl })));
        }
        UNSAFE_componentWillReceiveProps(nextProps) {
            //  we need strict equality here in case only the buckets changed (not measures or attributes)
            if (!this.props.execution.equals(nextProps.execution)) {
                this.initDataLoading(nextProps.execution);
            }
        }
        componentWillUnmount() {
            this.hasUnmounted = true;
            this.onLoadingChanged = noop;
            this.onError = noop;
        }
        onLoadingChanged(loadingState) {
            const { onLoadingChanged } = this.props;
            onLoadingChanged === null || onLoadingChanged === void 0 ? void 0 : onLoadingChanged(loadingState);
            const { isLoading } = loadingState;
            const state = { isLoading };
            if (isLoading) {
                state.error = null;
            }
            this.setState(state);
        }
        onError(error) {
            var _a, _b;
            const { onExportReady } = this.props;
            this.setState({ error: error.getMessage(), dataView: null });
            this.onLoadingChanged({ isLoading: false });
            if (onExportReady) {
                onExportReady(createExportErrorFunction(error));
            }
            (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error);
        }
        onDataTooLarge(_data, errorMessage) {
            this.onError(new DataTooLargeToDisplaySdkError(errorMessage));
        }
        onNegativeValues() {
            this.onError(new NegativeValuesSdkError());
        }
        async initDataLoading(execution) {
            const { onExportReady, pushData, exportTitle } = this.props;
            this.onLoadingChanged({ isLoading: true });
            this.setState({ dataView: null });
            this.lastInitRequestFingerprint = defFingerprint(execution.definition);
            try {
                const executionResult = await execution.execute();
                if (this.lastInitRequestFingerprint !== defFingerprint(execution.definition)) {
                    return;
                }
                if (this.hasUnmounted) {
                    return;
                }
                const dataView = await executionResult.readAll().catch((err) => {
                    /**
                     * When execution result is received successfully,
                     * but data load fails with unexpected http response,
                     * we still want to push availableDrillTargets
                     */
                    if (isUnexpectedResponseError(err) && pushData) {
                        const availableDrillTargets = getAvailableDrillTargets(DataViewFacade.forResult(executionResult));
                        pushData({ availableDrillTargets });
                    }
                    throw err;
                });
                if (this.hasUnmounted) {
                    return;
                }
                if (this.lastInitRequestFingerprint !== defFingerprint(dataView.definition)) {
                    /*
                     * Stop right now if the data are not relevant anymore because there was another
                     * initialize request in the meantime.
                     */
                    return;
                }
                this.setState({ dataView, error: null, executionResult });
                this.onLoadingChanged({ isLoading: false });
                if (onExportReady) {
                    onExportReady(createExportFunction(dataView.result, exportTitle));
                }
                if (pushData) {
                    const availableDrillTargets = getAvailableDrillTargets(DataViewFacade.for(dataView));
                    pushData({ dataView, availableDrillTargets });
                }
            }
            catch (error) {
                if (this.lastInitRequestFingerprint !== defFingerprint(execution.definition)) {
                    return;
                }
                if (this.hasUnmounted) {
                    return;
                }
                /*
                 * There can be situations, where there is no data to visualize but the result / dataView contains
                 * metadata essential for setup of drilling. Look for that and if available push up.
                 */
                if (isNoDataError(error) && error.dataView && pushData) {
                    const availableDrillTargets = getAvailableDrillTargets(DataViewFacade.for(error.dataView));
                    pushData({ availableDrillTargets });
                }
                this.onError(convertError(error));
            }
        }
    }
    LoadingHOCWrapped.defaultProps = InnerComponent.defaultProps || {};
    const IntlLoadingHOC = injectIntl(LoadingHOCWrapped);
    return class LoadingHOC extends React.Component {
        render() {
            return (React.createElement(IntlWrapper, { locale: this.props.locale },
                React.createElement(IntlLoadingHOC, Object.assign({}, this.props))));
        }
    };
}
//# sourceMappingURL=withEntireDataView.js.map