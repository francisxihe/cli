import chalk from 'chalk';
import fs from 'fs-extra';

const version = fs.readJSONSync('packages/cli/package.json').version;

const helper = (args) => {
    if (args.list) {
        console.log('--list--');
        process.exit(0);
    } else if (args.version) {
        console.log(
            chalk.green(`cfa version: ${version}`),
        );
        process.exit(0);
    } else {
        console.log(`
Usage: ${chalk.green('cfa')} ${chalk.green('<command>')}

Options:
    ${chalk.green('--help')}            Show this message.
    ${chalk.green('--list')}            List all available commands.
    ${chalk.green('--version')}         Show version.

    ${chalk.green('<project-name>')}    Create a new project.
        `);
        process.exit(0);
    }
};

export default helper;
