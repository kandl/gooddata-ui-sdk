// (C) 2023 GoodData Corporation
import { useCallback, useState } from "react";
export const usePermissionsDropdownState = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    return { isDropdownOpen: isOpen, toggleDropdown: toggleOpen };
};
//# sourceMappingURL=usePermissionsDropdownState.js.map