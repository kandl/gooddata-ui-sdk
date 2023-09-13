import { GdcMessageEventListener } from "../iframe/common.js";
/**
 * @internal
 */
export interface IHost {
    postMessage?: Window["postMessage"];
    parent?: IHost;
}
/**
 * Set post message target - useful for unit tests.
 *
 * @internal
 */
export declare const setHost: (h: IHost) => void;
/**
 * @internal
 */
export declare function setConfig(product: string, validReceivedPostEvents: string[]): void;
/**
 * @internal
 */
export declare function addListener(listener: GdcMessageEventListener, target?: Window & typeof globalThis): void;
/**
 * @internal
 */
export declare function removeListener(listener: GdcMessageEventListener, target?: Window & typeof globalThis): void;
/**
 * @internal
 */
export declare function postEvent(product: string, name: string, data: object, contextId?: string): void;
//# sourceMappingURL=messagingUtils.d.ts.map