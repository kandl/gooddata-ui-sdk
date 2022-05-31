// (C) 2022 GoodData Corporation
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IAttributeDisplayFormMetadataObject, ObjRef } from "@gooddata/sdk-model";
import { Correlation, DisplayFormLoad, Loadable } from "../types/common";
import { IAttributeDisplayFormLoader } from "../types";
import { newCallbackHandler } from "./common";

const defaultDisplayFormLoad: DisplayFormLoad = (backend, workspace, displayForm) => {
    return backend.workspace(workspace).attributes().getAttributeDisplayForm(displayForm);
};

// TODO: should be attribute loader
/**
 * @internal
 */
export class DefaultAttributeDisplayFormLoader implements IAttributeDisplayFormLoader {
    private displayForm: Loadable<IAttributeDisplayFormMetadataObject> = {
        status: "pending",
        result: undefined,
        error: undefined,
    };

    private onLoaded = newCallbackHandler<{ displayForm: IAttributeDisplayFormMetadataObject }>();
    private onLoading = newCallbackHandler();
    private onError = newCallbackHandler<{ error: Error }>();
    private onCancelled = newCallbackHandler();

    constructor(
        private readonly displayFormRef: ObjRef,
        private readonly backend: IAnalyticalBackend,
        private readonly workspace: string,
        private readonly displayFormLoad: DisplayFormLoad = defaultDisplayFormLoad,
    ) {}

    // manipulators
    loadDisplayFormInfo = (correlation?: Correlation): void => {
        this.onLoading.triggerAll({ correlation });
        this.displayForm = { status: "loading", result: undefined, error: undefined };
        this.displayFormLoad(this.backend, this.workspace, this.displayFormRef)
            .then((displayForm) => {
                this.displayForm = { status: "success", result: displayForm, error: undefined };
                this.onLoaded.triggerAll({ correlation, displayForm });
            })
            .catch((error: Error) => {
                if (error.name === "AbortError") {
                    this.onCancelled.triggerAll({ correlation });
                } else {
                    this.onError.triggerAll({ correlation, error });
                }
                this.displayForm = { status: "error", error, result: undefined };
            });
    };

    cancelDisplayFormInfoLoad = (): void => {
        // TODO: actually cancel
    };

    // selectors
    getDisplayFormInfo = (): Loadable<IAttributeDisplayFormMetadataObject> => {
        return this.displayForm;
    };

    // callbacks
    onDisplayFormLoadSuccess = this.onLoaded.subscribe;
    onDisplayFormLoadStart = this.onLoading.subscribe;
    onDisplayFormLoadError = this.onError.subscribe;
    onDisplayFormLoadCancel = this.onCancelled.subscribe;
}
