// (C) 2007-2022 GoodData Corporation
import pkg from "inquirer";
const { prompt } = pkg;
import { applicationNameValidator } from "../inputHandling/validators.js";
export async function promptName(object = "application") {
    const question = {
        message: `Enter ${object} name:`,
        name: "name",
        type: "input",
        validate: applicationNameValidator,
    };
    const response = await prompt(question);
    return response.name;
}
export async function promptLanguage() {
    const question = {
        message: "Select programming language that you want to use in your application:",
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
export async function promptTemplate() {
    const question = {
        message: "Select template that you want to use for your project:",
        name: "template",
        type: "list",
        choices: [
            {
                name: "React Application",
                value: "react-app",
            },
        ],
    };
    const response = await prompt(question);
    return response.template;
}
//# sourceMappingURL=prompts.js.map