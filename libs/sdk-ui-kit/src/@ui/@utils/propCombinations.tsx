// (C) 2020-2024 GoodData Corporation
import React from "react";

/**
 * @internal
 */
export interface IPropCombinations<TProps extends object> {
    prop: keyof TProps;
    values: TProps[keyof TProps][];
    combineWith?: IPropCombinations<TProps>[];
    baseProps?: Partial<TProps>;
}

/**
 * Utility function for rendering component multiple times with different props.
 * Mainly for development and testing usage.
 *
 * @internal
 */
export function propCombinations<T extends object>(input: IPropCombinations<T>, baseProps?: Partial<T>): T[] {
    const { prop, values, combineWith } = input;
    const result: Partial<T>[] = [];

    for (const value of values) {
        const baseVariant: Partial<T> = { ...(baseProps || {}), [prop]: value };

        if (combineWith && combineWith.length > 0) {
            for (const cw of combineWith) {
                const subVariants = propCombinations<T>(cw);
                for (const subVariant of subVariants) {
                    result.push({ ...baseVariant, ...subVariant });
                }
            }
        } else {
            result.push(baseVariant);
        }
    }

    return result as T[];
}

/**
 * @internal
 */
export interface IComponentVariantsProps<TProps extends object> {
    combinations: IPropCombinations<TProps>[];
    Component: React.ComponentType<TProps>;
    showCodeSnippet?: boolean;
}

/**
 * @internal
 */
export function ComponentVariants<TProps extends object>({
    combinations,
    Component,
}: IComponentVariantsProps<TProps>) {
    const variants = combinations.flatMap((c) => propCombinations(c, c.baseProps));

    return (
        <>
            {variants.map((props, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            padding: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <div style={{ width: "50%" }}>
                            <Component {...props} />
                        </div>
                        <div style={{ width: "50%" }}>
                            <CodeSnippet component="UiButton" props={props} />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

function CodeSnippet({ component, props }: { component: string; props: object }) {
    const renderProp = (key: string, value: string | boolean) => {
        if (typeof value === "string") {
            return `${key}="${value}"`;
        }

        return `${key}={${value}}`;
    };

    const propList = Object.entries(props).map(([key, value]) => renderProp(key, value));

    return (
        <code style={{ whiteSpace: "pre", display: "block", fontSize: 10 }}>
            {`<${component}
    ${propList.join("\n    ")}
/>`}
        </code>
    );
}
