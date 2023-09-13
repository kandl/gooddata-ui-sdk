/**
 * @beta
 */
export interface LoadingState {
    loading: boolean;
    result?: boolean;
    error?: Error;
}
export declare const loadingInitialState: LoadingState;
