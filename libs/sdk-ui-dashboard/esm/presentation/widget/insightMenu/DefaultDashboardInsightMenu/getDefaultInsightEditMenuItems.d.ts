import { IntlShape } from "react-intl";
import { IInsightMenuItem } from "../types.js";
import { useDashboardDispatch } from "../../../../model/index.js";
import { IInsightWidget } from "@gooddata/sdk-model";
/**
 * @internal
 */
export type MenuItemDependencies = {
    intl: IntlShape;
    dispatch: ReturnType<typeof useDashboardDispatch>;
    includeInteractions?: boolean;
};
/**
 * @internal
 */
export declare function getDefaultInsightEditMenuItems(widget: IInsightWidget, { intl, dispatch, includeInteractions }: MenuItemDependencies): IInsightMenuItem[];
