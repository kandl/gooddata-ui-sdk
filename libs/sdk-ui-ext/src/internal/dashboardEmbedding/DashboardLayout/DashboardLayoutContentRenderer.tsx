// (C) 2007-2020 GoodData Corporation
import React, { CSSProperties } from "react";
import cx from "classnames";
import { IDashboardViewLayoutContentRenderProps } from "./interfaces/dashboardLayoutComponents";
// import { isDashboardLayoutContent } from "./interfaces/dashboardLayout";
// import { UnexpectedError } from "@gooddata/sdk-backend-spi";

export function DashboardLayoutContentRenderer<TCustomContent>(
    props: IDashboardViewLayoutContentRenderProps<TCustomContent>,
): JSX.Element {
    const {
        column,
        screen,
        debug,
        className,
        contentRef,
        isResizedByLayoutSizingStrategy,
        minHeight,
        height,
        allowOverflow,
        children,
    } = props;

    const { heightAsRatio } = column.size()[screen];

    // TODO: RAIL-2869
    const style = React.useMemo(() => {
        const computedStyle: CSSProperties = {
            minHeight,
            height,
        };

        if (allowOverflow) {
            computedStyle.overflowX = "hidden";
            computedStyle.overflowY = "auto";
        }

        if (debug) {
            if (!heightAsRatio) {
                computedStyle.outline = "solid 1px yellow";
            } else {
                computedStyle.border = isResizedByLayoutSizingStrategy
                    ? "dashed 1px #d6d6d6"
                    : "solid 1px green";
            }
        }

        return computedStyle;
    }, [heightAsRatio, debug, screen, height, minHeight, isResizedByLayoutSizingStrategy]);

    return (
        <div ref={contentRef} className={cx("gd-fluidlayout-column-container", className)} style={style}>
            {children}
        </div>
    );
}
