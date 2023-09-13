import React from "react";
import { CustomElementContext } from "../context.js";
declare const RENDER: unique symbol;
declare const COMPONENT: unique symbol;
declare const CONTEXT: unique symbol;
export declare const GET_VISUALIZATION: unique symbol;
export declare const EVENT_HANDLER: unique symbol;
export declare const LOAD_COMPONENT: unique symbol;
export declare abstract class CustomElementAdapter<C> extends HTMLElement {
    /**
     * @remarks
     * A React Component to be used to render the visualization
     *
     * @internal
     */
    private [COMPONENT];
    /**
     * @remarks
     * The context for the visualization rendering (backend, workspace etc.)
     *
     * @internal
     */
    private [CONTEXT];
    private root;
    constructor();
    attributeChangedCallback(_name: string, oldValue: string, newValue: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @remarks
     * This function handles the rendering cycle
     *
     * @internal
     */
    private [RENDER];
    /**
     * @remarks
     * A helper for easier custom event dispatching.
     * We can afford passing a new function with every update, as it's optimized for this
     * at React component level down the stream (with React.Ref)
     *
     * @internal
     */
    protected [EVENT_HANDLER]<P>(eventName: string): (payload: P) => boolean;
    /**
     * @remarks
     * An implementation will receive loaded Component, backend instance and a workspace ID and should
     *  return a valid ReactElement.
     * NOTE. You can't use hooks/lifecycle callbacks in the implementation. It's not a React realm yet.
     *  If you have to - write a thin wrapper around the actual visualization Component.
     *
     * @internal
     * @returns A ReactElement to be mounted into the Shadow DOM for this visualization
     */
    abstract [GET_VISUALIZATION](Component: C, context: CustomElementContext): React.ReactElement;
    /**
     * @remarks
     * We are loading the React Component asynchronously purely to keep the entry point slim.
     * CustomElementAdapter does not need to know that this is actually a ReactComponent, so if
     *  we'll get more of such async dependencies, we might change this function to be something more
     *  generic, like LOAD_ASYNC_DEPS.
     *
     * @internal
     * @returns A React Component needed for the visualization rendering
     */
    abstract [LOAD_COMPONENT](): Promise<C>;
}
export {};
//# sourceMappingURL=CustomElementAdapter.d.ts.map