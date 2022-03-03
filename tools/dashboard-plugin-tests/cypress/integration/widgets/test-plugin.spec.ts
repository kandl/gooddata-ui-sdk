// (C) 2019-2022 GoodData Corporation
import { visitDashboardAndWaitForFullRender } from "../../support";
import { SIMPLE_DASHBOARD } from "../../../src/plugins";

describe("Test Plugin", () => {
    it("should add custom widget to dashboard", () => {
        visitDashboardAndWaitForFullRender(SIMPLE_DASHBOARD);
        cy.get(".s-custom-widget").should("exist");
    });
});
