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
 * @alpha
 */
export function newAttributeFilterHandler(
    backend: IAnalyticalBackend,
    workspace: string,
    filter: IAttributeFilter,
    selectionMode: "single",
): IStagedSingleSelectionAttributeFilterHandler;
/**
 * @alpha
 */
export function newAttributeFilterHandler(
    backend: IAnalyticalBackend,
    workspace: string,
    filter: IAttributeFilter,
    selectionMode: "multi",
): IStagedMultiSelectionAttributeFilterHandler;
/**
 * @alpha
 */
export function newAttributeFilterHandler(
    backend: IAnalyticalBackend,
    workspace: string,
    filter: IAttributeFilter,
    selectionMode: "single" | "multi",
): IStagedSingleSelectionAttributeFilterHandler | IStagedMultiSelectionAttributeFilterHandler {
    if (selectionMode === "multi") {
        return new StagedMultiSelectionAttributeFilterHandler({ backend, workspace, filter });
    }

    return new StagedSingleSelectionAttributeFilterHandler({ backend, workspace, filter });
}
