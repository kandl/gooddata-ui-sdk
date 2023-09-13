// (C) 2021 GoodData Corporation
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import noop from "lodash/noop.js";
const ExportDialogContext = createContext({
    isOpen: false,
    dialogConfig: {},
    closeDialog: noop,
    openDialog: noop,
});
/**
 * @internal
 */
export const useExportDialogContext = () => {
    return useContext(ExportDialogContext);
};
/**
 * @internal
 */
export const ExportDialogContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({});
    const openDialog = useCallback((config = {}) => {
        setIsOpen(true);
        setDialogConfig(config);
    }, []);
    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);
    const contextValue = useMemo(() => ({ isOpen, dialogConfig, openDialog, closeDialog }), [isOpen, dialogConfig, openDialog, closeDialog]);
    return React.createElement(ExportDialogContext.Provider, { value: contextValue }, children);
};
//# sourceMappingURL=ExportDialogContext.js.map