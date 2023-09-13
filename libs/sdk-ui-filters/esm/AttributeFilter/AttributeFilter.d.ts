import React from "react";
import { IAttributeFilterBaseProps } from "./types.js";
/**
 * @public
 */
export interface IAttributeFilterProps extends IAttributeFilterBaseProps {
    titleWithSelection?: boolean;
}
/**
 * AttributeFilter is a component that renders a simple button and a dropdown populated with attribute values
 * for specified attribute display form.
 *
 * @public
 */
export declare const AttributeFilter: React.FC<IAttributeFilterProps>;
