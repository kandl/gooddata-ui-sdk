import { SagaIterator } from "redux-saga";
import { IDashboardCommand } from "../../commands/index.js";
/**
 * @internal
 */
export declare const CommandEnvelopeActionPrefix = "__C";
type CommandEnvelopeEventHandlers<TCommand extends IDashboardCommand, TResult> = {
    onStart: (command: TCommand) => void;
    onSuccess: (result: TResult) => void;
    onError: (err: Error) => void;
};
type CommandEnvelope<TCommand extends IDashboardCommand, TResult> = Readonly<CommandEnvelopeEventHandlers<TCommand, TResult>> & {
    readonly type: string;
    readonly command: TCommand;
};
export declare function commandEnvelope<TCommand extends IDashboardCommand, TResult>(command: TCommand, eventHandlers?: Partial<CommandEnvelopeEventHandlers<TCommand, TResult>>): CommandEnvelope<TCommand, TResult>;
/**
 * @internal
 */
export declare function commandEnvelopeWithPromise<TCommand extends IDashboardCommand, TResult>(command: TCommand): {
    promise: Promise<TResult>;
    envelope: CommandEnvelope<TCommand, TResult>;
};
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
export declare function rootCommandHandler(): SagaIterator<void>;
export {};
