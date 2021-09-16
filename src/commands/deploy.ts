import * as code from "vscode"

const deployCommand = () => {
    const folders = code.workspace.workspaceFolders
    if (folders === undefined) {
        return
    }

    code.tasks.executeTask(
        new code.Task(
            { type: "build", task: "roborio" },
            folders[0],
            "Deploy",
            "roborio",
            new code.ShellExecution("bazel run robot.deploy")
        )
    )
}

export default deployCommand
