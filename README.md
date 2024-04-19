# 1. Install:
```
> yarn add jw-markdown
or
> npm i jw-markdown
```

```
> yarn add -D @types/node
or
> npm i -D @types/node
```
# 2. Usage:
```
import { MarkdownToHtmlConverter } from 'jw-markdown'
var converter : MarkdownToHtmlConverter = new MarkdownToHtmlConverter()
console.log(converter.toHtml('# abc'))
```