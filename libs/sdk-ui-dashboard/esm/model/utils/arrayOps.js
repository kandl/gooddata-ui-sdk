import { invariant } from "ts-invariant";
export function addArrayElements(arr, index, items) {
    if (index === 0) {
        arr.unshift(...items);
    }
    else if (index < 0) {
        arr.push(...items);
    }
    else {
        arr.splice(index, 0, ...items);
    }
}
export function removeArrayElement(arr, index) {
    if (index === 0) {
        return arr.shift();
    }
    else if (index < 0) {
        return arr.pop();
    }
    else {
        const element = arr.splice(index, 1);
        return element[0];
    }
}
export function moveArrayElement(arr, fromIndex, toIndex) {
    const element = removeArrayElement(arr, fromIndex);
    // if this happens then there is error in the validation (or no validation) before the call
    invariant(element);
    addArrayElements(arr, toIndex, [element]);
}
/**
 * Given array and a relative index, this function will return the absolute index of that item.
 */
export function resolveRelativeIndex(arr, index) {
    invariant(index < arr.length && index >= -1);
    return index < 0 ? arr.length - 1 : index;
}
/**
 * Given array and a relative index of a new array item to place, this function will return the absolute index
 * where the new item _will be_ placed.
 */
export function resolveIndexOfNewItem(arr, index) {
    // using <= here so that we can add to the last place not only by using -1 by also by using (lastIndex+1)
    invariant(index === 0 || (index <= arr.length && index >= -1));
    return index < 0 ? arr.length : index;
}
//# sourceMappingURL=arrayOps.js.map