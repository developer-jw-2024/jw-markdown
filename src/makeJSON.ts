import { utils } from "ts-parser-generator";

var languageDefinitionPath: string = `${__dirname}/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/RegExp.txt`

var languageDefinition = utils.FileUtil.FileUtils.readFromFileSystem(languageDefinitionPath)
var tokenTypeDefinition = utils.FileUtil.FileUtils.readFromFileSystem(tokenTypeDefinitionPath)

var markdownJSON = {
    languageDefinition : languageDefinition,
    tokenTypeDefinition : tokenTypeDefinition
}

var jsonString = JSON.stringify(markdownJSON)
utils.FileUtil.FileUtils.writeToFileSystem(`${__dirname}/markdownDefinition.ts`, 
`var definition = ${jsonString}
export { definition }
`)


