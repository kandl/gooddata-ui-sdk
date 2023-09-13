// (C) 2021 GoodData Corporation
import { commandEnvelopeWithPromise } from "./rootCommandHandler.js";
/**
 * Dispatches a command and returns a promise to wait for it to get resolved.
 *
 * @param dispatch - dashboard dispatch to use
 * @param command - command to trigger and wait for resolution of
 * @returns Promise of the command resolution
 * @alpha
 */
export async function dispatchAndWaitFor(dispatch, command) {
    const { promise, envelope } = commandEnvelopeWithPromise(command);
    dispatch(envelope);
    return promise;
}
//# sourceMappingURL=dispatchAndWaitFor.js.map