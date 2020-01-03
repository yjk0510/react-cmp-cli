import chalk from "chalk";
import fs from "fs";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import execa from "execa";
import { promisify } from "util";
var URL = require("url").URL;
import { series } from "async";
const { exec } = require("child_process");
const { projectInstall } = require("pkg-install");

const access = promisify(fs.access);
const copy = promisify(ncp);

function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.cmpName, {
        clobber: false
    });
}
async function installDeps(options) {
    const { stdout } = await projectInstall({
        prefer: "npm",
        cwd: path.resolve(process.cwd(), options.cmpName)
    });
    console.log(stdout);
}
function startProject(options) {
    // 在当前目录下的scripts文件夹里执行hexo g命令
    exec(
        "npm start",
        { cwd: path.join(process.cwd(), options.cmpName) },
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`stdout: ${stdout}`);
        }
    );
}
export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: path.resolve(process.cwd(), options.cmpName)
    };

    const templateDir = path.resolve(
        new URL(import.meta.url).pathname,
        "../../templates"
    );
    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error("%s Invalid template name", chalk.red.bold("ERROR"));
        process.exit(1);
    }

    const tasks = new Listr(
        [
            {
                title: "Copy project files",
                task: () => copyTemplateFiles(options)
            },

            {
                title: "Install dependencies",
                task: () => installDeps(options)
            },
            {
                title: "Start project",
                task: () => startProject(options)
            }
        ],
        {
            exitOnError: false
        }
    );

    await tasks.run();
    console.log("%s Project ready", chalk.green.bold("DONE"));
    return true;
}
