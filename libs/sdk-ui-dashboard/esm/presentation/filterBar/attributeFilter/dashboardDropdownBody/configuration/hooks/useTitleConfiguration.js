// (C) 2023 GoodData Corporation
import { useState, useCallback } from "react";
import { setAttributeFilterTitle, useDashboardCommandProcessing, useDashboardUserInteraction, } from "../../../../../../model/index.js";
export function useTitleConfiguration(currentFilter, defaultAttributeFilterTitle) {
    var _a;
    const { run: changeTitle, status: titleChangeStatus } = useDashboardCommandProcessing({
        commandCreator: setAttributeFilterTitle,
        successEvent: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.TITLE_CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
    });
    const userInteraction = useDashboardUserInteraction();
    const originalTitle = (_a = currentFilter.attributeFilter.title) !== null && _a !== void 0 ? _a : defaultAttributeFilterTitle;
    const [title, setTitle] = useState(originalTitle);
    const titleChanged = originalTitle !== title;
    const onTitleUpdate = useCallback((value) => {
        setTitle(value);
    }, []);
    const onTitleChange = useCallback(() => {
        if (title !== originalTitle) {
            const updatedTitle = title !== defaultAttributeFilterTitle ? title === null || title === void 0 ? void 0 : title.trim() : undefined;
            changeTitle(currentFilter.attributeFilter.localIdentifier, updatedTitle);
        }
    }, [title, currentFilter, defaultAttributeFilterTitle, changeTitle]);
    const onTitleReset = useCallback(() => {
        setTitle(undefined);
        userInteraction.attributeFilterTitleResetClicked();
    }, []);
    const onConfigurationClose = useCallback(() => {
        setTitle(originalTitle);
    }, [originalTitle]);
    return {
        title,
        titleChanged,
        titleChangeStatus,
        onTitleChange,
        onTitleUpdate,
        onTitleReset,
        onConfigurationClose,
    };
}
//# sourceMappingURL=useTitleConfiguration.js.map