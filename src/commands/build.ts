import * as code from "vscode"

const buildCommand = async () => {
    const folders = code.workspace.workspaceFolders
    if (folders === undefined) {
        return
    }

    code.tasks.taskExecutions
        .filter(
            (execution) => execution.task.definition.type === "bazelrio.build"
        )
        .forEach((execution) => execution.terminate())

    const task = new code.Task(
        { type: "bazelrio.build", presentation: { reveal: "silent" } },
        folders[0],
        "Build",
        "roborio",
        new code.ShellExecution("bazel build '//...:*' --copt=-std=c++17")
    )

    task.presentationOptions.reveal = code.TaskRevealKind.Silent

    code.tasks.executeTask(task)
}

export default buildCommand
