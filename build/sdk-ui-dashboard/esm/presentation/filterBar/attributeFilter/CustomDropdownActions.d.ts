import React from "react";
import { DashboardAttributeFilterSelectionMode, IAttributeMetadataObject, ObjRef } from "@gooddata/sdk-model";
/**
 * @internal
 */
export interface ICustomAttributeFilterDropdownActionsProps {
    onApplyButtonClick: () => void;
    onCancelButtonClick: () => void;
    onConfigurationButtonClick: () => void;
    onDeleteButtonClick: () => void;
    isApplyDisabled?: boolean;
    cancelText: string;
    applyText: string;
    filterDisplayFormRef: ObjRef;
    attributes?: IAttributeMetadataObject[];
    filterSelectionMode?: DashboardAttributeFilterSelectionMode;
}
/**
 * @internal
 */
export declare const CustomAttributeFilterDropdownActions: React.FC<ICustomAttributeFilterDropdownActionsProps>;
/**
 * @internal
 */
export interface ICustomConfigureAttributeFilterDropdownActionsProps {
    onSaveButtonClick: () => void;
    onCancelButtonClick: () => void;
    isSaveDisabled?: boolean;
    cancelText: string;
    saveText: string;
}
/**
 * @internal
 */
export declare const CustomConfigureAttributeFilterDropdownActions: React.FC<ICustomConfigureAttributeFilterDropdownActionsProps>;
