import { DashboardCommands } from "../../commands/index.js";
import { DashboardDispatch } from "../types.js";
/**
 * Dispatches a command and returns a promise to wait for it to get resolved.
 *
 * @param dispatch - dashboard dispatch to use
 * @param command - command to trigger and wait for resolution of
 * @returns Promise of the command resolution
 * @alpha
 */
export declare function dispatchAndWaitFor<TCommand extends DashboardCommands, TResult>(dispatch: DashboardDispatch, command: TCommand): Promise<TResult>;
