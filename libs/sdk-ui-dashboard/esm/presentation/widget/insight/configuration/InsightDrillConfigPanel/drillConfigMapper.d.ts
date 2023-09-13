import { InsightDrillDefinition } from "@gooddata/sdk-model";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
import { IDrillConfigItem } from "../../../../drill/types.js";
/**
 * @internal
 */
export declare const getMappedConfigForWidget: (configForWidget: InsightDrillDefinition[], supportedItemsForWidget: IAvailableDrillTargets, invalidCustomUrlDrillLocalIds: string[]) => IDrillConfigItem[];
