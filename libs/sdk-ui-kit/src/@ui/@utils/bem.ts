// (C) 2024 GoodData Corporation
import cx from "classnames";

/**
 * Properties for BEM modifiers.
 *
 * @internal
 */
export type StyleProps = Record<string, string | boolean>;

function toModifierToClassName(blockOrElement: string, propName: string, value: string | boolean) {
    if (typeof value === "string") {
        return `${blockOrElement}--${propName}-${value}`;
    }

    return value ? `${blockOrElement}--${propName}` : "";
}

function blockOrElementPropsToClassNames(blockOrElement: string, props: StyleProps) {
    const modifiers = Object.entries(props).map(([propName, value]) =>
        toModifierToClassName(blockOrElement, propName, value),
    );

    return cx(blockOrElement, ...modifiers);
}

/**
 * Utility function for creating BEM class names.
 *
 * Example usage:
 *
 * - const \{ b, e \} = bem("button");
 * - const className = b(\{ size: "large", isSelected: true \}); Result: "button button--size-large button--isSelected"
 * - const elementClassName = e("icon", \{ size: "large", isDisabled: true\}); Result: "button__icon button__icon--size-large button__icon--isDisabled"
 *
 * @internal
 */
export function bem(component: string) {
    return {
        /**
         * Creates a class names for BEM block.
         */
        b: (props: StyleProps) => blockOrElementPropsToClassNames(component, props),

        /**
         * Creates a class name for BEM element.
         */
        e: (element: string, props: StyleProps) =>
            blockOrElementPropsToClassNames(`${component}__${element}`, props),
    };
}
