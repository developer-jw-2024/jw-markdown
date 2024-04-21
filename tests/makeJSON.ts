import { FileUtils } from "./FileUtil"

var languageDefinitionPath: string = `${__dirname}/../src/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/../src/RegExp.txt`

var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)

var markdownJSON = {
    languageDefinition : languageDefinition,
    tokenTypeDefinition : tokenTypeDefinition
}

var jsonString = JSON.stringify(markdownJSON)
FileUtils.writeToFileSystem(`${__dirname}/../src/markdownDefinition.ts`, 
`var definition = ${jsonString}
export { definition }
`)


