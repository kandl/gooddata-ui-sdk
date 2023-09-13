// (C) 2020-2023 GoodData Corporation
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { UnexpectedSdkError } from "@gooddata/sdk-ui";
import { queryAndWaitFor } from "../store/index.js";
import { useDashboardDispatch } from "./DashboardStoreProvider.js";
import { isDashboardQueryFailed, isDashboardQueryRejected, } from "../events/index.js";
/**
 * @internal
 */
export const useDashboardQueryProcessing = ({ queryCreator, onSuccess, onError, onRejected, onBeforeRun, }) => {
    const [state, setState] = useState({
        status: "pending",
        error: undefined,
        result: undefined,
    });
    const canceled = useRef(false);
    const dispatch = useDashboardDispatch();
    const run = useCallback((...args) => {
        if (canceled.current) {
            return;
        }
        let query = queryCreator(...args);
        if (!query.correlationId) {
            query = Object.assign(Object.assign({}, query), { correlationId: uuid() });
        }
        if (!canceled.current) {
            setState({
                status: "running",
                result: undefined,
                error: undefined,
            });
        }
        onBeforeRun === null || onBeforeRun === void 0 ? void 0 : onBeforeRun(query);
        queryAndWaitFor(dispatch, query)
            .then((result) => {
            if (!canceled.current) {
                setState({ status: "success", result, error: undefined });
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(result);
            }
        })
            .catch((e) => {
            if (!canceled.current) {
                if (isDashboardQueryFailed(e)) {
                    setState({
                        status: "error",
                        result: undefined,
                        error: new UnexpectedSdkError(e.payload.message, e.payload.error),
                    });
                    onError === null || onError === void 0 ? void 0 : onError(e);
                }
                else if (isDashboardQueryRejected(e)) {
                    setState({ status: "rejected", result: undefined, error: undefined });
                    onRejected === null || onRejected === void 0 ? void 0 : onRejected(e);
                }
            }
        });
    }, [queryCreator, onSuccess, onError, onRejected, onBeforeRun]);
    // cancel any "in-flight" queries once the parent component is unmounting to prevent react warnings
    // about updating unmounted components
    useEffect(() => {
        return () => {
            canceled.current = true;
        };
    }, []);
    return Object.assign({ run }, state);
};
//# sourceMappingURL=useDashboardQueryProcessing.js.map