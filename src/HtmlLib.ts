import {encode} from 'html-entities'
import { utils } from "ts-parser-generator"
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');


// Set up MathJax
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({ packages: AllPackages });
const svg = new SVG({ fontCache: 'none' });
const mathjaxDocument = mathjax.document('', { InputJax: tex, OutputJax: svg });


export class HtmlElement {
    children : Array<HtmlElement> = []

    getChilden() : Array<HtmlElement> {
        return this.children
    }

    addChild(child : HtmlElement) {
        this.children.push(child)
    }

    setChildren(children : Array<HtmlElement>) {
        this.children = children
    }

    init(fieldName : string , value : any) : HtmlElement {
        this[fieldName] = value
        return this
    }

    initChildren(value : any) : HtmlElement {
        return this.init('children', value)
    }

    isEqual(other : HtmlElement) : boolean {
        if (this.getClass()!=other.getClass()) return false
        if (this.getChilden().length!=other.getChilden().length) return false
        var len = this.getChilden().length
        var flag : boolean = true
        for (var i=0;flag && i<len;i++) {
            flag = this.getChilden()[i].isEqual(other.getChilden()[i])
        }
        return flag
    }

    getClass() : any {
        return (this as object).constructor
    }

    buildBeginHtmlString(tagName : string, propertyValues : string[] = []) {
        var properties : string[] = [tagName]
        for (var i=0;i<propertyValues.length;i+=2) {
            var name : string = propertyValues[i]
            var value : string = propertyValues[i+1]
            if (value!=null) {
                properties.push(`${name}="${value}"`)
            } else {
                properties.push(`${name}`)
            }
        }
        return `<${properties.join(' ')}>`
    }
    
    buildEndHtmlString(tagName : string) {
        var properties : string[] = [`/${tagName}`]
        return `<${properties.join(' ')}>`
    }

    toHtmlString(intent : string = '') : string {
        throw new Error('not implement toHtmlString')
    }

    buildChildrenHtmlString(intent?: string, splitter : string = '\n'): string {
        return this.getChilden().map((c:HtmlElement)=>{
            return c.toHtmlString(intent)
        }).join(splitter)
    }
}

export class HtmlRoot extends HtmlElement {
    toHtmlString(intent : string=''): string {
        return this.buildChildrenHtmlString(intent)
    }
}
export class Blockquote extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('blockquote')
        var endTag : string = intent + this.buildEndHtmlString('blockquote')
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class HtmlStringElement extends HtmlElement {
    value : string

    constructor(value : string) {
        super()
        this.value = value
    }

    getValue() : string {
        return this.value
    }

    setValue(value : string) {
        this.value = value
    }

    isEqual(other : HtmlStringElement) : boolean {
        if (!super.isEqual(other)) return false
        if (this.value!=other.getValue()) return false
        return true
    }

    toHtmlString(intent : string = ''): string {
        return encode(this.value)
    }
}
export class HtmlValueElement extends HtmlElement {
    value : HtmlElement

    constructor(value : HtmlElement) {
        super()
        this.value = value
    }

    getValue() : HtmlElement {
        return this.value
    }

    setValue(value : HtmlElement) {
        this.value = value
    }

    initValue(value : any) : HtmlElement {
        return this.init('value', value)
    }


    isEqual(other : HtmlValueElement) : boolean {
        if (!super.isEqual(other)) return false
        if (!this.value.isEqual(other.getValue())) return false
        return true
    }
}

export class ErrorHtmlElement extends HtmlStringElement {}


export class NullHtmlElement extends HtmlElement {}
export var NullHtmlInstance : NullHtmlElement = new NullHtmlElement()

export class Text extends HtmlStringElement {}
export class FencedCodeBlockText extends HtmlStringElement {
    toHtmlString(intent : string = ''): string {
        // return encode(this.value).split('\n').map(x=>intent+x).join('\n')
        var lines = encode(this.value).split('\n')
        var language = lines[0].trim().substring(3)
        var content = lines.slice(1, lines.length-1).join('\n')
        return `${intent}<pre><code class="${language}">\n${content}\n${intent}</code></pre>`
    }
}
export class DollarSignText extends HtmlStringElement {
    toHtmlString(intent : string = ''): string {
        const equation = this.value
        const node = mathjaxDocument.convert(equation, { display: true });
        
        const svgOutput = adaptor.outerHTML(node);
        return svgOutput
        // return equation
    }

}
export class DoubleDollarSignText extends HtmlStringElement {
    toHtmlString(intent : string = ''): string {
        const equation = this.value
        const node = mathjaxDocument.convert(equation, { display: true });
        const svgOutput = adaptor.outerHTML(node);
        return "<div>"+svgOutput+"</div>"
        // return equation
    }
}
export class HorizontalRule extends HtmlStringElement {
    toHtmlString(intent : string = ''): string {
        return intent+"<hr>"
    }
}
export class BacktickText extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '<code>'+this.buildChildrenHtmlString('', '')+'</code>'
    }
}
export class DoubleBacktickText extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '<code>'+this.buildChildrenHtmlString('', '')+'</code>'
    }
}

export class Spaces extends HtmlStringElement {}

export class Paragraph extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return intent+'<p>'+this.buildChildrenHtmlString('', '<br/>')+'</p>'
    }
}
export class Sentence extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return this.buildChildrenHtmlString('', '')
    }
}
export class PlainText extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return this.buildChildrenHtmlString('', '')
    }
}
export class TaskList extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('div', ['class', 'taskList'])
        var endTag : string = intent + this.buildEndHtmlString('div')
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ', '\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class TaskListItem extends HtmlElement {
    checked : boolean
    value : HtmlElement

    constructor(checked : boolean, value : HtmlElement) {
        super()
        this.checked = checked
        this.value = value
    }

    toHtmlString(intent : string=''): string {
        var inputProperties : string[] = ['type', 'checkbox']
        if (this.checked) {
            inputProperties.push('checked')
            inputProperties.push(null)
        }
        var input : string = intent + this.buildBeginHtmlString('input', inputProperties)
        var label : string = intent + this.buildBeginHtmlString('label', [])+this.value.toHtmlString('')+this.buildEndHtmlString('label')
        return [input , label].join('\n')
    }
}
export class BlankLine extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return intent + '<br/>'
    }
}
export class ItalicText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('em')
        var endTag : string = this.buildEndHtmlString('em')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}
export class BoldText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('strong')
        var endTag : string = this.buildEndHtmlString('strong')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}


export class StrikethroughText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('span', ['class', 'strikethroughText'])
        var endTag : string = this.buildEndHtmlString('span')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}

export class HighlightText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('span', ['class', 'highlightText'])
        var endTag : string = this.buildEndHtmlString('span')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}

export class SubscriptText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('span', ['class', 'subscriptText'])
        var endTag : string = this.buildEndHtmlString('span')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}

export class SuperscriptText extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('span', ['class', 'superscriptText'])
        var endTag : string = this.buildEndHtmlString('span')
        var innerHtml : string = this.buildChildrenHtmlString('', '')
        return [beginTag, innerHtml, endTag].join('')
    }
}

export class Image extends HtmlElement {
    alt : string | null
    url : string
    title : string | null

    constructor(url : string, alt : string |  null = null, title : string | null = null) {
        super()
        this.url = url
        this.alt = alt
        this.title = title
    }

    toHtmlString(intent : string = ''): string {
        var imageProperties : string[] = ['src', this.url]
        if (this.title!=null) {
            imageProperties.push('title')
            imageProperties.push(this.title)
        }
        if (this.alt!=null) {
            imageProperties.push('alt')
            imageProperties.push(this.alt)
        }

        var beginTag : string = this.buildBeginHtmlString(`img`, imageProperties)
        return beginTag
    }
}

export class Link extends HtmlElement {
    alt : HtmlElement
    url : string
    title : string | null

    constructor(alt : HtmlElement, url : string, title : string | null = null) {
        super()
        this.alt = alt
        this.url = url
        this.title = title
    }

    toHtmlString(intent : string = ''): string {
        var linkProperties : string[] = ['href', this.url]
        if (this.title!=null) {
            linkProperties.push('title')
            linkProperties.push(this.title)
        }
        var beginTag : string = this.buildBeginHtmlString(`a`, linkProperties)
        var endTag : string = this.buildEndHtmlString(`a`)
        var innerHtml : string = this.alt==null?'':this.alt.toHtmlString()
        return [beginTag, innerHtml, endTag].join('')
    }
}
export class Heading extends HtmlElement {
    level : number
    content : HtmlElement

    constructor(level : number, content : HtmlElement) {
        super()
        this.level = level
        this.content = content
    }

    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`h${this.level}`)
        var endTag : string = this.buildEndHtmlString(`h${this.level}`)
        var innerHtml : string = this.content==null?'':this.content.toHtmlString()
        return [beginTag, innerHtml, endTag].join('')
    }
}
export class OrderedList extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`ol`)
        var endTag : string = intent + this.buildEndHtmlString(`ol`)
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ', '\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}

export class ComplementBlock extends HtmlElement {
    complementContent : HtmlElement 

    setComplementContent(complementContent : HtmlElement) {
        this.complementContent = complementContent
    }

    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`div`, ['class', 'complementBlock'])
        var complementBlockHtml : string =  this.complementContent==null?'':this.complementContent.toHtmlString(intent + '    ')
        var endTag : string = intent + this.buildEndHtmlString(`div`)
        return [beginTag , complementBlockHtml , endTag].join('\n')

    }
}

export class OrderedItem extends HtmlElement {
    item : HtmlElement
    complementBlock : ComplementBlock 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplementBlock(complementBlockElement : HtmlElement) {
        // this.complementBlock = complementBlock
        this.complementBlock = new ComplementBlock()
        this.complementBlock.setComplementContent(complementBlockElement)
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`li`)
        var itemHtml : string = this.item==null?'':this.item.toHtmlString()
        var complementBlockHtml : string =  this.complementBlock==null?'':this.complementBlock.toHtmlString(intent + '    ')
        if (complementBlockHtml.length==0) {
            var endTag : string = this.buildEndHtmlString(`li`)
            return beginTag + itemHtml + endTag
        } else {
            var endTag : string = intent + this.buildEndHtmlString(`li`)
            return [beginTag + itemHtml , complementBlockHtml , endTag].join('\n')
        }

    }
}
export class DefinitionList extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`dl`)
        var endTag : string = intent + this.buildEndHtmlString(`dl`)
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ', '\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}
export class DefinitionItem extends HtmlElement {
    term : HtmlElement

    constructor(term : HtmlElement) {
        super() 
        this.term = term
    }
    setTerm(term : HtmlElement) {
        this.term = term
    }

    getTerm() : HtmlElement {
        return this.term
    }

    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`dt`)
        var endTag : string = this.buildEndHtmlString(`dt`)
        var innerHtml : string = this.getTerm()==null?'':this.getTerm().toHtmlString('')
        var childrenHtml : string = this.buildChildrenHtmlString(intent, '\n')
        return [[beginTag, innerHtml, endTag].join(''), childrenHtml].join('\n')
    }
}
export class DefinitionItemValue extends HtmlElement {
    item : HtmlElement
    complementBlock : ComplementBlock 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplementBlock(complementBlockElement : HtmlElement) {
        // this.complementBlock = complementBlock
        this.complementBlock = new ComplementBlock()
        this.complementBlock.setComplementContent(complementBlockElement)
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`dd`)
        var itemHtml : string = this.item==null?'':this.item.toHtmlString()
        var complementBlockHtml : string =  this.complementBlock==null?'':this.complementBlock.toHtmlString(intent + '    ')
        if (complementBlockHtml.length==0) {
            var endTag : string = this.buildEndHtmlString(`dd`)
            return beginTag + itemHtml + endTag
        } else {
            var endTag : string = intent + this.buildEndHtmlString(`dd`)
            return [beginTag + itemHtml , complementBlockHtml , endTag].join('\n')
        }
    }
}
export class UnorderedList extends HtmlElement {
    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`ul`)
        var endTag : string = intent + this.buildEndHtmlString(`ul`)
        var innerHtml : string = this.buildChildrenHtmlString(intent+'    ', '\n')
        return [beginTag, innerHtml, endTag].join('\n')
    }
}

export class UnorderedItem extends HtmlElement {
    item : HtmlElement
    complementBlock : ComplementBlock 

    constructor(item : HtmlElement) {
        super() 
        this.item = item
    }

    setComplementBlock(complementBlockElement : HtmlElement) {
        // this.complementBlock = complementBlock
        this.complementBlock = new ComplementBlock()
        this.complementBlock.setComplementContent(complementBlockElement)
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    setItem(item : HtmlElement) {
        this.item = item
    }

    getItem() : HtmlElement {
        return this.item
    }

    toHtmlString(intent : string=''): string {
        var beginTag : string = intent + this.buildBeginHtmlString(`li`)
        var itemHtml : string = this.item==null?'':this.item.toHtmlString()
        var complementBlockHtml : string =  this.complementBlock==null?'':this.complementBlock.toHtmlString(intent + '    ')
        if (complementBlockHtml.length==0) {
            var endTag : string = this.buildEndHtmlString(`li`)
            return beginTag + itemHtml + endTag
        } else {
            var endTag : string = intent + this.buildEndHtmlString(`li`)
            return [beginTag + itemHtml , complementBlockHtml , endTag].join('\n')
        }

    }
}

export class Table extends HtmlElement {
    headerRow : HtmlElement | null = null
    tableAlignmentRow : HtmlElement  | null = null

    constructor(headerRow : HtmlElement | null = null, tableAlignmentRow : HtmlElement | null = null ) {
        super() 
        this.headerRow = headerRow
        this.tableAlignmentRow = tableAlignmentRow
    }

    setHeaderRow(headerRow : HtmlElement) {
        this.headerRow = headerRow
    }
    getHeaderRow() : HtmlElement {
        return this.headerRow
    }
    setTableAlignmentRow(tableAlignmentRow : HtmlElement) {
        this.tableAlignmentRow = tableAlignmentRow
    }
    getTableAlignmentRow() : HtmlElement {
        return this.tableAlignmentRow
    }

    toHtmlString(intent : string = ''): string {
        var beginTableTag : string = intent + this.buildBeginHtmlString('table')
        var endTableTag : string = intent + this.buildEndHtmlString('table')
        var beginTHeadTag : string = intent + '    ' + this.buildBeginHtmlString('thead')
        var endTHeadTag : string = intent + '    ' + this.buildEndHtmlString('thead')
        var beginTBodyTag : string = intent + '    ' + this.buildBeginHtmlString('tbody')
        var endTBodyTag : string = intent + '    ' + this.buildEndHtmlString('tbody')

        var headerRowHtml : string = this.headerRow==null?'':this.headerRow.toHtmlString(intent + '    ' + '    ')
        var bodyRowHtml : string = this.buildChildrenHtmlString(intent + '    ' + '    ')
        return [
            beginTableTag,
            headerRowHtml.length>0?beginTHeadTag:null,
            headerRowHtml.length>0?headerRowHtml:null,
            headerRowHtml.length>0?endTHeadTag:null,
            bodyRowHtml.length>0?beginTBodyTag:null,
            bodyRowHtml.length>0?bodyRowHtml:null,
            bodyRowHtml.length>0?endTBodyTag:null,
            endTableTag,
        ].filter(x=>x).join('\n')
    }
}

export class TableRow extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('tr')
        var endTag : string = intent + this.buildEndHtmlString('tr')
        return [
            beginTag,
            this.buildChildrenHtmlString(intent+'    '),
            endTag
        ].join('\n')
    }
}
export class TableCell extends HtmlElement {
    tableCellAlignment : HtmlElement | null = null

    getTableCellAlignment() : HtmlElement {
        return this.tableCellAlignment
    }

    setTableCellAlignment(tableCellAlignment : HtmlElement) {
        this.tableCellAlignment = tableCellAlignment
    }

    toHtmlString(intent : string = ''): string {
        var propertyValues : string[] = []
        if (utils.Utils.isTypeOf(this.tableCellAlignment, TableLeftAlignment)) {
            propertyValues.push('class')
            propertyValues.push('TableCellAlignLeft')
        } else if (utils.Utils.isTypeOf(this.tableCellAlignment, TableCenterAlignment)) {
            propertyValues.push('class')
            propertyValues.push('TableCellAlignCenter')
        } else if (utils.Utils.isTypeOf(this.tableCellAlignment, TableRightAlignment)) {
            propertyValues.push('class')
            propertyValues.push('TableCellAlignRight')
        }
        var beginTag : string = intent + this.buildBeginHtmlString('td', propertyValues)
        
        var endTag : string = this.buildEndHtmlString('td')

        return [
            beginTag,
            this.buildChildrenHtmlString().trim(),
            endTag
        ].join('')
    }

}

export class TableHeadCell extends TableCell {
    toHtmlString(intent : string = ''): string {
        var propertyValues : string[] = []
        if (utils.Utils.isTypeOf(this.tableCellAlignment, TableLeftAlignment)) {
            propertyValues.push('class')
            propertyValues.push('TableCellAlignLeft')
        } else if (utils.Utils.isTypeOf(this.tableCellAlignment, TableCenterAlignment)) {
            propertyValues.push('class')
            propertyValues.push('TableCellAlignCenter')
        } else if (utils.Utils.isTypeOf(this.tableCellAlignment, TableRightAlignment)) {
            propertyValues.push('class')
            propertyValues.push('TableCellAlignRight')
        }
        var beginTag : string = intent + this.buildBeginHtmlString('th', propertyValues)
        var endTag : string = this.buildEndHtmlString('th')
        
        return [
            beginTag,
            this.buildChildrenHtmlString().trim(),
            endTag
        ].join('')
    }
}

export class TableAlignmentRow extends HtmlElement {}
export class TableCellAlignment extends HtmlStringElement {}
export class TableNoAlignment extends TableCellAlignment {}
export class TableLeftAlignment extends TableCellAlignment {}
export class TableRightAlignment extends TableCellAlignment {}
export class TableCenterAlignment extends TableCellAlignment {}

export class Footnote extends HtmlElement {
    footnoteIndex : HtmlElement | null = null
    detail : HtmlElement | null = null
    complementBlock : ComplementBlock | null = null

    constructor(footnoteReference : HtmlElement, detail : HtmlElement | null) {
        super()
        this.footnoteIndex = new FootnoteIndex((footnoteReference as FootnoteReference).getValue())
        this.detail = detail
    }

    setComplementBlock(complementBlockElement : HtmlElement) {
        // this.complementBlock = complementBlock
        this.complementBlock = new ComplementBlock()
        this.complementBlock.setComplementContent(complementBlockElement)
    }

    getComplementBlock() : HtmlElement | null {
        return this.complementBlock
    }

    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('div')
        var footnoteIndexHtml : string = this.footnoteIndex.toHtmlString()
        var detailHtml : string = this.detail.toHtmlString()

        var complementBlockHtml : string =  this.complementBlock==null?'':this.complementBlock.toHtmlString(intent + '    ')
        if (complementBlockHtml.length==0) {
            var endTag : string = this.buildEndHtmlString(`div`)
            return beginTag + footnoteIndexHtml + detailHtml + endTag
        } else {
            var endTag : string = intent + this.buildEndHtmlString(`div`)
            return [beginTag + footnoteIndexHtml + detailHtml , complementBlockHtml , endTag].join('\n')
        }

    }
}

export class FootnoteReference extends HtmlValueElement {
    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('sup')
        var endTag : string = this.buildEndHtmlString('sup')
        var linkBeginTag : string = this.buildBeginHtmlString('a', ['href', `#fn:${this.value.toHtmlString()}`, 'class', 'footnote', 'rel', 'footnote'])
        var linkEndTag : string = this.buildEndHtmlString('a')
        var link : string = [linkBeginTag, this.value.toHtmlString(), linkEndTag].join('')
        return [beginTag, link, endTag].join('')
    }
}

export class FootnoteIndex extends HtmlValueElement {
    toHtmlString(intent : string = ''): string {
        var beginTag : string = intent + this.buildBeginHtmlString('span', ['id', `fn:${this.value.toHtmlString()}`] )
        var endTag : string = this.buildEndHtmlString('span')
        var valueHtml : string = this.value.toHtmlString()+":"
        return [beginTag, valueHtml, endTag].join('')
    }
}

export class Cursor extends HtmlElement {
    toHtmlString(intent : string = ''): string {
        return '<span class="cursor">|</span>'
    }
}