// (C) 2020-2023 GoodData Corporation
import { call } from "redux-saga/effects";
import { isDrillIntersectionAttributeItem, } from "@gooddata/sdk-ui";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { getElementTitle } from "./getElementTitle.js";
function getDrillToAttributeUrlIntersectionAttributeItemHeader(drillConfig, event) {
    var _a;
    return (_a = event.drillContext.intersection.find((item) => isDrillIntersectionAttributeItem(item.header) &&
        areObjRefsEqual(item.header.attributeHeader.ref, drillConfig.target.displayForm))) === null || _a === void 0 ? void 0 : _a.header;
}
export function* resolveDrillToAttributeUrl(drillConfig, event, ctx) {
    const header = getDrillToAttributeUrlIntersectionAttributeItemHeader(drillConfig, event);
    if (!header) {
        return;
    }
    const url = yield call(getElementTitle, ctx.workspace, drillConfig.target.hyperlinkDisplayForm, header.attributeHeaderItem.uri, ctx);
    return url;
}
//# sourceMappingURL=resolveDrillToAttributeUrl.js.map