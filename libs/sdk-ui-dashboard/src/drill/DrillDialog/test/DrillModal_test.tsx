// (C) 2019-2021 GoodData Corporation
import { idRef, ObjRef } from "@gooddata/sdk-model";
import React from "react";
import { shallow } from "enzyme";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";

import { DrillModal, IDrillModalProps } from "../DrillModal";
import { DashboardDrillEvent, AppDrillDefinition } from "../../../../modules/Drilling";
import { MockBarChartInsight, MockBarChartVisClass } from "../../../../mocks/insightMocks";

function renderDrillModal(customProps: IDrillModalProps) {
    return shallow(<DrillModal {...customProps} />);
}

const requiredDrillModalProps: IDrillModalProps = {
    drillTarget: MockBarChartInsight,
    drillFilters: [],
    nestedWidgetRef: idRef("nestedWidgetId"),
    activeWidgetRef: idRef("activeWidgetId"),
    drillTargetAttributeTitle: [],
    isDrillActive: false,
    dateFilter: null,
    visualizationClass: MockBarChartVisClass,
    visualizationProperties: {},
    locale: "es-ES",
    drillConfig: [] as AppDrillDefinition[],
    clearDrill: () => {},
    onSupportedDrillableItemsReceived: (
        _widgetRef: ObjRef,
        _supportedDrillableItems: IAvailableDrillTargets,
    ) => {},
    onDrill: (_widgetRef: ObjRef, _drillEvent: DashboardDrillEvent, _drillDefinition?: AppDrillDefinition) =>
        undefined,
    resetDrillVisualisation: () => {},
    isInternalDrilling: true,
    sourceVisualization: null,
};

describe("DrillModal", () => {
    it("should render component when isDrillActive is set to true", () => {
        const component = renderDrillModal({
            ...requiredDrillModalProps,
            ...{ isDrillActive: true },
        });

        expect(component.find(".gd-drill-modal-overlay").exists()).toEqual(true);
    });

    it("should not render component when isDrillActive is set to false", () => {
        const component = renderDrillModal({
            ...requiredDrillModalProps,
            ...{ isDrillActive: false },
        });

        expect(component.find(".gd-drill-modal-overlay").exists()).toEqual(false);
    });
});
