import React from "react";
import { IAttributeFilterDropdownButtonProps } from "./AttributeFilterDropdownButton.js";
/**
 * Component using the {@link IAttributeFilterDropdownButtonProps} props showing just the attribute title.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton as a simple button.
 * It displays the name of the related attribute filter.
 * It displays loading and filtering statuses.
 *
 * @beta
 */
export declare const AttributeFilterSimpleDropdownButton: React.VFC<IAttributeFilterDropdownButtonProps>;
/**
 * Component using the {@link IAttributeFilterDropdownButtonProps} props showing the attribute title and selection.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton as a simple button.
 * It displays the name of related attribute filter.
 * It displays state of selection and selection count.
 * It displays loading and filtering statuses.
 *
 * @beta
 */
export declare const AttributeFilterSimpleDropdownButtonWithSelection: React.VFC<IAttributeFilterDropdownButtonProps>;
