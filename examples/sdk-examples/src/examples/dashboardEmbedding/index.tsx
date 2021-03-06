// (C) 2007-2019 GoodData Corporation
/* eslint-disable import/no-unresolved,import/default */
import React from "react";

import { ExampleWithSource } from "../../components/ExampleWithSource";

import SimpleDashboardView from "./SimpleDashboardView";
import SimpleDashboardViewSRC from "!raw-loader!./SimpleDashboardView";
import SimpleDashboardViewSRCJS from "!raw-loader!../../../examplesJS/dashboardEmbedding/SimpleDashboardView";

import DashboardViewWithFilters from "./DashboardViewWithFilters";
import DashboardViewWithFiltersSRC from "!raw-loader!./DashboardViewWithFilters";
import DashboardViewWithFiltersSRCJS from "!raw-loader!../../../examplesJS/dashboardEmbedding/DashboardViewWithFilters";

import DashboardViewWithDrilling from "./DashboardViewWithDrilling";
import DashboardViewWithDrillingSRC from "!raw-loader!./DashboardViewWithDrilling";
import DashboardViewWithDrillingSRCJS from "!raw-loader!../../../examplesJS/dashboardEmbedding/DashboardViewWithDrilling";

import DashboardViewWithEmails from "./DashboardViewWithEmails";
import DashboardViewWithEmailsSRC from "!raw-loader!./DashboardViewWithEmails";
import DashboardViewWithEmailsSRCJS from "!raw-loader!../../../examplesJS/dashboardEmbedding/DashboardViewWithEmails";

export const DashboardView = (): JSX.Element => (
    <div>
        <h1>DashboardView</h1>

        <p>Simple example of how to embed a Dashboard into your application</p>

        <ExampleWithSource
            for={SimpleDashboardView}
            source={SimpleDashboardViewSRC}
            sourceJS={SimpleDashboardViewSRCJS}
        />

        <hr className="separator" />

        <p>
            Example of how to embed a Dashboard into your application with added filters – the same Dashboard
            as in the previous example filtered only to California
        </p>

        <ExampleWithSource
            for={DashboardViewWithFilters}
            source={DashboardViewWithFiltersSRC}
            sourceJS={DashboardViewWithFiltersSRCJS}
        />

        <hr className="separator" />

        <p>
            Example of how to embed a Dashboard into your application with added drilling – the same Dashboard
            as in the previous examples wit Aventura with enabled drilling (check the console logs for
            results).
        </p>

        <ExampleWithSource
            for={DashboardViewWithDrilling}
            source={DashboardViewWithDrillingSRC}
            sourceJS={DashboardViewWithDrillingSRCJS}
        />

        <hr className="separator" />

        <p>Example of how to embed a Dashboard into your application with the option to schedule emails.</p>

        <ExampleWithSource
            for={DashboardViewWithEmails}
            source={DashboardViewWithEmailsSRC}
            sourceJS={DashboardViewWithEmailsSRCJS}
        />
    </div>
);
