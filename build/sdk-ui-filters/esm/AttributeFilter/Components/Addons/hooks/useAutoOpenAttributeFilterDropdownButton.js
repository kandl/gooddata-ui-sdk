// (C) 2021-2022 GoodData Corporation
import { useEffect } from "react";
import { usePrevious } from "@gooddata/sdk-ui";
/**
 * This hook is useful to inject custom isAutoOpen prop to AttributeFilterDropdownButton
 * @internal
 */
export const useAutoOpenAttributeFilterDropdownButton = (props, isAutoOpen) => {
    const { onClick } = props;
    const { isOpen: isOpenPrevious } = usePrevious(props);
    //This effect is handling autoOpen filter by simulating button click to open dropdown
    useEffect(() => {
        if (isAutoOpen && !isOpenPrevious) {
            onClick();
        }
    }, [onClick, isAutoOpen, isOpenPrevious]);
};
//# sourceMappingURL=useAutoOpenAttributeFilterDropdownButton.js.map