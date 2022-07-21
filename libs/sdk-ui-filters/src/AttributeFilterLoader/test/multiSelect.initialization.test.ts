// (C) 2019-2022 GoodData Corporation
import { newTestAttributeFilterHandler } from "./fixtures";
import { waitForAsync } from "./testUtils";

describe("MultiSelectAttributeFilterHandler", () => {
    it("should trigger init success callback", async () => {
        const onInicStart = jest.fn();
        const onInitSuccess = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onInitStart(onInicStart);
        attributeFilterHandler.onInitSuccess(onInitSuccess);

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus before load");

        attributeFilterHandler.init("init");

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus during load");

        await waitForAsync();

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus after load");

        expect(onInicStart).toHaveBeenCalledTimes(1);
        expect(onInicStart.mock.calls[0]).toMatchSnapshot("onInicStart parameters");
        expect(onInitSuccess).toHaveBeenCalledTimes(1);
        expect(onInitSuccess.mock.calls[0]).toMatchSnapshot("onInitSuccess parameters");
    });

    it("should trigger init error callback", async () => {
        const onInicStart = jest.fn();
        const onInitError = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("nonExisting");

        attributeFilterHandler.onInitStart(onInicStart);
        attributeFilterHandler.onInitError(onInitError);

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus before load");

        attributeFilterHandler.init("init");

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus during load");

        await waitForAsync();

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus after load");

        expect(onInicStart).toHaveBeenCalledTimes(1);
        expect(onInicStart.mock.calls[0]).toMatchSnapshot("onInicStart parameters");
        expect(onInitError).toHaveBeenCalledTimes(1);
        expect(onInitError.mock.calls[0]).toMatchSnapshot("onInitError parameters");
    });

    it("should trigger init cancel callback on another init call", async () => {
        const onInicStart = jest.fn();
        const onInitCancel = jest.fn();
        const attributeFilterHandler = newTestAttributeFilterHandler("positive");

        attributeFilterHandler.onInitStart(onInicStart);
        attributeFilterHandler.onInitCancel(onInitCancel);

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus before load");

        attributeFilterHandler.init("init1");

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus during load");

        attributeFilterHandler.init("init2");

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus during another load");

        await waitForAsync();

        expect(attributeFilterHandler.getInitStatus()).toMatchSnapshot("getInitStatus after load");

        expect(onInicStart).toHaveBeenCalledTimes(2);
        expect(onInicStart.mock.calls[0]).toMatchSnapshot("onInicStart 1 parameters");
        expect(onInicStart.mock.calls[1]).toMatchSnapshot("onInicStart 2 parameters");
        expect(onInitCancel).toHaveBeenCalledTimes(1);
        expect(onInitCancel.mock.calls[1]).toMatchSnapshot("onInitCancel parameters");
    });
});
