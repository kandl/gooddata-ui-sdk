// (C) 2021-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { disabledUnfinishedFeatureSettings } from "../../../disabledUnfinishedFeatureSettings.js";
export const sanitizeUnfinishedFeatureSettings = (settings) => {
    invariant(settings, "cannot sanitize undefined settings");
    return Object.assign(Object.assign({}, settings), disabledUnfinishedFeatureSettings);
};
//# sourceMappingURL=sanitizeUnfinishedFeatureSettings.js.map