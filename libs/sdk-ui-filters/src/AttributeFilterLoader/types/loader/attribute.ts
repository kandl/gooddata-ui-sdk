// (C) 2022 GoodData Corporation
import { IAttributeMetadataObject } from "@gooddata/sdk-model";
// import { GoodDataSdkError } from "@gooddata/sdk-ui";
// import { AsyncOperationStatus, CallbackRegistration, Correlation } from "../common";

/**
 * Handles the loading of the display form info (e.g. its title).
 * @alpha
 */
export interface IAttributeLoader {
    //
    // manipulators
    //

    /**
     * Trigger the load of the attribute handled by this handler.
     *
     * @remarks
     * You can provide a correlation value that will be included in all the events fired by this.
     * This is useful if you want to "pair" loading and loaded events from the same initiated by the same
     * loadAttribute call.
     *
     * @param correlation - the correlation value
     */
    // loadAttribute(correlation?: Correlation): void;

    /**
     * Cancel the loading of the attribute if any is in progress.
     */
    // cancelAttributeLoad(): void;

    //
    // selectors
    //

    /**
     * Get the currently loaded value of the attribute.
     *
     * @privateRemarks
     * Returns undefined, if the attribute is not loaded yet.
     */
    getAttribute(): IAttributeMetadataObject | undefined;
    // getAttributeStatus(): AsyncOperationStatus;
    // getAttributeError(): GoodDataSdkError;

    //
    // callbacks
    //
    // onAttributeLoadStart: CallbackRegistration;
    // onAttributeLoadSuccess: CallbackRegistration<{ attribute: IAttributeMetadataObject }>;
    // onAttributeLoadError: CallbackRegistration<{ error: Error }>;
    // onAttributeLoadCancel: CallbackRegistration;
}
