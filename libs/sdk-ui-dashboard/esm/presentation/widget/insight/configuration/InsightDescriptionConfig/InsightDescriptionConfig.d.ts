/// <reference types="react" />
import { IInsightWidget, IInsightWidgetDescriptionConfiguration } from "@gooddata/sdk-model";
interface IInsightDescriptionConfigProps {
    widget: IInsightWidget;
    descriptionConfig: IInsightWidgetDescriptionConfiguration;
    isWidgetDescriptionEnabled: boolean;
    setDescriptionConfiguration: (widget: IInsightWidget, newConfig: IInsightWidgetDescriptionConfiguration) => void;
    setWidgetDescription: (widget: IInsightWidget, newDescription: string) => void;
}
export declare function InsightDescriptionConfig(props: IInsightDescriptionConfigProps): JSX.Element;
export {};
