import { IAttributeFilter } from "@gooddata/sdk-model";
import { IPlaceholder } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export declare const useResolveFilterInput: (filter?: IAttributeFilter, connectToPlaceholder?: IPlaceholder<IAttributeFilter>) => {
    filter: IAttributeFilter;
    setConnectedPlaceholderValue: (filter: IAttributeFilter) => void;
};
