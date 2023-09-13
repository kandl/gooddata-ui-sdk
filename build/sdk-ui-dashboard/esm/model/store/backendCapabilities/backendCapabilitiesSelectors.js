// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
const selectSelf = createSelector((state) => state, (state) => state.backendCapabilities);
/**
 * This selector returns capabilities of the backend with which the dashboard works.
 *
 * @public
 */
export const selectBackendCapabilities = createSelector(selectSelf, (state) => {
    invariant(state.backendCapabilities, "attempting to access uninitialized backend capabilities");
    return state.backendCapabilities;
});
/**
 * This selector returns capability if parent child filtering is enabled.
 *
 * @public
 */
export const selectSupportsElementsQueryParentFiltering = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.supportsElementsQueryParentFiltering) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsKpiWidget}
 *
 * @internal
 */
export const selectSupportsKpiWidgetCapability = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.supportsKpiWidget) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsAccessControl}
 *
 * @internal
 */
export const selectSupportsAccessControlCapability = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.supportsAccessControl) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsHierarchicalWorkspaces}
 *
 * @internal
 */
export const selectSupportsHierarchicalWorkspacesCapability = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.supportsHierarchicalWorkspaces) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsElementUris}
 *
 * @internal
 */
export const selectSupportsElementUris = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.supportsElementUris) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.canExportCsv}
 *
 * @internal
 */
export const selectSupportsExportToCsv = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.canExportCsv) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.canExportXlsx}
 *
 * @internal
 */
export const selectSupportsExportToXlsx = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.canExportXlsx) !== null && _a !== void 0 ? _a : false; });
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsObjectUris}
 *
 * @internal
 */
export const selectSupportsObjectUris = createSelector(selectBackendCapabilities, (capabilities) => { var _a; return (_a = capabilities.supportsObjectUris) !== null && _a !== void 0 ? _a : false; });
//# sourceMappingURL=backendCapabilitiesSelectors.js.map