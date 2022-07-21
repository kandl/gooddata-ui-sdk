// (C) 2022 GoodData Corporation
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IAttributeElement, IAttributeFilter, IAttributeMetadataObject } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { AsyncOperationStatus, CallbackRegistration, Correlation } from "../common";
import { IAttributeLoader } from "./attribute";
import { IAttributeElementLoader } from "./elements";

export * from "./attribute";
export * from "./elements";

/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface IAttributeFilterLoader extends IAttributeLoader, IAttributeElementLoader {
    /**
     * Get the effective filter.
     */
    getFilter(): IAttributeFilter;

    init(correlation?: Correlation): void;
    getInitStatus(): AsyncOperationStatus;
    getInitError(): GoodDataSdkError;

    //
    // callbacks
    //
    onInitStart: CallbackRegistration; // TODO: cover also other data
    onInitSuccess: CallbackRegistration<{ attribute: IAttributeMetadataObject }>; // TODO separate attribute / firstElementsPage load from the rest?
    onInitError: CallbackRegistration<{ error: Error }>;
    onInitCancel: CallbackRegistration;
}

/**
 * @internal
 */
export interface IAttributeFilterHandlerConfig {
    readonly backend: IAnalyticalBackend;
    readonly workspace: string;
    readonly filter: IAttributeFilter;
    readonly hiddenElements?: string[];
    readonly staticElements?: IAttributeElement[];
}
