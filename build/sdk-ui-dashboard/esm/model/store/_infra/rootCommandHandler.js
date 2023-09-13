import { actionChannel, call, take } from "redux-saga/effects";
import noop from "lodash/noop.js";
import { dispatchDashboardEvent } from "./eventDispatcher.js";
import { commandRejected, dashboardCommandStarted, internalErrorOccurred, isDashboardCommandFailed, } from "../../events/general.js";
import { isDashboardEvent } from "../../events/base.js";
import { DefaultCommandHandlers } from "../../commandHandlers/index.js";
import { getDashboardContext } from "./contexts.js";
function* unhandledCommand(ctx, cmd) {
    yield dispatchDashboardEvent(commandRejected(ctx, cmd.correlationId));
}
/**
 * @internal
 */
export const CommandEnvelopeActionPrefix = "__C";
export function commandEnvelope(command, eventHandlers) {
    var _a, _b, _c;
    return {
        type: `${CommandEnvelopeActionPrefix}(${command.type})`,
        command,
        onError: (_a = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onError) !== null && _a !== void 0 ? _a : noop,
        onStart: (_b = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onStart) !== null && _b !== void 0 ? _b : noop,
        onSuccess: (_c = eventHandlers === null || eventHandlers === void 0 ? void 0 : eventHandlers.onSuccess) !== null && _c !== void 0 ? _c : noop,
    };
}
/**
 * @internal
 */
export function commandEnvelopeWithPromise(command) {
    const commandEnvelopeEventHandlers = {};
    const promise = new Promise((resolve, reject) => {
        commandEnvelopeEventHandlers.onSuccess = resolve;
        commandEnvelopeEventHandlers.onError = reject;
    });
    const envelope = commandEnvelope(command, commandEnvelopeEventHandlers);
    return {
        promise,
        envelope,
    };
}
function isCommandEnvelope(obj) {
    return !!obj && obj.type.startsWith(CommandEnvelopeActionPrefix);
}
function ensureCommandWrappedInEnvelope(action) {
    return isCommandEnvelope(action) ? action : commandEnvelope(action);
}
function* processCommand(ctx, envelope) {
    var _a;
    const { command, command: { type, correlationId }, } = envelope;
    const correlationIdForLog = correlationId !== null && correlationId !== void 0 ? correlationId : "(no correlationId provided)";
    const commandHandler = (_a = DefaultCommandHandlers[envelope.command.type]) !== null && _a !== void 0 ? _a : unhandledCommand;
    try {
        yield dispatchDashboardEvent(dashboardCommandStarted(ctx, envelope.command));
        try {
            envelope.onStart(command);
        }
        catch (e) {
            console.warn(`An error has occurred while calling onStart function provided for ${type}@${correlationIdForLog} processing:`, e);
        }
        const result = yield call(commandHandler, ctx, command);
        if (isDashboardEvent(result)) {
            yield dispatchDashboardEvent(result);
        }
        try {
            envelope.onSuccess(result);
        }
        catch (e) {
            console.warn(`An error has occurred while calling onSuccess function provided for ${type}@${correlationIdForLog} processing`, e);
        }
    }
    catch (e) {
        try {
            envelope.onError(e);
        }
        catch (ne) {
            console.warn(`An error has occurred while calling onError function provided for ${type}@${correlationIdForLog} processing:`, ne);
        }
        if (isDashboardCommandFailed(e)) {
            yield dispatchDashboardEvent(e);
        }
        else {
            // Errors during command handling should be caught and addressed in the handler, possibly with a
            // more meaningful error message. If the error bubbles up to here then there are holes in error
            // handling or something is seriously messed up.
            yield dispatchDashboardEvent(internalErrorOccurred(ctx, command, `Internal error has occurred while handling ${type}`, e));
        }
    }
}
/**
 * Root command handler is the central point through which all command processing is done. The handler registers
 * for all actions starting with `GDC.DASH/CMD` === all dashboard commands.
 *
 * The commands are intended for serial processing, without any forking. A buffering action channel is in place to
 * prevent loss of commands.
 *
 * TODO: refactor this so that root command handler is created dynamically similar to query processor. the handlers
 *  should be providable by the caller
 */
export function* rootCommandHandler() {
    const commandChannel = yield actionChannel((action) => action.type &&
        (action.type.startsWith(CommandEnvelopeActionPrefix) || action.type.startsWith("GDC.DASH/CMD")));
    while (true) {
        const command = yield take(commandChannel);
        const envelope = ensureCommandWrappedInEnvelope(command);
        const ctx = yield call(getDashboardContext);
        yield call(processCommand, ctx, envelope);
    }
}
//# sourceMappingURL=rootCommandHandler.js.map