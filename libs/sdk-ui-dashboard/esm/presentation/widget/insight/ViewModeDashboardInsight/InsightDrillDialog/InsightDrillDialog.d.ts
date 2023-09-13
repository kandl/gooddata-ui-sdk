/// <reference types="react" />
import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
import { ILocale } from "@gooddata/sdk-ui";
import { OnDrillDownSuccess } from "../../../../drill/index.js";
/**
 * @internal
 */
export interface InsightDrillDialogProps {
    locale: ILocale;
    breadcrumbs: string[];
    widget: IInsightWidget;
    insight: IInsight;
    onDrillDown?: OnDrillDownSuccess;
    onClose: () => void;
    onBackButtonClick: () => void;
}
export declare const InsightDrillDialog: (props: InsightDrillDialogProps) => JSX.Element;
