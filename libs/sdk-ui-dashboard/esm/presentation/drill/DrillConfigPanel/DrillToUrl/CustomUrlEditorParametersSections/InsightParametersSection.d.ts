import React from "react";
import { IAttributeWithDisplayForm, IParametersPanelSectionsCommonProps } from "../types.js";
export interface IInsightParametersSectionProps extends IParametersPanelSectionsCommonProps {
    attributeDisplayForms?: IAttributeWithDisplayForm[];
    loadingAttributeDisplayForms: boolean;
}
export declare const InsightParametersSection: React.FC<IInsightParametersSectionProps>;
