/**
 * This module registers GoodData's Custom Elements for Dashboard and Insight embedding.
 *
 * @remarks
 * The package registers two custom elements with the browser:
 *  - <gd-dashboard> to embed a complete dashboard into your webpage
 *  - <gd-insight> to embed a single insight into your webpage
 *
 * @packageDocumentation
 */

import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';

/**
 * A context for the custom element is parsed out of script URL and includes
 * backend (with authentication) and workspaceId. It's moved to context to make
 * the setup easier.
 *
 * @public
 */
export declare type CustomElementContext = {
    backend: IAnalyticalBackend;
    workspaceId?: string;
    mapboxToken?: string;
};

/**
 * A getter for the context.
 * You can call this function even before the context is actually set,
 * the returned promise will resolve once the context is either set automatically
 * based on the URL or manually by user.
 *
 * @public
 */
export declare const getContext: () => Promise<CustomElementContext>;

/**
 * A setter function for a singleton context.
 *
 * @public
 */
export declare const setContext: (context: CustomElementContext) => void;

export { }
