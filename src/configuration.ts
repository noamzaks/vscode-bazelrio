import * as code from "vscode"

export default interface Configuration {
    continuousBuild: boolean
}

export const getConfiguration = (): Configuration => {
    return code.workspace.getConfiguration().get("bazelRIO") as Configuration
}
