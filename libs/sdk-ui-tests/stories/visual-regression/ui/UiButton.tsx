// (C) 2020-2024 GoodData Corporation
import { UiButton, UiButtonProps, ComponentVariants, IPropCombinations } from "@gooddata/sdk-ui-kit";
import React from "react";

import { storiesOf } from "../../_infra/storyRepository.js";
import { UiStories } from "../../_infra/storyGroups.js";
import { wrapWithTheme } from "../themeWrapper.js";

import "./styles.scss";

const sizeProp: IPropCombinations<UiButtonProps> = {
    prop: "size",
    values: ["small", "medium", "large"],
};

const isDisabledProp: IPropCombinations<UiButtonProps> = {
    prop: "isDisabled",
    values: [true],
};

const isActiveProp: IPropCombinations<UiButtonProps> = {
    prop: "isActive",
    values: [true],
};

const styleProp: IPropCombinations<UiButtonProps> = {
    prop: "style",
    values: ["primary", "secondary", "danger"],
};

const combinations = [
    {
        ...styleProp,
        combineWith: [sizeProp, isDisabledProp, isActiveProp],
        baseProps: { label: "Apply" },
    },
];

const UiButtonTest: React.FC = () => (
    <div className="library-component screenshot-target">
        <ComponentVariants combinations={combinations} Component={UiButton} showCodeSnippet={false} />
    </div>
);

storiesOf(`${UiStories}/UiButton`)
    .add("full-featured button", () => <UiButtonTest />, { screenshot: true })
    .add("themed", () => wrapWithTheme(<UiButtonTest />), { screenshot: true });
