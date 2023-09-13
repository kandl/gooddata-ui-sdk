// (C) 2007-2021 GoodData Corporation
import isNull from "lodash/isNull.js";
import { HYPHEN } from "./format.js";
export const LIMIT = 999;
function getTrend(prev, curr) {
    const previous = prev || 0;
    const current = curr || 0;
    if (previous === current) {
        return "neutral";
    }
    else if (previous < current) {
        return "up";
    }
    return "down";
}
function isTrendPositive(trend, meaning) {
    const isPositiveGrowing = trend === "up" && meaning === "growIsGood";
    const isPositiveFalling = trend === "down" && meaning === "growIsBad";
    return isPositiveGrowing || isPositiveFalling;
}
function isTrendNegative(trend, meaning) {
    const isNegativeGrowing = trend === "up" && meaning === "growIsBad";
    const isNegativeFalling = trend === "down" && meaning === "growIsGood";
    return isNegativeGrowing || isNegativeFalling;
}
function getMeaning(trend, meaning) {
    if (trend === "neutral") {
        return "neutral";
    }
    else if (isTrendPositive(trend, meaning)) {
        return "positive";
    }
    else if (isTrendNegative(trend, meaning)) {
        return "negative";
    }
    return "neutral";
}
function getPercentageValue(prev, curr) {
    const previous = prev || 0;
    const current = curr || 0;
    if (previous === 0 && current > 0) {
        return Number.POSITIVE_INFINITY;
    }
    else if (previous === 0 && current < 0) {
        return Number.NEGATIVE_INFINITY;
    }
    else if (previous === 0 && current === 0) {
        return 0;
    }
    const percent = Math.abs(previous / 100);
    const change = current - previous;
    return Math.round(change / percent);
}
function getPercentage(previous, current) {
    if (isNull(previous) && isNull(current)) {
        return HYPHEN;
    }
    const percentageValue = getPercentageValue(previous, current);
    const isOverLimit = percentageValue > LIMIT;
    const isUnderLimit = percentageValue < -LIMIT;
    if (isOverLimit) {
        return `>${LIMIT}%`;
    }
    else if (isUnderLimit) {
        return `<${-LIMIT}%`;
    }
    return `${percentageValue}%`;
}
export function getPopInfo(previous, current, meaning) {
    const trend = getTrend(previous, current);
    const trendMeaning = getMeaning(trend, meaning);
    const percentage = getPercentage(previous, current);
    return {
        trend,
        meaning: trendMeaning,
        percentage,
    };
}
export function getErrorPopInfo() {
    return {
        trend: "neutral",
        meaning: "neutral",
        percentage: HYPHEN,
    };
}
//# sourceMappingURL=pop.js.map