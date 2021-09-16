import * as code from "vscode"
import { join } from "path"
import newProjectCommand from "./commands/new-project"
import buildCommand from "./commands/build"
import Configuration, { getConfiguration } from "./configuration"

export let resources: string

export const activate = (context: code.ExtensionContext) => {
    resources = join(context.extensionPath, "resources")

    context.subscriptions.push(
        code.commands.registerCommand(
            "bazelrio.new-project",
            newProjectCommand
        ),
        code.commands.registerCommand("bazelrio.build", buildCommand)
    )

    code.workspace.onDidSaveTextDocument(() => {
        if (getConfiguration().continuousBuild) {
            code.commands.executeCommand("bazelrio.build")
        }
    })
}

export const deactivate = () => {}
