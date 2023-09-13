import React from "react";
import { ITheme } from "@gooddata/sdk-model";
interface ILegendItemProps {
    item: any;
    width?: number;
    enableBorderRadius?: boolean;
    onItemClick: (item: any) => void;
    theme?: ITheme;
}
declare const _default: React.ComponentType<Omit<ILegendItemProps, "theme" | "themeIsLoading">>;
export default _default;
//# sourceMappingURL=LegendItem.d.ts.map