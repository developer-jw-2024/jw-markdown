import { MarkdownToHtmlConverter } from "../src"

var markdownToHtmlConverter : MarkdownToHtmlConverter = new MarkdownToHtmlConverter()
console.log(markdownToHtmlConverter.toHtml(`1. abc`))