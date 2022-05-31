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
 * @internal
 */
export type Correlation = string;
/**
 * @internal
 */
export type Unsubscribe = () => void;

/**
 * @internal
 */
export type CallbackPayload<T extends object = {}> = T & { correlation?: Correlation };
/**
 * @internal
 */
export type Callback<T extends object = {}> = (payload: CallbackPayload<T>) => void;
/**
 * @internal
 */
export type CallbackRegistration<T extends object = {}> = (cb: Callback<T>) => Unsubscribe;

/**
 * @internal
 */
export interface IElementsLoadResult {
    readonly items: IAttributeElement[];
    readonly limit: number;
    readonly offset: number;
    readonly totalCount: number;
}

/**
 * @internal
 */
export interface ILoadRangeOptions {
    readonly limit: number;
    readonly offset: number;
}

/**
 * @internal
 */
export interface AttributeElementSelection {
    items: string[];
    isInverted: boolean;
}

/**
 * @internal
 */
export interface AttributeElementSelectionFull {
    elements: IAttributeElement[];
    isInverted: boolean;
}

/**
 * @internal
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
 * @internal
 */
export type LoadablePending = {
    result: undefined;
    error: undefined;
    status: "pending";
};

/**
 * Indicates loading state of a loadable item.
 * @internal
 */
export type LoadableLoading = {
    result: undefined;
    error: undefined;
    status: "loading";
};

/**
 * Indicates error state of a loadable item.
 * @internal
 */
export type LoadableError<TError> = {
    result: undefined;
    error: TError;
    status: "error";
};

/**
 * Indicates success state of a loadable item.
 * @internal
 */
export type LoadableSuccess<TResult> = {
    result: TResult;
    error: undefined;
    status: "success";
};

/**
 * Indicates the current state of a loadable item.
 * @internal
 */
export type Loadable<TResult, TError = Error> =
    | LoadablePending
    | LoadableLoading
    | LoadableError<TError>
    | LoadableSuccess<TResult>;

/**
 * Indicates the current state of the promise inside of a loadable item.
 * @internal
 */
export type LoadableStatus = Loadable<any, any>["status"];
