import { MarkdownToHtmlConverter } from "../src"
import { Markdown } from "../src/MarkdownLib"
import { MarkdownSyntaxAnalyzer } from "../src/MarkdownSyntaxAnalyzer"
import { FileUtils } from "./FileUtil"
import * as html from '../src/HtmlLib'

var languageDefinitionPath: string = `${__dirname}/../src/Language.txt`
var tokenTypeDefinitionPath: string = `${__dirname}/../src/RegExp.txt`

var languageDefinition = FileUtils.readFromFileSystem(languageDefinitionPath)
var tokenTypeDefinition = FileUtils.readFromFileSystem(tokenTypeDefinitionPath)
var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer().initWithDefinition(languageDefinition, tokenTypeDefinition)

var markdownContent = `* Two`
var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(markdownContent)
var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
console.log(htmlElement.toHtmlString())
