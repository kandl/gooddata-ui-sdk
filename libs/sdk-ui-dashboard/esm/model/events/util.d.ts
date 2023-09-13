import { IDashboardEvent } from "./base.js";
/**
 * Creates a type guard for a given {@link IDashboardEvent} subtype.
 *
 * @param type - type discriminator of the given type
 * @typeParam TEvent - type of the event to check
 */
export declare const eventGuard: <TEvent extends IDashboardEvent<any>>(type: TEvent["type"]) => (obj: unknown) => obj is TEvent;
