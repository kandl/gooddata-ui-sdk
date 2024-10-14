// (C) 2024 GoodData Corporation

import React from "react";
import { UiSizeSmall, UiSizeMedium, UiSizeLarge } from "../@types/size.js";
import {
    UiStylePrimary,
    UiStyleSecondary,
    UiStyleTertiary,
    UiStylePopOut,
    UiStyleDanger,
} from "../@types/style.js";
import { bem } from "../@utils/bem.js";

/**
 * @internal
 */
export interface UiButtonProps {
    size?: UiSizeSmall | UiSizeMedium | UiSizeLarge;
    style?: UiStylePrimary | UiStyleSecondary | UiStyleTertiary | UiStylePopOut | UiStyleDanger;
    iconBefore?: React.ReactNode;
    iconAfter?: React.ReactNode;
    label: string;
    isDisabled?: boolean;
    isActive?: boolean;
    tooltip?: React.ReactNode;
    onClick?: () => void;
}

const { b } = bem("gd-kit-ui-button");

/**
 * @internal
 */
export const UiButton = ({
    size = "medium",
    style = "secondary",
    label,
    isDisabled,
    isActive,
}: UiButtonProps) => {
    return (
        <button className={b({ size, style, isActive })} disabled={isDisabled} tabIndex={0}>
            {/* <Icon.Book color="#fff" /> */}
            {label}
        </button>
    );
};
