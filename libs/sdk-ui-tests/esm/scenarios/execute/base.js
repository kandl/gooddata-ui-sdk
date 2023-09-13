// (C) 2007-2019 GoodData Corporation
import React from "react";
import { ReferenceMd } from "@gooddata/reference-workspace";
import { scenariosFor } from "../../src/index.js";
import { Execute } from "@gooddata/sdk-ui";
const DumpingComponent = (load) => {
    const dv = load.result;
    if (!dv) {
        return React.createElement("div", null,
            "No valid result. ",
            load.error?.message);
    }
    const dataAccess = dv.data();
    return (React.createElement("div", null,
        "Series Count: $",
        dataAccess.series().count,
        "Slices Count: $",
        dataAccess.slices().count));
};
export default scenariosFor("Execute", Execute)
    .withDefaultTags("mock-no-insight")
    .withDefaultTestTypes("api")
    .addScenario("single unscoped series", {
    seriesBy: [ReferenceMd.Amount],
    children: DumpingComponent,
})
    .addScenario("two unscoped series", {
    seriesBy: [ReferenceMd.Amount, ReferenceMd.Won],
    children: DumpingComponent,
})
    .addScenario("scoped series", {
    seriesBy: [ReferenceMd.Amount, ReferenceMd.Won, ReferenceMd.Region],
    children: DumpingComponent,
})
    .addScenario("scoped series with slicing", {
    seriesBy: [ReferenceMd.Amount, ReferenceMd.Won, ReferenceMd.Region],
    slicesBy: [ReferenceMd.Product.Name],
    children: DumpingComponent,
});
//# sourceMappingURL=base.js.map