// (C) 2023 GoodData Corporation
import { insightUpdated, insightCreated, insightTitle } from "@gooddata/sdk-model";
const insightDate = (insight) => { var _a, _b; return (_b = (_a = insightUpdated(insight)) !== null && _a !== void 0 ? _a : insightCreated(insight)) !== null && _b !== void 0 ? _b : ""; };
const compareCaseInsensitive = (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" });
const compareDatesDesc = (insightA, insightB) => compareCaseInsensitive(insightDate(insightB), insightDate(insightA));
const compareTitlesAsc = (insightA, insightB) => compareCaseInsensitive(insightTitle(insightA), insightTitle(insightB));
export const insightListComparator = (insightA, insightB) => compareDatesDesc(insightA, insightB) || compareTitlesAsc(insightA, insightB);
//# sourceMappingURL=comparator.js.map