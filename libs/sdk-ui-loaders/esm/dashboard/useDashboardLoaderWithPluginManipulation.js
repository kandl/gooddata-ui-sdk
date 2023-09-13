// (C) 2022-2023 GoodData Corporation
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { invariant } from "ts-invariant";
import compact from "lodash/compact.js";
import isArray from "lodash/isArray.js";
import { idRef } from "@gooddata/sdk-model";
import { selectRenderMode, selectDashboardWorkingDefinition, selectWidgetsOverlay, uiActions, } from "@gooddata/sdk-ui-dashboard";
import { useDashboardLoader } from "./useDashboardLoader.js";
function sanitizedDashboardRef(dashboard) {
    return typeof dashboard === "string" ? idRef(dashboard, "analyticalDashboard") : dashboard;
}
/**
 * Wrapper around {@link useDashboardLoader} that adds the option to reload while keeping the current state of the dashboard intact.
 *
 * @param options - load options
 * @internal
 */
export function useDashboardLoaderWithPluginManipulation(options) {
    var _a, _b;
    const [dashboard, setDashboard] = useState(() => sanitizedDashboardRef(options.dashboard));
    const [renderMode, setRenderMode] = useState(options.dashboard ? "view" : "edit");
    const [widgetsOverlay, setWidgetsOverlay] = useState((_a = options.config) === null || _a === void 0 ? void 0 : _a.widgetsOverlay);
    const [loadingMode, setLoadingMode] = useState((_b = options.loadingMode) !== null && _b !== void 0 ? _b : "adaptive");
    const [currentExtraPlugins, setCurrentExtraPlugins] = useState(() => isArray(options.extraPlugins) ? options.extraPlugins : compact([options.extraPlugins]));
    const augmentedConfig = useMemo(() => (Object.assign(Object.assign({}, options.config), { initialRenderMode: renderMode, widgetsOverlay })), [options.config, renderMode, widgetsOverlay]);
    useEffect(() => {
        setDashboard(sanitizedDashboardRef(options.dashboard));
        // for new dashboards we need to always go to edit mode
        if (!options.dashboard) {
            setRenderMode("edit");
        }
    }, [options.dashboard]);
    const loaderStatus = useDashboardLoader(Object.assign(Object.assign({}, options), { dashboard,
        loadingMode, extraPlugins: currentExtraPlugins, config: augmentedConfig }));
    const dashboardSelect = useRef();
    const dashboardDispatch = useRef();
    const onStateChange = useCallback((state, dispatch) => {
        dashboardSelect.current = (select) => select(state);
        dashboardDispatch.current = dispatch;
    }, []);
    const reloadPlugins = useCallback(() => {
        invariant(dashboardSelect.current, "reloadPlugins used before initialization");
        const select = dashboardSelect.current;
        const dashboardObject = select(selectDashboardWorkingDefinition);
        const renderMode = select(selectRenderMode);
        const widgetsOverlay = select(selectWidgetsOverlay);
        // force new reference in case the current dashboard object is the same as the one with which the last reload occurred
        // this makes sure the dashboard is fully reloaded each time
        setDashboard(Object.assign({}, dashboardObject));
        setRenderMode(renderMode);
        setWidgetsOverlay(widgetsOverlay);
    }, []);
    const hidePluginOverlays = useCallback(() => {
        invariant(dashboardDispatch.current, "hidePluginOverlays used before initialization");
        dashboardDispatch.current(uiActions.hideAllWidgetsOverlay());
    }, []);
    const changeLoadingMode = useCallback((newLoadingMode) => {
        invariant(dashboardSelect.current, "changeLoadingMode used before initialization");
        const select = dashboardSelect.current;
        const dashboardObject = select(selectDashboardWorkingDefinition);
        const renderMode = select(selectRenderMode);
        // force new reference in case the current dashboard object is the same as the one with which the last loading mode change occurred
        // this makes sure the dashboard is fully reloaded each time
        setDashboard(Object.assign({}, dashboardObject));
        setRenderMode(renderMode);
        setLoadingMode(newLoadingMode);
        // force reset overlays to not keep between modes
        setWidgetsOverlay({});
    }, []);
    const setExtraPlugins = useCallback((extraPlugins) => {
        invariant(dashboardSelect.current, "setExtraPlugins used before initialization");
        const select = dashboardSelect.current;
        const dashboardObject = select(selectDashboardWorkingDefinition);
        const renderMode = select(selectRenderMode);
        const widgetsOverlay = select(selectWidgetsOverlay);
        // force new reference in case the current dashboard object is the same as the one with which the last setting of extra plugins occurred
        // this makes sure the dashboard is fully reloaded each time
        setDashboard(Object.assign({}, dashboardObject));
        setRenderMode(renderMode);
        setWidgetsOverlay(widgetsOverlay);
        setCurrentExtraPlugins(isArray(extraPlugins) ? extraPlugins : [extraPlugins]);
    }, []);
    return {
        loaderStatus: loaderStatus.status === "success"
            ? Object.assign(Object.assign({}, loaderStatus), { result: Object.assign(Object.assign({}, loaderStatus.result), { props: Object.assign(Object.assign({}, loaderStatus.result.props), { onStateChange: (state, dispatch) => {
                            var _a, _b;
                            // tap into the resulting props so that the usage is transparent to the user
                            onStateChange(state, dispatch);
                            (_b = (_a = loaderStatus.result.props).onStateChange) === null || _b === void 0 ? void 0 : _b.call(_a, state, dispatch);
                        } }) }) }) : loaderStatus,
        reloadPlugins,
        hidePluginOverlays,
        changeLoadingMode,
        loadingMode,
        setExtraPlugins,
        extraPlugins: currentExtraPlugins,
    };
}
//# sourceMappingURL=useDashboardLoaderWithPluginManipulation.js.map