// (C) 2021 GoodData Corporation
/* eslint-disable no-console */
import isEmpty from "lodash/isEmpty.js";
export function printObjectSummary(summary) {
    const { type, title, description, tags, identifier, updated, created } = summary;
    console.log("--");
    console.log(`-- ${type}: ${identifier}`);
    console.log("--");
    console.log(`Title       : ${title}`);
    console.log(`Description : ${!isEmpty(description) ? description : "(none)"}`);
    console.log(`Tags        : ${!isEmpty(tags) ? tags === null || tags === void 0 ? void 0 : tags.join(", ") : "(none)"}`);
    console.log(`Created     : ${created}`);
    console.log(`Updated     : ${updated}`);
}
//# sourceMappingURL=output.js.map