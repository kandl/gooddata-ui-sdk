import { IElementsQueryResult } from "@gooddata/sdk-backend-spi";
import { IAttributeElement } from "@gooddata/sdk-model";
import { ILoadElementsOptions } from "../../../types/index.js";
import { IHiddenElementsInfo } from "./types.js";
/**
 * @internal
 */
export declare function loadElementsFromStaticElements(options: ILoadElementsOptions, hiddenElementsInfo: IHiddenElementsInfo, staticElements: IAttributeElement[]): Promise<IElementsQueryResult>;
