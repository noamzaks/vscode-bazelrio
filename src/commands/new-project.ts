import * as code from "vscode"
import { readdirSync } from "fs"
import { join } from "path"
import { resources } from "../extension"

const newProjectCommand = async () => {
    const type = await code.window.showQuickPick(["Example", "Template"], {
        placeHolder: "Project Type",
    })

    if (type === undefined) {
        return
    }

    const language = await code.window.showQuickPick(["Java", "C++"], {
        placeHolder: "Project Language",
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
            placeHolder: "Project Name",
        })

        if (name) {
            target = code.Uri.file(join(target.path, name))
        }
    }

    const pick = await code.window.showQuickPick(
        readdirSync(join(resources, "templates", type, language)),
        {
            placeHolder: type.substring(0, type.length),
        }
    )
}

export default newProjectCommand
