/// <reference types="react" />
import { IInsightWidget } from "@gooddata/sdk-model";
interface IVisualizationTitleConfigProps {
    widget: IInsightWidget;
    hideTitle: boolean;
    isHidingOfWidgetTitleEnabled: boolean;
    setVisualPropsConfigurationTitle: (widget: IInsightWidget, hideTitle: boolean) => void;
}
export declare function InsightTitleConfig(props: IVisualizationTitleConfigProps): JSX.Element;
export {};
