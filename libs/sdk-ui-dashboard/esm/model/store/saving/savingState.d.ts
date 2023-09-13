/**
 * @public
 */
export interface SavingState {
    /** @beta */
    saving: boolean;
    /** @beta */
    result?: boolean;
    /** @beta */
    error?: Error;
}
export declare const savingInitialState: SavingState;
