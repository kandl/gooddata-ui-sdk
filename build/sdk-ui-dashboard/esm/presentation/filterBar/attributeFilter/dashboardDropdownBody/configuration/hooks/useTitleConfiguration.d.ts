import { IDashboardAttributeFilter } from "@gooddata/sdk-model";
export declare function useTitleConfiguration(currentFilter: IDashboardAttributeFilter, defaultAttributeFilterTitle?: string): {
    title: string | undefined;
    titleChanged: boolean;
    titleChangeStatus: import("../../../../../../model/index.js").CommandProcessingStatus | undefined;
    onTitleChange: () => void;
    onTitleUpdate: (value: string) => void;
    onTitleReset: () => void;
    onConfigurationClose: () => void;
};
