// (C) 2007-2021 GoodData Corporation
import { useResponsiveContext } from "./ResponsiveContext.js";
import { useMediaQuery as useReactResponsiveMediaQuery } from "react-responsive";
import { invariant } from "ts-invariant";
const SCREEN = "only screen";
const getQueryMatching = (range) => `${SCREEN} and (min-width:${range.lower}px) and (max-width:${range.upper}px)`;
const getQueryMatchingOrGreater = (range) => `${SCREEN} and (min-width:${range.lower}px)`;
/**
 * Hook, testing whether screen width matches provided media query.
 *
 * @internal
 * @param mediaQueryName - media query name to test
 * @returns boolean
 */
export const useMediaQuery = (mediaQueryName) => {
    const { breakpoints } = useResponsiveContext();
    const smallRange = {
        lower: 0,
        upper: breakpoints.sm,
    };
    const mediumRange = {
        lower: breakpoints.sm + 1,
        upper: breakpoints.md,
    };
    const largeRange = {
        lower: breakpoints.md + 1,
        upper: breakpoints.lg,
    };
    const xlargeRange = {
        lower: breakpoints.lg + 1,
        upper: breakpoints.xl,
    };
    const xxlargeRange = {
        lower: breakpoints.xl + 1,
        upper: breakpoints.xxl,
    };
    const desktopRange = {
        lower: xlargeRange.lower,
        upper: xxlargeRange.upper,
    };
    const smallerThanDesktop = {
        lower: 0,
        upper: largeRange.upper,
    };
    const mobileRange = smallRange;
    const notMobileRange = {
        lower: mediumRange.lower,
        upper: xxlargeRange.upper,
    };
    const mediaQueries = {
        "<sm": getQueryMatching(smallRange),
        ">=sm": getQueryMatchingOrGreater(smallRange),
        sm: getQueryMatching(smallRange),
        ">=md": getQueryMatchingOrGreater(mediumRange),
        md: getQueryMatching(mediumRange),
        ">=lg": getQueryMatchingOrGreater(largeRange),
        lg: getQueryMatching(largeRange),
        ">=xl": getQueryMatchingOrGreater(xlargeRange),
        xl: getQueryMatching(xlargeRange),
        ">=xxl": getQueryMatchingOrGreater(xxlargeRange),
        xxl: getQueryMatching(xxlargeRange),
        mobileDevice: getQueryMatching(mobileRange),
        "!mobileDevice": getQueryMatching(notMobileRange),
        desktop: getQueryMatching(desktopRange),
        "<desktop": getQueryMatching(smallerThanDesktop),
    };
    const mediaQuery = mediaQueries[mediaQueryName];
    invariant(mediaQuery, `Please provide valid media query name! Actual: ${mediaQuery}`);
    return useReactResponsiveMediaQuery({ query: mediaQuery });
};
//# sourceMappingURL=useMediaQuery.js.map