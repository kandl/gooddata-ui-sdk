// (C) 2007-2019 GoodData Corporation
const SCREEN = "only screen";
const ZERO_BREAKPOINT = 0;
const SMALL_BREAKPOINT = 640;
const smallRange = {
    lower: ZERO_BREAKPOINT,
    upper: SMALL_BREAKPOINT,
};
const getQueryMatching = (range) => `${SCREEN} and (min-width:${range.lower}px) and (max-width:${range.upper}px)`;
const mobileRange = smallRange;
export const IS_MOBILE_DEVICE = getQueryMatching(mobileRange);
//# sourceMappingURL=MediaQueries.js.map