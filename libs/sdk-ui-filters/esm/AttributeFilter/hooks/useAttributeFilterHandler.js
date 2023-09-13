// (C) 2022 GoodData Corporation
import { useEffect, useRef, useState, useCallback } from "react";
import isEqual from "lodash/isEqual.js";
import { usePrevious } from "@gooddata/sdk-ui";
import { filterObjRef } from "@gooddata/sdk-model";
import { newAttributeFilterHandler, } from "../../AttributeFilterHandler/index.js";
/**
 * Hook for retrieving AttributeFilterHandler {@link IMultiSelectAttributeFilterHandler} Core API for Attribute Filter components.
 * This hook is responsible for initialization of the AttributeFilterHandler.
 * @beta
 */
export const useAttributeFilterHandler = (props) => {
    const { backend, workspace, filter, hiddenElements, staticElements, } = props;
    const [, setInvalidate] = useState(0);
    const invalidate = () => {
        setInvalidate((s) => s + 1);
    };
    const handlerRef = useRef();
    const createNewHandler = useCallback(() => {
        const newHandler = newAttributeFilterHandler(backend.withTelemetry("AttributeFilter", { workspace, filter, hiddenElements, staticElements }), workspace, filter, {
            selectionMode: "multi",
            hiddenElements,
            staticElements,
        });
        handlerRef.current = newHandler;
    }, [backend, workspace, filter, hiddenElements, staticElements]);
    if (!handlerRef.current) {
        createNewHandler();
    }
    const handler = handlerRef.current;
    const prevProps = usePrevious(props);
    useEffect(() => {
        const unsubscribe = handler.onUpdate(() => {
            invalidate();
        });
        if (backend !== prevProps.backend ||
            workspace !== prevProps.workspace ||
            !isEqual(filterObjRef(filter), filterObjRef(handler.getFilter())) ||
            !isEqual(staticElements, prevProps.staticElements) ||
            !isEqual(hiddenElements, prevProps.hiddenElements)) {
            createNewHandler();
            invalidate();
        }
        return () => {
            unsubscribe();
        };
    }, [backend, workspace, filter, staticElements, hiddenElements, prevProps, handler, createNewHandler]);
    return handler;
};
//# sourceMappingURL=useAttributeFilterHandler.js.map