/// <reference types="react" />
import { IInsightWidget } from "@gooddata/sdk-model";
export interface IConfigurationPanelProps {
    widget: IInsightWidget;
}
export default function InsightDateDataSetFilter({ widget }: IConfigurationPanelProps): JSX.Element;
