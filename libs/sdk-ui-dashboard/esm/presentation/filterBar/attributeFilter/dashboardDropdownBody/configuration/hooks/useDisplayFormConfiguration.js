// (C) 2022-2023 GoodData Corporation
import { areObjRefsEqual, } from "@gooddata/sdk-model";
import { useState, useCallback } from "react";
import { useDashboardSelector, selectCatalogAttributes, setAttributeFilterDisplayForm, useDashboardCommandProcessing, } from "../../../../../../model/index.js";
export function useDisplayFormConfiguration(currentFilter, attributes) {
    const catalogAttributes = useDashboardSelector(selectCatalogAttributes);
    const { run: changeDisplayForm, status: displayFormChangeStatus } = useDashboardCommandProcessing({
        commandCreator: setAttributeFilterDisplayForm,
        successEvent: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.DISPLAY_FORM_CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
    });
    const originalDisplayForm = currentFilter.attributeFilter.displayForm;
    const [filterDisplayForms, setFilterDisplayForms] = useState(() => {
        var _a, _b, _c;
        const currentDisplayForm = currentFilter.attributeFilter.displayForm;
        const availableDisplayForms = (_a = catalogAttributes.find((attribute) => attribute.displayForms.some((df) => areObjRefsEqual(df.ref, currentDisplayForm)))) === null || _a === void 0 ? void 0 : _a.displayForms;
        const attributeAvailableDisplayForms = (_c = (_b = attributes.find((attribute) => attribute.displayForms.some((df) => areObjRefsEqual(df.ref, currentDisplayForm)))) === null || _b === void 0 ? void 0 : _b.displayForms) !== null && _c !== void 0 ? _c : [];
        const result = availableDisplayForms !== null && availableDisplayForms !== void 0 ? availableDisplayForms : attributeAvailableDisplayForms;
        return {
            selectedDisplayForm: currentDisplayForm,
            availableDisplayForms: result,
        };
    });
    const displayFormChanged = !areObjRefsEqual(originalDisplayForm, filterDisplayForms.selectedDisplayForm);
    const onDisplayFormSelect = useCallback((displayForm) => {
        const updatedDisplayForms = Object.assign({}, filterDisplayForms);
        updatedDisplayForms.selectedDisplayForm = displayForm;
        setFilterDisplayForms(updatedDisplayForms);
    }, [filterDisplayForms]);
    const onDisplayFormChange = useCallback(() => {
        if (!areObjRefsEqual(originalDisplayForm, filterDisplayForms.selectedDisplayForm)) {
            changeDisplayForm(currentFilter.attributeFilter.localIdentifier, filterDisplayForms.selectedDisplayForm);
        }
    }, [filterDisplayForms, originalDisplayForm, currentFilter, changeDisplayForm]);
    const onConfigurationClose = useCallback(() => {
        setFilterDisplayForms((old) => (Object.assign(Object.assign({}, old), { selectedDisplayForm: originalDisplayForm })));
    }, [originalDisplayForm]);
    return {
        onDisplayFormSelect,
        filterDisplayForms,
        displayFormChanged,
        onDisplayFormChange,
        onConfigurationClose,
        displayFormChangeStatus,
    };
}
//# sourceMappingURL=useDisplayFormConfiguration.js.map