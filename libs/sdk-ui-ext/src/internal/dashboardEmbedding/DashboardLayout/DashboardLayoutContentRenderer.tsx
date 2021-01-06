// (C) 2007-2020 GoodData Corporation
import React, { CSSProperties } from "react";
import cx from "classnames";
import { IDashboardViewLayoutContentRenderProps } from "./interfaces/dashboardLayoutComponents";
import { isDashboardLayoutContent } from "./interfaces/dashboardLayout";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";

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
        children,
    } = props;
    const content = column.content();

    if (!isDashboardLayoutContent(content)) {
        throw new UnexpectedError(
            "Cannot render unrecognized layout content! Please check your contentRenderer.",
        );
    }

    const { heightAsRatio, widthAsGridColumnsCount } = column.size()[screen];

    const style = React.useMemo(() => {
        let computedStyle: CSSProperties = {};
        // Render content without ratio
        if (!heightAsRatio) {
            const debugStyle = debug ? { outline: "solid 1px yellow" } : {};
            computedStyle = {
                minHeight,
                ...debugStyle,
            };
        } else {
            // Render content with ratio
            const baseDebugStyle = isResizedByLayoutSizingStrategy
                ? { border: "dashed 1px #d6d6d6" }
                : { border: "solid 1px green" };
            const debugStyle = debug ? baseDebugStyle : {};
            computedStyle = {
                height,
                overflowY: "auto",
                overflowX: "hidden",
                ...debugStyle,
            };
        }

        return computedStyle;
    }, [
        heightAsRatio,
        debug,
        widthAsGridColumnsCount,
        screen,
        height,
        minHeight,
        isResizedByLayoutSizingStrategy,
    ]);

    return (
        <div ref={contentRef} className={cx("gd-fluidlayout-column-container", className)} style={style}>
            {children}
        </div>
    );
}
