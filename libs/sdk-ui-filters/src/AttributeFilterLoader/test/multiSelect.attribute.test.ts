// (C) 2019-2022 GoodData Corporation
import { newTestAttributeFilterHandler } from "./fixtures";
import { waitForAsync } from "./testUtils";

describe("MultiSelectAttributeFilterHandler", () => {
    it("should init attribute", async () => {
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.init("init");

        await waitForAsync();

        expect(attributeFilterHandler.getAttribute()).toMatchSnapshot();
    });

    it("should load attribute and trigger success callback", async () => {
        const onAttributeLoadStart = jest.fn();
        const onAttributeLoadSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus before load");

        attributeFilterHandler.init();
        attributeFilterHandler.onAttributeLoadStart(onAttributeLoadStart);
        attributeFilterHandler.onAttributeLoadSuccess(onAttributeLoadSuccess);
        attributeFilterHandler.loadAttribute("attributeSuccess");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus during load");

        await waitForAsync();

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus after load");

        expect(attributeFilterHandler.getAttribute()).toMatchSnapshot();
        expect(onAttributeLoadStart).toHaveBeenCalledTimes(1);
        expect(onAttributeLoadSuccess).toHaveBeenCalledTimes(1);
        expect(onAttributeLoadStart.mock.calls[0]).toMatchSnapshot("onAttributeLoadStart parameters");
        expect(onAttributeLoadSuccess.mock.calls[0]).toMatchSnapshot("onAttributeLoadSuccess parameters");
    });

    it("should load attribute and trigger error callback", async () => {
        const onAttributeLoadStart = jest.fn();
        const onAttributeLoadError = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("nonExisting");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus before load");

        attributeFilterHandler.init();

        await waitForAsync();

        attributeFilterHandler.onAttributeLoadStart(onAttributeLoadStart);
        attributeFilterHandler.onAttributeLoadError(onAttributeLoadError);
        attributeFilterHandler.loadAttribute("attributeError");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus during load");

        await waitForAsync();

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus after load");

        expect(attributeFilterHandler.getAttribute()).toMatchSnapshot();
        expect(onAttributeLoadStart).toHaveBeenCalledTimes(1);
        expect(onAttributeLoadError).toHaveBeenCalledTimes(1);
        expect(onAttributeLoadStart.mock.calls[0]).toMatchSnapshot("onAttributeLoadStart parameters");
        expect(onAttributeLoadError.mock.calls[0]).toMatchSnapshot("onAttributeLoadError parameters");
    });

    it("should load attribute and trigger cancel callback on another attribute call", async () => {
        const onAttributeLoadStart = jest.fn();
        const onAttributeLoadCancel = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus before load");

        attributeFilterHandler.init();

        await waitForAsync();

        attributeFilterHandler.onAttributeLoadStart(onAttributeLoadStart);
        attributeFilterHandler.onAttributeLoadCancel(onAttributeLoadCancel);
        attributeFilterHandler.loadAttribute("attributeToBeCanceled");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus during load");

        attributeFilterHandler.loadAttribute("attributeSuccess");

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot(
            "getAttributeStatus during another load",
        );

        await waitForAsync();

        expect(attributeFilterHandler.getAttributeStatus()).toMatchSnapshot("getAttributeStatus after load");

        expect(attributeFilterHandler.getAttribute()).toMatchSnapshot();
        expect(onAttributeLoadStart).toHaveBeenCalledTimes(2);
        expect(onAttributeLoadCancel).toHaveBeenCalledTimes(1);
        expect(onAttributeLoadStart.mock.calls[0]).toMatchSnapshot("first onAttributeLoadStart parameters");
        expect(onAttributeLoadStart.mock.calls[1]).toMatchSnapshot("second onAttributeLoadStart parameters");
        expect(onAttributeLoadCancel.mock.calls[0]).toMatchSnapshot("onAttributeLoadCancel parameters");
    });
});
