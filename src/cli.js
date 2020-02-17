import readlineSync from 'readline-sync';
import { createProject } from './main';
import inquirer from 'inquirer';

function requestCmpName(options) {
	const cmpName = readlineSync.question('请输入项目名称? ');
	return {
		...options,
		cmpName,
	};
}
async function requestTemplateChoice(options) {
	const answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'template',
			message: 'please choose a template',
			choices: ['cmp', 'project'],
			filter: function(val) {
				return val.toLowerCase();
			},
		},
	]);

	return {
		...options,
		template: answers.template,
	};
}

export async function cli(args) {
	let options = requestCmpName(args);
	options = await requestTemplateChoice(options);
	await createProject(options);
	process.exit();
}
/**
 * 0.输入组件名
 * 1.复制模板
 * 2.npm install
 * 3.npm start
 */
