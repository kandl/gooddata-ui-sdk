import { IntlShape } from "react-intl";
import { IDateFilter, IDashboardDateFilter } from "@gooddata/sdk-model";
export type KpiAlertTranslationData = {
    rangeText: string;
    intlIdRoot: string;
} | null;
export declare function translateDateFilter(filter: IDateFilter | IDashboardDateFilter, intl: IntlShape, dateFormat: string): string;
export declare function getKpiAlertTranslationData(filter: IDateFilter | IDashboardDateFilter | undefined, intl: IntlShape, dateFormat: string): KpiAlertTranslationData;
