// (C) 2024 GoodData Corporation
import { JsonApiAutomationIn } from "@gooddata/api-client-tiger";
import { IAutomationMetadataObject, IAutomationMetadataObjectDefinition } from "@gooddata/sdk-model";
import omitBy from "lodash/omitBy.js";
import isEmpty from "lodash/isEmpty.js";

export function convertAutomation(
    automation: IAutomationMetadataObject | IAutomationMetadataObjectDefinition,
    exportDefinitionIds?: string[],
): JsonApiAutomationIn {
    const { type, description, schedule, tags, title, recipients, webhook } = automation;
    const relationships = omitBy(
        {
            exportDefinitions: exportDefinitionIds?.length
                ? {
                      data:
                          exportDefinitionIds?.map((exportDefinitionId) => ({
                              type: "exportDefinition",
                              id: exportDefinitionId,
                          })) ?? [],
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
        isEmpty,
    );

    const hasRelationships = !isEmpty(relationships);

    const attributes = omitBy(
        {
            title,
            description,
            tags,
            schedule,
        },
        isEmpty,
    );

    return {
        type,
        id: (automation as IAutomationMetadataObject).id,
        attributes,
        ...(hasRelationships
            ? {
                  relationships,
              }
            : {}),

        //
        // TODO: mapping
        // created,
        // createdBy,
        // updated,
        // updatedBy,
    };
}
