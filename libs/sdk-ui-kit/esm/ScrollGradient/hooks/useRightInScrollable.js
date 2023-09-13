// (C) 2022 GoodData Corporation
import { useState, useEffect } from "react";
import { useNumberState } from "./useNumberState.js";
export function useRightInScrollable() {
    const [right, setRight] = useNumberState();
    const [content, setContent] = useState(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (content) {
            const style = window.getComputedStyle(content, ":before");
            const currentRight = content.offsetWidth - parseFloat(style.width);
            if (currentRight !== right) {
                setRight(currentRight);
            }
        }
    });
    return {
        right,
        content,
        setContent,
    };
}
//# sourceMappingURL=useRightInScrollable.js.map