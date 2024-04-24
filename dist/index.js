var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  MarkdownToHtmlConverter: () => MarkdownToHtmlConverter
});
module.exports = __toCommonJS(src_exports);

// src/MarkdownSyntaxAnalyzer.ts
var import_ts_parser_generator4 = require("ts-parser-generator");

// src/Language_Function.ts
var import_ts_parser_generator3 = require("ts-parser-generator");

// src/MarkdownLib.ts
var import_ts_parser_generator2 = require("ts-parser-generator");

// src/HtmlLib.ts
var import_html_entities = require("html-entities");
var import_ts_parser_generator = require("ts-parser-generator");
var HtmlElement = class {
  constructor() {
    this.children = [];
  }
  getChilden() {
    return this.children;
  }
  addChild(child) {
    this.children.push(child);
  }
  setChildren(children) {
    this.children = children;
  }
  init(fieldName, value) {
    this[fieldName] = value;
    return this;
  }
  initChildren(value) {
    return this.init("children", value);
  }
  isEqual(other) {
    if (this.getClass() != other.getClass())
      return false;
    if (this.getChilden().length != other.getChilden().length)
      return false;
    var len = this.getChilden().length;
    var flag = true;
    for (var i = 0; flag && i < len; i++) {
      flag = this.getChilden()[i].isEqual(other.getChilden()[i]);
    }
    return flag;
  }
  getClass() {
    return this.constructor;
  }
  buildBeginHtmlString(tagName, propertyValues = []) {
    var properties = [tagName];
    for (var i = 0; i < propertyValues.length; i += 2) {
      var name = propertyValues[i];
      var value = propertyValues[i + 1];
      if (value != null) {
        properties.push(`${name}="${value}"`);
      } else {
        properties.push(`${name}`);
      }
    }
    return `<${properties.join(" ")}>`;
  }
  buildEndHtmlString(tagName) {
    var properties = [`/${tagName}`];
    return `<${properties.join(" ")}>`;
  }
  toHtmlString(intent = "") {
    throw new Error("not implement toHtmlString");
  }
  buildChildrenHtmlString(intent, splitter = "\n") {
    return this.getChilden().map((c) => {
      return c.toHtmlString(intent);
    }).join(splitter);
  }
};
var HtmlRoot = class extends HtmlElement {
  toHtmlString(intent = "") {
    return this.buildChildrenHtmlString(intent);
  }
};
var Blockquote = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("blockquote");
    var endTag = intent + this.buildEndHtmlString("blockquote");
    var innerHtml = this.buildChildrenHtmlString(intent + "    ");
    return [beginTag, innerHtml, endTag].join("\n");
  }
};
var HtmlStringElement = class extends HtmlElement {
  constructor(value) {
    super();
    this.value = value;
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
  isEqual(other) {
    if (!super.isEqual(other))
      return false;
    if (this.value != other.getValue())
      return false;
    return true;
  }
  toHtmlString(intent = "") {
    return (0, import_html_entities.encode)(this.value);
  }
};
var HtmlValueElement = class extends HtmlElement {
  constructor(value) {
    super();
    this.value = value;
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
  initValue(value) {
    return this.init("value", value);
  }
  isEqual(other) {
    if (!super.isEqual(other))
      return false;
    if (!this.value.isEqual(other.getValue()))
      return false;
    return true;
  }
};
var ErrorHtmlElement = class extends HtmlStringElement {
};
var NullHtmlElement = class extends HtmlElement {
};
var NullHtmlInstance = new NullHtmlElement();
var Text = class extends HtmlStringElement {
};
var FencedCodeBlockText = class extends HtmlStringElement {
  toHtmlString(intent = "") {
    return (0, import_html_entities.encode)(this.value).split("\n").map((x) => intent + x).join("\n");
  }
};
var HorizontalRule = class extends HtmlStringElement {
  toHtmlString(intent = "") {
    return intent + "<hr>";
  }
};
var BacktickText = class extends HtmlElement {
  toHtmlString(intent = "") {
    return "<code>" + this.buildChildrenHtmlString("", "") + "</code>";
  }
};
var DoubleBacktickText = class extends HtmlElement {
  toHtmlString(intent = "") {
    return "<code>" + this.buildChildrenHtmlString("", "") + "</code>";
  }
};
var Spaces = class extends HtmlStringElement {
};
var Paragraph = class extends HtmlElement {
  toHtmlString(intent = "") {
    return intent + "<p>" + this.buildChildrenHtmlString("", "<br/>") + "</p>";
  }
};
var Sentence = class extends HtmlElement {
  toHtmlString(intent = "") {
    return this.buildChildrenHtmlString("", "");
  }
};
var PlainText = class extends HtmlElement {
  toHtmlString(intent = "") {
    return this.buildChildrenHtmlString("", "");
  }
};
var TaskList = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("div", ["class", "taskList"]);
    var endTag = intent + this.buildEndHtmlString("div");
    var innerHtml = this.buildChildrenHtmlString(intent + "    ", "\n");
    return [beginTag, innerHtml, endTag].join("\n");
  }
};
var TaskListItem = class extends HtmlElement {
  constructor(checked, value) {
    super();
    this.checked = checked;
    this.value = value;
  }
  toHtmlString(intent = "") {
    var inputProperties = ["type", "checkbox"];
    if (this.checked) {
      inputProperties.push("checked");
      inputProperties.push(null);
    }
    var input = intent + this.buildBeginHtmlString("input", inputProperties);
    var label = intent + this.buildBeginHtmlString("label", []) + this.value.toHtmlString("") + this.buildEndHtmlString("label");
    return [input, label].join("\n");
  }
};
var BlankLine = class extends HtmlElement {
  toHtmlString(intent = "") {
    return intent + "<br/>";
  }
};
var ItalicText = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("em");
    var endTag = this.buildEndHtmlString("em");
    var innerHtml = this.buildChildrenHtmlString("", "");
    return [beginTag, innerHtml, endTag].join("");
  }
};
var BoldText = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("strong");
    var endTag = this.buildEndHtmlString("strong");
    var innerHtml = this.buildChildrenHtmlString("", "");
    return [beginTag, innerHtml, endTag].join("");
  }
};
var Image = class extends HtmlElement {
  constructor(url, alt = null, title = null) {
    super();
    this.url = url;
    this.alt = alt;
    this.title = title;
  }
  toHtmlString(intent = "") {
    var imageProperties = ["src", this.url];
    if (this.title != null) {
      imageProperties.push("title");
      imageProperties.push(this.title);
    }
    if (this.alt != null) {
      imageProperties.push("alt");
      imageProperties.push(this.alt);
    }
    var beginTag = this.buildBeginHtmlString(`img`, imageProperties);
    return beginTag;
  }
};
var Link = class extends HtmlElement {
  constructor(alt, url, title = null) {
    super();
    this.alt = alt;
    this.url = url;
    this.title = title;
  }
  toHtmlString(intent = "") {
    var linkProperties = ["href", this.url];
    if (this.title != null) {
      linkProperties.push("title");
      linkProperties.push(this.title);
    }
    var beginTag = this.buildBeginHtmlString(`a`, linkProperties);
    var endTag = this.buildEndHtmlString(`a`);
    var innerHtml = this.alt == null ? "" : this.alt.toHtmlString();
    return [beginTag, innerHtml, endTag].join("");
  }
};
var Heading = class extends HtmlElement {
  constructor(level, content) {
    super();
    this.level = level;
    this.content = content;
  }
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`h${this.level}`);
    var endTag = this.buildEndHtmlString(`h${this.level}`);
    var innerHtml = this.content == null ? "" : this.content.toHtmlString();
    return [beginTag, innerHtml, endTag].join("");
  }
};
var OrderedList = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`ol`);
    var endTag = intent + this.buildEndHtmlString(`ol`);
    var innerHtml = this.buildChildrenHtmlString(intent + "    ", "\n");
    return [beginTag, innerHtml, endTag].join("\n");
  }
};
var OrderedItem = class extends HtmlElement {
  constructor(item) {
    super();
    this.item = item;
  }
  setComplementBlock(complementBlock) {
    this.complementBlock = complementBlock;
  }
  getComplementBlock() {
    return this.complementBlock;
  }
  setItem(item) {
    this.item = item;
  }
  getItem() {
    return this.item;
  }
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`li`);
    var itemHtml = this.item == null ? "" : this.item.toHtmlString();
    var complementBlockHtml = this.complementBlock == null ? "" : this.complementBlock.toHtmlString(intent + "    ");
    if (complementBlockHtml.length == 0) {
      var endTag = this.buildEndHtmlString(`li`);
      return beginTag + itemHtml + endTag;
    } else {
      var endTag = intent + this.buildEndHtmlString(`li`);
      return [beginTag + itemHtml, complementBlockHtml, endTag].join("\n");
    }
  }
};
var DefinitionList = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`dl`);
    var endTag = intent + this.buildEndHtmlString(`dl`);
    var innerHtml = this.buildChildrenHtmlString(intent + "    ", "\n");
    return [beginTag, innerHtml, endTag].join("\n");
  }
};
var DefinitionItem = class extends HtmlElement {
  constructor(term) {
    super();
    this.term = term;
  }
  setTerm(term) {
    this.term = term;
  }
  getTerm() {
    return this.term;
  }
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`dt`);
    var endTag = this.buildEndHtmlString(`dt`);
    var innerHtml = this.getTerm() == null ? "" : this.getTerm().toHtmlString("");
    var childrenHtml = this.buildChildrenHtmlString(intent, "\n");
    return [[beginTag, innerHtml, endTag].join(""), childrenHtml].join("\n");
  }
};
var DefinitionItemValue = class extends HtmlElement {
  constructor(item) {
    super();
    this.item = item;
  }
  setComplementBlock(complementBlock) {
    this.complementBlock = complementBlock;
  }
  getComplementBlock() {
    return this.complementBlock;
  }
  setItem(item) {
    this.item = item;
  }
  getItem() {
    return this.item;
  }
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`dd`);
    var itemHtml = this.item == null ? "" : this.item.toHtmlString();
    var complementBlockHtml = this.complementBlock == null ? "" : this.complementBlock.toHtmlString(intent + "    ");
    if (complementBlockHtml.length == 0) {
      var endTag = this.buildEndHtmlString(`dd`);
      return beginTag + itemHtml + endTag;
    } else {
      var endTag = intent + this.buildEndHtmlString(`dd`);
      return [beginTag + itemHtml, complementBlockHtml, endTag].join("\n");
    }
  }
};
var UnorderedList = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`ul`);
    var endTag = intent + this.buildEndHtmlString(`ul`);
    var innerHtml = this.buildChildrenHtmlString(intent + "    ", "\n");
    return [beginTag, innerHtml, endTag].join("\n");
  }
};
var UnorderedItem = class extends HtmlElement {
  constructor(item) {
    super();
    this.item = item;
  }
  setComplementBlock(complementBlock) {
    this.complementBlock = complementBlock;
  }
  getComplementBlock() {
    return this.complementBlock;
  }
  setItem(item) {
    this.item = item;
  }
  getItem() {
    return this.item;
  }
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString(`li`);
    var itemHtml = this.item == null ? "" : this.item.toHtmlString();
    var complementBlockHtml = this.complementBlock == null ? "" : this.complementBlock.toHtmlString(intent + "    ");
    if (complementBlockHtml.length == 0) {
      var endTag = this.buildEndHtmlString(`li`);
      return beginTag + itemHtml + endTag;
    } else {
      var endTag = intent + this.buildEndHtmlString(`li`);
      return [beginTag + itemHtml, complementBlockHtml, endTag].join("\n");
    }
  }
};
var Table = class extends HtmlElement {
  constructor(headerRow = null, tableAlignmentRow = null) {
    super();
    this.headerRow = null;
    this.tableAlignmentRow = null;
    this.headerRow = headerRow;
    this.tableAlignmentRow = tableAlignmentRow;
  }
  setHeaderRow(headerRow) {
    this.headerRow = headerRow;
  }
  getHeaderRow() {
    return this.headerRow;
  }
  setTableAlignmentRow(tableAlignmentRow) {
    this.tableAlignmentRow = tableAlignmentRow;
  }
  getTableAlignmentRow() {
    return this.tableAlignmentRow;
  }
  toHtmlString(intent = "") {
    var beginTableTag = intent + this.buildBeginHtmlString("table");
    var endTableTag = intent + this.buildEndHtmlString("table");
    var beginTHeadTag = intent + "    " + this.buildBeginHtmlString("thead");
    var endTHeadTag = intent + "    " + this.buildEndHtmlString("thead");
    var beginTBodyTag = intent + "    " + this.buildBeginHtmlString("tbody");
    var endTBodyTag = intent + "    " + this.buildEndHtmlString("tbody");
    var headerRowHtml = this.headerRow == null ? "" : this.headerRow.toHtmlString(intent + "        ");
    var bodyRowHtml = this.buildChildrenHtmlString(intent + "        ");
    return [
      beginTableTag,
      headerRowHtml.length > 0 ? beginTHeadTag : null,
      headerRowHtml.length > 0 ? headerRowHtml : null,
      headerRowHtml.length > 0 ? endTHeadTag : null,
      bodyRowHtml.length > 0 ? beginTBodyTag : null,
      bodyRowHtml.length > 0 ? bodyRowHtml : null,
      bodyRowHtml.length > 0 ? endTBodyTag : null,
      endTableTag
    ].filter((x) => x).join("\n");
  }
};
var TableRow = class extends HtmlElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("tr");
    var endTag = intent + this.buildEndHtmlString("tr");
    return [
      beginTag,
      this.buildChildrenHtmlString(intent + "    "),
      endTag
    ].join("\n");
  }
};
var TableCell = class extends HtmlElement {
  constructor() {
    super(...arguments);
    this.tableCellAlignment = null;
  }
  getTableCellAlignment() {
    return this.tableCellAlignment;
  }
  setTableCellAlignment(tableCellAlignment) {
    this.tableCellAlignment = tableCellAlignment;
  }
  toHtmlString(intent = "") {
    var propertyValues = [];
    if (import_ts_parser_generator.utils.Utils.isTypeOf(this.tableCellAlignment, TableLeftAlignment)) {
      propertyValues.push("class");
      propertyValues.push("TableCellAlignLeft");
    } else if (import_ts_parser_generator.utils.Utils.isTypeOf(this.tableCellAlignment, TableCenterAlignment)) {
      propertyValues.push("class");
      propertyValues.push("TableCellAlignCenter");
    } else if (import_ts_parser_generator.utils.Utils.isTypeOf(this.tableCellAlignment, TableRightAlignment)) {
      propertyValues.push("class");
      propertyValues.push("TableCellAlignRight");
    }
    var beginTag = intent + this.buildBeginHtmlString("td", propertyValues);
    var endTag = this.buildEndHtmlString("td");
    return [
      beginTag,
      this.buildChildrenHtmlString().trim(),
      endTag
    ].join("");
  }
};
var TableHeadCell = class extends TableCell {
  toHtmlString(intent = "") {
    var propertyValues = [];
    if (import_ts_parser_generator.utils.Utils.isTypeOf(this.tableCellAlignment, TableLeftAlignment)) {
      propertyValues.push("class");
      propertyValues.push("TableCellAlignLeft");
    } else if (import_ts_parser_generator.utils.Utils.isTypeOf(this.tableCellAlignment, TableCenterAlignment)) {
      propertyValues.push("class");
      propertyValues.push("TableCellAlignCenter");
    } else if (import_ts_parser_generator.utils.Utils.isTypeOf(this.tableCellAlignment, TableRightAlignment)) {
      propertyValues.push("class");
      propertyValues.push("TableCellAlignRight");
    }
    var beginTag = intent + this.buildBeginHtmlString("th", propertyValues);
    var endTag = this.buildEndHtmlString("th");
    return [
      beginTag,
      this.buildChildrenHtmlString().trim(),
      endTag
    ].join("");
  }
};
var TableAlignmentRow = class extends HtmlElement {
};
var TableCellAlignment = class extends HtmlStringElement {
};
var TableNoAlignment = class extends TableCellAlignment {
};
var TableLeftAlignment = class extends TableCellAlignment {
};
var TableRightAlignment = class extends TableCellAlignment {
};
var TableCenterAlignment = class extends TableCellAlignment {
};
var Footnote = class extends HtmlElement {
  constructor(footnoteReference, detail) {
    super();
    this.footnoteIndex = null;
    this.detail = null;
    this.complementBlock = null;
    this.footnoteIndex = new FootnoteIndex(footnoteReference.getValue());
    this.detail = detail;
  }
  setComplementBlock(complementBlock) {
    this.complementBlock = complementBlock;
  }
  getComplementBlock() {
    return this.complementBlock;
  }
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("div");
    var footnoteIndexHtml = this.footnoteIndex.toHtmlString();
    var detailHtml = this.detail.toHtmlString();
    var complementBlockHtml = this.complementBlock == null ? "" : this.complementBlock.toHtmlString(intent + "    ");
    if (complementBlockHtml.length == 0) {
      var endTag = this.buildEndHtmlString(`div`);
      return beginTag + footnoteIndexHtml + detailHtml + endTag;
    } else {
      var endTag = intent + this.buildEndHtmlString(`div`);
      return [beginTag + footnoteIndexHtml + detailHtml, complementBlockHtml, endTag].join("\n");
    }
  }
};
var FootnoteReference = class extends HtmlValueElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("sup");
    var endTag = this.buildEndHtmlString("sup");
    var linkBeginTag = this.buildBeginHtmlString("a", ["href", `#fn:${this.value.toHtmlString()}`, "class", "footnote", "rel", "footnote"]);
    var linkEndTag = this.buildEndHtmlString("a");
    var link = [linkBeginTag, this.value.toHtmlString(), linkEndTag].join("");
    return [beginTag, link, endTag].join("");
  }
};
var FootnoteIndex = class extends HtmlValueElement {
  toHtmlString(intent = "") {
    var beginTag = intent + this.buildBeginHtmlString("span", ["id", `fn:${this.value.toHtmlString()}`]);
    var endTag = this.buildEndHtmlString("span");
    var valueHtml = this.value.toHtmlString();
    return [beginTag, valueHtml, endTag].join("");
  }
};
var Cursor = class extends HtmlElement {
  toHtmlString(intent = "") {
    return '<span class="cursor">|</span>';
  }
};

// src/MarkdownLib.ts
var MarkdownElement = class extends import_ts_parser_generator2.syntax.SymbolEntity {
  constructor() {
    super(...arguments);
    this.markdownElements = [];
  }
  getMarkdownElements() {
    return this.markdownElements;
  }
  setMarkdownElements(markdownElements) {
    this.markdownElements = markdownElements;
  }
  getLastMarkdownElement() {
    if (this.markdownElements.length == 0)
      return null;
    return this.markdownElements.at(-1);
  }
  getLastSecondMarkdownElement() {
    if (this.markdownElements.length < 2)
      return null;
    return this.markdownElements.at(-2);
  }
  getRawValue() {
    var rawData = this.getMarkdownElements().map((markdownElement) => {
      return markdownElement.getRawValue();
    }).join("");
    return rawData;
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = this.getMarkdownElements().map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  mergeUnhandledBlockquotes(elements) {
    var result = [].concat.apply([], elements);
    result = result.filter((x) => import_ts_parser_generator2.utils.Utils.isTypeOf(x, Blockquote2));
    var list = [];
    for (var i = 0; i < result.length; i++) {
      var blockquote = result[i];
      if (!blockquote.isHandled()) {
        list.push(blockquote);
      }
    }
    return list;
  }
  getUnhandledChildrenBlockquotes() {
    var list = this.getMarkdownElements().filter((x) => x);
    var unhandledBlockquoteArraytList = [];
    for (var i = 0; i < list.length; i++) {
      var element = list[i];
      unhandledBlockquoteArraytList.push(element.getUnhandledBlockquotes());
    }
    var childBlockquotes = [].concat.apply([], unhandledBlockquoteArraytList);
    return childBlockquotes;
  }
  getUnhandledBlockquotes() {
    var result = this.mergeUnhandledBlockquotes([[this]]);
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    return result.concat(childBlockquotes);
  }
  mergeUnhandledComplementBlocks(elements) {
    var result = [].concat.apply([], elements);
    result = result.filter((x) => import_ts_parser_generator2.utils.Utils.isTypeOf(x, ComplementBlock));
    var list = [];
    for (var i = 0; i < result.length; i++) {
      var complementBlock = result[i];
      if (!complementBlock.isHandled()) {
        list.push(complementBlock);
      }
    }
    return list;
  }
  getUnhandledChildrenComplementBlocks() {
    var list = this.getMarkdownElements().filter((x) => x);
    var unhandledComplementBlockArraytList = [];
    for (var i = 0; i < list.length; i++) {
      var element = list[i];
      unhandledComplementBlockArraytList.push(element.getUnhandledComplementBlocks());
    }
    var childComplementBlocks = [].concat.apply([], unhandledComplementBlockArraytList);
    return childComplementBlocks;
  }
  getUnhandledComplementBlockByMarkdownElement(element) {
    var childComplementBlocks = [];
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(element, ComplementBlock)) {
      var complementBlock = element;
      if (complementBlock.isHandled()) {
        childComplementBlocks = element.getUnhandledChildrenComplementBlocks();
      } else {
        return [complementBlock];
      }
    } else if (element != null && element.getUnhandledChildrenComplementBlocks) {
      childComplementBlocks = element.getUnhandledChildrenComplementBlocks();
    }
    return childComplementBlocks;
  }
  getUnhandledComplementBlockByMarkdownElements(elements) {
    var childComplementBlocks = [];
    for (var i = 0; i < elements.length; i++) {
      childComplementBlocks = childComplementBlocks.concat(this.getUnhandledComplementBlockByMarkdownElement(elements[i]));
    }
    return childComplementBlocks;
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElement(this);
  }
  toChildrenMarkdownElementsHtml() {
    var htmlEles = this.getMarkdownElements().filter((x) => x).map((markdownElement) => {
      return markdownElement.toHtml();
    });
    return htmlEles;
  }
  toHtml() {
    return NullHtmlInstance;
  }
};
var MarkdownValueElement = class extends MarkdownElement {
  constructor(value) {
    super();
    this.value = null;
    this.value = value;
  }
  getRawValue() {
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(this.value, String)) {
      return this.value;
    } else if (this.value != null && this.value.getRawValue) {
      return this.value.getRawValue();
    } else if (this.value == null) {
      return "";
    }
  }
  getValue() {
    return this.value;
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.getValue()].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var result = this.mergeUnhandledBlockquotes([[this, this.getValue()]]);
    return result.concat(childBlockquotes);
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElements([this, this.value]);
  }
  toValueHtml() {
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(this.value, String)) {
      return new Text(this.value);
    } else if (this.value != null && this.value.toHtml) {
      return this.value.toHtml();
    } else if (this.value == null) {
      return null;
    }
    throw new Error(`The value ${this.value} in ${this.getClass()} have not handled!`);
  }
  toHtml() {
    throw new Error(`The value ${this.value} in ${this.getClass()} have not handled!`);
  }
};
var MarkdownLines = class extends MarkdownElement {
  merge() {
    var markdown = new Markdown();
    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      markdown.addElement(child);
    }
    return markdown;
  }
};
var Markdown = class extends MarkdownElement {
  constructor() {
    super();
  }
  addElement(element) {
    if (element.getClass() == Sentence2) {
      this.addSentence(element);
    } else if (element.getClass() == MarkdownError) {
      this.getMarkdownElements().push(element);
    } else if (element.getClass() == BlankLine2) {
      this.getMarkdownElements().push(element);
    } else if (element.getClass() == Heading2) {
      this.getMarkdownElements().push(element);
    } else if (element.getClass() == OrderedItem2) {
      this.addOrderedItem(element);
    } else if (element.getClass() == UnorderedItem2) {
      this.addUnorderedItem(element);
    } else if (element.getClass() == BlockquoteLine) {
      this.addBlockquoteLine(element);
    } else if (element.getClass() == Complement) {
      this.addComplement(element);
    } else if (element.getClass() == DashesRule) {
      this.addDashesRule(element);
    } else if (element.getClass() == EqualsRule) {
      this.addEqualsRule(element);
    } else if (element.getClass() == TableRow2) {
      this.addTableRow(element);
    } else if (element.getClass() == TableAlignmentRow2) {
      this.addTableAlignmentRow(element);
    } else if (element.getClass() == FencedCodeBlockText2) {
      this.addFencedCodeBlockText(element);
    } else if (element.getClass() == DefinitionItemValue2) {
      this.addDefinitionItemValue(element);
    } else if (element.getClass() == TaskListItem2) {
      this.addTaskListItem(element);
    } else if (element.getClass() == Footnote2) {
      this.addFootnote(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  addSentence(element) {
    var lastElement = this.getLastMarkdownElement();
    var paragraph = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Paragraph2)) {
      paragraph = lastElement;
    } else {
      paragraph = new Paragraph2();
      this.getMarkdownElements().push(paragraph);
    }
    paragraph.addElement(element);
  }
  addOrderedItem(element) {
    var lastElement = this.getLastMarkdownElement();
    var orderedList = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, OrderedList2)) {
      orderedList = lastElement;
    } else {
      orderedList = new OrderedList2();
      this.getMarkdownElements().push(orderedList);
    }
    orderedList.addElement(element);
  }
  addUnorderedItem(element) {
    var lastElement = this.getLastMarkdownElement();
    var unorderedList = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, UnorderedList2)) {
      unorderedList = lastElement;
    } else {
      unorderedList = new UnorderedList2();
      this.getMarkdownElements().push(unorderedList);
    }
    unorderedList.addElement(element);
  }
  addBlockquoteLine(element) {
    var lastElement = this.getLastMarkdownElement();
    var blockquote = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Blockquote2)) {
      blockquote = lastElement;
    } else {
      blockquote = new Blockquote2();
      this.getMarkdownElements().push(blockquote);
    }
    blockquote.appendStringLine(element.value);
  }
  addComplement(element) {
    var lastElement = this.getLastMarkdownElement();
    if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(lastElement)) {
      throw new Error(`Can no append complement to this markdown`);
    } else if (lastElement.getClass() == OrderedList2) {
      lastElement.addElement(element);
    } else if (lastElement.getClass() == UnorderedList2) {
      lastElement.addElement(element);
    } else if (lastElement.getClass() == Footnote2) {
      lastElement.addElement(element);
    } else if (lastElement.getClass() == DefinitionList2) {
      lastElement.addElement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name} with last element ${lastElement.getClass().name}`);
    }
  }
  addDashesRule(element) {
    var lastElement = this.getLastMarkdownElement();
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Paragraph2)) {
      var paragraph = lastElement;
      var sentence = null;
      if (paragraph.getMarkdownElements().length == 1) {
        sentence = paragraph.getMarkdownElements().pop();
      }
      if (paragraph.getMarkdownElements().length == 0) {
        this.getMarkdownElements().pop();
      }
      if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(sentence)) {
        this.getMarkdownElements().push(new HorizontalRule2(element.getValue()));
      } else {
        this.getMarkdownElements().push(new Heading2(2, sentence));
      }
    } else {
      this.getMarkdownElements().push(new HorizontalRule2(element.getValue()));
    }
  }
  addEqualsRule(element) {
    var lastElement = this.getLastMarkdownElement();
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Paragraph2)) {
      var paragraph = lastElement;
      var sentence = null;
      if (paragraph.getMarkdownElements().length == 1) {
        sentence = paragraph.getMarkdownElements().pop();
      }
      if (paragraph.getMarkdownElements().length == 0) {
        this.getMarkdownElements().pop();
      }
      if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(sentence)) {
      } else {
        this.getMarkdownElements().push(new Heading2(1, sentence));
      }
    }
  }
  addTableRow(element) {
    var lastElement = this.getLastMarkdownElement();
    var table = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Table2)) {
      table = lastElement;
    } else {
      table = new Table2();
      this.getMarkdownElements().push(table);
    }
    table.addElement(element);
  }
  addTableAlignmentRow(element) {
    var lastElement = this.getLastMarkdownElement();
    var table = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Table2)) {
      table = lastElement;
    } else {
      table = new Table2();
      this.getMarkdownElements().push(table);
    }
    table.addElement(element);
  }
  addFencedCodeBlockText(element) {
    this.getMarkdownElements().push(element);
  }
  addDefinitionItemValue(element) {
    var lastElement = this.getLastMarkdownElement();
    var definitionList = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, Paragraph2)) {
      var paragraph = lastElement;
      var sentence = null;
      if (paragraph.getMarkdownElements().length == 1) {
        sentence = paragraph.getMarkdownElements().pop();
      }
      if (paragraph.getMarkdownElements().length == 0) {
        this.getMarkdownElements().pop();
      }
      if (import_ts_parser_generator2.utils.Utils.isTypeOf(this.getLastMarkdownElement(), DefinitionList2)) {
        definitionList = this.getLastMarkdownElement();
      } else {
        definitionList = new DefinitionList2();
        this.getMarkdownElements().push(definitionList);
      }
      var definitionItem = new DefinitionItem2();
      definitionList.addElement(definitionItem);
      if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(sentence)) {
      } else {
        definitionItem.setTerm(sentence);
      }
    } else if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, DefinitionList2)) {
      definitionList = lastElement;
    } else {
      definitionList = new DefinitionList2();
      this.getMarkdownElements().push(definitionList);
      var definitionItem = new DefinitionItem2();
      definitionList.addElement(definitionItem);
    }
    if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(definitionList)) {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name} with last element ${lastElement.getClass().name}`);
    } else {
      definitionList.addElement(element);
    }
  }
  addTaskListItem(element) {
    var lastElement = this.getLastMarkdownElement();
    var taskList = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(lastElement, TaskList2)) {
      taskList = lastElement;
    } else {
      taskList = new TaskList2();
      this.getMarkdownElements().push(taskList);
    }
    taskList.addElement(element);
  }
  addFootnote(element) {
    this.getMarkdownElements().push(element);
  }
  toHtml() {
    var g = new HtmlRoot();
    g.setChildren(this.toChildrenMarkdownElementsHtml());
    return g;
  }
};
var MarkdownError = class extends MarkdownElement {
  constructor(value) {
    super();
    this.value = "";
    this.value = value;
  }
  getRawValue() {
    return this.value;
  }
  toHtml() {
    return new ErrorHtmlElement(this.value);
  }
};
var Paragraph2 = class extends MarkdownElement {
  addElement(element) {
    if (element.getClass() == Sentence2) {
      this.addSentence(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  addSentence(element) {
    this.getMarkdownElements().push(element);
  }
  toHtml() {
    var p = new Paragraph();
    p.setChildren(this.toChildrenMarkdownElementsHtml());
    return p;
  }
};
var BlankLine2 = class extends MarkdownValueElement {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new BlankLine();
  }
};
var TableRow2 = class extends MarkdownElement {
  constructor() {
    super();
    this.tableAlignmentRow = null;
  }
  addChild(child) {
    var index = this.children.length;
    this.children.push(child);
    this.markdownElements.push(child);
    if (this.tableAlignmentRow != null && this.tableAlignmentRow.getMarkdownElements().length > index) {
      child.setTableColumnAlignment(this.tableAlignmentRow.getMarkdownElements()[index]);
    }
  }
  setTableAlignmentRow(tableAlignmentRow) {
    this.tableAlignmentRow = tableAlignmentRow;
    if (this.tableAlignmentRow != null) {
      var len = Math.min(this.getMarkdownElements().length, this.tableAlignmentRow.getMarkdownElements().length);
      for (var i = 0; i < len; i++) {
        var cell = this.getMarkdownElements()[i];
        cell.setTableColumnAlignment(this.tableAlignmentRow.getMarkdownElements()[i]);
      }
    }
  }
  getTableAlignmentRow() {
    return this.tableAlignmentRow;
  }
  toHtml() {
    var e = new TableRow();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var TableCell2 = class extends MarkdownElement {
  constructor(tableRow) {
    super();
    this.tableRow = null;
    this.tableColumnAlignment = null;
    this.tableRow = tableRow;
  }
  setTableColumnAlignment(tableColumnAlignment) {
    this.tableColumnAlignment = tableColumnAlignment;
  }
  getTableColumnAlignment() {
    return this.tableColumnAlignment;
  }
  getTableRow() {
    return this.tableRow;
  }
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new TableCell();
    if (this.tableColumnAlignment != null) {
      e.setTableCellAlignment(this.tableColumnAlignment.toHtml());
    }
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var TableHeadCell2 = class extends TableCell2 {
  toHtml() {
    var e = new TableHeadCell();
    if (this.tableColumnAlignment != null) {
      e.setTableCellAlignment(this.tableColumnAlignment.toHtml());
    }
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var TableAlignmentRow2 = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new TableAlignmentRow();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var TableColumnAlignment = class extends MarkdownValueElement {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
};
var TableNoAlignment2 = class extends TableColumnAlignment {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new TableNoAlignment(this.value);
  }
};
var TableLeftAlignment2 = class extends TableColumnAlignment {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new TableLeftAlignment(this.value);
  }
};
var TableRightAlignment2 = class extends TableColumnAlignment {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new TableRightAlignment(this.value);
  }
};
var TableCenterAlignment2 = class extends TableColumnAlignment {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new TableCenterAlignment(this.value);
  }
};
var TaskListItem2 = class extends MarkdownElement {
  constructor(checked, value) {
    super();
    this.checked = checked;
    this.value = value;
  }
  toHtml() {
    var e = new TaskListItem(this.checked, this.value.toHtml());
    return e;
  }
  isChecked() {
    return this.checked;
  }
  getValue() {
    return this.value;
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.value].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var result = this.mergeUnhandledBlockquotes([[this, this.getValue()]]);
    return result.concat(childBlockquotes);
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElements([this, this.value]);
  }
};
var TaskList2 = class extends MarkdownElement {
  addElement(element) {
    if (element.getClass() == TaskListItem2) {
      this.getMarkdownElements().push(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toHtml() {
    var e = new TaskList();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var PlainText2 = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new PlainText();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var Sentence2 = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new Sentence();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var BoldText2 = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new BoldText();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var StarBoldText = class extends BoldText2 {
};
var UnderlineBoldText = class extends BoldText2 {
};
var ItalicText2 = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new ItalicText();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var StarItalicText = class extends ItalicText2 {
};
var UnderlineItalicText = class extends ItalicText2 {
};
var BoldItalicText = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e2 = new BoldText();
    e2.setChildren(this.toChildrenMarkdownElementsHtml());
    var e1 = new ItalicText();
    e1.getChilden().push(e2);
    return e1;
  }
};
var StarBoldItalicText = class extends BoldItalicText {
};
var UnderlineBoldItalicText = class extends BoldItalicText {
};
var StrikethroughText = class extends MarkdownElement {
};
var HighlightText = class extends MarkdownElement {
};
var SubscriptText = class extends MarkdownElement {
};
var SuperscriptText = class extends MarkdownElement {
};
var DoubleBacktickText2 = class extends MarkdownElement {
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new DoubleBacktickText();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var BacktickText2 = class extends MarkdownElement {
  constructor() {
    super(...arguments);
    this.beginTag = "";
    this.endTag = "";
  }
  setBeginTag(beginTag) {
    this.beginTag = beginTag;
  }
  setEndTag(endTag) {
    this.endTag = endTag;
  }
  getRawValue() {
    return this.beginTag + super.getRawValue() + this.endTag;
  }
  addChild(child) {
    this.children.push(child);
    this.markdownElements.push(child);
  }
  toHtml() {
    var e = new BacktickText();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var FencedCodeBlockText2 = class extends MarkdownValueElement {
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = this.getMarkdownElements().filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new FencedCodeBlockText(this.getValue());
  }
};
var SimpleText = class extends MarkdownValueElement {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new Text(this.value);
  }
};
var Spaces2 = class extends MarkdownValueElement {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new Spaces(this.value);
  }
};
var Cursor2 = class extends MarkdownElement {
  toHtml() {
    return new Cursor();
  }
};
var Footnote2 = class extends MarkdownElement {
  constructor(footnoteReference, detail) {
    super();
    this.footnoteIndex = null;
    this.detail = null;
    this.complementBlock = null;
    this.footnoteIndex = new FootnoteIndex2(footnoteReference.getValue());
    this.detail = detail;
  }
  addComplement(element) {
    if (this.complementBlock == null) {
      this.complementBlock = new ComplementBlock();
    }
    this.complementBlock.addComplement(element);
  }
  addElement(element) {
    if (element.getClass() == Complement) {
      this.addComplement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  getComplementMarkdown() {
    return this.getLastMarkdownElement();
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.footnoteIndex, this.detail, this.complementBlock].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var elements = [this.footnoteIndex, this.detail];
    if (this.complementBlock != null && this.complementBlock.isHandled()) {
      childBlockquotes = childBlockquotes.concat(this.complementBlock.getUnhandledBlockquotes());
      elements.push(this.complementBlock);
    }
    var result = this.mergeUnhandledBlockquotes([elements]);
    return result.concat(childBlockquotes);
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElements([this, this.footnoteIndex, this.detail, this.complementBlock]);
  }
  toHtml() {
    var e = new Footnote(this.footnoteIndex.toHtml(), this.detail.toHtml());
    if (this.complementBlock != null) {
      e.setComplementBlock(this.complementBlock.toHtml());
    }
    return e;
  }
};
var URLAddress = class extends MarkdownValueElement {
};
var EmailAddress = class extends MarkdownValueElement {
};
var Emoji = class extends MarkdownValueElement {
};
var FootnoteReference2 = class extends MarkdownValueElement {
  toHtml() {
    var value = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(this.value, String)) {
      value = this.value;
    } else if (this.value != null && this.value.toHtml) {
      value = this.value.toHtml();
    } else if (this.value == null) {
      value = "";
    }
    return new FootnoteReference(value);
  }
};
var FootnoteIndex2 = class extends FootnoteReference2 {
  toHtml() {
    var value = null;
    if (import_ts_parser_generator2.utils.Utils.isTypeOf(this.value, String)) {
      value = this.value;
    } else if (this.value != null && this.value.toHtml) {
      value = this.value.toHtml();
    } else if (this.value == null) {
      value = "";
    }
    return new FootnoteIndex(value);
  }
};
var HorizontalRule2 = class extends MarkdownValueElement {
  toMarkdownHierarchy(intent = "", debug = false) {
    var resultArray = [];
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    return new HorizontalRule(this.value);
  }
};
var DashesRule = class extends MarkdownValueElement {
};
var EqualsRule = class extends MarkdownValueElement {
};
var Blockquote2 = class extends MarkdownElement {
  constructor() {
    super();
    this.isHandledFlag = false;
    this.contentLines = [];
    this.isHandledFlag = false;
    this.contentLines = [];
  }
  appendStringLine(line) {
    this.contentLines.push(line);
  }
  getContent() {
    return this.contentLines.map((l) => {
      if (l.startsWith("> ")) {
        return l.substring(2);
      } else if (l.startsWith(">>")) {
        return l.substring(1);
      } else if (l.startsWith(">\u25AE ")) {
        return l.substring(3);
      } else if (l.startsWith(">>\u25AE")) {
        return l.substring(1);
      } else if (l.startsWith("\u25AE> ")) {
        return l.substring(3);
      } else if (l.startsWith("\u25AE>>")) {
        return l.substring(2);
      } else if (l.startsWith(">\u25AE>")) {
        return l.substring(2);
      } else {
        return l;
      }
    }).join("\n");
  }
  getRawValue() {
    return this.contentLines.join("\n");
  }
  getMarkdown() {
    return this.getLastMarkdownElement();
  }
  // merge() {
  //     var content : string = this.getContent()
  //     var markdownSyntaxAnalyzer : MarkdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer()
  //     var blockquoteMarkdown : Markdown =  markdownSyntaxAnalyzer.toMarkddown(content)
  //     this.getMarkdownElements().push(blockquoteMarkdown)
  //     this.isHandledFlag = true
  // }
  isHandled() {
    return this.isHandledFlag;
  }
  toHtml() {
    var e = new Blockquote();
    e.addChild(this.getMarkdown().toHtml());
    return e;
  }
};
var BlockquoteLine = class extends MarkdownValueElement {
};
var Complement = class extends MarkdownElement {
  constructor(intent, value) {
    super();
    this.value = null;
    this.intent = "";
    this.intent = intent;
    this.value = value;
  }
  getRawValue() {
    return this.intent + (this.value != null ? this.value.getRawValue() : "");
  }
};
var ComplementBlock = class extends MarkdownElement {
  constructor() {
    super();
    this.isHandledFlag = false;
    this.complements = [];
    this.isHandledFlag = false;
  }
  getContent() {
    return this.complements.map((c) => {
      return c.getRawValue();
    }).join("\n");
  }
  addComplement(complement) {
    this.complements.push(complement);
  }
  isHandled() {
    return this.isHandledFlag;
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var elements = [];
    if (this.isHandled()) {
      elements = this.getMarkdownElements();
    } else {
      elements = this.complements;
    }
    var resultArray = elements.filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var result = this.mergeUnhandledBlockquotes([[this]]);
    return result.concat(childBlockquotes);
  }
  toHtml() {
    if (this.getMarkdownElements.length > 1) {
      throw new Error("the children in ComplementBlock is more than 1");
    }
    return this.getMarkdownElements()[0].toHtml();
  }
};
var Heading2 = class extends MarkdownValueElement {
  constructor(level, value) {
    super(value);
    this.level = level;
  }
  toHtml() {
    var e = new Heading(this.level, this.toValueHtml());
    return e;
  }
};
var OrderedList2 = class extends MarkdownElement {
  addElement(element) {
    if (element.getClass() == OrderedItem2) {
      this.addOrderedItem(element);
    } else if (element.getClass() == Complement) {
      this.addComplement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  addOrderedItem(element) {
    this.getMarkdownElements().push(element);
  }
  addComplement(element) {
    var lastElement = this.getLastMarkdownElement();
    if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(lastElement)) {
      throw new Error(`Can no append complement to this markdown`);
    } else if (lastElement.getClass() == OrderedItem2) {
      lastElement.addElement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toHtml() {
    var e = new OrderedList();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var OrderedItem2 = class extends MarkdownValueElement {
  constructor(orderTag, value) {
    super(value);
    this.complementBlock = null;
    this.orderTag = "";
    this.orderTag = orderTag;
  }
  getRawValue() {
    return this.orderTag + super.getRawValue();
  }
  addElement(element) {
    if (element.getClass() == Complement) {
      if (this.complementBlock == null) {
        this.complementBlock = new ComplementBlock();
      }
      this.complementBlock.addComplement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.getValue(), this.complementBlock].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  getComplementMarkdown() {
    return this.getLastMarkdownElement();
  }
  toHtml() {
    var e = new OrderedItem(this.toValueHtml());
    if (this.complementBlock != null) {
      e.setComplementBlock(this.complementBlock.toHtml());
    }
    return e;
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var elements = [this];
    if (this.complementBlock != null && this.complementBlock.isHandled()) {
      childBlockquotes = childBlockquotes.concat(this.complementBlock.getUnhandledBlockquotes());
      elements.push(this.complementBlock);
    }
    var result = this.mergeUnhandledBlockquotes([elements]);
    return result.concat(childBlockquotes);
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElements([this, this.complementBlock]);
  }
};
var UnorderedList2 = class extends MarkdownElement {
  addElement(element) {
    if (element.getClass() == UnorderedItem2) {
      this.addUnorderedItem(element);
    } else if (element.getClass() == Complement) {
      this.addComplement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  addUnorderedItem(element) {
    this.getMarkdownElements().push(element);
  }
  addComplement(element) {
    var lastElement = this.getLastMarkdownElement();
    if (import_ts_parser_generator2.utils.Utils.isNulllOrUndefinedValue(lastElement)) {
      throw new Error(`Can no append complement to this markdown`);
    } else if (lastElement.getClass() == UnorderedItem2) {
      lastElement.addElement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toHtml() {
    var e = new UnorderedList();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var UnorderedItem2 = class extends MarkdownValueElement {
  constructor(orderTag, value) {
    super(value);
    this.complementBlock = null;
    this.orderTag = "";
    this.orderTag = orderTag;
  }
  getRawValue() {
    return this.orderTag + super.getRawValue();
  }
  addElement(element) {
    if (element.getClass() == Complement) {
      if (this.complementBlock == null) {
        this.complementBlock = new ComplementBlock();
      }
      this.complementBlock.addComplement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.getValue(), this.complementBlock].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  getComplementMarkdown() {
    return this.getLastMarkdownElement();
  }
  toHtml() {
    var e = new UnorderedItem(this.toValueHtml());
    if (this.complementBlock != null) {
      e.setComplementBlock(this.complementBlock.toHtml());
    }
    return e;
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var elements = [this];
    if (this.complementBlock != null && this.complementBlock.isHandled()) {
      childBlockquotes = childBlockquotes.concat(this.complementBlock.getUnhandledBlockquotes());
      elements.push(this.complementBlock);
    }
    var result = this.mergeUnhandledBlockquotes([elements]);
    return result.concat(childBlockquotes);
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElements([this, this.complementBlock]);
  }
};
var DefinitionList2 = class extends MarkdownElement {
  addElement(element) {
    if (element.getClass() == DefinitionItem2) {
      this.getMarkdownElements().push(element);
    } else if (element.getClass() == DefinitionItemValue2) {
      this.getLastMarkdownElement().addElement(element);
    } else if (element.getClass() == Complement) {
      this.getLastMarkdownElement().addElement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toHtml() {
    var e = new DefinitionList();
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var DefinitionItem2 = class extends MarkdownElement {
  constructor() {
    super(...arguments);
    this.term = null;
  }
  // elements : Array<MarkdownElement> | null = null
  setTerm(term) {
    this.term = term;
  }
  getTerm() {
    return this.term;
  }
  addElement(element) {
    if (element.getClass() == DefinitionItemValue2) {
      this.getMarkdownElements().push(element);
    } else if (element.getClass() == Complement) {
      this.getLastMarkdownElement().addElement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.getTerm()].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    var e = new DefinitionItem(this.term != null ? this.term.toHtml() : null);
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var DefinitionItemValue2 = class extends MarkdownValueElement {
  constructor() {
    super(...arguments);
    this.complementBlock = null;
  }
  addComplement(element) {
    if (this.complementBlock == null) {
      this.complementBlock = new ComplementBlock();
    }
    this.complementBlock.addComplement(element);
  }
  addElement(element) {
    if (element.getClass() == Complement) {
      this.addComplement(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.getValue(), this.complementBlock].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    var e = new DefinitionItemValue(this.value.toHtml());
    if (this.complementBlock != null) {
      e.setComplementBlock(this.complementBlock.toHtml());
    }
    return e;
  }
  getUnhandledBlockquotes() {
    var childBlockquotes = this.getUnhandledChildrenBlockquotes();
    var elements = [this];
    if (this.complementBlock != null && this.complementBlock.isHandled()) {
      childBlockquotes = childBlockquotes.concat(this.complementBlock.getUnhandledBlockquotes());
      elements.push(this.complementBlock);
    }
    var result = this.mergeUnhandledBlockquotes([elements]);
    return result.concat(childBlockquotes);
  }
  getUnhandledComplementBlocks() {
    return this.getUnhandledComplementBlockByMarkdownElements([this, this.complementBlock]);
  }
};
var Table2 = class extends MarkdownElement {
  constructor() {
    super(...arguments);
    this.headerRow = null;
    this.tableAlignmentRow = null;
  }
  setHeaderRow(headerRow) {
    this.headerRow = headerRow;
  }
  getHeaderRow() {
    return this.headerRow;
  }
  setTableAlignmentRow(tableAlignmentRow) {
    this.tableAlignmentRow = tableAlignmentRow;
  }
  getTableAlignmentRow() {
    return this.tableAlignmentRow;
  }
  addElement(element) {
    if (element.getClass() == TableRow2) {
      element.setTableAlignmentRow(this.tableAlignmentRow);
      this.getMarkdownElements().push(element);
    } else if (element.getClass() == TableAlignmentRow2) {
      this.addTableAlignmentRow(element);
    } else {
      throw new Error(`Can not add ${element.getClass().name} to ${this.getClass().name}`);
    }
  }
  addTableAlignmentRow(element) {
    if (this.getMarkdownElements().length == 0) {
      this.setTableAlignmentRow(element);
    } else if (this.getMarkdownElements().length == 1) {
      var previousRow = this.getMarkdownElements().pop();
      var headerRow = new TableRow2();
      var elements = previousRow.getMarkdownElements();
      elements.forEach((ele) => {
        var tableCell = ele;
        var tableHeadCell = new TableHeadCell2(headerRow);
        tableHeadCell.setMarkdownElements(tableCell.getMarkdownElements());
        headerRow.addChild(tableHeadCell);
      });
      this.setHeaderRow(headerRow);
      headerRow.setTableAlignmentRow(element);
      this.setTableAlignmentRow(element);
    }
  }
  toMarkdownHierarchy(intent = "", debug = false) {
    var subIntent = `${intent}    `;
    var resultArray = [this.getHeaderRow(), this.getTableAlignmentRow()].concat(this.getMarkdownElements()).filter((x) => x).map((markdownElement) => {
      if (markdownElement.toMarkdownHierarchy) {
        return markdownElement.toMarkdownHierarchy(subIntent, debug);
      } else {
        return [`${subIntent}${markdownElement}`];
      }
    });
    resultArray.unshift(`${intent}${this.constructor.name}` + (debug ? `[${this.getRawValue()}]` : ""));
    return [].concat.apply([], resultArray);
  }
  toHtml() {
    var headerRowHtml = this.getHeaderRow() == null ? null : this.getHeaderRow().toHtml();
    var tableAlignmentRowHtml = this.getTableAlignmentRow() == null ? null : this.getTableAlignmentRow().toHtml();
    var e = new Table(headerRowHtml, tableAlignmentRowHtml);
    e.setChildren(this.toChildrenMarkdownElementsHtml());
    return e;
  }
};
var Image2 = class extends MarkdownElement {
  constructor(alt, url, title = null) {
    super();
    this.alt = alt;
    this.url = url;
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
  getAlt() {
    return this.alt;
  }
  toHtml() {
    var e = new Image(this.url, this.alt == null ? null : this.alt, this.title == null ? null : this.title);
    return e;
  }
};
var Link2 = class extends MarkdownElement {
  constructor(alt, url, title = null) {
    super();
    this.alt = alt;
    this.url = url;
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
  getAlt() {
    return this.alt;
  }
  toHtml() {
    var e = new Link(this.alt.toHtml(), this.url, this.title == null ? null : this.title);
    return e;
  }
};

// src/Language_Function.ts
var MarkdownLanguageFunctionsEntity = class extends import_ts_parser_generator3.syntax.LanguageFunctionsEntity {
  Markdown__WholeMarkdownLine(argv) {
    var markdownLines = argv[0].value;
    var markdown = markdownLines.merge();
    return markdown;
  }
  WholeMarkdownLine__MarkdownLine_enter(argv) {
    var lines = new MarkdownLines();
    lines.addChild(argv[0].value);
    return lines;
  }
  WholeMarkdownLine__WholeMarkdownLine_MarkdownLine_enter(argv) {
    var lines = argv[0].value;
    lines.addChild(argv[1].value);
    return lines;
  }
  WholeMarkdownLine__ERROR_enter(argv) {
    var lines = new MarkdownLines();
    lines.addChild(new MarkdownError(argv[0].value));
    return lines;
  }
  WholeMarkdownLine__WholeMarkdownLine_ERROR_enter(argv) {
    var lines = argv[0].value;
    lines.addChild(new MarkdownError(argv[1].value));
    return lines;
  }
  WholeMarkdownLine__enter(argv) {
    var lines = new MarkdownLines();
    lines.addChild(new BlankLine2(argv[0].value));
    return lines;
  }
  WholeMarkdownLine__WholeMarkdownLine_enter(argv) {
    var lines = argv[0].value;
    lines.addChild(new BlankLine2(argv[1].value));
    return lines;
  }
  MarkdownLine__ERROR(argv) {
    return new MarkdownError(argv[0].value);
  }
  MarkdownLine__fencedCodeBlockTag(argv) {
    return new FencedCodeBlockText2(argv[0].value);
  }
  TableRow__verticalBar(argv) {
    var tableRow = new TableRow2();
    return tableRow;
  }
  TableRowWithCell__TableRow_Sentence(argv) {
    var tableRow = argv[0].value;
    var tableCell = new TableCell2(tableRow);
    tableCell.addChild(argv[1].value);
    tableRow.addChild(tableCell);
    return tableCell;
  }
  TableRowWithCell__TableRow_intent(argv) {
    var tableRow = argv[0].value;
    var tableCell = new TableCell2(tableRow);
    tableCell.addChild(new Spaces2(argv[1].value));
    tableRow.addChild(tableCell);
    return tableCell;
  }
  TableRowWithCell__TableRowWithCell_Sentence(argv) {
    var tableCell = argv[0].value;
    tableCell.addChild(argv[1].value);
    return tableCell;
  }
  TableRowWithCell__TableRowWithCell_intent(argv) {
    var tableCell = argv[0].value;
    tableCell.addChild(new Spaces2(argv[1].value));
    return tableCell;
  }
  TableRow__TableRowWithCell_verticalBar(argv) {
    var tableCell = argv[0].value;
    var tableRow = tableCell.getTableRow();
    return tableRow;
  }
  MarkdownLine__TableRow(argv) {
    return argv[0].value;
  }
  TableColumnAlignment__dashes3WithSpaces(argv) {
    var tableColumnAlignment = new TableNoAlignment2(argv[0].value);
    return tableColumnAlignment;
  }
  TableColumnAlignment__columnLeftAlignment(argv) {
    var tableColumnAlignment = new TableLeftAlignment2(argv[0].value);
    return tableColumnAlignment;
  }
  TableColumnAlignment__columnRightAlignment(argv) {
    var tableColumnAlignment = new TableRightAlignment2(argv[0].value);
    return tableColumnAlignment;
  }
  TableColumnAlignment__columnCenterAlignment(argv) {
    var tableColumnAlignment = new TableCenterAlignment2(argv[0].value);
    return tableColumnAlignment;
  }
  TableAlignmentRow__verticalBar_TableColumnAlignment_verticalBar(argv) {
    var tableAlignmentRow = new TableAlignmentRow2();
    tableAlignmentRow.addChild(argv[1].value);
    return tableAlignmentRow;
  }
  TableAlignmentRow__TableAlignmentRow_columnLeftAlignment_verticalBar(argv) {
    var tableAlignmentRow = argv[0].value;
    tableAlignmentRow.addChild(argv[1].value);
    return tableAlignmentRow;
  }
  MarkdownLine__TableAlignmentRow(argv) {
    return argv[0].value;
  }
  TaskListItem__checkedBox_spaces_MarkdownLine(argv) {
    return new TaskListItem2(true, argv[2].value);
  }
  TaskListItem__uncheckedBox_spaces_MarkdownLine(argv) {
    return new TaskListItem2(false, argv[2].value);
  }
  MarkdownLine__TaskListItem(argv) {
    return argv[0].value;
  }
  DefinitionItemValue__colonSign_spaces_MarkdownLine(argv) {
    return new DefinitionItemValue2(argv[2].value);
  }
  MarkdownLine__DefinitionItemValue(argv) {
    return argv[0].value;
  }
  Footnote__FootnoteReference_colonSign_spaces_MarkdownLine(argv) {
    var footNote = new Footnote2(argv[0].value, argv[3].value);
    return footNote;
  }
  MarkdownLine__Footnote(argv) {
    return argv[0].value;
  }
  EqualsRule__equals3(argv) {
    return new EqualsRule(argv[0].value);
  }
  MarkdownLine__EqualsRule(argv) {
    return argv[0].value;
  }
  DashesRule__dashes3(argv) {
    return new DashesRule(argv[0].value);
  }
  MarkdownLine__DashesRule(argv) {
    return argv[0].value;
  }
  toHorizontalRule(argv) {
    return new HorizontalRule2(argv[0].value);
  }
  MarkdownLine__HorizontalRule(argv) {
    return argv[0].value;
  }
  Blockquote__blockquoteBiggerSign_MarkdownLine(argv) {
    var result = new BlockquoteLine(argv[0].value);
    return result;
  }
  MarkdownLine__Blockquote(argv) {
    return argv[0].value;
  }
  Complement__spaces_MarkdownLine(argv) {
    var complement = new Complement(argv[0].value, argv[1].value);
    return complement;
  }
  Complement__intent(argv) {
    var complement = new Complement(argv[0].value, null);
    return complement;
  }
  MarkdownLine__Complement(argv) {
    return argv[0].value;
  }
  Heading__headingSharpSign_MarkdownLine(argv) {
    return new Heading2(argv[0].value.trim().length, argv[1].value);
  }
  Heading__headingSharpSign(argv) {
    return new Heading2(argv[0].value.trim().length, null);
  }
  Heading__headingSharpSignWithCursor_MarkdownLine(argv) {
    return new Heading2(argv[0].value.trim().length - 1, argv[1].value);
  }
  Heading__headingSharpSignWithCursor(argv) {
    return new Heading2(argv[0].value.trim().length - 1, null);
  }
  MarkdownLine__Heading(argv) {
    return argv[0].value;
  }
  OrderedItem__orderedItemTag_Sentence(argv) {
    var orderedItem = new OrderedItem2(argv[0].value, argv[1].value);
    return orderedItem;
  }
  OrderedItem__orderedItemTag(argv) {
    var orderedItem = new OrderedItem2(argv[0].value, null);
    return orderedItem;
  }
  OrderedItem__orderedItemTagWithCursor_Sentence(argv) {
    var orderedItem = new OrderedItem2(argv[0].value, argv[1].value);
    return orderedItem;
  }
  OrderedItem__orderedItemTagWithCursor(argv) {
    var orderedItem = new OrderedItem2(argv[0].value, null);
    return orderedItem;
  }
  MarkdownLine__OrderedItem(argv) {
    return argv[0].value;
  }
  UnorderedItem__unorderedItemTag_Sentence(argv) {
    var unorderedItem = new UnorderedItem2(argv[0].value, argv[1].value);
    return unorderedItem;
  }
  UnorderedItem__unorderedItemTag(argv) {
    var unorderedItem = new UnorderedItem2(argv[0].value, null);
    return unorderedItem;
  }
  UnorderedItem__unorderedItemTagWithCursor_Sentence(argv) {
    var unorderedItem = new UnorderedItem2(argv[0].value, argv[1].value);
    return unorderedItem;
  }
  UnorderedItem__unorderedItemTagWithCursor(argv) {
    var unorderedItem = new UnorderedItem2(argv[0].value, null);
    return unorderedItem;
  }
  MarkdownLine__UnorderedItem(argv) {
    return argv[0].value;
  }
  Sentence__Match_emphasis(argv) {
    var sentence = new Sentence2();
    sentence.addChild(argv[0].value);
    return sentence;
  }
  Sentence__Sentence_Match_emphasis(argv) {
    var sentence = argv[0].value;
    sentence.addChild(argv[1].value);
    return sentence;
  }
  MarkdownLine__Sentence(argv) {
    return argv[0].value;
  }
  PlainText__simpleText(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new SimpleText(argv[0].value));
    return plainText;
  }
  PlainText__spaces(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new Spaces2(argv[0].value));
    return plainText;
  }
  PlainText__Link(argv) {
    var plainText = new PlainText2();
    plainText.addChild(argv[0].value);
    return plainText;
  }
  PlainText__urlAddress(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new URLAddress(argv[0].value));
    return plainText;
  }
  PlainText__emailAddress(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new EmailAddress(argv[0].value));
    return plainText;
  }
  PlainText__Image(argv) {
    var plainText = new PlainText2();
    plainText.addChild(argv[0].value);
    return plainText;
  }
  PlainText__emoji(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new Emoji(argv[0].value));
    return plainText;
  }
  PlainText__FootnoteReference(argv) {
    var plainText = new PlainText2();
    plainText.addChild(argv[0].value);
    return plainText;
  }
  PlainText__cursor(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new Cursor2());
    return plainText;
  }
  PlainText__sharpSign(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new SimpleText(argv[0].value));
    return plainText;
  }
  PlainText__leftArrow(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new SimpleText(argv[0].value));
    return plainText;
  }
  PlainText__dashSign(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new SimpleText(argv[0].value));
    return plainText;
  }
  PlainText__plusSign(argv) {
    var plainText = new PlainText2();
    plainText.addChild(new SimpleText(argv[0].value));
    return plainText;
  }
  PlainText__PlainText_simpleText(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new SimpleText(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_spaces(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new Spaces2(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_Link(argv) {
    var plainText = argv[0].value;
    plainText.addChild(argv[1].value);
    return plainText;
  }
  PlainText__PlainText_urlAddress(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new URLAddress(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_emailAddress(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new EmailAddress(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_Image(argv) {
    var plainText = argv[0].value;
    plainText.addChild(argv[1].value);
    return plainText;
  }
  PlainText__PlainText_emoji(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new Emoji(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_FootnoteReference(argv) {
    var plainText = argv[0].value;
    plainText.addChild(argv[1].value);
    return plainText;
  }
  PlainText__PlainText_intent(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new Spaces2(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_cursor(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new Cursor2());
    return plainText;
  }
  PlainText__PlainText_sharpSign(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new SimpleText(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_leftArrow(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new SimpleText(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_dashSign(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new SimpleText(argv[1].value));
    return plainText;
  }
  PlainText__PlainText_plusSign(argv) {
    var plainText = argv[0].value;
    plainText.addChild(new SimpleText(argv[1].value));
    return plainText;
  }
  FootnoteReference__openSquareBracketWithCaret_simpleText_closeSquareBracket(argv) {
    return new FootnoteReference2(new SimpleText(argv[1].value));
  }
  Link__openSquareBracket_Sentence_closeSquareBracket_openParentheses_url_closeParentheses(argv) {
    return new Link2(argv[1].value, argv[4].value);
  }
  Link__openSquareBracket_Sentence_closeSquareBracket_openParentheses_url_spaces_doubleQuotationMarkText_closeParentheses(argv) {
    var title = argv[6].value;
    title = title.substring(1, title.length - 1);
    return new Link2(argv[1].value, argv[4].value, title);
  }
  Image__exclamationMarkOpenSquareBracket_PlainText_closeSquareBracket_openParentheses_url_spaces_doubleQuotationMarkText_closeParentheses(argv) {
    var alt = argv[1].value;
    var url = argv[4].value;
    var title = argv[6].value;
    title = title.substring(1, title.length - 1);
    return new Image2(alt.getRawValue(), url, title);
  }
  BeginStarBoldText__starBoldTag_NO_StarBoldText_Match_emphasis(argv) {
    var starBoldText = new StarBoldText();
    starBoldText.addChild(argv[1].value);
    return starBoldText;
  }
  BeginStarBoldText__BeginStarBoldText_NO_StarBoldText_Match_emphasis(argv) {
    var starBoldText = argv[0].value;
    starBoldText.addChild(argv[1].value);
    return starBoldText;
  }
  StarBoldText__BeginStarBoldText_starBoldTag(argv) {
    return argv[0].value;
  }
  BeginUnderlineBoldText__underlineBoldTag_NO_UnderlineBoldText_Match_emphasis(argv) {
    var underlineBoldText = new UnderlineBoldText();
    underlineBoldText.addChild(argv[1].value);
    return underlineBoldText;
  }
  BeginUnderlineBoldText__BeginUnderlineBoldText_NO_UnderlineBoldText_Match_emphasis(argv) {
    var underlineBoldText = argv[0].value;
    underlineBoldText.addChild(argv[1].value);
    return underlineBoldText;
  }
  UnderlineBoldText__BeginUnderlineBoldText_underlineBoldTag(argv) {
    return argv[0].value;
  }
  BeginStarItalicText__starItalicTag_NO_StarItalicText_Match_emphasis(argv) {
    var starItalicText = new StarItalicText();
    starItalicText.addChild(argv[1].value);
    return starItalicText;
  }
  BeginStarItalicText__BeginStarItalicText_NO_StarItalicText_Match_emphasis(argv) {
    var starItalicText = argv[0].value;
    starItalicText.addChild(argv[1].value);
    return starItalicText;
  }
  StarItalicText__BeginStarItalicText_starItalicTag(argv) {
    return argv[0].value;
  }
  BeginUnderlineItalicText__underlineItalicTag_NO_UnderlineItalicText_Match_emphasis(argv) {
    var underlineItalicText = new UnderlineItalicText();
    underlineItalicText.addChild(argv[1].value);
    return underlineItalicText;
  }
  BeginUnderlineItalicText__BeginUnderlineItalicText_NO_UnderlineItalicText_Match_emphasis(argv) {
    var underlineItalicText = argv[0].value;
    underlineItalicText.addChild(argv[1].value);
    return underlineItalicText;
  }
  UnderlineItalicText__BeginUnderlineItalicText_underlineItalicTag(argv) {
    return argv[0].value;
  }
  BeginStarBoldItalicText__starBoldItalicTag_NO_StarBoldItalicText_Match_emphasis(argv) {
    var starBoldItalicText = new StarBoldItalicText();
    starBoldItalicText.addChild(argv[1].value);
    return starBoldItalicText;
  }
  BeginStarBoldItalicText__BeginStarBoldItalicText_NO_StarBoldItalicText_Match_emphasis(argv) {
    var starBoldItalicText = argv[0].value;
    starBoldItalicText.addChild(argv[1].value);
    return starBoldItalicText;
  }
  StarBoldItalicText__BeginStarBoldItalicText_starBoldItalicTag(argv) {
    return argv[0].value;
  }
  BeginUnderlineBoldItalicText__underlineBoldItalicTag_NO_UnderlineBoldItalicText_Match_emphasis(argv) {
    var underlineBoldItalicText = new UnderlineBoldItalicText();
    underlineBoldItalicText.addChild(argv[1].value);
    return underlineBoldItalicText;
  }
  BeginUnderlineBoldItalicText__BeginUnderlineBoldItalicText_NO_UnderlineBoldItalicText_Match_emphasis(argv) {
    var underlineBoldItalicText = argv[0].value;
    underlineBoldItalicText.addChild(argv[1].value);
    return underlineBoldItalicText;
  }
  UnderlineBoldItalicText__BeginUnderlineBoldItalicText_underlineBoldItalicTag(argv) {
    return argv[0].value;
  }
  BeginStrikethroughText__strikethroughTag_NO_StrikethroughText_Match_emphasis(argv) {
    var strikethroughText = new StrikethroughText();
    strikethroughText.addChild(argv[1].value);
    return strikethroughText;
  }
  BeginStrikethroughText__BeginStrikethroughText_NO_StrikethroughText_Match_emphasis(argv) {
    var strikethroughText = argv[0].value;
    strikethroughText.addChild(argv[1].value);
    return strikethroughText;
  }
  StrikethroughText__BeginStrikethroughText_strikethroughTag(argv) {
    return argv[0].value;
  }
  BeginHighlightText__highlightTag_NO_HighlightText_Match_emphasis(argv) {
    var highlightText = new HighlightText();
    highlightText.addChild(argv[1].value);
    return highlightText;
  }
  BeginHighlightText__BeginHighlightText_NO_HighlightText_Match_emphasis(argv) {
    var highlightText = argv[0].value;
    highlightText.addChild(argv[1].value);
    return highlightText;
  }
  HighlightText__BeginHighlightText_highlightTag(argv) {
    return argv[0].value;
  }
  BeginSubscriptText__subscriptTag_NO_SubscriptText_Match_emphasis(argv) {
    var subscriptText = new SubscriptText();
    subscriptText.addChild(argv[1].value);
    return subscriptText;
  }
  BeginSubscriptText__BeginSubscriptText_NO_SubscriptText_Match_emphasis(argv) {
    var subscriptText = argv[0].value;
    subscriptText.addChild(argv[1].value);
    return subscriptText;
  }
  SubscriptText__BeginSubscriptText_subscriptTag(argv) {
    return argv[0].value;
  }
  BeginSuperscriptText__superscriptTag_NO_SuperscriptText_Match_emphasis(argv) {
    var superscriptText = new SuperscriptText();
    superscriptText.addChild(argv[1].value);
    return superscriptText;
  }
  BeginSuperscriptText__BeginSuperscriptText_NO_SuperscriptText_Match_emphasis(argv) {
    var superscriptText = argv[0].value;
    superscriptText.addChild(argv[1].value);
    return superscriptText;
  }
  SuperscriptText__BeginSuperscriptText_superscriptTag(argv) {
    return argv[0].value;
  }
  BeginDoubleBacktickText__doubleBacktickTag_NO_DoubleBacktickText_Match_emphasis(argv) {
    var doubleBacktickText = new DoubleBacktickText2();
    doubleBacktickText.addChild(argv[1].value);
    return doubleBacktickText;
  }
  BeginDoubleBacktickText__BeginDoubleBacktickText_NO_DoubleBacktickText_Match_emphasis(argv) {
    var doubleBacktickText = argv[0].value;
    doubleBacktickText.addChild(argv[1].value);
    return doubleBacktickText;
  }
  DoubleBacktickText__BeginDoubleBacktickText_doubleBacktickTag(argv) {
    return argv[0].value;
  }
  BeginBacktickText__backtickTag_NO_BacktickText_Match_emphasis(argv) {
    var backtickText = new BacktickText2();
    backtickText.setBeginTag(argv[0].value);
    backtickText.addChild(argv[1].value);
    return backtickText;
  }
  BeginBacktickText__BeginBacktickText_NO_BacktickText_Match_emphasis(argv) {
    var backtickText = argv[0].value;
    backtickText.addChild(argv[1].value);
    return backtickText;
  }
  BacktickText__BeginBacktickText_backtickTag(argv) {
    var backtickText = argv[0].value;
    backtickText.setEndTag(argv[1].value);
    return argv[0].value;
  }
  passValueFunc(argv) {
    return argv[0].value;
  }
};
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(
    `
        Markdown -> WholeMarkdownLine
        `
  )
], MarkdownLanguageFunctionsEntity.prototype, "Markdown__WholeMarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`WholeMarkdownLine -> MarkdownLine enter`)
], MarkdownLanguageFunctionsEntity.prototype, "WholeMarkdownLine__MarkdownLine_enter", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine MarkdownLine enter`)
], MarkdownLanguageFunctionsEntity.prototype, "WholeMarkdownLine__WholeMarkdownLine_MarkdownLine_enter", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`WholeMarkdownLine -> <ERROR> enter`)
], MarkdownLanguageFunctionsEntity.prototype, "WholeMarkdownLine__ERROR_enter", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine <ERROR> enter`)
], MarkdownLanguageFunctionsEntity.prototype, "WholeMarkdownLine__WholeMarkdownLine_ERROR_enter", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`WholeMarkdownLine -> enter`)
], MarkdownLanguageFunctionsEntity.prototype, "WholeMarkdownLine__enter", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`WholeMarkdownLine -> WholeMarkdownLine enter`)
], MarkdownLanguageFunctionsEntity.prototype, "WholeMarkdownLine__WholeMarkdownLine_enter", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> <ERROR>`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__ERROR", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> fencedCodeBlockTag`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__fencedCodeBlockTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableRow -> verticalBar`)
], MarkdownLanguageFunctionsEntity.prototype, "TableRow__verticalBar", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableRowWithCell -> TableRow Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "TableRowWithCell__TableRow_Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableRowWithCell -> TableRow intent`)
], MarkdownLanguageFunctionsEntity.prototype, "TableRowWithCell__TableRow_intent", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableRowWithCell -> TableRowWithCell Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "TableRowWithCell__TableRowWithCell_Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableRowWithCell -> TableRowWithCell intent`)
], MarkdownLanguageFunctionsEntity.prototype, "TableRowWithCell__TableRowWithCell_intent", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableRow -> TableRowWithCell verticalBar`)
], MarkdownLanguageFunctionsEntity.prototype, "TableRow__TableRowWithCell_verticalBar", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> TableRow`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__TableRow", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableColumnAlignment -> dashes3WithSpaces`)
], MarkdownLanguageFunctionsEntity.prototype, "TableColumnAlignment__dashes3WithSpaces", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableColumnAlignment -> columnLeftAlignment`)
], MarkdownLanguageFunctionsEntity.prototype, "TableColumnAlignment__columnLeftAlignment", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableColumnAlignment -> columnRightAlignment`)
], MarkdownLanguageFunctionsEntity.prototype, "TableColumnAlignment__columnRightAlignment", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableColumnAlignment -> columnCenterAlignment`)
], MarkdownLanguageFunctionsEntity.prototype, "TableColumnAlignment__columnCenterAlignment", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableAlignmentRow -> verticalBar TableColumnAlignment verticalBar`)
], MarkdownLanguageFunctionsEntity.prototype, "TableAlignmentRow__verticalBar_TableColumnAlignment_verticalBar", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TableAlignmentRow -> TableAlignmentRow TableColumnAlignment verticalBar`)
], MarkdownLanguageFunctionsEntity.prototype, "TableAlignmentRow__TableAlignmentRow_columnLeftAlignment_verticalBar", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> TableAlignmentRow`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__TableAlignmentRow", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TaskListItem -> checkedBox spaces MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "TaskListItem__checkedBox_spaces_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`TaskListItem -> uncheckedBox spaces MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "TaskListItem__uncheckedBox_spaces_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> TaskListItem`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__TaskListItem", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`DefinitionItemValue -> colonSign spaces MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "DefinitionItemValue__colonSign_spaces_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> DefinitionItemValue`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__DefinitionItemValue", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Footnote -> FootnoteReference colonSign spaces MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "Footnote__FootnoteReference_colonSign_spaces_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> Footnote`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__Footnote", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`EqualsRule -> equals3`)
], MarkdownLanguageFunctionsEntity.prototype, "EqualsRule__equals3", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> EqualsRule`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__EqualsRule", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`DashesRule -> dashes3`)
], MarkdownLanguageFunctionsEntity.prototype, "DashesRule__dashes3", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> DashesRule`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__DashesRule", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`
        HorizontalRule -> StarBoldItalicTag
        HorizontalRule -> UnderlineBoldItalicTag
        HorizontalRule -> underscores
        HorizontalRule -> asterisks4
    `)
], MarkdownLanguageFunctionsEntity.prototype, "toHorizontalRule", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> HorizontalRule`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__HorizontalRule", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BlockquoteLine -> blockquoteBiggerSignLine`)
], MarkdownLanguageFunctionsEntity.prototype, "Blockquote__blockquoteBiggerSign_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> BlockquoteLine`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__Blockquote", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Complement -> intent MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "Complement__spaces_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Complement -> intent`)
], MarkdownLanguageFunctionsEntity.prototype, "Complement__intent", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> Complement`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__Complement", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Heading -> headingSharpSign MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "Heading__headingSharpSign_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Heading -> headingSharpSign`)
], MarkdownLanguageFunctionsEntity.prototype, "Heading__headingSharpSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Heading -> headingSharpSignWithCursor MarkdownLine`)
], MarkdownLanguageFunctionsEntity.prototype, "Heading__headingSharpSignWithCursor_MarkdownLine", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Heading -> headingSharpSignWithCursor`)
], MarkdownLanguageFunctionsEntity.prototype, "Heading__headingSharpSignWithCursor", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> Heading`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__Heading", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`OrderedItem -> orderedItemTag Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "OrderedItem__orderedItemTag_Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`OrderedItem -> orderedItemTag`)
], MarkdownLanguageFunctionsEntity.prototype, "OrderedItem__orderedItemTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`OrderedItem -> orderedItemTagWithCursor Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "OrderedItem__orderedItemTagWithCursor_Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`OrderedItem -> orderedItemTagWithCursor`)
], MarkdownLanguageFunctionsEntity.prototype, "OrderedItem__orderedItemTagWithCursor", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> OrderedItem`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__OrderedItem", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnorderedItem -> unorderedItemTag Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "UnorderedItem__unorderedItemTag_Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnorderedItem -> unorderedItemTag`)
], MarkdownLanguageFunctionsEntity.prototype, "UnorderedItem__unorderedItemTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnorderedItem -> unorderedItemTagWithCursor Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "UnorderedItem__unorderedItemTagWithCursor_Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnorderedItem -> unorderedItemTagWithCursor`)
], MarkdownLanguageFunctionsEntity.prototype, "UnorderedItem__unorderedItemTagWithCursor", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> UnorderedItem`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__UnorderedItem", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Sentence -> Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "Sentence__Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Sentence -> Sentence Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "Sentence__Sentence_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`MarkdownLine -> Sentence`)
], MarkdownLanguageFunctionsEntity.prototype, "MarkdownLine__Sentence", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> simpleText`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__simpleText", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> spaces`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__spaces", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> Link`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__Link", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> urlAddress`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__urlAddress", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> emailAddress`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__emailAddress", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> Image`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__Image", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> emoji`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__emoji", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> FootnoteReference`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__FootnoteReference", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> cursor`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__cursor", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> sharpSign`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__sharpSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> leftArrow`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__leftArrow", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> dashSign`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__dashSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> plusSign`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__plusSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText simpleText`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_simpleText", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText spaces`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_spaces", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText Link`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_Link", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText urlAddress`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_urlAddress", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText emailAddress`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_emailAddress", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText Image`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_Image", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText emoji`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_emoji", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText FootnoteReference`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_FootnoteReference", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText intent`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_intent", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText cursor`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_cursor", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText sharpSign`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_sharpSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText leftArrow`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_leftArrow", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText dashSign`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_dashSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`PlainText -> PlainText plusSign`)
], MarkdownLanguageFunctionsEntity.prototype, "PlainText__PlainText_plusSign", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`FootnoteReference -> openSquareBracketWithCaret simpleText closeSquareBracket`)
], MarkdownLanguageFunctionsEntity.prototype, "FootnoteReference__openSquareBracketWithCaret_simpleText_closeSquareBracket", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Link -> openSquareBracket Sentence closeSquareBracket openParentheses url closeParentheses`)
], MarkdownLanguageFunctionsEntity.prototype, "Link__openSquareBracket_Sentence_closeSquareBracket_openParentheses_url_closeParentheses", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Link -> openSquareBracket Sentence closeSquareBracket openParentheses url spaces doubleQuotationMarkText closeParentheses`)
], MarkdownLanguageFunctionsEntity.prototype, "Link__openSquareBracket_Sentence_closeSquareBracket_openParentheses_url_spaces_doubleQuotationMarkText_closeParentheses", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`Image -> exclamationMarkOpenSquareBracket PlainText closeSquareBracket openParentheses url spaces doubleQuotationMarkText closeParentheses`)
], MarkdownLanguageFunctionsEntity.prototype, "Image__exclamationMarkOpenSquareBracket_PlainText_closeSquareBracket_openParentheses_url_spaces_doubleQuotationMarkText_closeParentheses", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStarBoldText -> starBoldTag NO_StarBoldText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStarBoldText__starBoldTag_NO_StarBoldText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStarBoldText -> BeginStarBoldText NO_StarBoldText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStarBoldText__BeginStarBoldText_NO_StarBoldText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`StarBoldText -> BeginStarBoldText starBoldTag`)
], MarkdownLanguageFunctionsEntity.prototype, "StarBoldText__BeginStarBoldText_starBoldTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginUnderlineBoldText -> underlineBoldTag NO_UnderlineBoldText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginUnderlineBoldText__underlineBoldTag_NO_UnderlineBoldText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginUnderlineBoldText -> BeginUnderlineBoldText NO_UnderlineBoldText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginUnderlineBoldText__BeginUnderlineBoldText_NO_UnderlineBoldText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnderlineBoldText -> BeginUnderlineBoldText underlineBoldTag`)
], MarkdownLanguageFunctionsEntity.prototype, "UnderlineBoldText__BeginUnderlineBoldText_underlineBoldTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStarItalicText -> starItalicTag NO_StarItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStarItalicText__starItalicTag_NO_StarItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStarItalicText -> BeginStarItalicText NO_StarItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStarItalicText__BeginStarItalicText_NO_StarItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`StarItalicText -> BeginStarItalicText starItalicTag`)
], MarkdownLanguageFunctionsEntity.prototype, "StarItalicText__BeginStarItalicText_starItalicTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginUnderlineItalicText -> underlineItalicTag NO_UnderlineItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginUnderlineItalicText__underlineItalicTag_NO_UnderlineItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginUnderlineItalicText -> BeginUnderlineItalicText NO_UnderlineItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginUnderlineItalicText__BeginUnderlineItalicText_NO_UnderlineItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnderlineItalicText -> BeginUnderlineItalicText underlineItalicTag`)
], MarkdownLanguageFunctionsEntity.prototype, "UnderlineItalicText__BeginUnderlineItalicText_underlineItalicTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStarBoldItalicText -> starBoldItalicTag NO_StarBoldItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStarBoldItalicText__starBoldItalicTag_NO_StarBoldItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStarBoldItalicText -> BeginStarBoldItalicText NO_StarBoldItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStarBoldItalicText__BeginStarBoldItalicText_NO_StarBoldItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`StarBoldItalicText -> BeginStarBoldItalicText starBoldItalicTag`)
], MarkdownLanguageFunctionsEntity.prototype, "StarBoldItalicText__BeginStarBoldItalicText_starBoldItalicTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginUnderlineBoldItalicText -> underlineBoldItalicTag NO_UnderlineBoldItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginUnderlineBoldItalicText__underlineBoldItalicTag_NO_UnderlineBoldItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginUnderlineBoldItalicText -> BeginUnderlineBoldItalicText NO_UnderlineBoldItalicText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginUnderlineBoldItalicText__BeginUnderlineBoldItalicText_NO_UnderlineBoldItalicText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`UnderlineBoldItalicText -> BeginUnderlineBoldItalicText underlineBoldItalicTag`)
], MarkdownLanguageFunctionsEntity.prototype, "UnderlineBoldItalicText__BeginUnderlineBoldItalicText_underlineBoldItalicTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStrikethroughText -> strikethroughTag NO_StrikethroughText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStrikethroughText__strikethroughTag_NO_StrikethroughText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginStrikethroughText -> BeginStrikethroughText NO_StrikethroughText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginStrikethroughText__BeginStrikethroughText_NO_StrikethroughText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`StrikethroughText -> BeginStrikethroughText strikethroughTag`)
], MarkdownLanguageFunctionsEntity.prototype, "StrikethroughText__BeginStrikethroughText_strikethroughTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginHighlightText -> highlightTag NO_HighlightText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginHighlightText__highlightTag_NO_HighlightText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginHighlightText -> BeginHighlightText NO_HighlightText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginHighlightText__BeginHighlightText_NO_HighlightText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`HighlightText -> BeginHighlightText highlightTag`)
], MarkdownLanguageFunctionsEntity.prototype, "HighlightText__BeginHighlightText_highlightTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginSubscriptText -> subscriptTag NO_SubscriptText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginSubscriptText__subscriptTag_NO_SubscriptText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginSubscriptText -> BeginSubscriptText NO_SubscriptText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginSubscriptText__BeginSubscriptText_NO_SubscriptText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`SubscriptText -> BeginSubscriptText subscriptTag`)
], MarkdownLanguageFunctionsEntity.prototype, "SubscriptText__BeginSubscriptText_subscriptTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginSuperscriptText -> superscriptTag NO_SuperscriptText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginSuperscriptText__superscriptTag_NO_SuperscriptText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginSuperscriptText -> BeginSuperscriptText NO_SuperscriptText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginSuperscriptText__BeginSuperscriptText_NO_SuperscriptText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`SuperscriptText -> BeginSuperscriptText superscriptTag`)
], MarkdownLanguageFunctionsEntity.prototype, "SuperscriptText__BeginSuperscriptText_superscriptTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginDoubleBacktickText -> doubleBacktickTag NO_DoubleBacktickText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginDoubleBacktickText__doubleBacktickTag_NO_DoubleBacktickText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginDoubleBacktickText -> BeginDoubleBacktickText NO_DoubleBacktickText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginDoubleBacktickText__BeginDoubleBacktickText_NO_DoubleBacktickText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`DoubleBacktickText -> BeginDoubleBacktickText doubleBacktickTag`)
], MarkdownLanguageFunctionsEntity.prototype, "DoubleBacktickText__BeginDoubleBacktickText_doubleBacktickTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginBacktickText -> backtickTag NO_BacktickText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginBacktickText__backtickTag_NO_BacktickText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BeginBacktickText -> BeginBacktickText NO_BacktickText_Match_emphasis`)
], MarkdownLanguageFunctionsEntity.prototype, "BeginBacktickText__BeginBacktickText_NO_BacktickText_Match_emphasis", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`BacktickText -> BeginBacktickText backtickTag`)
], MarkdownLanguageFunctionsEntity.prototype, "BacktickText__BeginBacktickText_backtickTag", 1);
__decorateClass([
  import_ts_parser_generator3.syntax.GrammarProductionFunction(`
        NO_StarBoldText_Match_emphasis -> PlainText
        NO_StarBoldText_Match_emphasis -> UnderlineBoldText
        NO_StarBoldText_Match_emphasis -> StarItalicText
        NO_StarBoldText_Match_emphasis -> UnderlineItalicText
        NO_StarBoldText_Match_emphasis -> StarBoldItalicText
        NO_StarBoldText_Match_emphasis -> UnderlineBoldItalicText
        NO_StarBoldText_Match_emphasis -> StrikethroughText
        NO_StarBoldText_Match_emphasis -> HighlightText
        NO_StarBoldText_Match_emphasis -> SubscriptText
        NO_StarBoldText_Match_emphasis -> SuperscriptText
        NO_StarBoldText_Match_emphasis -> DoubleBacktickText
        NO_StarBoldText_Match_emphasis -> BacktickText
        
        NO_UnderlineBoldText_Match_emphasis -> PlainText
        NO_UnderlineBoldText_Match_emphasis -> StarBoldText
        NO_UnderlineBoldText_Match_emphasis -> StarItalicText
        NO_UnderlineBoldText_Match_emphasis -> UnderlineItalicText
        NO_UnderlineBoldText_Match_emphasis -> StarBoldItalicText
        NO_UnderlineBoldText_Match_emphasis -> UnderlineBoldItalicText
        NO_UnderlineBoldText_Match_emphasis -> StrikethroughText
        NO_UnderlineBoldText_Match_emphasis -> HighlightText
        NO_UnderlineBoldText_Match_emphasis -> SubscriptText
        NO_UnderlineBoldText_Match_emphasis -> SuperscriptText
        NO_UnderlineBoldText_Match_emphasis -> DoubleBacktickText
        NO_UnderlineBoldText_Match_emphasis -> BacktickText
        
        NO_StarItalicText_Match_emphasis -> PlainText
        NO_StarItalicText_Match_emphasis -> StarBoldText
        NO_StarItalicText_Match_emphasis -> UnderlineBoldText
        NO_StarItalicText_Match_emphasis -> UnderlineItalicText
        NO_StarItalicText_Match_emphasis -> StarBoldItalicText
        NO_StarItalicText_Match_emphasis -> UnderlineBoldItalicText
        NO_StarItalicText_Match_emphasis -> StrikethroughText
        NO_StarItalicText_Match_emphasis -> HighlightText
        NO_StarItalicText_Match_emphasis -> SubscriptText
        NO_StarItalicText_Match_emphasis -> SuperscriptText
        NO_StarItalicText_Match_emphasis -> DoubleBacktickText
        NO_StarItalicText_Match_emphasis -> BacktickText
        
        NO_UnderlineItalicText_Match_emphasis -> PlainText
        NO_UnderlineItalicText_Match_emphasis -> StarBoldText
        NO_UnderlineItalicText_Match_emphasis -> UnderlineBoldText
        NO_UnderlineItalicText_Match_emphasis -> StarItalicText
        NO_UnderlineItalicText_Match_emphasis -> StarBoldItalicText
        NO_UnderlineItalicText_Match_emphasis -> UnderlineBoldItalicText
        NO_UnderlineItalicText_Match_emphasis -> StrikethroughText
        NO_UnderlineItalicText_Match_emphasis -> HighlightText
        NO_UnderlineItalicText_Match_emphasis -> SubscriptText
        NO_UnderlineItalicText_Match_emphasis -> SuperscriptText
        NO_UnderlineItalicText_Match_emphasis -> DoubleBacktickText
        NO_UnderlineItalicText_Match_emphasis -> BacktickText
        
        NO_StarBoldItalicText_Match_emphasis -> PlainText
        NO_StarBoldItalicText_Match_emphasis -> StarBoldText
        NO_StarBoldItalicText_Match_emphasis -> UnderlineBoldText
        NO_StarBoldItalicText_Match_emphasis -> StarItalicText
        NO_StarBoldItalicText_Match_emphasis -> UnderlineItalicText
        NO_StarBoldItalicText_Match_emphasis -> UnderlineBoldItalicText
        NO_StarBoldItalicText_Match_emphasis -> StrikethroughText
        NO_StarBoldItalicText_Match_emphasis -> HighlightText
        NO_StarBoldItalicText_Match_emphasis -> SubscriptText
        NO_StarBoldItalicText_Match_emphasis -> SuperscriptText
        NO_StarBoldItalicText_Match_emphasis -> DoubleBacktickText
        NO_StarBoldItalicText_Match_emphasis -> BacktickText
        
        NO_UnderlineBoldItalicText_Match_emphasis -> PlainText
        NO_UnderlineBoldItalicText_Match_emphasis -> StarBoldText
        NO_UnderlineBoldItalicText_Match_emphasis -> UnderlineBoldText
        NO_UnderlineBoldItalicText_Match_emphasis -> StarItalicText
        NO_UnderlineBoldItalicText_Match_emphasis -> UnderlineItalicText
        NO_UnderlineBoldItalicText_Match_emphasis -> StarBoldItalicText
        NO_UnderlineBoldItalicText_Match_emphasis -> StrikethroughText
        NO_UnderlineBoldItalicText_Match_emphasis -> HighlightText
        NO_UnderlineBoldItalicText_Match_emphasis -> SubscriptText
        NO_UnderlineBoldItalicText_Match_emphasis -> SuperscriptText
        NO_UnderlineBoldItalicText_Match_emphasis -> DoubleBacktickText
        NO_UnderlineBoldItalicText_Match_emphasis -> BacktickText
        
        NO_StrikethroughText_Match_emphasis -> PlainText
        NO_StrikethroughText_Match_emphasis -> StarBoldText
        NO_StrikethroughText_Match_emphasis -> UnderlineBoldText
        NO_StrikethroughText_Match_emphasis -> StarItalicText
        NO_StrikethroughText_Match_emphasis -> UnderlineItalicText
        NO_StrikethroughText_Match_emphasis -> StarBoldItalicText
        NO_StrikethroughText_Match_emphasis -> UnderlineBoldItalicText
        NO_StrikethroughText_Match_emphasis -> HighlightText
        NO_StrikethroughText_Match_emphasis -> SubscriptText
        NO_StrikethroughText_Match_emphasis -> SuperscriptText
        NO_StrikethroughText_Match_emphasis -> DoubleBacktickText
        NO_StrikethroughText_Match_emphasis -> BacktickText
        
        NO_HighlightText_Match_emphasis -> PlainText
        NO_HighlightText_Match_emphasis -> StarBoldText
        NO_HighlightText_Match_emphasis -> UnderlineBoldText
        NO_HighlightText_Match_emphasis -> StarItalicText
        NO_HighlightText_Match_emphasis -> UnderlineItalicText
        NO_HighlightText_Match_emphasis -> StarBoldItalicText
        NO_HighlightText_Match_emphasis -> UnderlineBoldItalicText
        NO_HighlightText_Match_emphasis -> StrikethroughText
        NO_HighlightText_Match_emphasis -> SubscriptText
        NO_HighlightText_Match_emphasis -> SuperscriptText
        NO_HighlightText_Match_emphasis -> DoubleBacktickText
        NO_HighlightText_Match_emphasis -> BacktickText
        
        NO_SubscriptText_Match_emphasis -> PlainText
        NO_SubscriptText_Match_emphasis -> StarBoldText
        NO_SubscriptText_Match_emphasis -> UnderlineBoldText
        NO_SubscriptText_Match_emphasis -> StarItalicText
        NO_SubscriptText_Match_emphasis -> UnderlineItalicText
        NO_SubscriptText_Match_emphasis -> StarBoldItalicText
        NO_SubscriptText_Match_emphasis -> UnderlineBoldItalicText
        NO_SubscriptText_Match_emphasis -> StrikethroughText
        NO_SubscriptText_Match_emphasis -> HighlightText
        NO_SubscriptText_Match_emphasis -> SuperscriptText
        NO_SubscriptText_Match_emphasis -> DoubleBacktickText
        NO_SubscriptText_Match_emphasis -> BacktickText
        
        NO_SuperscriptText_Match_emphasis -> PlainText
        NO_SuperscriptText_Match_emphasis -> StarBoldText
        NO_SuperscriptText_Match_emphasis -> UnderlineBoldText
        NO_SuperscriptText_Match_emphasis -> StarItalicText
        NO_SuperscriptText_Match_emphasis -> UnderlineItalicText
        NO_SuperscriptText_Match_emphasis -> StarBoldItalicText
        NO_SuperscriptText_Match_emphasis -> UnderlineBoldItalicText
        NO_SuperscriptText_Match_emphasis -> StrikethroughText
        NO_SuperscriptText_Match_emphasis -> HighlightText
        NO_SuperscriptText_Match_emphasis -> SubscriptText
        NO_SuperscriptText_Match_emphasis -> DoubleBacktickText
        NO_SuperscriptText_Match_emphasis -> BacktickText
        
        NO_DoubleBacktickText_Match_emphasis -> PlainText
        NO_DoubleBacktickText_Match_emphasis -> StarBoldText
        NO_DoubleBacktickText_Match_emphasis -> UnderlineBoldText
        NO_DoubleBacktickText_Match_emphasis -> StarItalicText
        NO_DoubleBacktickText_Match_emphasis -> UnderlineItalicText
        NO_DoubleBacktickText_Match_emphasis -> StarBoldItalicText
        NO_DoubleBacktickText_Match_emphasis -> UnderlineBoldItalicText
        NO_DoubleBacktickText_Match_emphasis -> StrikethroughText
        NO_DoubleBacktickText_Match_emphasis -> HighlightText
        NO_DoubleBacktickText_Match_emphasis -> SubscriptText
        NO_DoubleBacktickText_Match_emphasis -> SuperscriptText
        NO_DoubleBacktickText_Match_emphasis -> BacktickText
        
        NO_BacktickText_Match_emphasis -> PlainText
        NO_BacktickText_Match_emphasis -> StarBoldText
        NO_BacktickText_Match_emphasis -> UnderlineBoldText
        NO_BacktickText_Match_emphasis -> StarItalicText
        NO_BacktickText_Match_emphasis -> UnderlineItalicText
        NO_BacktickText_Match_emphasis -> StarBoldItalicText
        NO_BacktickText_Match_emphasis -> UnderlineBoldItalicText
        NO_BacktickText_Match_emphasis -> StrikethroughText
        NO_BacktickText_Match_emphasis -> HighlightText
        NO_BacktickText_Match_emphasis -> SubscriptText
        NO_BacktickText_Match_emphasis -> SuperscriptText
        NO_BacktickText_Match_emphasis -> DoubleBacktickText
        Match_emphasis -> PlainText
        Match_emphasis -> StarBoldText
        Match_emphasis -> UnderlineBoldText
        Match_emphasis -> StarItalicText
        Match_emphasis -> UnderlineItalicText
        Match_emphasis -> StarBoldItalicText
        Match_emphasis -> UnderlineBoldItalicText
        Match_emphasis -> StrikethroughText
        Match_emphasis -> HighlightText
        Match_emphasis -> SubscriptText
        Match_emphasis -> SuperscriptText
        Match_emphasis -> DoubleBacktickText
        Match_emphasis -> BacktickText
    `)
], MarkdownLanguageFunctionsEntity.prototype, "passValueFunc", 1);

// src/markdownDefinition.ts
var definition = { "languageDefinition": "\nMarkdown -> WholeMarkdownLine\n\nWholeMarkdownLine -> MarkdownLine enter\nWholeMarkdownLine -> WholeMarkdownLine MarkdownLine enter\n\nWholeMarkdownLine -> <ERROR> enter\nWholeMarkdownLine -> WholeMarkdownLine <ERROR> enter\n\nWholeMarkdownLine -> enter\nWholeMarkdownLine -> WholeMarkdownLine enter\n\nMarkdownLine -> <ERROR>\n\nMarkdownLine -> fencedCodeBlockTag\n\nTableRow -> verticalBar\nTableRowWithCell -> TableRow Sentence\nTableRowWithCell -> TableRow intent\n\nTableRowWithCell -> TableRowWithCell Sentence\nTableRowWithCell -> TableRowWithCell intent\n\nTableRow -> TableRowWithCell verticalBar\n\nMarkdownLine -> TableRow\n\nTableColumnAlignment -> dashes3WithSpaces\nTableColumnAlignment -> columnLeftAlignment\nTableColumnAlignment -> columnRightAlignment\nTableColumnAlignment -> columnCenterAlignment\n\nTableAlignmentRow -> verticalBar TableColumnAlignment verticalBar\nTableAlignmentRow -> TableAlignmentRow TableColumnAlignment verticalBar\nMarkdownLine -> TableAlignmentRow\n\nTaskListItem -> checkedBox spaces MarkdownLine\nTaskListItem -> uncheckedBox spaces MarkdownLine\nMarkdownLine -> TaskListItem\n\nDefinitionItemValue -> colonSign spaces MarkdownLine\nMarkdownLine -> DefinitionItemValue\n\nFootnote -> FootnoteReference colonSign spaces MarkdownLine\nMarkdownLine -> Footnote\n\nEqualsRule -> equals3\nMarkdownLine -> EqualsRule\n\nDashesRule -> dashes3\nMarkdownLine -> DashesRule\n\nHorizontalRule -> StarBoldItalicTag\nHorizontalRule -> UnderlineBoldItalicTag\nHorizontalRule -> underscores\nHorizontalRule -> asterisks4\nMarkdownLine -> HorizontalRule\n\nBlockquoteLine -> blockquoteBiggerSignLine\nMarkdownLine -> BlockquoteLine\n\nComplement -> intent MarkdownLine\nComplement -> intent\nMarkdownLine -> Complement\n\nHeading -> headingSharpSign MarkdownLine\nHeading -> headingSharpSign\nHeading -> headingSharpSignWithCursor MarkdownLine\nHeading -> headingSharpSignWithCursor\nMarkdownLine -> Heading\n\nOrderedItem -> orderedItemTag Sentence\nOrderedItem -> orderedItemTag\nOrderedItem -> orderedItemTagWithCursor Sentence\nOrderedItem -> orderedItemTagWithCursor\nMarkdownLine -> OrderedItem\n\nUnorderedItem -> unorderedItemTag Sentence\nUnorderedItem -> unorderedItemTag\nUnorderedItem -> unorderedItemTagWithCursor Sentence\nUnorderedItem -> unorderedItemTagWithCursor\nMarkdownLine -> UnorderedItem\n\nSentence -> Match_emphasis\nSentence -> Sentence Match_emphasis\nMarkdownLine -> Sentence\n\nPlainText -> simpleText\nPlainText -> spaces\nPlainText -> Link\nPlainText -> urlAddress\nPlainText -> emailAddress\nPlainText -> Image\nPlainText -> emoji\nPlainText -> FootnoteReference\nPlainText -> cursor\nPlainText -> sharpSign\nPlainText -> leftArrow\nPlainText -> dashSign\nPlainText -> plusSign\nPlainText -> PlainText simpleText\nPlainText -> PlainText spaces\nPlainText -> PlainText Link\nPlainText -> PlainText urlAddress\nPlainText -> PlainText emailAddress\nPlainText -> PlainText Image\nPlainText -> PlainText emoji\nPlainText -> PlainText FootnoteReference\nPlainText -> PlainText intent\nPlainText -> PlainText cursor\nPlainText -> PlainText sharpSign\nPlainText -> PlainText leftArrow\nPlainText -> PlainText dashSign\nPlainText -> PlainText plusSign\n\nFootnoteReference -> openSquareBracketWithCaret simpleText closeSquareBracket\n\nLink -> openSquareBracket Sentence closeSquareBracket openParentheses url closeParentheses\nLink -> openSquareBracket Sentence closeSquareBracket openParentheses url spaces doubleQuotationMarkText closeParentheses\nImage -> exclamationMarkOpenSquareBracket PlainText closeSquareBracket openParentheses url spaces doubleQuotationMarkText closeParentheses\n\n\n\n\n\n\n\n\n\n\n\n\n\nBeginStarBoldText -> starBoldTag NO_StarBoldText_Match_emphasis\nBeginStarBoldText -> BeginStarBoldText NO_StarBoldText_Match_emphasis\nStarBoldText -> BeginStarBoldText starBoldTag\n\nBeginUnderlineBoldText -> underlineBoldTag NO_UnderlineBoldText_Match_emphasis\nBeginUnderlineBoldText -> BeginUnderlineBoldText NO_UnderlineBoldText_Match_emphasis\nUnderlineBoldText -> BeginUnderlineBoldText underlineBoldTag\n\nBeginStarItalicText -> starItalicTag NO_StarItalicText_Match_emphasis\nBeginStarItalicText -> BeginStarItalicText NO_StarItalicText_Match_emphasis\nStarItalicText -> BeginStarItalicText starItalicTag\n\nBeginUnderlineItalicText -> underlineItalicTag NO_UnderlineItalicText_Match_emphasis\nBeginUnderlineItalicText -> BeginUnderlineItalicText NO_UnderlineItalicText_Match_emphasis\nUnderlineItalicText -> BeginUnderlineItalicText underlineItalicTag\n\nBeginStarBoldItalicText -> starBoldItalicTag NO_StarBoldItalicText_Match_emphasis\nBeginStarBoldItalicText -> BeginStarBoldItalicText NO_StarBoldItalicText_Match_emphasis\nStarBoldItalicText -> BeginStarBoldItalicText starBoldItalicTag\n\nBeginUnderlineBoldItalicText -> underlineBoldItalicTag NO_UnderlineBoldItalicText_Match_emphasis\nBeginUnderlineBoldItalicText -> BeginUnderlineBoldItalicText NO_UnderlineBoldItalicText_Match_emphasis\nUnderlineBoldItalicText -> BeginUnderlineBoldItalicText underlineBoldItalicTag\n\nBeginStrikethroughText -> strikethroughTag NO_StrikethroughText_Match_emphasis\nBeginStrikethroughText -> BeginStrikethroughText NO_StrikethroughText_Match_emphasis\nStrikethroughText -> BeginStrikethroughText strikethroughTag\n\nBeginHighlightText -> highlightTag NO_HighlightText_Match_emphasis\nBeginHighlightText -> BeginHighlightText NO_HighlightText_Match_emphasis\nHighlightText -> BeginHighlightText highlightTag\n\nBeginSubscriptText -> subscriptTag NO_SubscriptText_Match_emphasis\nBeginSubscriptText -> BeginSubscriptText NO_SubscriptText_Match_emphasis\nSubscriptText -> BeginSubscriptText subscriptTag\n\nBeginSuperscriptText -> superscriptTag NO_SuperscriptText_Match_emphasis\nBeginSuperscriptText -> BeginSuperscriptText NO_SuperscriptText_Match_emphasis\nSuperscriptText -> BeginSuperscriptText superscriptTag\n\nBeginDoubleBacktickText -> doubleBacktickTag NO_DoubleBacktickText_Match_emphasis\nBeginDoubleBacktickText -> BeginDoubleBacktickText NO_DoubleBacktickText_Match_emphasis\nDoubleBacktickText -> BeginDoubleBacktickText doubleBacktickTag\n\nBeginBacktickText -> backtickTag NO_BacktickText_Match_emphasis\nBeginBacktickText -> BeginBacktickText NO_BacktickText_Match_emphasis\nBacktickText -> BeginBacktickText backtickTag\n\nNO_StarBoldText_Match_emphasis -> PlainText\nNO_StarBoldText_Match_emphasis -> UnderlineBoldText\nNO_StarBoldText_Match_emphasis -> StarItalicText\nNO_StarBoldText_Match_emphasis -> UnderlineItalicText\nNO_StarBoldText_Match_emphasis -> StarBoldItalicText\nNO_StarBoldText_Match_emphasis -> UnderlineBoldItalicText\nNO_StarBoldText_Match_emphasis -> StrikethroughText\nNO_StarBoldText_Match_emphasis -> HighlightText\nNO_StarBoldText_Match_emphasis -> SubscriptText\nNO_StarBoldText_Match_emphasis -> SuperscriptText\nNO_StarBoldText_Match_emphasis -> DoubleBacktickText\nNO_StarBoldText_Match_emphasis -> BacktickText\n\nNO_UnderlineBoldText_Match_emphasis -> PlainText\nNO_UnderlineBoldText_Match_emphasis -> StarBoldText\nNO_UnderlineBoldText_Match_emphasis -> StarItalicText\nNO_UnderlineBoldText_Match_emphasis -> UnderlineItalicText\nNO_UnderlineBoldText_Match_emphasis -> StarBoldItalicText\nNO_UnderlineBoldText_Match_emphasis -> UnderlineBoldItalicText\nNO_UnderlineBoldText_Match_emphasis -> StrikethroughText\nNO_UnderlineBoldText_Match_emphasis -> HighlightText\nNO_UnderlineBoldText_Match_emphasis -> SubscriptText\nNO_UnderlineBoldText_Match_emphasis -> SuperscriptText\nNO_UnderlineBoldText_Match_emphasis -> DoubleBacktickText\nNO_UnderlineBoldText_Match_emphasis -> BacktickText\n\nNO_StarItalicText_Match_emphasis -> PlainText\nNO_StarItalicText_Match_emphasis -> StarBoldText\nNO_StarItalicText_Match_emphasis -> UnderlineBoldText\nNO_StarItalicText_Match_emphasis -> UnderlineItalicText\nNO_StarItalicText_Match_emphasis -> StarBoldItalicText\nNO_StarItalicText_Match_emphasis -> UnderlineBoldItalicText\nNO_StarItalicText_Match_emphasis -> StrikethroughText\nNO_StarItalicText_Match_emphasis -> HighlightText\nNO_StarItalicText_Match_emphasis -> SubscriptText\nNO_StarItalicText_Match_emphasis -> SuperscriptText\nNO_StarItalicText_Match_emphasis -> DoubleBacktickText\nNO_StarItalicText_Match_emphasis -> BacktickText\n\nNO_UnderlineItalicText_Match_emphasis -> PlainText\nNO_UnderlineItalicText_Match_emphasis -> StarBoldText\nNO_UnderlineItalicText_Match_emphasis -> UnderlineBoldText\nNO_UnderlineItalicText_Match_emphasis -> StarItalicText\nNO_UnderlineItalicText_Match_emphasis -> StarBoldItalicText\nNO_UnderlineItalicText_Match_emphasis -> UnderlineBoldItalicText\nNO_UnderlineItalicText_Match_emphasis -> StrikethroughText\nNO_UnderlineItalicText_Match_emphasis -> HighlightText\nNO_UnderlineItalicText_Match_emphasis -> SubscriptText\nNO_UnderlineItalicText_Match_emphasis -> SuperscriptText\nNO_UnderlineItalicText_Match_emphasis -> DoubleBacktickText\nNO_UnderlineItalicText_Match_emphasis -> BacktickText\n\nNO_StarBoldItalicText_Match_emphasis -> PlainText\nNO_StarBoldItalicText_Match_emphasis -> StarBoldText\nNO_StarBoldItalicText_Match_emphasis -> UnderlineBoldText\nNO_StarBoldItalicText_Match_emphasis -> StarItalicText\nNO_StarBoldItalicText_Match_emphasis -> UnderlineItalicText\nNO_StarBoldItalicText_Match_emphasis -> UnderlineBoldItalicText\nNO_StarBoldItalicText_Match_emphasis -> StrikethroughText\nNO_StarBoldItalicText_Match_emphasis -> HighlightText\nNO_StarBoldItalicText_Match_emphasis -> SubscriptText\nNO_StarBoldItalicText_Match_emphasis -> SuperscriptText\nNO_StarBoldItalicText_Match_emphasis -> DoubleBacktickText\nNO_StarBoldItalicText_Match_emphasis -> BacktickText\n\nNO_UnderlineBoldItalicText_Match_emphasis -> PlainText\nNO_UnderlineBoldItalicText_Match_emphasis -> StarBoldText\nNO_UnderlineBoldItalicText_Match_emphasis -> UnderlineBoldText\nNO_UnderlineBoldItalicText_Match_emphasis -> StarItalicText\nNO_UnderlineBoldItalicText_Match_emphasis -> UnderlineItalicText\nNO_UnderlineBoldItalicText_Match_emphasis -> StarBoldItalicText\nNO_UnderlineBoldItalicText_Match_emphasis -> StrikethroughText\nNO_UnderlineBoldItalicText_Match_emphasis -> HighlightText\nNO_UnderlineBoldItalicText_Match_emphasis -> SubscriptText\nNO_UnderlineBoldItalicText_Match_emphasis -> SuperscriptText\nNO_UnderlineBoldItalicText_Match_emphasis -> DoubleBacktickText\nNO_UnderlineBoldItalicText_Match_emphasis -> BacktickText\n\nNO_StrikethroughText_Match_emphasis -> PlainText\nNO_StrikethroughText_Match_emphasis -> StarBoldText\nNO_StrikethroughText_Match_emphasis -> UnderlineBoldText\nNO_StrikethroughText_Match_emphasis -> StarItalicText\nNO_StrikethroughText_Match_emphasis -> UnderlineItalicText\nNO_StrikethroughText_Match_emphasis -> StarBoldItalicText\nNO_StrikethroughText_Match_emphasis -> UnderlineBoldItalicText\nNO_StrikethroughText_Match_emphasis -> HighlightText\nNO_StrikethroughText_Match_emphasis -> SubscriptText\nNO_StrikethroughText_Match_emphasis -> SuperscriptText\nNO_StrikethroughText_Match_emphasis -> DoubleBacktickText\nNO_StrikethroughText_Match_emphasis -> BacktickText\n\nNO_HighlightText_Match_emphasis -> PlainText\nNO_HighlightText_Match_emphasis -> StarBoldText\nNO_HighlightText_Match_emphasis -> UnderlineBoldText\nNO_HighlightText_Match_emphasis -> StarItalicText\nNO_HighlightText_Match_emphasis -> UnderlineItalicText\nNO_HighlightText_Match_emphasis -> StarBoldItalicText\nNO_HighlightText_Match_emphasis -> UnderlineBoldItalicText\nNO_HighlightText_Match_emphasis -> StrikethroughText\nNO_HighlightText_Match_emphasis -> SubscriptText\nNO_HighlightText_Match_emphasis -> SuperscriptText\nNO_HighlightText_Match_emphasis -> DoubleBacktickText\nNO_HighlightText_Match_emphasis -> BacktickText\n\nNO_SubscriptText_Match_emphasis -> PlainText\nNO_SubscriptText_Match_emphasis -> StarBoldText\nNO_SubscriptText_Match_emphasis -> UnderlineBoldText\nNO_SubscriptText_Match_emphasis -> StarItalicText\nNO_SubscriptText_Match_emphasis -> UnderlineItalicText\nNO_SubscriptText_Match_emphasis -> StarBoldItalicText\nNO_SubscriptText_Match_emphasis -> UnderlineBoldItalicText\nNO_SubscriptText_Match_emphasis -> StrikethroughText\nNO_SubscriptText_Match_emphasis -> HighlightText\nNO_SubscriptText_Match_emphasis -> SuperscriptText\nNO_SubscriptText_Match_emphasis -> DoubleBacktickText\nNO_SubscriptText_Match_emphasis -> BacktickText\n\nNO_SuperscriptText_Match_emphasis -> PlainText\nNO_SuperscriptText_Match_emphasis -> StarBoldText\nNO_SuperscriptText_Match_emphasis -> UnderlineBoldText\nNO_SuperscriptText_Match_emphasis -> StarItalicText\nNO_SuperscriptText_Match_emphasis -> UnderlineItalicText\nNO_SuperscriptText_Match_emphasis -> StarBoldItalicText\nNO_SuperscriptText_Match_emphasis -> UnderlineBoldItalicText\nNO_SuperscriptText_Match_emphasis -> StrikethroughText\nNO_SuperscriptText_Match_emphasis -> HighlightText\nNO_SuperscriptText_Match_emphasis -> SubscriptText\nNO_SuperscriptText_Match_emphasis -> DoubleBacktickText\nNO_SuperscriptText_Match_emphasis -> BacktickText\n\nNO_DoubleBacktickText_Match_emphasis -> PlainText\nNO_DoubleBacktickText_Match_emphasis -> StarBoldText\nNO_DoubleBacktickText_Match_emphasis -> UnderlineBoldText\nNO_DoubleBacktickText_Match_emphasis -> StarItalicText\nNO_DoubleBacktickText_Match_emphasis -> UnderlineItalicText\nNO_DoubleBacktickText_Match_emphasis -> StarBoldItalicText\nNO_DoubleBacktickText_Match_emphasis -> UnderlineBoldItalicText\nNO_DoubleBacktickText_Match_emphasis -> StrikethroughText\nNO_DoubleBacktickText_Match_emphasis -> HighlightText\nNO_DoubleBacktickText_Match_emphasis -> SubscriptText\nNO_DoubleBacktickText_Match_emphasis -> SuperscriptText\nNO_DoubleBacktickText_Match_emphasis -> BacktickText\n\nNO_BacktickText_Match_emphasis -> PlainText\nNO_BacktickText_Match_emphasis -> StarBoldText\nNO_BacktickText_Match_emphasis -> UnderlineBoldText\nNO_BacktickText_Match_emphasis -> StarItalicText\nNO_BacktickText_Match_emphasis -> UnderlineItalicText\nNO_BacktickText_Match_emphasis -> StarBoldItalicText\nNO_BacktickText_Match_emphasis -> UnderlineBoldItalicText\nNO_BacktickText_Match_emphasis -> StrikethroughText\nNO_BacktickText_Match_emphasis -> HighlightText\nNO_BacktickText_Match_emphasis -> SubscriptText\nNO_BacktickText_Match_emphasis -> SuperscriptText\nNO_BacktickText_Match_emphasis -> DoubleBacktickText\n\nMatch_emphasis -> PlainText\nMatch_emphasis -> StarBoldText\nMatch_emphasis -> UnderlineBoldText\nMatch_emphasis -> StarItalicText\nMatch_emphasis -> UnderlineItalicText\nMatch_emphasis -> StarBoldItalicText\nMatch_emphasis -> UnderlineBoldItalicText\nMatch_emphasis -> StrikethroughText\nMatch_emphasis -> HighlightText\nMatch_emphasis -> SubscriptText\nMatch_emphasis -> SuperscriptText\nMatch_emphasis -> DoubleBacktickText\nMatch_emphasis -> BacktickText\n//abc", "tokenTypeDefinition": '\nenter \\n\nintent "    "+\nspaces [\\t ]+\nsimpleText  [^\u25AE*_=\\-\\+\\>\\#\\`\\:\\/\\"\\(\\)\\[\\]\\!\\^\\: \\t\\n\\|]+\n\nemoji ":"[^\u25AE\\:\\n]+":"\nurl ([^\\!\\<\\>\\[\\]\\(\\) \\n\\t]+\\:\\/)?\\/[^\\!\\<\\>\\[\\]\\(\\) \\n\\t]+\nurlAddress "<"[^\\!\\<\\>\\[\\]\\(\\) \\n\\t]+\\:\\/\\/[^\\!\\<\\>\\[\\]\\(\\) \\n\\t]+">"\nemailAddress "<"[^\\!\\<\\>\\[\\]\\(\\) \\n\\t]+"@"[^\\!\\<\\>\\[\\]\\(\\) \\n\\t]+">"\ndoubleQuotationMarkText \\"[^\\"\\n]*\\"\nunorderedItemTag [\\-\\+]" "\nunorderedItemTagWithCursor (\u25AE[\\-\\+]|[\\-\\+]\u25AE)" "\norderedItemTag [0-9]+\\." "\norderedItemTagWithCursor (\u25AE[0-9]+\\.|[0-9]+\u25AE[0-9]*\\.|[0-9]+\\.\u25AE)" "\n\ncursor "\u25AE"\nverticalBar ("|")|("\u25AE|")|("|\u25AE")\nopenParentheses "("\ncloseParentheses ")"\nopenSquareBracket "["\ncloseSquareBracket "]"\nexclamationMarkOpenSquareBracket "!["\nopenSquareBracketWithCaret "[^"\n\nasterisks4 "*"{4,}\ndashes3 "-"{3,}\nequals3 "="{3,}\nunderscores "_"{4,}\n\ndashes3WithSpaces [\\t ]*"-"{3,}[\\t ]*\ncolumnLeftAlignment [\\t ]*:"-"{3,}[\\t ]*\ncolumnRightAlignment [\\t ]*"-"{3,}:[\\t ]*\ncolumnCenterAlignment [\\t ]*:"-"{3,}:[\\t ]*\n\n\nblockquoteBiggerSignLine (>+|>+\u25AE|\u25AE>+|>+\u25AE>+)" "[^\\n]*\nleftArrow >+\n\nheadingSharpSign #+" "\nheadingSharpSignWithCursor (#+\u25AE|\u25AE#+|#+\u25AE#+)" "\nsharpSign #+\n\ncolonSign ":"\ndashSign "-"\nplusSign "+"\ncheckedBox "- [x]"\nuncheckedBox "- [ ]"\n\nstarBoldTag "**"\nunderlineBoldTag "__"\nstarItalicTag "*"\nunderlineItalicTag "_"\nstarBoldItalicTag "***"\nunderlineBoldItalicTag "___"\nstrikethroughTag "~~"\nhighlightTag "=="\nsubscriptTag "~"\nsuperscriptTag "^"\ndoubleBacktickTag "``"\nbacktickTag "`"\nfencedCodeBlockTag ("```"[^\\n]*\\n[^\\`]*"```")|("```"[^\\n]*\\n[^\\`]+\\n[^\\`]*"```")\n\n\n' };

// src/MarkdownSyntaxAnalyzer.ts
var MarkdownSyntaxAnalyzer = class {
  init() {
    this.lrSyntaxAnalyzerRunner = new import_ts_parser_generator4.lr.LRSyntaxAnalyzerRunner().init(definition.languageDefinition, definition.tokenTypeDefinition, MarkdownLanguageFunctionsEntity);
    this.lrSyntaxAnalyzerRunner.setPreprocessing((v) => {
      if (v.at(-1) != "\n")
        return v + "\n";
      return v;
    });
    return this;
  }
  convdertToMarkdown(content, debug = false) {
    if (this.lrSyntaxAnalyzerRunner.isValid(content, debug)) {
      var markdown = this.lrSyntaxAnalyzerRunner.getResult();
      return markdown;
    }
    return null;
  }
  toMarkddown(content, debug = false) {
    var markdown = this.convdertToMarkdown(content, debug);
    var unhandledBlockquotes = markdown.getUnhandledBlockquotes();
    var unhandledComplementBlocks = markdown.getUnhandledComplementBlocks();
    while (unhandledBlockquotes.length > 0 || unhandledComplementBlocks.length > 0) {
      for (var i = 0; i < unhandledBlockquotes.length; i++) {
        var unhandledBlockquote = unhandledBlockquotes[i];
        var content = unhandledBlockquote.getContent();
        var blockquoteMarkdown = this.convdertToMarkdown(content, debug);
        unhandledBlockquote.getMarkdownElements().push(blockquoteMarkdown);
        unhandledBlockquote.isHandledFlag = true;
      }
      for (var i = 0; i < unhandledComplementBlocks.length; i++) {
        var unhandledComplementBlock = unhandledComplementBlocks[i];
        var content = unhandledComplementBlock.getContent();
        var lines = content.split("\n").map((l) => l.substring(4));
        content = lines.join("\n");
        var complementMarkdown = this.convdertToMarkdown(content, debug);
        unhandledComplementBlock.getMarkdownElements().push(complementMarkdown);
        unhandledComplementBlock.isHandledFlag = true;
      }
      unhandledBlockquotes = markdown.getUnhandledBlockquotes();
      unhandledComplementBlocks = markdown.getUnhandledComplementBlocks();
    }
    return markdown;
  }
  isValid(markdownContent, debug = false) {
    return this.lrSyntaxAnalyzerRunner.isValid(markdownContent, debug);
  }
};

// src/index.ts
var MarkdownToHtmlConverter = class {
  constructor() {
    this.markdownSyntaxAnalyzer = new MarkdownSyntaxAnalyzer().init();
  }
  toHtml(markdownContent) {
    var markdown = this.markdownSyntaxAnalyzer.toMarkddown(markdownContent);
    var htmlElement = markdown.toHtml();
    return htmlElement.toHtmlString();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarkdownToHtmlConverter
});
//# sourceMappingURL=index.js.map