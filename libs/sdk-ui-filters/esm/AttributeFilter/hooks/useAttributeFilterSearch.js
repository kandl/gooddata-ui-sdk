// (C) 2022 GoodData Corporation
import { useEffect, useState, useCallback } from "react";
/**
 * Use this hook if you want to implement your custom attribute filter search bar component.
 *
 * @beta
 */
export const useAttributeFilterSearch = (props) => {
    const { onSearch, searchString } = props;
    const [search, setSearch] = useState(searchString);
    useEffect(() => {
        setSearch(searchString);
    }, [searchString]);
    const onSearchCallback = useCallback((search) => {
        setSearch(search);
        onSearch(search);
    }, [onSearch]);
    return {
        onSearch: onSearchCallback,
        search,
    };
};
//# sourceMappingURL=useAttributeFilterSearch.js.map