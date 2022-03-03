// (C) 2021 GoodData Corporation
import { DashboardEventType } from "@gooddata/sdk-ui-dashboard";
// import { SERVER_URL } from "../../src/constants";
import { listenForDashboardPluginEvents } from "../../src/infra";

import "./commands";
import "./recordings";

function getDashboardUrl(id: string) {
    return `http://localhost:9500/dashboard-plugin-tests/index.html#${id}`;
}

export function visitDashboardAndWaitForFullRender(identifier: string) {
    function waitForFulLRender(doc: Document) {
        return new Cypress.Promise((resolve) => {
            const unsubscribe = listenForDashboardPluginEvents(doc, (e) => {
                if ((e.type as DashboardEventType) === "GDC.DASH/EVT.RENDER.RESOLVED") {
                    resolve(true);
                    unsubscribe();
                }
            });
        });
    }

    cy.visit(getDashboardUrl(identifier));
    cy.document().then(waitForFulLRender);
}
