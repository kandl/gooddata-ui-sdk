// (C) 2022 GoodData Corporation
import { convertError } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export async function loadAttributeByDisplayForm(context, displayFormRef) {
    return context.backend
        .workspace(context.workspace)
        .attributes()
        .getAttributeByDisplayForm(displayFormRef)
        .catch((err) => {
        // Convert from AnalyticalBackendError to GoodDataSdkError
        throw convertError(err);
    });
}
//# sourceMappingURL=loadAttributeByDisplayForm.js.map