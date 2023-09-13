import { SagaIterator } from "redux-saga";
import { AttributeFilterHandlerStoreContext } from "../store/types.js";
/**
 * @internal
 */
export type PromiseReturnType<T> = T extends Promise<infer U> ? U : any;
/**
 * @internal
 */
export type PromiseFnReturnType<T extends (...args: any) => any> = PromiseReturnType<ReturnType<T>>;
/**
 * @internal
 */
export declare function getAttributeFilterContext(): SagaIterator<AttributeFilterHandlerStoreContext>;
