// (C) 2024 GoodData Corporation
import {
    JsonApiAutomationOutIncludes,
    JsonApiAutomationOutList,
    JsonApiAutomationOutWithLinks,
    JsonApiExportDefinitionOutWithLinks,
} from "@gooddata/api-client-tiger";
import { IAutomationMetadataObject, idRef } from "@gooddata/sdk-model";
import { convertExportDefinitionMdObject as convertExportDefinitionMdObjectFromBackend } from "./ExportDefinitionsConverter.js";
import compact from "lodash/compact.js";
import { convertUserIdentifier } from "./UsersConverter.js";

export function convertAutomation(
    automation: JsonApiAutomationOutWithLinks,
    included: JsonApiAutomationOutIncludes[],
): IAutomationMetadataObject {
    const { id, attributes = {}, relationships = {} } = automation;
    const { title, description, tags, schedule, createdAt, modifiedAt } = attributes;
    const { createdBy, modifiedBy } = relationships;

    const webhook = relationships?.notificationChannel?.data?.id;
    const exportDefinitionsIds = relationships?.exportDefinitions?.data?.map((ed) => ed.id) ?? [];
    const includedExportDefinitions = compact(
        exportDefinitionsIds.map((exportDefinitionId) =>
            included.find((i) => i.type === "exportDefinition" && i.id === exportDefinitionId),
        ),
    );

    // TODO: including auditable info etc?
    const exportDefinitions = includedExportDefinitions.map((ed) =>
        convertExportDefinitionMdObjectFromBackend(ed as JsonApiExportDefinitionOutWithLinks),
    );
    const recipients = relationships?.recipients?.data?.map((r) => r.id) ?? [];

    return {
        type: "automation",
        id,
        title: title ?? "",
        description: description ?? "",
        tags,
        //
        schedule,
        //
        exportDefinitions,
        recipients,
        webhook,

        // TODO: remove legacy props
        attachments: [],
        body: "",
        subject: "",
        to: [],
        unlisted: false,
        when: {
            recurrence: "",
            startDate: "",
            timeZone: "",
        },
        created: createdAt ?? "",
        createdBy: convertUserIdentifier(createdBy, included),
        updated: modifiedAt ?? "",
        updatedBy: convertUserIdentifier(modifiedBy, included),

        production: true,
        deprecated: false,
        ref: idRef(id, "automation"),
        uri: id,
    };
}

export const convertAutomationListToAutomations = (
    automationList: JsonApiAutomationOutList,
): IAutomationMetadataObject[] => {
    return automationList.data.map((automationObject) =>
        convertAutomation(automationObject, automationList.included ?? []),
    );
};
