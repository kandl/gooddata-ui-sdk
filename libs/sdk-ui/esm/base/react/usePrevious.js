// (C) 2021 GoodData Corporation
import { useEffect, useRef } from "react";
/**
 * Hook for tracking the previous value of the React component prop.
 * This is useful as a replacement for the componentWillReceiveProps lifecycle method.
 * See: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @internal
 */
export const usePrevious = (props) => {
    const previousProps = useRef(props);
    useEffect(() => {
        previousProps.current = props;
    });
    return previousProps.current;
};
//# sourceMappingURL=usePrevious.js.map