import fs from 'fs-extra'
import Inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'child_process'
import { getGroupsInfo } from '../api/index.js'
import { loading } from '../utils/index.js'

// esmodule 获取当前目录路径
const __dirname = dirname(fileURLToPath(import.meta.url))

async function create(projectName, options) {
    // 获取当前工作目录
    const cwd = process.cwd()
    // 拼接得到项目目录
    const targetDirectory = join(cwd, projectName)
    // 判断目录是否存在
    if (fs.existsSync(targetDirectory)) {
        // 判断是否使用 --force 参数
        if (options.force) {
            // 删除重名目录(remove是个异步方法)
            await fs.remove(targetDirectory)
        } else {
            let { isOverwrite } = await new Inquirer.prompt([
                // 返回值为promise
                {
                    name: 'isOverwrite', // 与返回值对应
                    type: 'list', // list 类型
                    message: 'Target directory exists, Please choose an action',
                    choices: [
                        { name: 'Overwrite', value: true },
                        { name: 'Cancel', value: false },
                    ],
                },
            ])
            // 选择 Cancel
            if (!isOverwrite) {
                return
            } else {
                // 选择 Overwirte ，先删除掉原有重名目录
                await fs.remove(targetDirectory)
            }
        }
    }
    // 获取模板库数据
    const repoList = []
    const { data } = await loading('getting templates, please wait', getGroupsInfo)
    data.forEach(item => {
        const repo = {}
        repo.name = `${item.name} (${item.description})`
        repo.value = item.http_url_to_repo
        repoList.push(repo)
    })
    

    // 选取模板信息
    let { repo } = await new Inquirer.prompt([
        {
            name: 'repo',
            type: 'list',
            message: 'Please choose a template',
            choices: repoList,
        }
    ])

    // 下载模板提示
    const spinner = ora('downloading template, please wait')
    spinner.start()

    // 拉取仓库模板
    const option = { stdio : 'pipe' } // 静默模式
    execSync(`git clone -b master ${repo} ${join(cwd, projectName)}`, option)

    // 移除.git 文件
    const gitFile = join(cwd, projectName + '/.git')
    if (fs.existsSync(gitFile)) {
        fs.removeSync(gitFile)
        execSync(`cd ${join(cwd, projectName)} && git init`, option)
    }
    

    // 对模板文件进行处理 package.json index.html
    const packageFile = join(cwd, projectName + '/package.json')
    if (fs.existsSync(packageFile)) {
        const packData = fs.readJSONSync(packageFile)
        packData.name = projectName
        fs.writeFileSync(packageFile, JSON.stringify(packData, null, 4))
    }
    

    const htmlFile = join(cwd, projectName + '/index.html')
    if (fs.existsSync(htmlFile)) {
        const htmlData = fs.readFileSync(htmlFile)
        fs.writeFileSync(htmlFile, htmlData.toString('utf8').replace('<title>Vite App</title>', `<title>${ projectName }</title>`))
    }
    

    spinner.succeed()
    console.log(`\r\nSuccessfully created project ${chalk.cyan(projectName)}\r\n`)
    console.log(`cd ${chalk.cyan(projectName)}\r\n`)
    console.log('npm install\r\n')
    console.log('npm run dev\r\n')

}

export default create
