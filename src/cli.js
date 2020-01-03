import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";
import readlineSync from "readline-sync";
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
}
/**
 * 0.输入组件名
 * 1.复制模板
 * 2.npm install
 * 3.npm start
 */
