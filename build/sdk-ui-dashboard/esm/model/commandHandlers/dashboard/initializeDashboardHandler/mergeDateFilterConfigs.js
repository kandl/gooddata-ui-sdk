import { call } from "redux-saga/effects";
import { mergeDateFilterConfigs } from "../../../../_staging/dateFilterConfig/merge.js";
import { validateDateFilterConfig } from "../../../../_staging/dateFilterConfig/validation.js";
import { onDateFilterConfigValidationError } from "./onDateFilterConfigValidationError.js";
export function* mergeDateFilterConfigWithOverrides(ctx, cmd, config, dashboardOverrides) {
    if (!dashboardOverrides) {
        return {
            config,
            source: "workspace",
        };
    }
    const mergedConfig = mergeDateFilterConfigs(config, dashboardOverrides);
    /*
     * KD's validation logic did not include selected option. The validation of workspace-level configs was
     * doing that explicitly outside of validate logic. That logic was not part of the dashboard-level override
     * processing where just the plain validation was used.
     *
     * The flag below ensures matching behavior.
     */
    const mergedConfigValidation = validateDateFilterConfig(mergedConfig, false);
    if (mergedConfigValidation !== "Valid") {
        yield call(onDateFilterConfigValidationError, ctx, mergedConfigValidation, cmd.correlationId);
        return {
            config,
            source: "workspace",
        };
    }
    return {
        config: mergedConfig,
        source: "dashboard",
    };
}
//# sourceMappingURL=mergeDateFilterConfigs.js.map