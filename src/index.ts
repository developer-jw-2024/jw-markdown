import { MarkdownSyntaxAnalyzer } from "./MarkdownSyntaxAnalyzer"
import * as html from './HtmlLib'
import { Markdown } from "./MarkdownLib"


export class MarkdownToHtmlConverter {
    private markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer().init()

    toHtml(markdownContent : string ) : string {
        var markdown : Markdown = this.markdownSyntaxAnalyzer.toMarkddown(markdownContent)
        var htmlElement : html.HtmlElement = markdown.toHtml() as html.HtmlElement
        return htmlElement.toHtmlString()
    }
}