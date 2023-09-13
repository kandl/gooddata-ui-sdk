// (C) 2019-2022 GoodData Corporation
import React from "react";
import noop from "lodash/noop.js";
import hoistNonReactStatics from "hoist-non-react-statics";
import { CancelledSdkError, convertError, createExportErrorFunction, createExportFunction, isCancelError, makeCancelable, } from "../base/index.js";
/**
 * A React HOC responsible for orchestrating resolution of a data promise (e.g. data to load).
 *
 * This component offers more flexibility in regards to how to obtain the data - all that is encapsulated
 * into a promise of data. For most use cases, the withExecution HOC is a better fit.
 *
 * @internal
 */
export function withExecutionLoading(params) {
    const { promiseFactory, loadOnMount = true, events = {}, shouldRefetch = () => false, window, exportTitle, } = params;
    return (WrappedComponent) => {
        class WithLoading extends React.Component {
            constructor(props) {
                super(props);
                this.isWithExecutionLoadingUnmounted = false;
                this.state = {
                    error: undefined,
                    isLoading: false,
                    result: undefined,
                };
                this.fetch = this.fetch.bind(this);
                this.startLoading = this.startLoading.bind(this);
                this.setError = this.setError.bind(this);
                this.setResult = this.setResult.bind(this);
                this.getEvents = this.getEvents.bind(this);
            }
            getEvents() {
                const _events = typeof events === "function" ? events(this.props) : events;
                const { onError = noop, onLoadingChanged = noop, onLoadingFinish = noop, onLoadingStart = noop, onExportReady = noop, } = _events;
                return {
                    onError,
                    onLoadingChanged,
                    onLoadingFinish,
                    onLoadingStart,
                    onExportReady,
                };
            }
            startLoading() {
                const { onLoadingStart, onLoadingChanged } = this.getEvents();
                onLoadingStart(this.props);
                onLoadingChanged(true, this.props);
                this.effectiveProps = undefined;
                this.setState((state) => (Object.assign(Object.assign({}, state), { isLoading: true, error: undefined, result: undefined })));
            }
            setError(error) {
                const { onError, onLoadingChanged, onExportReady } = this.getEvents();
                onError(error, this.props);
                onLoadingChanged(false, this.props);
                onExportReady(createExportErrorFunction(error));
                this.setState((state) => (Object.assign(Object.assign({}, state), { isLoading: false, error })));
            }
            setResult(result) {
                const { onLoadingFinish, onLoadingChanged, onExportReady } = this.getEvents();
                const title = typeof exportTitle === "function" ? exportTitle(this.props) : exportTitle;
                onLoadingFinish(result, this.props);
                onLoadingChanged(false, this.props);
                onExportReady(createExportFunction(result.result(), title));
                this.effectiveProps = this.props;
                this.setState((state) => (Object.assign(Object.assign({}, state), { isLoading: false, error: undefined, result })));
            }
            async fetch() {
                if (this.cancelablePromise) {
                    this.cancelablePromise.cancel();
                    // On refetch, when cancelablePromise was not fulfilled, throw cancel error immediately
                    if (!this.cancelablePromise.getHasFulfilled()) {
                        this.setError(new CancelledSdkError());
                    }
                }
                this.startLoading();
                const readWindow = typeof window === "function" ? window(this.props) : window;
                const promise = promiseFactory(this.props, readWindow);
                this.cancelablePromise = makeCancelable(promise);
                try {
                    const result = await this.cancelablePromise.promise;
                    if (!this.isWithExecutionLoadingUnmounted) {
                        this.setResult(result);
                    }
                }
                catch (err) {
                    // We throw cancel error immediately on refetch, when cancelablePromise was not fulfilled,
                    // but CancelablePromise throw cancel error after promise resolution, so here
                    // we don't care about it anymore.
                    if (!this.isWithExecutionLoadingUnmounted && !isCancelError(err)) {
                        const sdkError = convertError(err);
                        this.setError(sdkError);
                    }
                }
            }
            isStaleResult() {
                return this.effectiveProps !== undefined && shouldRefetch(this.props, this.effectiveProps);
            }
            componentDidMount() {
                this.isWithExecutionLoadingUnmounted = false;
                const _loadOnMount = typeof loadOnMount === "function" ? loadOnMount(this.props) : loadOnMount;
                if (_loadOnMount) {
                    this.fetch();
                }
            }
            componentDidUpdate(prevProps) {
                if (shouldRefetch(prevProps, this.props)) {
                    this.fetch();
                }
            }
            componentWillUnmount() {
                this.isWithExecutionLoadingUnmounted = true;
                if (this.cancelablePromise) {
                    this.cancelablePromise.cancel();
                    if (!this.cancelablePromise.getHasFulfilled()) {
                        this.setError(new CancelledSdkError());
                    }
                }
            }
            render() {
                const { result, isLoading, error } = this.state;
                if (this.isStaleResult()) {
                    /*
                     * When props update, this render will be called first and state will still contain
                     * data calculated thus far. After the render, the componentDidUpdate will test whether
                     * data reload is needed and if so trigger it.
                     *
                     * The problem with this is, that the child function would be called once with stale
                     * data. This can lead to problems in expectations - the child function may work with
                     * assumptions that the result is always up to date and try access data that is just not
                     * there yet.
                     */
                    const executionResult = {
                        result: undefined,
                        isLoading: true,
                        error: undefined,
                        reload: this.fetch,
                    };
                    return React.createElement(WrappedComponent, Object.assign({}, this.props, executionResult));
                }
                const executionResult = {
                    result,
                    isLoading,
                    error,
                    reload: this.fetch,
                };
                return React.createElement(WrappedComponent, Object.assign({}, this.props, executionResult));
            }
        }
        hoistNonReactStatics(WithLoading, WrappedComponent);
        return WithLoading;
    };
}
//# sourceMappingURL=withExecutionLoading.js.map