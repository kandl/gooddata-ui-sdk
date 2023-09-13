// (C) 2022 GoodData Corporation
import { useMemo } from "react";
export function useGradientColor(backgroundColor) {
    return useMemo(() => {
        return {
            topBackground: `linear-gradient(${backgroundColor}, rgba(255, 255, 255, 0.001))`,
            bottomBackground: `linear-gradient(rgba(255, 255, 255, 0.001), ${backgroundColor})`,
        };
    }, [backgroundColor]);
}
//# sourceMappingURL=useGradientColor.js.map