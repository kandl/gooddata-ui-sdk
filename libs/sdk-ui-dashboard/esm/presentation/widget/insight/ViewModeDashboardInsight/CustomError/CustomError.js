// (C) 2007-2021 GoodData Corporation
import React from "react";
import { isDataTooLargeToCompute, isDataTooLargeToDisplay, isNoDataSdkError, isProtectedReport, } from "@gooddata/sdk-ui";
import { ExecuteProtectedError } from "./ExecuteProtectedError.js";
import { DataTooLargeError } from "./DataTooLargeError.js";
import { NoDataError } from "./NoDataError.js";
import { OtherError } from "./OtherError.js";
import { shouldRenderFullContent } from "./sizingUtils.js";
export const CustomError = ({ error, height, width, isCustomWidgetHeightEnabled, forceFullContent, }) => {
    const fullContent = forceFullContent || (isCustomWidgetHeightEnabled ? shouldRenderFullContent(height, width) : true);
    if (isProtectedReport(error)) {
        return React.createElement(ExecuteProtectedError, { fullContent: fullContent });
    }
    else if (isDataTooLargeToDisplay(error) || isDataTooLargeToCompute(error)) {
        return React.createElement(DataTooLargeError, { fullContent: fullContent });
    }
    else if (isNoDataSdkError(error)) {
        return React.createElement(NoDataError, { fullContent: fullContent });
    }
    else if (error) {
        return React.createElement(OtherError, { fullContent: fullContent });
    }
    return null;
};
//# sourceMappingURL=CustomError.js.map