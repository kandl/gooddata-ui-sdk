/**
 * Properties of the {@link useAttributeFilterSearch} hook.
 *
 * @beta
 */
export interface IUseAttributeFilterSearchProps {
    /**
     * Current search string.
     */
    searchString: string;
    /**
     * Callback to change the current search string.
     */
    onSearch: (search: string) => void;
}
/**
 * Use this hook if you want to implement your custom attribute filter search bar component.
 *
 * @beta
 */
export declare const useAttributeFilterSearch: (props: IUseAttributeFilterSearchProps) => {
    onSearch: (search: string) => void;
    search: string;
};
