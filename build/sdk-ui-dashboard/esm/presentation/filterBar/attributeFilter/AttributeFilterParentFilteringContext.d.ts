import React from "react";
import { IDashboardAttributeFilter, IAttributeMetadataObject, ObjRef } from "@gooddata/sdk-model";
import { useParentsConfiguration } from "./dashboardDropdownBody/configuration/hooks/useParentsConfiguration.js";
import { useDisplayFormConfiguration } from "./dashboardDropdownBody/configuration/hooks/useDisplayFormConfiguration.js";
import { useTitleConfiguration } from "./dashboardDropdownBody/configuration/hooks/useTitleConfiguration.js";
import { useSelectionModeConfiguration } from "./dashboardDropdownBody/configuration/hooks/useSelectionModeConfiguration.js";
/**
 * @internal
 */
export type IAttributeFilterParentFiltering = ReturnType<typeof useParentsConfiguration> & ReturnType<typeof useDisplayFormConfiguration> & ReturnType<typeof useTitleConfiguration> & ReturnType<typeof useSelectionModeConfiguration> & {
    onConfigurationSave: () => void;
    showDisplayFormPicker: boolean;
    showResetTitle: boolean;
    defaultAttributeFilterTitle?: string;
    attributeFilterDisplayForm: ObjRef;
};
export declare const AttributeFilterParentFiltering: React.Context<IAttributeFilterParentFiltering>;
/**
 * @internal
 */
export declare const useAttributeFilterParentFiltering: () => IAttributeFilterParentFiltering;
/**
 * @internal
 */
export type IAttributeFilterParentFilteringProviderProps = {
    filter: IDashboardAttributeFilter;
    attributes?: IAttributeMetadataObject[];
    children?: React.ReactNode;
};
/**
 * @internal
 */
export declare const AttributeFilterParentFilteringProvider: React.FC<IAttributeFilterParentFilteringProviderProps>;
