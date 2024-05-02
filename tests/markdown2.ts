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

var markdownContent = FileUtils.readFromFileSystem(`${__dirname}/markdown2.txt`)
var markdown : Markdown = markdownSyntaxAnalyzer.toMarkddown(markdownContent, true)
// console.log(markdown.toMarkdownHierarchy())
var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
var htmlContent = htmlElement.toHtmlString()
FileUtils.writeToFileSystem('./test.html', htmlContent)
console.log(
    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww" crossorigin="anonymous">`+
    htmlContent)
