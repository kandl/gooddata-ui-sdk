// (C) 2024 GoodData Corporation

import React from "react";
import { FormattedMessage } from "react-intl";

import { Dropdown, DropdownButton, DropdownList, SingleSelectListItem } from "@gooddata/sdk-ui-kit";
import { DEFAULT_DROPDOWN_ALIGN_POINTS, DEFAULT_DROPDOWN_ZINDEX } from "../../constants.js";

const DROPDOWN_WIDTH = 199;

interface IDestinationItem {
    id: string;
    title: string;
}

interface IDestinationSelectProps {
    items: IDestinationItem[];
    selectedItem: IDestinationItem | undefined;
    onChange: (item: IDestinationItem) => void;
}

export const DestinationSelect: React.FC<IDestinationSelectProps> = ({ items, selectedItem }) => {
    return (
        <div className="gd-input-component gd-destination-field s-gd-schedule-email-dialog-destination">
            <label className="gd-label">
                <FormattedMessage id="dialogs.schedule.email.destination" />
            </label>
            <Dropdown
                alignPoints={DEFAULT_DROPDOWN_ALIGN_POINTS}
                className="gd-schedule-email-dialog-destination s-gd-schedule-email-dialog-destination"
                renderButton={({ toggleDropdown }) => (
                    <DropdownButton
                        value={selectedItem?.title}
                        onClick={toggleDropdown}
                        className="gd-schedule-email-dialog-destination-button"
                    />
                )}
                renderBody={({ closeDropdown, isMobile }) => (
                    <DropdownList
                        width={DROPDOWN_WIDTH}
                        items={items}
                        isMobile={isMobile}
                        renderItem={({ item }) => (
                            <SingleSelectListItem
                                title={item.title}
                                onClick={() => {
                                    // onChange(item.id);
                                    closeDropdown();
                                }}
                                isSelected={selectedItem?.id === item.id}
                            />
                        )}
                    />
                )}
                overlayPositionType="sameAsTarget"
                overlayZIndex={DEFAULT_DROPDOWN_ZINDEX}
            />
        </div>
    );
};
