/// <reference types="react" />
import { ICatalogMeasure, IKpiWidgetDefinition, IKpiWidgetDescriptionConfiguration } from "@gooddata/sdk-model";
interface IKpiDescriptionConfigProps {
    kpi: IKpiWidgetDefinition;
    metrics: ICatalogMeasure[];
    descriptionConfig: IKpiWidgetDescriptionConfiguration;
    isKpiDescriptionEnabled: boolean;
    setDescriptionConfiguration: (kpi: IKpiWidgetDefinition, newConfig: IKpiWidgetDescriptionConfiguration) => void;
    setKpiDescription: (kpi: IKpiWidgetDefinition, newDescription: string) => void;
}
export declare function KpiDescriptionConfig(props: IKpiDescriptionConfigProps): JSX.Element;
export {};
