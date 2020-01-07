import readlineSync from "readline-sync";
import { createProject } from "./main";
function requestCmpName(options) {
    const cmpName = readlineSync.question("请输入项目名称? ");
    return {
        ...options,
        cmpName
    };
}

export async function cli(args) {
    let options = requestCmpName(args);
    await createProject(options);
    process.exit()
}
/**
 * 0.输入组件名
 * 1.复制模板
 * 2.npm install
 * 3.npm start
 */
