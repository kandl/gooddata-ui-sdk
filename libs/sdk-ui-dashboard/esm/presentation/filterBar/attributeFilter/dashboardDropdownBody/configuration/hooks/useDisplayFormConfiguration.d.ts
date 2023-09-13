import { IAttributeMetadataObject, IDashboardAttributeFilter, ObjRef } from "@gooddata/sdk-model";
import { IDashboardAttributeFilterDisplayForms } from "../../../../../../model/index.js";
export declare function useDisplayFormConfiguration(currentFilter: IDashboardAttributeFilter, attributes: IAttributeMetadataObject[]): {
    onDisplayFormSelect: (displayForm: ObjRef) => void;
    filterDisplayForms: IDashboardAttributeFilterDisplayForms;
    displayFormChanged: boolean;
    onDisplayFormChange: () => void;
    onConfigurationClose: () => void;
    displayFormChangeStatus: import("../../../../../../model/index.js").CommandProcessingStatus | undefined;
};
