// (C) 2022 GoodData Corporation
/* eslint-disable @typescript-eslint/ban-types */
import {
    ElementsQueryOptionsElementsSpecification,
    IAnalyticalBackend,
    IElementsQueryAttributeFilter,
} from "@gooddata/sdk-backend-spi";
import {
    IAttributeElement,
    IAttributeDisplayFormMetadataObject,
    ObjRef,
    IMeasure,
    IRelativeDateFilter,
} from "@gooddata/sdk-model";

/**
 * @alpha
 */
export type Correlation = string;

/**
 * @alpha
 */
export type Unsubscribe = () => void;

/**
 * @alpha
 */

export type CallbackPayload<T extends object = {}> = T & { correlation?: Correlation };

/**
 * @alpha
 */
export type Callback<T extends object = {}> = (payload: CallbackPayload<T>) => void;

/**
 * @alpha
 */
export type CallbackRegistration<T extends object = {}> = (cb: Callback<T>) => Unsubscribe;

/**
 * @alpha
 */
export interface IElementsLoadResult {
    readonly items: IAttributeElement[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
}

/**
 * @alpha
 */
export interface ILoadRangeOptions {
    readonly limit: number;
    readonly offset: number;
}

/**
 * @alpha
 */
export interface AttributeElementSelection {
    items: string[];
    isInverted: boolean;
}

/**
 * @alpha
 */
export interface AttributeElementSelectionFull {
    elements: IAttributeElement[];
    isInverted: boolean;
}

/**
 * @alpha
 */
export type DisplayFormLoad = (
    backend: IAnalyticalBackend,
    workspace: string,
    displayForm: ObjRef,
) => Promise<IAttributeDisplayFormMetadataObject>;

/**
 * @internal
 */
export interface ElementsLoadConfig {
    backend: IAnalyticalBackend;
    workspace: string;
    displayForm: ObjRef;
    offset: number;
    limit: number;
    search?: string;
    limitingAttributeFilters?: IElementsQueryAttributeFilter[];
    limitingMeasures?: IMeasure[];
    limitingDateFilters?: IRelativeDateFilter[];
    elements?: ElementsQueryOptionsElementsSpecification;
}

/**
 * @internal
 */
export type ElementsLoad = (config: ElementsLoadConfig) => Promise<IElementsLoadResult>;

/**
 * Indicates pending state of a loadable item.
 * @alpha
 */
export type LoadablePending = {
    result: undefined;
    error: undefined;
    status: "pending";
};

/**
 * Indicates loading state of a loadable item.
 * @alpha
 */
export type LoadableLoading = {
    result: undefined;
    error: undefined;
    status: "loading";
};

/**
 * Indicates error state of a loadable item.
 * @alpha
 */
export type LoadableError<TError> = {
    result: undefined;
    error: TError;
    status: "error";
};

/**
 * Indicates success state of a loadable item.
 * @alpha
 */
export type LoadableSuccess<TResult> = {
    result: TResult;
    error: undefined;
    status: "success";
};

/**
 * Indicates the current state of a loadable item.
 * @alpha
 */
export type Loadable<TResult, TError = Error> =
    | LoadablePending
    | LoadableLoading
    | LoadableError<TError>
    | LoadableSuccess<TResult>;

/**
 * Indicates the current state of the promise inside of a loadable item.
 * @alpha
 */
export type LoadableStatus = Loadable<any, any>["status"];
