import chalk from "chalk";
import fs from "fs";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
var URL = require("url").URL;
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
            }
            
        ],
        {
            exitOnError: false
        }
    );

    await tasks.run();
    console.log("%s Project ready", chalk.green.bold("DONE"));
    console.log("please run")
    console.log(`    cd ${options.cmpName}`)
    console.log('    npm start')
    return true;
}
