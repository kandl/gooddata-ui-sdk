import React from "react";
import { IInsightParametersSectionProps } from "./CustomUrlEditorParametersSections/InsightParametersSection.js";
import { IIdentifierParametersSectionProps } from "./types.js";
type IParametersPanelProps = IInsightParametersSectionProps & IIdentifierParametersSectionProps;
export declare const ParametersPanel: React.FC<IParametersPanelProps>;
export {};
