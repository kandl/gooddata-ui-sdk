import { IElementsQuery, IElementsQueryFactory, IFilterElementsQuery, FilterWithResolvableElements } from "@gooddata/sdk-backend-spi";
import { ObjRef } from "@gooddata/sdk-model";
import { RecordedBackendConfig, RecordingIndex } from "./types.js";
/**
 * @internal
 */
export declare class RecordedElementQueryFactory implements IElementsQueryFactory {
    private recordings;
    private readonly config;
    constructor(recordings: RecordingIndex, config: RecordedBackendConfig);
    forDisplayForm(ref: ObjRef): IElementsQuery;
    forFilter(filter: FilterWithResolvableElements): IFilterElementsQuery;
}
//# sourceMappingURL=elements.d.ts.map