import { MarkdownSyntaxAnalyzer } from '../src/MarkdownSyntaxAnalyzer'
import { regexp } from 'ts-parser-generator'
import { FileUtils } from './FileUtil'
// var url = FileUtils.readFromFileSystem('./tests/url')
// var regExp : regexp.RegularExpression = new regexp.RegularExpression().initWtihRegularExpression(url)
// console.log(regExp.test("/assets/images/san-juan-mountains.jpg "))
//         expect(regExp.test("a")).toBe(false)
var str = `<code>{ my code }</code>`
var markdown: MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer().init()
// var tokens = markdown.lrSyntaxAnalyzerRunner.lrSyntaxAnalyzer.toTokensWithTokenTypeLexicalAnalyzer(str)
// console.log(tokens)
var result = markdown.isValid(str, true)
console.log(result)