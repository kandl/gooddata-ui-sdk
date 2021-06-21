// (C) 2019-2021 GoodData Corporation
import React from "react";
import { shallow } from "enzyme";
import { noop } from "lodash";

import { DrillDialog, IDrillModalDialogProps } from "../DrillDialog";
import { createIntlMock } from "../../../../modules/Core/utils/translations";

function renderDrillModalDialog(customProps: IDrillModalDialogProps) {
    return shallow(<DrillDialog {...customProps} intl={createIntlMock()} />);
}

const requiredDrillModalProps: IDrillModalDialogProps = {
    title: "test",
    drillTargetAttributeTitle: [],
    onCloseDialog: () => noop,
    onResetDrillVisualisation: () => {},
};

describe("DrillModalContent", () => {
    it("should show back button when isBackButtonVisible is true", () => {
        const component = renderDrillModalDialog({
            ...requiredDrillModalProps,
            isBackButtonVisible: true,
        });

        expect(component.find(".gd-drill-reset-button").exists()).toBeTruthy();
    });
});
