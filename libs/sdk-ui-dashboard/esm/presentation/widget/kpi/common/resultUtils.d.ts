import { IntlShape } from "react-intl";
import { IMeasure, IPoPMeasureDefinition, IPreviousPeriodMeasureDefinition, ISeparators } from "@gooddata/sdk-model";
import { DataViewFacade } from "@gooddata/sdk-ui";
import { IKpiAlertResult, IKpiResult } from "./types.js";
export declare function getKpiResult(result: DataViewFacade | undefined, primaryMeasure: IMeasure, secondaryMeasure: IMeasure<IPoPMeasureDefinition> | IMeasure<IPreviousPeriodMeasureDefinition> | undefined, separators: ISeparators): IKpiResult | undefined;
export declare function getKpiAlertResult(result: DataViewFacade | undefined, primaryMeasure: IMeasure, separators: ISeparators): IKpiAlertResult | undefined;
export declare function getAlertThresholdInfo(kpiResult: IKpiResult | undefined, intl: IntlShape): {
    isThresholdRepresentingPercent: boolean;
    thresholdPlaceholder: string;
};
