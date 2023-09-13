// (C) 2022 GoodData Corporation
import { useDrop } from "react-dnd";
const basicDropCollect = (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    item: monitor.getItem(),
});
class BasicDropCollectTypeWrapper {
    constructor() {
        this.basicDropCollect = (...args) => basicDropCollect(...args);
    }
}
export function useDashboardDrop(draggableItemTypes, specArg, deps) {
    return useDrop({
        accept: draggableItemTypes,
        drop: specArg.drop,
        canDrop: specArg.canDrop,
        collect: basicDropCollect,
        hover: specArg.hover,
    }, deps);
}
//# sourceMappingURL=useDashboardDrop.js.map