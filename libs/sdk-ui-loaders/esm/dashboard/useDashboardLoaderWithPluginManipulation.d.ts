import { DashboardLoadingMode, IDashboardLoadOptions, IEmbeddedPlugin } from "./types.js";
import { DashboardLoadStatus } from "./useDashboardLoader.js";
/**
 * Wrapper around {@link useDashboardLoader} that adds the option to reload while keeping the current state of the dashboard intact.
 *
 * @param options - load options
 * @internal
 */
export declare function useDashboardLoaderWithPluginManipulation(options: IDashboardLoadOptions): {
    loaderStatus: DashboardLoadStatus;
    reloadPlugins: () => void;
    hidePluginOverlays: () => void;
    changeLoadingMode: (loadingMode: DashboardLoadingMode) => void;
    loadingMode: DashboardLoadingMode;
    setExtraPlugins: (plugins: IEmbeddedPlugin | IEmbeddedPlugin[]) => void;
    extraPlugins: IEmbeddedPlugin[] | undefined;
};
