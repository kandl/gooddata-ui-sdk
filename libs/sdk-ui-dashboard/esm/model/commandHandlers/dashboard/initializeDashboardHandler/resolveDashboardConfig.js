import { all, call, put } from "redux-saga/effects";
import { resolveLocale } from "@gooddata/sdk-ui";
import { defaultDateFilterConfig } from "../../../../_staging/dateFilterConfig/defaultConfig.js";
import { getValidDateFilterConfig } from "../../../../_staging/dateFilterConfig/validation.js";
import { stripUserAndWorkspaceProps } from "../../../../_staging/settings/conversion.js";
import { dateFilterConfigActions } from "../../../store/dateFilterConfig/index.js";
import { isResolvedConfig, } from "../../../types/commonTypes.js";
import { sanitizeUnfinishedFeatureSettings } from "./sanitizeUnfinishedFeatureSettings.js";
import { onDateFilterConfigValidationError } from "./onDateFilterConfigValidationError.js";
function loadDateFilterConfig(ctx) {
    const { backend, workspace } = ctx;
    return backend
        .workspace(workspace)
        .dateFilterConfigs()
        .withLimit(1)
        .query()
        .catch((e) => {
        // eslint-disable-next-line no-console
        console.log("An error has occurred while loading date filter config. Will fall back to default date filter config.", e);
        return undefined;
    });
}
function loadSettingsForCurrentUser(ctx) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).settings().getSettingsForCurrentUser();
}
function loadColorPalette(ctx) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).styling().getColorPalette();
}
function* resolveDateFilterConfig(ctx, config, cmd) {
    var _a, _b;
    if (config.dateFilterConfig !== undefined) {
        return config.dateFilterConfig;
    }
    const result = yield call(loadDateFilterConfig, ctx);
    if (((_a = result === null || result === void 0 ? void 0 : result.totalCount) !== null && _a !== void 0 ? _a : 0) > 1) {
        yield call(onDateFilterConfigValidationError, ctx, "TOO_MANY_CONFIGS", cmd.correlationId);
    }
    const firstConfig = result === null || result === void 0 ? void 0 : result.items[0];
    if (!firstConfig) {
        yield call(onDateFilterConfigValidationError, ctx, "NO_CONFIG", cmd.correlationId);
    }
    return (_b = result === null || result === void 0 ? void 0 : result.items[0]) !== null && _b !== void 0 ? _b : defaultDateFilterConfig;
}
function resolveUserSettings(ctx, config) {
    if (config.settings && config.locale && config.separators) {
        return Promise.resolve({
            locale: config.locale,
            separators: config.separators,
            settings: config.settings,
        });
    }
    return loadSettingsForCurrentUser(ctx).then((res) => {
        var _a, _b, _c;
        return ({
            locale: (_a = config.locale) !== null && _a !== void 0 ? _a : resolveLocale(res.locale),
            separators: (_b = config.separators) !== null && _b !== void 0 ? _b : res.separators,
            settings: (_c = config.settings) !== null && _c !== void 0 ? _c : stripUserAndWorkspaceProps(res),
        });
    });
}
function resolveColorPalette(ctx, config) {
    if (config.colorPalette) {
        return Promise.resolve(config.colorPalette);
    }
    return loadColorPalette(ctx);
}
/**
 * Loads all essential dashboard configuration from the backend if needed. The load command may specify their
 * own inline config - if that is the case the config is bounced back immediately. Otherwise, the necessary
 * backend queries and post-processing is done.
 */
export function* resolveDashboardConfig(ctx, cmd) {
    const { payload: { config = {} }, } = cmd;
    yield put(dateFilterConfigActions.clearDateFilterConfigValidationWarning());
    if (isResolvedConfig(config)) {
        /*
         * Config coming in props is fully specified. There is nothing to do. Bail out immediately.
         */
        if (config.allowUnfinishedFeatures || !config.settings) {
            return applyConfigDefaults(config);
        }
        return Object.assign(Object.assign({}, applyConfigDefaults(config)), { settings: sanitizeUnfinishedFeatureSettings(config.settings) });
    }
    /*
     * Resolve the config values. The resolve* functions will take value from config if it is defined,
     * otherwise they will obtain the config from backend.
     *
     * Note: the user settings include locale, separators and the ISettings that should be in effect
     * for the current user in the context of the workspace.
     */
    const [dateFilterConfig, settings, colorPalette] = yield all([
        call(resolveDateFilterConfig, ctx, config, cmd),
        call(resolveUserSettings, ctx, config),
        call(resolveColorPalette, ctx, config),
    ]);
    const [validDateFilterConfig, configValidation] = getValidDateFilterConfig(dateFilterConfig, settings.settings);
    if (configValidation !== "Valid") {
        yield call(onDateFilterConfigValidationError, ctx, configValidation, cmd.correlationId);
    }
    const configWithDefaults = applyConfigDefaults(config);
    return Object.assign(Object.assign({}, configWithDefaults), { locale: settings.locale, separators: settings.separators, dateFilterConfig: validDateFilterConfig, settings: configWithDefaults.allowUnfinishedFeatures
            ? settings.settings
            : sanitizeUnfinishedFeatureSettings(settings.settings), colorPalette, mapboxToken: config.mapboxToken });
}
function applyConfigDefaults(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return Object.assign(Object.assign({}, config), { objectAvailability: (_a = config.objectAvailability) !== null && _a !== void 0 ? _a : {}, isReadOnly: (_b = config.isReadOnly) !== null && _b !== void 0 ? _b : false, isEmbedded: (_c = config.isEmbedded) !== null && _c !== void 0 ? _c : false, isExport: (_d = config.isExport) !== null && _d !== void 0 ? _d : false, isWhiteLabeled: (_e = config.isWhiteLabeled) !== null && _e !== void 0 ? _e : false, disableDefaultDrills: (_f = config.disableDefaultDrills) !== null && _f !== void 0 ? _f : false, enableFilterValuesResolutionInDrillEvents: (_g = config.enableFilterValuesResolutionInDrillEvents) !== null && _g !== void 0 ? _g : false, menuButtonItemsVisibility: (_h = config.menuButtonItemsVisibility) !== null && _h !== void 0 ? _h : {}, allowUnfinishedFeatures: (_j = config.allowUnfinishedFeatures) !== null && _j !== void 0 ? _j : false, allowCreateInsightRequest: (_k = config.allowCreateInsightRequest) !== null && _k !== void 0 ? _k : false, initialRenderMode: (_l = config.initialRenderMode) !== null && _l !== void 0 ? _l : "view", hideSaveAsNewButton: (_m = config.hideSaveAsNewButton) !== null && _m !== void 0 ? _m : false, hideShareButton: (_o = config.hideShareButton) !== null && _o !== void 0 ? _o : false, widgetsOverlay: (_p = config.widgetsOverlay) !== null && _p !== void 0 ? _p : {} });
}
//# sourceMappingURL=resolveDashboardConfig.js.map