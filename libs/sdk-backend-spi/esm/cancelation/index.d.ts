/**
 * Options that is used for propagation cancellation signal / abort signal
 * @beta
 */
export type CancelableOptions = {
    signal?: AbortSignal;
};
/**
 * Interface that implements aborting of requests
 *
 * @beta
 */
export interface ICancelable<T> {
    /**
     * @param signal - Abort signal used for canceling requests
     * @returns Instance of object with interface
     */
    withSignal(signal: AbortSignal): T;
}
//# sourceMappingURL=index.d.ts.map