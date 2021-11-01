import * as code from "vscode"
import { join } from "path"
import newProjectCommand from "./commands/new-project"
import buildCommand from "./commands/build"
import { getConfiguration } from "./configuration"
import deployCommand from "./commands/deploy"

export let resources: string

export const activate = (context: code.ExtensionContext) => {
    resources = join(context.extensionPath, "resources")

    context.subscriptions.push(
        code.commands.registerCommand(
            "bazelrio.new-project",
            newProjectCommand
        ),
        code.commands.registerCommand("bazelrio.build", buildCommand),
        code.commands.registerCommand("bazelrio.deploy", deployCommand)
    )

    code.workspace.onDidSaveTextDocument(() => {
        if (getConfiguration().continuousBuild) {
            code.commands.executeCommand("bazelrio.build")
        }
    })
}

export const deactivate = () => {}
