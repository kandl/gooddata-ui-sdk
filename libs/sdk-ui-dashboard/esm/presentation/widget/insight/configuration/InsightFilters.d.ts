/// <reference types="react" />
import { IInsightWidget } from "@gooddata/sdk-model";
interface IInsightFiltersProps {
    widget: IInsightWidget;
}
export default function InsightFilters({ widget }: IInsightFiltersProps): JSX.Element;
export {};
