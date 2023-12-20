// (C) 2023 GoodData Corporation
import * as Navigation from "../../tools/navigation.js";
import { FilterBar } from "../../tools/filterBar.js";
import { AttributeFilterTooltip } from "../../tools/attributeFilterTooltip.js";
import { InsightsCatalog } from "../../tools/insightsCatalog.js";
import { EditMode } from "../../tools/editMode.js";

describe("Attribute selection tooltip", { tags: ["pre-merge_isolated_bear"] }, () => {
    it("should show attribute values, title and dataset on tooltip when item is hover", () => {
        Navigation.visit("dashboard/attribute-selection");

        new EditMode().isInEditMode();
        new InsightsCatalog().waitForCatalogLoad();
        new FilterBar()
            .dragAttributeToFilterBar()
            .searchAttributeName("Account")
            .showTooltipDialog("Account");

        new AttributeFilterTooltip()
            .hasHeading("Account")
            .hasDataSet("Account")
            .hasAttributeValues([".decimal", "(add)ventures", "(blank)", "(mt) Media Temple", "@properties"]);
    });
});
