// (C) 2007-2023 GoodData Corporation
import React from "react";
import { render } from "@testing-library/react";

import { CoreBubbleChart } from "../CoreBubbleChart.js";
import { dummyBackend } from "@gooddata/sdk-backend-mockingbird";
import { prepareExecution } from "@gooddata/sdk-backend-spi";
import { emptyDef } from "@gooddata/sdk-model";
import { BaseChart } from "../../_base/BaseChart.js";
import { vi } from "vitest";

/**
 * This mock enables us to test props as parameters of the called chart function
 */
vi.mock("../../_base/BaseChart", () => ({
    BaseChart: vi.fn(() => null),
}));

describe("CoreBubbleChart", () => {
    it("should render BaseChart", () => {
        render(<CoreBubbleChart execution={prepareExecution(dummyBackend(), emptyDef("testWorkspace"))} />);
        expect(BaseChart).toHaveBeenCalled();
    });
});
