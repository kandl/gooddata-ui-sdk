// (C) 2007-2020 GoodData Corporation
import pkg from "inquirer";
const { prompt } = pkg;
import getBackend from "../backend.js";
export async function promptUsername() {
    const usernameQuestion = {
        type: "input",
        name: "username",
        message: "Enter your username:",
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
export async function promptProjectId() {
    const projects = await getBackend().workspaces().forCurrentUser().query();
    const projectChoices = [];
    for (const item of projects.items) {
        const descriptor = await item.getDescriptor();
        projectChoices.push({
            name: descriptor.title,
            value: descriptor.id,
        });
    }
    const projectQuestion = {
        type: "list",
        name: "projectId",
        message: "Choose a project:",
        choices: projectChoices,
    };
    const projectResponse = await prompt(projectQuestion);
    return projectResponse.projectId;
}
