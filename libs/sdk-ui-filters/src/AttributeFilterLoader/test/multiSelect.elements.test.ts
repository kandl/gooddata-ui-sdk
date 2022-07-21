// (C) 2019-2022 GoodData Corporation
import {
    anotherParticularAttributeElements,
    limitingAttributeFilters,
    limitingDateFilters,
    limitingMeasures,
    newTestAttributeFilterHandler,
    particularAttributeElements,
} from "./fixtures";
import { waitForAsync } from "./testUtils";

describe("MultiSelectAttributeFilterHandler", () => {
    it("should load elements for init selection", async () => {
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.init();

        await waitForAsync();

        const selection = attributeFilterHandler.getCommittedSelection();
        const elements = attributeFilterHandler.getElementsByKey(selection.items);
        expect(elements).toMatchSnapshot();
    });

    it("should trigger loadElementsRange success callback", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 4, "elementsRangeSuccess");

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus during load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus after load",
        );

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    it("should trigger loadElementsRange error callback", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadError = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("nonExisting");

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadError(onElementsRangeLoadError);

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 4, "elementsRangeError");

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus during load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus after load",
        );

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadError).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadError.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadError parameters");
    });

    it("should trigger loadElementsRange cancel callback on cancel", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadCancel = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadCancel(onElementsRangeLoadCancel);

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 4, "elementsRangeToBeCanceled");

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus during load",
        );

        attributeFilterHandler.cancelElementsRangeLoad();

        await waitForAsync();

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus after cancel",
        );

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadCancel).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadCancel.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadCancel parameters",
        );
    });

    it("should trigger loadElementsRange cancel callback on another loadElementsRange call", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const onElementsRangeLoadCancel = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadCancel(onElementsRangeLoadCancel);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 4, "elementsRangeToBeCanceled");

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus during load",
        );

        attributeFilterHandler.loadElementsRange(1, 5, "elementsRangeSuccess");

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus during another load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getElementsRangeStatus()).toMatchSnapshot(
            "getElementsRangeStatus after load",
        );

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(2);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadCancel).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadCancel.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadCancel parameters",
        );
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    it("should propagate search option to loadElementsRange", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.setSearch("wonder");

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 100, "elementsRangeWithSearch");

        await waitForAsync();

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    it("should propagate setLimitingAttributeFilters option to loadElementsRange", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.setLimitingAttributeFilters(limitingAttributeFilters);

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 100, "elementsRangeWithAttributeFilters");

        await waitForAsync();

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    it("should propagate setLimitingMeasures option to loadElementsRange", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.setLimitingMeasures(limitingMeasures);

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 100, "elementsRangeWithMeasureFilters");

        await waitForAsync();

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    it("should propagate setLimitingDateFilters option to loadElementsRange", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.setLimitingDateFilters(limitingDateFilters);

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 100, "elementsRangeWithDateFilters");

        await waitForAsync();

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    it("should propagate all options to loadElementsRange", async () => {
        const onElementsRangeLoadStart = jest.fn();
        const onElementsRangeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.setLimitingAttributeFilters(limitingAttributeFilters);
        attributeFilterHandler.setLimitingMeasures(limitingMeasures);
        attributeFilterHandler.setLimitingDateFilters(limitingDateFilters);

        attributeFilterHandler.onElementsRangeLoadStart(onElementsRangeLoadStart);
        attributeFilterHandler.onElementsRangeLoadSuccess(onElementsRangeLoadSuccess);

        attributeFilterHandler.init();
        attributeFilterHandler.loadElementsRange(0, 100, "elementsRangeWithMultipleFilters");

        await waitForAsync();

        expect(onElementsRangeLoadStart).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onElementsRangeLoadStart.mock.calls[0]).toMatchSnapshot("onElementsRangeLoadStart parameters");
        expect(onElementsRangeLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onElementsRangeLoadSuccess parameters",
        );
    });

    // Particular elements

    it("should trigger loadParticularElements success callback", async () => {
        const onParticularElementsLoadStart = jest.fn();
        const onParticularElementsLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onParticularElementsLoadStart(onParticularElementsLoadStart);
        attributeFilterHandler.onParticularElementsLoadSuccess(onParticularElementsLoadSuccess);

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadParticularElements(
            particularAttributeElements,
            "loadParticularElementsSuccess",
        );

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus during load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus after load",
        );

        expect(onParticularElementsLoadStart).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadStart.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadStart parameters",
        );
        expect(onParticularElementsLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadSuccess parameters",
        );
    });

    it("should trigger loadParticularElements error callback", async () => {
        const onParticularElementsLoadStart = jest.fn();
        const onParticularElementsLoadError = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("nonExisting");

        attributeFilterHandler.onParticularElementsLoadStart(onParticularElementsLoadStart);
        attributeFilterHandler.onParticularElementsLoadError(onParticularElementsLoadError);

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadParticularElements(
            particularAttributeElements,
            "loadParticularElementsError",
        );

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus during load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus after load",
        );

        expect(onParticularElementsLoadStart).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadError).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadStart.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadStart parameters",
        );
        expect(onParticularElementsLoadError.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadError parameters",
        );
    });

    it("should trigger loadParticularElements cancel callback on cancel", async () => {
        const onParticularElementsLoadStart = jest.fn();
        const onParticularElementsLoadCancel = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onParticularElementsLoadStart(onParticularElementsLoadStart);
        attributeFilterHandler.onParticularElementsLoadCancel(onParticularElementsLoadCancel);

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadParticularElements(
            particularAttributeElements,
            "loadParticularElementsToBeCanceled",
        );

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus during load",
        );

        attributeFilterHandler.cancelParticularElementsLoad();

        await waitForAsync();

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus after cancel",
        );

        expect(onParticularElementsLoadStart).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadCancel).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadStart.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadStart parameters",
        );
        expect(onParticularElementsLoadCancel.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadCancel parameters",
        );
    });

    it("should trigger loadParticularElements cancel callback on another loadLoadParticularElements call", async () => {
        const onParticularElementsLoadStart = jest.fn();
        const onParticularElementsLoadSuccess = jest.fn();
        const onParticularElementsLoadCancel = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onParticularElementsLoadStart(onParticularElementsLoadStart);
        attributeFilterHandler.onParticularElementsLoadCancel(onParticularElementsLoadCancel);
        attributeFilterHandler.onParticularElementsLoadSuccess(onParticularElementsLoadSuccess);

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus before load",
        );

        attributeFilterHandler.init();
        attributeFilterHandler.loadParticularElements(
            particularAttributeElements,
            "loadParticularElementsToBeCanceled",
        );

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus during load",
        );

        attributeFilterHandler.loadParticularElements(
            anotherParticularAttributeElements,
            "loadParticularElementsSuccess",
        );

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus during another load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getParticularElementsStatus()).toMatchSnapshot(
            "getParticularElementsStatus after load",
        );

        expect(onParticularElementsLoadStart).toHaveBeenCalledTimes(2);
        expect(onParticularElementsLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadCancel).toHaveBeenCalledTimes(1);
        expect(onParticularElementsLoadStart.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadStart parameters",
        );
        expect(onParticularElementsLoadCancel.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadCancel parameters",
        );
        expect(onParticularElementsLoadSuccess.mock.calls[0]).toMatchSnapshot(
            "onParticularElementsLoadSuccess parameters",
        );
    });
});
