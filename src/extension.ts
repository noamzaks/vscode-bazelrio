import * as code from "vscode"
import { readdirSync } from "fs"
import { join } from "path"

export const activate = (context: code.ExtensionContext) => {
    const resources = join(context.extensionPath, "resources")

    let disposable = code.commands.registerCommand(
        "bazelrio.new-project",
        async () => {
            const type = await code.window.showQuickPick(
                ["Example", "Template"],
                { title: "Project Type" }
            )

            if (type === undefined) {
                return
            }

            const language = await code.window.showQuickPick(["Java", "C++"], {
                title: "Project Language",
            })

            if (language === undefined) {
                return
            }

            const targets = await code.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                title: "New Project Location",
            })

            if (targets === undefined) {
                return
            }

            let target = targets[0]

            if (readdirSync(target.path).length !== 0) {
                // The target directory is not empty. The user probably wants to create a subdirectory for the project.
                const name = await code.window.showInputBox({
                    title: "Enter Project Name",
                })

                if (name) {
                    target = code.Uri.file(join(target.path, name))
                }
            }

            const pick = await code.window.showQuickPick(
                readdirSync(join(resources, "templates", type, language)),
                {
                    title: type,
                }
            )
        }
    )

    context.subscriptions.push(disposable)
}

export const deactivate = () => {}
