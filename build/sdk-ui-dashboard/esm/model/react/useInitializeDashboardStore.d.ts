import { IDashboardStoreProviderProps } from "./types.js";
import { ReduxedDashboardStore } from "../store/dashboardStore.js";
/**
 * This hook is responsible for properly initializing and re-initializing the dashboard redux store,
 * when the props of the Dashboard component change.
 * It also cancels currently running sagas before the re-initialization.
 *
 * @internal
 */
export declare const useInitializeDashboardStore: (props: IDashboardStoreProviderProps) => ReduxedDashboardStore | null;
