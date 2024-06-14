// (C) 2024 GoodData Corporation
import { JsonApiAutomationIn } from "@gooddata/api-client-tiger";
import { IAutomationMdObject, IAutomationMdObjectDefinition } from "@gooddata/sdk-model";

export function convertAutomation(
    automation: IAutomationMdObject | IAutomationMdObjectDefinition,
): JsonApiAutomationIn {
    const { type, description, exportDefinitions, recipients, schedule, tags, title, webhook } = automation;

    return {
        type,
        id: (automation as IAutomationMdObject).id,
        attributes: {
            title,
            description,
            tags,
            schedule,
        },
        relationships: {
            exportDefinitions: exportDefinitions?.length
                ? {
                      data: exportDefinitions?.map((ed) => ({ type: "exportDefinition", id: ed })) ?? [],
                  }
                : undefined,
            recipients: recipients?.length
                ? {
                      data: recipients?.map((r) => ({ type: "user", id: r })) ?? [],
                  }
                : undefined,
            notificationChannel: webhook
                ? {
                      data: { type: "notificationChannel", id: webhook },
                  }
                : undefined,
        },
        //
        //
        //
        // created,
        // createdBy,
        // updated,
        // updatedBy,
    };
}
