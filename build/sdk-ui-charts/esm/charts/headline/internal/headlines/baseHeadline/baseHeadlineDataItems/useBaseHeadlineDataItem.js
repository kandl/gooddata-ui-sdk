// (C) 2023 GoodData Corporation
import { useMemo } from "react";
import { formatItemValue } from "../../../utils/HeadlineDataItemUtils.js";
import { useBaseHeadline } from "../BaseHeadlineContext.js";
export const useBaseHeadlineDataItem = (dataItem) => {
    const { config } = useBaseHeadline();
    const formattedItem = useMemo(() => formatItemValue(dataItem, config), [dataItem, config]);
    return {
        formattedItem,
    };
};
//# sourceMappingURL=useBaseHeadlineDataItem.js.map