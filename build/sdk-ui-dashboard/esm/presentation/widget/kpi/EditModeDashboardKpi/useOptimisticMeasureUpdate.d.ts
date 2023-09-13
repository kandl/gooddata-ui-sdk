import { IKpiWidget } from "@gooddata/sdk-model";
export declare function useOptimisticMeasureUpdate(kpiWidget: IKpiWidget): {
    isChangingMeasure: boolean;
    titleToShow: string;
};
