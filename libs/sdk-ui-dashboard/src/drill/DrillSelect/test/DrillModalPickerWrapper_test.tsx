// (C) 2020-2021 GoodData Corporation

import { IDrillEvent } from "@gooddata/sdk-ui";
import React from "react";
import { mount } from "enzyme";
import { IListedDashboard } from "@gooddata/sdk-backend-spi";
import { uriRef, idRef } from "@gooddata/sdk-model";

import {
    DashboardDrillEvent,
    AppDrillDefinition,
    IImplicitDrillDown,
    IDrillTargetsState,
} from "../../../../modules/Drilling";
import { WithDrillSelectProps, withDrillModalPicker } from "../WithDrillSelect";
import { DrillModalPicker, createDrillPickerItems } from "../DrillSelectDropdown";
import withIntlProvider from "../../../../modules/Core/utils/testUtils/withIntlProvider";
import withRedux from "../../../../modules/Core/utils/testUtils/withRedux";
import { newInsight } from "../../../../mocks/insightMocks";
import { TestDrillFactories } from "../../../../modules/Drilling/";
import { DrillType } from "../../Types";

const firstDrillableAttribute = "first-drillable-attribute-local-identifier";
const firstDrillAttributeValue = "first-drill-attribute-value";

const secondDrillableAttribute = "second-drillable-attribute-local-identifier";
const secondDrillAttributeValue = "second-drill-attribute-value";

const moreDetailsMessage = "More details";

const implicitDrills: IImplicitDrillDown[] = [
    {
        implicitDrillDown: {
            from: {
                drillFromAttribute: {
                    localIdentifier: firstDrillableAttribute,
                },
            },
            drillDownStep: {
                drillToAttribute: {
                    attributeDisplayForm: { uri: "implicitDrillDown-target-uri" },
                },
            },
        },
    },
    {
        implicitDrillDown: {
            from: {
                drillFromAttribute: {
                    localIdentifier: secondDrillableAttribute,
                },
            },
            drillDownStep: {
                drillToAttribute: {
                    attributeDisplayForm: { uri: "implicitDrillDown-target-uri" },
                },
            },
        },
    },
];

const drillEvent: IDrillEvent = {
    dataView: undefined,
    drillContext: {
        type: "table",
        element: "cell",
        intersection: [
            {
                header: {
                    measureHeaderItem: {
                        localIdentifier: "measureHeaderItem-localIdentifier",
                        name: "measureHeaderItem-name",
                        format: "measureHeaderItem-format",
                    },
                },
            },
            {
                header: {
                    attributeHeaderItem: {
                        uri: "attributeHeaderItem-uri",
                        name: firstDrillAttributeValue,
                    },
                    attributeHeader: {
                        ref: uriRef("attributeHeader-uri"),
                        uri: "attributeHeader-uri",
                        identifier: "attributeHeader-identifier",
                        localIdentifier: firstDrillableAttribute,
                        name: "attributeHeader-name",
                        formOf: {
                            ref: uriRef("attributeHeader-formOf-uri"),
                            uri: "attributeHeader-formOf-uri",
                            identifier: "attributeHeader-formOf-identifier",
                            name: "attributeHeader-formOf-name",
                        },
                    },
                },
            },
            {
                header: {
                    attributeHeaderItem: {
                        uri: "attributeHeaderItem-uri",
                        name: secondDrillAttributeValue,
                    },
                    attributeHeader: {
                        uri: "attributeHeader-uri",
                        identifier: "attributeHeader-identifier",
                        localIdentifier: secondDrillableAttribute,
                        name: "attributeHeader-name",
                        ref: uriRef("attributeHeader-uri"),
                        formOf: {
                            ref: uriRef("attributeHeader-formOf-uri"),
                            uri: "attributeHeader-formOf-uri",
                            identifier: "attributeHeader-formOf-identifier",
                            name: "attributeHeader-formOf-name",
                        },
                    },
                },
            },
        ],
    },
};

describe("createDrillPickerItems", () => {
    it("should handle undefined intersection", () => {
        const implicitDrills: IImplicitDrillDown[] = [];
        const drillEvent: IDrillEvent = {
            dataView: undefined,
            drillContext: {
                type: "table",
                element: "cell",
            },
        };
        const result = createDrillPickerItems(implicitDrills, drillEvent, {}, [], moreDetailsMessage);
        expect(result).toEqual([]);
    });

    it("should create drill picker items for ImplicitDrillDown", () => {
        const result = createDrillPickerItems(implicitDrills, drillEvent, {}, [], moreDetailsMessage);
        expect(result.length).toEqual(2);
        expect(result[0].drillDefinition).toEqual(implicitDrills[0]);
        expect(result[0].name).toEqual(firstDrillAttributeValue);
        expect(result[0].isLoading).toBeFalsy();
        expect(result[0].type).toEqual(DrillType.DRILL_DOWN);
        expect(result[1].drillDefinition).toEqual(implicitDrills[1]);
        expect(result[1].name).toEqual(secondDrillAttributeValue);
        expect(result[1].isLoading).toBeFalsy();
        expect(result[1].type).toEqual(DrillType.DRILL_DOWN);
    });

    it("should create drill picker items for DrillToVisualization with isLoading when target is missing", () => {
        const drillToVisualization: AppDrillDefinition = TestDrillFactories.testDrillToInsight(
            "measureID",
            "visualization-uri",
        );

        const result = createDrillPickerItems([drillToVisualization], drillEvent, {}, [], moreDetailsMessage);
        expect(result.length).toEqual(1);
        expect(result[0].drillDefinition).toEqual(drillToVisualization);
        expect(result[0].name).toBeNull();
        expect(result[0].isLoading).toBeTruthy();
        expect(result[0].type).toEqual(DrillType.DRILL_TO_INSIGHT);
    });

    it("should create drill picker items for DrillToVisualization and set name from target", () => {
        const drillToVisualization: AppDrillDefinition = TestDrillFactories.testDrillToInsight(
            "measureID",
            "visualization-uri",
        );

        const targetName = "Widget label";

        const targets: IDrillTargetsState = {
            "visualization-uri": newInsight("local:bar", (i) =>
                i
                    .title(targetName)
                    .identifier("identifier")
                    .uri("visualization-uri")
                    .updated("2020-08-13 11:17:18"),
            ),
        };

        const result = createDrillPickerItems(
            [drillToVisualization],
            drillEvent,
            targets,
            [],
            moreDetailsMessage,
        );
        expect(result.length).toEqual(1);
        expect(result[0].drillDefinition).toEqual(drillToVisualization);
        expect(result[0].name).toEqual(targetName);
        expect(result[0].isLoading).toBeFalsy();
        expect(result[0].type).toEqual(DrillType.DRILL_TO_INSIGHT);
    });

    it("should create drill picker items for DrillToDashboard and set name from dashboard list", () => {
        const drillToDashboard: AppDrillDefinition = TestDrillFactories.testDrillToDashboard(
            "f7122f53c54f483fbe920b374d90eeed",
            idRef("dashboardId"),
        );

        const dashboardName = "Dashboard label";

        const dashboardList: IListedDashboard[] = [
            {
                ref: {
                    uri: "dashboardUri",
                },
                identifier: "dashboardId",
                uri: "dashboardUri",
                title: dashboardName,
                description: "",
                updated: "2020-08-07 10:30:29",
                created: "2020-07-21 15:16:34",
            },
        ];

        const result = createDrillPickerItems(
            [drillToDashboard],
            drillEvent,
            {},
            dashboardList,
            moreDetailsMessage,
        );
        expect(result.length).toEqual(1);
        expect(result[0].drillDefinition).toEqual(drillToDashboard);
        expect(result[0].name).toEqual(dashboardName);
        expect(result[0].isLoading).toBeFalsy();
        expect(result[0].type).toEqual(DrillType.DRILL_TO_DASHBOARD);
    });

    it("should create drill picker items for DrillToUrl and set name as moreDetailsMessage value", () => {
        const drillToUrl: AppDrillDefinition = TestDrillFactories.testDrillToCustomUrl(
            "measureId",
            "https://www.gooddata.com",
        );

        const result = createDrillPickerItems([drillToUrl], drillEvent, {}, [], moreDetailsMessage);
        expect(result.length).toEqual(1);
        expect(result[0].drillDefinition).toEqual(drillToUrl);
        expect(result[0].name).toEqual(moreDetailsMessage);
        expect(result[0].isLoading).toBeFalsy();
        expect(result[0].type).toEqual(DrillType.DRILL_TO_URL);
    });

    it("should generate stable ID", () => {
        const result1 = createDrillPickerItems(implicitDrills, drillEvent, {}, [], moreDetailsMessage);
        const result2 = createDrillPickerItems(implicitDrills, drillEvent, {}, [], moreDetailsMessage);
        expect(result1[0].id === result2[0].id).toBe(true);
        expect(result1[1].id === result1[0].id).toBe(false);
    });
});

interface IMockedComponentProps extends WithDrillSelectProps {
    isInternalDrilling: boolean;
    drillDefinitions: AppDrillDefinition[];
    drillEvent: DashboardDrillEvent;
}

const MockedComponent: React.FunctionComponent<IMockedComponentProps> = (props: IMockedComponentProps) => {
    const onClick = () => {
        props.onDrillWithDrillDefinitions(props.isInternalDrilling, props.drillDefinitions, props.drillEvent);
    };
    return (
        <div className="mock-content" onClick={onClick}>
            content
        </div>
    );
};

const MockedComponentWithPicker = withRedux(withIntlProvider(withDrillModalPicker(MockedComponent)));

const defaultProps: IMockedComponentProps = {
    onDrillPickerSelect: () => {},
    onDrillWithDrillDefinitions: () => {},
    isInternalDrilling: true,
    drillDefinitions: [],
    drillEvent: null,
};

const createMockedComponent = (customProps: Partial<IMockedComponentProps> = {}) => {
    const props = { ...defaultProps, ...customProps };
    return mount(<MockedComponentWithPicker {...props} />);
};

describe("DrillModalPickerWrapper", () => {
    const twoImplicitDrills: AppDrillDefinition[] = [
        {
            implicitDrillDown: {
                from: {
                    drillFromAttribute: {
                        localIdentifier: "998da372d62a4584b145cd026423fe24",
                    },
                },
                drillDownStep: {
                    drillToAttribute: {
                        attributeDisplayForm: {
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1092",
                        },
                    },
                },
            },
        },
        {
            implicitDrillDown: {
                from: {
                    drillFromAttribute: {
                        localIdentifier: "1d770104ba174b548f1f4dd69da40e96",
                    },
                },
                drillDownStep: {
                    drillToAttribute: {
                        attributeDisplayForm: {
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1028",
                        },
                    },
                },
            },
        },
    ];

    const twoDrillEvent: IDrillEvent = {
        dataView: undefined,
        drillContext: {
            type: "column",
            element: "bar",
            intersection: [
                {
                    header: {
                        measureHeaderItem: {
                            name: "_Close [EOP]",
                            format: "#,##0.00",
                            localIdentifier: "f7122f53c54f483fbe920b374d90eeed",
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/9203",
                            identifier: "aazb6kroa3iC",
                        },
                    },
                },
                {
                    header: {
                        attributeHeaderItem: {
                            name: "West Coast",
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1023/elements?id=1237",
                        },
                        attributeHeader: {
                            name: "Region",
                            localIdentifier: "1d770104ba174b548f1f4dd69da40e96",
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1024",
                            ref: uriRef("/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1024"),
                            identifier: "label.owner.region",
                            formOf: {
                                ref: uriRef("/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1023"),
                                name: "Region",
                                uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1023",
                                identifier: "attr.owner.region",
                            },
                        },
                    },
                },
                {
                    header: {
                        attributeHeaderItem: {
                            name: "Direct Sales",
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1026/elements?id=1226",
                        },
                        attributeHeader: {
                            name: "Department",
                            localIdentifier: "998da372d62a4584b145cd026423fe24",
                            uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1027",
                            identifier: "label.owner.department",
                            ref: uriRef("/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1027"),
                            formOf: {
                                ref: uriRef("/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1026"),
                                name: "Department",
                                uri: "/gdc/md/lmnivlu3sowt63jvr2mo1wlse5fyv203/obj/1026",
                                identifier: "attr.owner.department",
                            },
                        },
                    },
                },
            ],
        },
    };

    it("should render wrapper div", () => {
        const comp = createMockedComponent();
        const div = comp.find(".gd-drill-modal-wrapper-mask");
        expect(div.exists()).toBeTruthy();
    });

    it("should render wrapped component", () => {
        const comp = createMockedComponent();
        const wrappedComponent = comp.find(MockedComponentWithPicker);
        expect(wrappedComponent.length).toEqual(1);
    });

    it("should not render DrillModalPicker component", () => {
        const comp = createMockedComponent();
        const modalPicker = comp.find(DrillModalPicker);
        expect(modalPicker).not.toExist();
    });

    it("should not render DrillModalPicker component when implicit drill is one and call onDrillPickerSelect callback once", () => {
        const onDrillPickerSelect = jest.fn();
        const comp = createMockedComponent({
            drillDefinitions: [twoImplicitDrills[0]],
            drillEvent: twoDrillEvent,
            onDrillPickerSelect,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");
        const modalPicker = comp.find(DrillModalPicker);
        expect(modalPicker).not.toExist();
        expect(onDrillPickerSelect).toHaveBeenCalledTimes(1);
        expect(onDrillPickerSelect.mock.calls[0][1]).toBe(twoImplicitDrills[0]);
    });

    it("should render DrillModalPicker component when implicit drills are more than one and not call onDrillPickerSelect", () => {
        const onDrillPickerSelect = jest.fn();
        const comp = createMockedComponent({
            drillDefinitions: twoImplicitDrills,
            drillEvent: twoDrillEvent,
            onDrillPickerSelect,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");
        const modalPicker = comp.find(DrillModalPicker);
        expect(modalPicker).toExist();
        expect(onDrillPickerSelect).toHaveBeenCalledTimes(0);
    });

    it("should render DrillModalPicker component with two items", () => {
        const onDrillPickerSelect = jest.fn();
        const comp = createMockedComponent({
            drillDefinitions: twoImplicitDrills,
            drillEvent: twoDrillEvent,
            onDrillPickerSelect,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");

        const listItems = comp.find(".s-gd-drill-modal-picker-item");
        expect(listItems.length).toEqual(2);
    });

    it("should not render DrillModalPicker for external drilling", () => {
        const onDrillPickerSelect = jest.fn();
        const comp = createMockedComponent({
            isInternalDrilling: false,
            drillDefinitions: twoImplicitDrills,
            drillEvent: twoDrillEvent,
            onDrillPickerSelect,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");

        const modalPicker = comp.find(DrillModalPicker);
        expect(modalPicker).not.toExist();
        expect(onDrillPickerSelect).toHaveBeenCalledTimes(1);
        expect(onDrillPickerSelect.mock.calls[0][0]).toBe(twoDrillEvent);
        expect(onDrillPickerSelect.mock.calls[0][1]).toBe(undefined);
    });

    it("should render correct dropDownAnchorClass and pass it into DrillModalPicker", () => {
        const comp = createMockedComponent({
            drillDefinitions: twoImplicitDrills,
            drillEvent: twoDrillEvent,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");
        const modalPicker = comp.find(DrillModalPicker);

        const anchorProps = modalPicker.prop("dropDownAnchorClass");

        const wrapperDiv = comp.find(`.${anchorProps}`);
        expect(wrapperDiv.length).toEqual(1);
    });

    it("should render DrillModalPicker component with two items and call onDrillPickerSelect after item click", () => {
        const onDrillPickerSelect = jest.fn();
        const comp = createMockedComponent({
            drillDefinitions: twoImplicitDrills,
            drillEvent: twoDrillEvent,
            onDrillPickerSelect,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");

        const listItems = comp.find(".s-gd-drill-modal-picker-item");

        expect(listItems.length).toEqual(2);

        listItems.at(0).simulate("click");

        expect(onDrillPickerSelect).toHaveBeenCalledTimes(1);
        expect(onDrillPickerSelect.mock.calls[0][1]).toBe(twoImplicitDrills[0]);
    });

    it("should render DrillModalPicker component with two ImplicitDrills and one other drill item", () => {
        const drillToUrl: AppDrillDefinition = TestDrillFactories.testDrillToCustomUrl(
            "998da372d62a4584b145cd026423fe24",
            "https://www.gooddata.com",
        );

        const comp = createMockedComponent({
            drillDefinitions: [...twoImplicitDrills, drillToUrl],
            drillEvent: twoDrillEvent,
        });
        const wrappedComponent = comp.find(".mock-content");
        wrappedComponent.simulate("click");

        const listItems = comp.find(".s-gd-drill-modal-picker-item");

        expect(listItems.length).toEqual(3);
    });
});
