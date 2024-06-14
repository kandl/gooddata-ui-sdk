// (C) 2024 GoodData Corporation
import { JsonApiAutomationOutWithLinks } from "@gooddata/api-client-tiger";
import { IAutomationMdObject } from "@gooddata/sdk-model";

export function convertAutomation(automation: JsonApiAutomationOutWithLinks): IAutomationMdObject {
    const { id, attributes = {}, relationships = {} } = automation;
    const {
        title,
        description,
        tags,
        schedule,
        // createdAt,
        // modifiedAt,
    } = attributes;

    // const {
    //     createdBy,
    //     modifiedBy
    // } = relationships;

    const webhook = relationships?.notificationChannel?.data?.id;
    const exportDefinitions = relationships?.exportDefinitions?.data?.map((ed) => ed.id) ?? [];
    const recipients = relationships?.recipients?.data?.map((r) => r.id) ?? [];

    return {
        type: "automation",
        id,
        title,
        description,
        tags,
        //
        schedule,
        //
        exportDefinitions,
        recipients,
        webhook,
        //
        // created,
        // createdBy,
        // updated,
        // updatedBy,
    };
}
