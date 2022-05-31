// (C) 2022 GoodData Corporation
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IAttributeFilter } from "@gooddata/sdk-model";
import {
    StagedMultiSelectionAttributeFilterHandler,
    StagedSingleSelectionAttributeFilterHandler,
} from "./handlers";

import {
    IStagedMultiSelectionAttributeFilterHandler,
    IStagedSingleSelectionAttributeFilterHandler,
} from "./types";

export * from "./handlers";
export * from "./types";

/**
 * @internal
 */
export function newAttributeFilterHandler(
    backend: IAnalyticalBackend,
    workspace: string,
    filter: IAttributeFilter,
    selectionMode: "single",
): IStagedSingleSelectionAttributeFilterHandler;
/**
 * @internal
 */
export function newAttributeFilterHandler(
    backend: IAnalyticalBackend,
    workspace: string,
    filter: IAttributeFilter,
    selectionMode: "multi",
): IStagedMultiSelectionAttributeFilterHandler;
/**
 * @internal
 */
export function newAttributeFilterHandler(
    backend: IAnalyticalBackend,
    workspace: string,
    filter: IAttributeFilter,
    selectionMode: "single" | "multi",
): IStagedSingleSelectionAttributeFilterHandler | IStagedMultiSelectionAttributeFilterHandler {
    // TODO: Integrate store with handlers
    // const store = createAttributeFilterStore({
    //     backend: this.backend,
    //     workspace: this.workspace,
    //     attributeFilter: this.attributeFilter,
    //     eventListener: (action, nextState) => {
    //         // eslint-disable-next-line no-console
    //         console.log("Action fired:", { action, nextState });

    //         // Concrete action listening
    //         if (actions.attributeElementsRequest.match(action)) {
    //             // React somehow
    //         }
    //     },
    // });

    if (selectionMode === "multi") {
        return new StagedMultiSelectionAttributeFilterHandler({ backend, workspace, filter });
    }

    return new StagedSingleSelectionAttributeFilterHandler({ backend, workspace, filter });
}
