// (C) 2019 GoodData Corporation
import { ErrorComponent as DefaultError, newErrorMapping, } from "@gooddata/sdk-ui";
import { injectIntl } from "react-intl";
import React, { useMemo } from "react";
const InsightErrorCore = ({ error, ErrorComponent = DefaultError, height, intl, clientHeight, }) => {
    const errorMapping = useMemo(() => newErrorMapping(intl), [intl]);
    const errorProps = useMemo(() => { var _a; return (_a = errorMapping[error.getMessage()]) !== null && _a !== void 0 ? _a : { message: error.message }; }, [errorMapping, error]);
    return React.createElement(ErrorComponent, Object.assign({}, errorProps, { height: height, clientHeight: clientHeight }));
};
/**
 * @internal
 */
export const InsightError = injectIntl(InsightErrorCore);
//# sourceMappingURL=InsightError.js.map