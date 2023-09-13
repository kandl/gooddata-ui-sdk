// (C) 2007-2022 GoodData Corporation
import pkg from "inquirer";
const { prompt } = pkg;
import { createHostnameValidator, pluginNameValidator } from "../inputHandling/validators.js";
import { sanitizeHostname } from "../inputHandling/sanitizers.js";
export async function promptUsername(wording = "username") {
    const usernameQuestion = {
        type: "input",
        name: "username",
        message: `Enter your ${wording}:`,
    };
    const usernameResponse = await prompt(usernameQuestion);
    return usernameResponse.username;
}
export async function promptPassword() {
    const passwordQuestion = {
        type: "password",
        name: "password",
        message: "Enter your password:",
    };
    const passwordResponse = await prompt(passwordQuestion);
    return passwordResponse.password;
}
export async function promptApiToken() {
    const tokenQuestion = {
        type: "input",
        name: "token",
        message: "Enter your API token:",
    };
    const tokenResponse = await prompt(tokenQuestion);
    return tokenResponse.token;
}
export async function promptWorkspaceId(choices) {
    const question = {
        type: "list",
        name: "id",
        message: `Choose a workspace:`,
        choices,
    };
    const response = await prompt(question);
    return response.id;
}
export async function promptWorkspaceIdWithoutChoice() {
    const question = {
        type: "input",
        name: "id",
        message: `Enter identifier of a workspace to use during plugin development:`,
    };
    const response = await prompt(question);
    return response.id;
}
export async function promptDashboardIdWithoutChoice(wording) {
    const question = {
        type: "input",
        name: "id",
        message: wording,
    };
    const response = await prompt(question);
    return response.id;
}
export async function promptName(object = "dashboard plugin") {
    const question = {
        message: `Enter ${object} name:`,
        name: "name",
        type: "input",
        validate: pluginNameValidator,
    };
    const response = await prompt(question);
    return response.name;
}
export async function promptHostname(backend) {
    if (backend === "bear") {
        const question = {
            message: "Select GoodData platform hostname:",
            name: "hostname",
            type: "list",
            choices: [
                {
                    value: "https://secure.gooddata.com",
                },
                {
                    value: "https://salesengineering.na.gooddata.com",
                },
                {
                    name: "I have a custom hostname",
                    value: "WHITE_LABELLED",
                },
            ],
        };
        const response = await prompt(question);
        if (response.hostname !== "WHITE_LABELLED") {
            return response.hostname;
        }
    }
    const displayName = backend === "bear" ? "GoodData platform" : "GoodData Cloud or Gooddata.CN";
    const question = {
        message: `Enter ${displayName} hostname:`,
        name: "hostname",
        type: "input",
        validate: createHostnameValidator(backend),
    };
    const response = await prompt(question);
    return sanitizeHostname(response.hostname);
}
export async function promptBackend() {
    const question = {
        message: "Select backend type that you use:",
        name: "backend",
        type: "list",
        choices: [
            {
                name: "GoodData platform (codename 'Bear')",
                value: "bear",
            },
            {
                name: "GoodData Cloud or Gooddata.CN (codename 'Tiger')",
                value: "tiger",
            },
        ],
    };
    const response = await prompt(question);
    return response.backend;
}
export async function promptLanguage() {
    const question = {
        message: "Select programming language that you want to use in your plugin:",
        name: "language",
        type: "list",
        choices: [
            {
                name: "TypeScript",
                value: "ts",
            },
            {
                name: "JavaScript",
                value: "js",
            },
        ],
    };
    const response = await prompt(question);
    return response.language;
}
export async function promptPluginParameters(originalParameters) {
    const question = {
        message: "A text editor specified will now open and let you enter parameters for the plugin." +
            "This is how you can configure how your plugin behaves on the workspace. Save and exit editor when done.",
        name: "parameters",
        type: "editor",
        default: originalParameters,
    };
    const response = await prompt(question);
    return response.parameters;
}
//# sourceMappingURL=prompts.js.map