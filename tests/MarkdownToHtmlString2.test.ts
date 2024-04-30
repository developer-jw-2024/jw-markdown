import { MarkdownToHtmlConverter } from "../src";

var markdownToHtmlConverter : MarkdownToHtmlConverter = new MarkdownToHtmlConverter()

//var html : string = markdownToHtmlConverter.toHtml(
describe('Markdown', () => {

    test('markdown - 0-(-1)', () => {
        
        var html : string = markdownToHtmlConverter.toHtml(
``
        )

        expect(html).toEqual('<br/>')
        
    })


    test('markdown - 0-(-2)', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`
`
        )

        
        expect(html).toEqual('<br/>')
        
    })

    test('markdown - 0', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`hello`
        )

        
        
        expect(html).toEqual(
`<p>hello</p>`
        )
    })


    test('markdown - 0-0', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`he*l_l*_o`
        )

        
        expect(html).toEqual(
`he*l_l*_o`
        )
        
    })

    test('markdown - 0-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`I go to school.
he*l_l*_o`
        )

        
        expect(html).toEqual(
`<p>I go to school.</p>
he*l_l*_o`
        )
        
    })


    test('markdown - 0-2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`I go to school.
You go home`
        )

        
        expect(html).toEqual(
`<p>I go to school.<br/>You go home</p>`
        )
    })

    test('markdown - 0-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`I go to school.

You go home`
        )

        
        expect(html).toEqual(
`<p>I go to school.</p>
<br/>
<p>You go home</p>`
        )
        
    })

    test('markdown - 1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This is abc`
        )

        
        expect(html).toEqual(
`<p>This is abc</p>`
        )
        
    })


    test('markdown - 2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This *is** abc`
        )

        
        expect(html).toEqual(
`This *is** abc`
        )
    })


    test('markdown - 3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This *is* abc`
        )

        
        expect(html).toEqual(
`<p>This <em>is</em> abc</p>`)
    })

    test('markdown - 3-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This **is** abc`
        )

        
        expect(html).toEqual(
`<p>This <strong>is</strong> abc</p>`)
    })

    test('markdown - 3-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This ***is*** abc`
        )

        
        expect(html).toEqual(
`<p>This <em><strong>is</strong></em> abc</p>`)
    })


    test('markdown - 4', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This *is* abc
This is that.`
        )

        
        
        expect(html).toEqual(
`<p>This <em>is</em> abc<br/>This is that.</p>`)

    })


    test('markdown - 5', () => {
        var html : string = markdownToHtmlConverter.toHtml(
``
        )

        
        
        expect(html).toEqual(
`<br/>`)

    })


    test('markdown - 6', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`
`
        )

        
        
        expect(html).toEqual(
`<br/>`)
    })


    test('markdown - 7', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`## hello
`
        )

        
        
        
        expect(html).toEqual(
`<h2>hello</h2>`)
    })


    test('markdown - 8', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. First Item
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>First Item</li>
</ol>`)
    })


    test('markdown - 9', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. First Item
2. Second Item
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>First Item</li>
    <li>Second Item</li>
</ol>`)
    
    })


    test('markdown - 10', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. First Item
2. Second Item
3. Third Item
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>First Item</li>
    <li>Second Item</li>
    <li>Third Item</li>
</ol>`)
    })


    test('markdown - 11', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- First Item
`
        )

        
        expect(html).toEqual(
`<ul>
    <li>First Item</li>
</ul>`            
        )

    })


    test('markdown - 12', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- First Item
- Second Item
`
        )

        
        expect(html).toEqual(
`<ul>
    <li>First Item</li>
    <li>Second Item</li>
</ul>`            
        )
    })


    test('markdown - 13', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- First Item
- Second Item
- Third Item
`
        )

        
        expect(html).toEqual(
`<ul>
    <li>First Item</li>
    <li>Second Item</li>
    <li>Third Item</li>
</ul>`            
        )
    })


    test('markdown - 14', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> This is a sentence
`
        )

        
        expect(html).toEqual(
`<blockquote>
    <p>This is a sentence</p>
</blockquote>`
        )
    })


    test('markdown - 14-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`>`
        )

        
        expect(html).toEqual(
`<p>&gt;</p>`
        )
    })


    test('markdown - 14-2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> `
        )

        
        expect(html).toEqual(
`<blockquote>
    <br/>
</blockquote>`
        )
    })


    test('markdown - 14-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> H`
        )

        
        expect(html).toEqual(
`<blockquote>
    <p>H</p>
</blockquote>`
        )
    })


    test('markdown - 15', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> This is a sentence
> This is the second sentence
`
        )

        
        expect(html).toEqual(
`<blockquote>
    <p>This is a sentence<br/>This is the second sentence</p>
</blockquote>`
        )
    })


    test('markdown - 16', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`>> This is a sentence
`
        )

        
        expect(html).toEqual(
`<blockquote>
    <blockquote>
        <p>This is a sentence</p>
    </blockquote>
</blockquote>`
        )
    })


    test('markdown - 16-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`>>`
        )

        
        expect(html).toEqual(
`<p>&gt;&gt;</p>`
        )
    })


    test('markdown - 16-2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`>> `
        )

        
        expect(html).toEqual(
`<blockquote>
    <blockquote>
        <br/>
    </blockquote>
</blockquote>`
        )
    })


    test('markdown - 17', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`>> This is a sentence
>> This is the
`
        )

        
        expect(html).toEqual(
`<blockquote>
    <blockquote>
        <p>This is a sentence<br/>This is the</p>
    </blockquote>
</blockquote>`
        )
    })


    test('markdown - 18', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> # ONK
>> This is a sentence
>> This is the
`
        )

        
        expect(html).toEqual(
`<blockquote>
    <h1>ONK</h1>
    <blockquote>
        <p>This is a sentence<br/>This is the</p>
    </blockquote>
</blockquote>`
        )
    })

    test('markdown - 19', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> # ONK
>> This is a sentence
> This is the
`
        )

        
        expect(html).toEqual(
`<blockquote>
    <h1>ONK</h1>
    <blockquote>
        <p>This is a sentence</p>
    </blockquote>
    <p>This is the</p>
</blockquote>`
        )
    })

    test('markdown - 20', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    Apple
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <p>Apple</p>
        </div>
    </li>
</ol>` 
        )

    })

    test('markdown - 21', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    Apple
    Banana
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <p>Apple<br/>Banana</p>
        </div>
    </li>
</ol>` 
        )
    })

    test('markdown - 22', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    Apple
    Banana
2. Animals
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <p>Apple<br/>Banana</p>
        </div>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })

    test('markdown - 23', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    > Apple
    > Banana
2. Animals
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <blockquote>
                <p>Apple<br/>Banana</p>
            </blockquote>
        </div>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })

    test('markdown - 24', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    1. Apple
    2. Banana
2. Animals
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <ol>
                <li>Apple</li>
                <li>Banana</li>
            </ol>
        </div>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })


    test('markdown - 25', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    > Red
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <blockquote>
                <p>Red</p>
            </blockquote>
        </div>
    </li>
</ol>` 
        )
    })

    test('markdown - 26', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    1. Apple
        > Red is my
    2. Banana
2. Animals
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <ol>
                <li>Apple
                    <div class="complementBlock">
                        <blockquote>
                            <p>Red is my</p>
                        </blockquote>
                    </div>
                </li>
                <li>Banana</li>
            </ol>
        </div>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })

    test('markdown - 26-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruite
    1. Apple
    > Red is my
    2. Banana
2. Animals
`
        )

        
        expect(html).toEqual(
`<ol>
    <li>Fruite
        <div class="complementBlock">
            <ol>
                <li>Apple</li>
            </ol>
            <blockquote>
                <p>Red is my</p>
            </blockquote>
            <ol>
                <li>Banana</li>
            </ol>
        </div>
    </li>
    <li>Animals</li>
</ol>` 
        )
    })


    test('markdown - 27', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- Fruite
`
        )

        
        expect(html).toEqual(
`<ul>
    <li>Fruite</li>
</ul>` 
        )
    })

    test('markdown - 27-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- 
`
        )

        
        expect(html).toEqual(
`<ul>
    <li></li>
</ul>` 
        )
    })

    test('markdown - 28', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- Fruite
- Animal
`
        )

        
        expect(html).toEqual(
`<ul>
    <li>Fruite</li>
    <li>Animal</li>
</ul>` 
        )
    })


    test('markdown - 29', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- Fruite
    - Apple
    - Banana
- Animal
`
        )

        
        expect(html).toEqual(
`<ul>
    <li>Fruite
        <div class="complementBlock">
            <ul>
                <li>Apple</li>
                <li>Banana</li>
            </ul>
        </div>
    </li>
    <li>Animal</li>
</ul>` 
        )
    })

    test('markdown - 30', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"type `nano`."
        )

        
        expect(html).toEqual(
`<p>type <code>nano</code>.</p>` 
        )
    })

    test('markdown - 30', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"``Use `code` in your Markdown file.``"
        )

        
        expect(html).toEqual(
`<p><code>Use <code>code</code> in your Markdown file.</code></p>` 
        )
    })


    test('markdown - 31', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"---"
        )

        
        expect(html).toEqual(
`<hr>` 
        )
    })

    test('markdown - 32', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This is heading 2
----------`
        )

        
        expect(html).toEqual(
`<h2>This is heading 2</h2>` 
        )
    })

    test('markdown - 33', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This is heading 2

----------`
        )

        
        expect(html).toEqual(
`<p>This is heading 2</p>
<br/>
<hr>` 
        )
        
    })

    test('markdown - 34', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`===========`
        )

        
        expect(html).toEqual(
`` 
        )
    })


    test('markdown - 35', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This is the first level heading
===========`
        )

        
        expect(html).toEqual(
`<h1>This is the first level heading</h1>` 
        )
    })

    test('markdown - 36', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`This is the first level heading

===========`
        )
        
        expect(html).toEqual(
`<p>This is the first level heading</p>
<br/>` 
        )
        
    })

    test('markdown - 37', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| Syntax      | Description |`
        )

        
        expect(html).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Syntax</td>
            <td>Description</td>
        </tr>
    </tbody>
</table>` 
        )
        
    })

    test('markdown - 38', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| Header      | Title       |
| Paragraph   | Text        |`
        )

        
        expect(html).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>` 
        )
    })

    test('markdown - 38-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`|    Header      | Title       |
| Paragraph   | Text        |`
        )

        
        expect(html).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>` 
        )
    })


    test('markdown - 39', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| Syntax      | Description | Num | Checked |
| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )

        
        expect(html).toEqual(
`<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th class="TableCellAlignLeft">Description</th>
            <th class="TableCellAlignCenter">Num</th>
            <th class="TableCellAlignRight">Checked</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Header</td>
            <td class="TableCellAlignLeft">Title</td>
            <td class="TableCellAlignCenter">3</td>
            <td class="TableCellAlignRight">true</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td class="TableCellAlignLeft">Text</td>
            <td class="TableCellAlignCenter">8</td>
            <td class="TableCellAlignRight">false</td>
        </tr>
    </tbody>
</table>` 
        )
    })

    test('markdown - 40', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | 3 | true |
| Paragraph   | Text        | 8 | false |`
        )

        
        expect(html).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Header</td>
            <td class="TableCellAlignLeft">Title</td>
            <td class="TableCellAlignCenter">3</td>
            <td class="TableCellAlignRight">true</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td class="TableCellAlignLeft">Text</td>
            <td class="TableCellAlignCenter">8</td>
            <td class="TableCellAlignRight">false</td>
        </tr>
    </tbody>
</table>` 
        )
    })

    
    test('markdown - 41', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| Syntax      | Description |
| Header      | Title       |
| Paragraph   | Text        |`
        )

        
        expect(html).toEqual(
`<table>
    <tbody>
        <tr>
            <td>Syntax</td>
            <td>Description</td>
        </tr>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>` 
        )
    })


    test('markdown - 42', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``
        )

        
        expect(html).toEqual(
`<pre><code class="">
{
  &quot;firstName&quot;: &quot;John&quot;,
  &quot;lastName&quot;: &quot;Smith&quot;,
  &quot;age&quot;: 25
}
</code></pre>`
        )
        
    })
    

    test('markdown - 43', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        )

        
        expect(html).toEqual(
`<blockquote>
    <pre><code class="">
{
  &quot;firstName&quot;: &quot;John&quot;,
  &quot;lastName&quot;: &quot;Smith&quot;,
  &quot;age&quot;: 25
}
    </code></pre>
</blockquote>`
        )      
    })


    test('markdown - 44', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. coding
    > \`\`\`
    > {
    >   "firstName": "John",
    >   "lastName": "Smith",
    >   "age": 25
    > }
    > \`\`\``
        )

        
        expect(html).toEqual(
`<ol>
    <li>coding
        <div class="complementBlock">
            <blockquote>
                <pre><code class="">
{
  &quot;firstName&quot;: &quot;John&quot;,
  &quot;lastName&quot;: &quot;Smith&quot;,
  &quot;age&quot;: 25
}
                </code></pre>
            </blockquote>
        </div>
    </li>
</ol>`)
    })


    test('markdown - 45', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. coding
    \`\`\`
    {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
    }
    \`\`\``
        )

        
        expect(html).toEqual(
`<ol>
    <li>coding
        <div class="complementBlock">
            <pre><code class="">
{
    &quot;firstName&quot;: &quot;John&quot;,
    &quot;lastName&quot;: &quot;Smith&quot;,
    &quot;age&quot;: 25
}
            </code></pre>
        </div>
    </li>
</ol>`)
    })

    test('markdown - 46', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`First Term
: This is the definition of the first term.`
        )

        
        expect(html).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
</dl>`
        )
    })
    

    test('markdown - 46-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`First Term
: This is
    That are
    Bee.`
        )
        
        
        expect(html).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is
        <div class="complementBlock">
            <p>That are<br/>Bee.</p>
        </div>
    </dd>
</dl>`
        )
    })


    test('markdown - 46-2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`First Term
: This is
    That are
    Bee.
: that are`
        )
        
        
        expect(html).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is
        <div class="complementBlock">
            <p>That are<br/>Bee.</p>
        </div>
    </dd>
    <dd>that are</dd>
</dl>`
        )
    })

    test('markdown - 46-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`First Term
: This is
    That are
    Bee.
: that are
Second Term
: Those are`
        )
        
        
        expect(html).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is
        <div class="complementBlock">
            <p>That are<br/>Bee.</p>
        </div>
    </dd>
    <dd>that are</dd>
    <dt>Second Term</dt>
    <dd>Those are</dd>
</dl>`
        )
    })

    test('markdown - 47', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        
        expect(html).toEqual(
`<dl>
    <dt>Second Term</dt>
    <dd>This is one definition of the second term.</dd>
    <dd>This is another definition of the second term.</dd>
</dl>`
        )
    })


    test('markdown - 48', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`First Term
: This is the definition of the first term.
Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        
        expect(html).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
    <dt>Second Term</dt>
    <dd>This is one definition of the second term.</dd>
    <dd>This is another definition of the second term.</dd>
</dl>`
        )
    })

    test('markdown - 49', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.`
        )

        
        expect(html).toEqual(
`<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
</dl>
<br/>
<dl>
    <dt>Second Term</dt>
    <dd>This is one definition of the second term.</dd>
    <dd>This is another definition of the second term.</dd>
</dl>`
        )
    })

    test('markdown - 50', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- [x] Write the press release`
        )

        
        expect(html).toEqual(
`<div class="taskList">
    <input type="checkbox" checked>
    <label>Write the press release</label>
</div>`
        )
    })

    test('markdown - 51', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media`
        )

        
        expect(html).toEqual(
`<div class="taskList">
    <input type="checkbox" checked>
    <label>Write the press release</label>
    <input type="checkbox">
    <label>Update the website</label>
    <input type="checkbox">
    <label>Contact the media</label>
</div>`
        )
    })

    test('markdown - 52', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- [x] Write the press release
- [Y] Contact the media
- [ ] Update the website
`
        )

        
        expect(html).toEqual(
`<div class="taskList">
    <input type="checkbox" checked>
    <label>Write the press release</label>
</div>
- [Y] Contact the media
<div class="taskList">
    <input type="checkbox">
    <label>Update the website</label>
</div>`
        )
    })

    test('markdown - 53', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> First Term
: This is the definition of the first term.`
        )

        
        expect(html).toEqual(
`<blockquote>
    <p>First Term</p>
</blockquote>
<dl>
    <dt></dt>
    <dd>This is the definition of the first term.</dd>
</dl>`
        )
        
    })

    test('markdown - 54', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> First Term
> : This is the definition of the first term.`
        )

        
        expect(html).toEqual(
`<blockquote>
    <dl>
        <dt>First Term</dt>
        <dd>This is the definition of the first term.</dd>
    </dl>
</blockquote>`
        )
    })


    test('markdown - 55', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. coding
> \`\`\`
> {
>   "firstName": "John",
>   "lastName": "Smith",
>   "age": 25
> }
> \`\`\``
        )

        
        expect(html).toEqual(
`<ol>
    <li>coding</li>
</ol>
<blockquote>
    <pre><code class="">
{
  &quot;firstName&quot;: &quot;John&quot;,
  &quot;lastName&quot;: &quot;Smith&quot;,
  &quot;age&quot;: 25
}
    </code></pre>
</blockquote>`
        )
    })


    test('markdown - 56-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`Here's a simple footnote,[^1] and here's a longer one.[^bignote]`
        )

        
        expect(html).toEqual(
`<p>Here&apos;s a simple footnote,<sup><a href="#fn:1" class="footnote" rel="footnote">1</a></sup> and here&apos;s a longer one.<sup><a href="#fn:bignote" class="footnote" rel="footnote">bignote</a></sup></p>`
        )
    })

    test('markdown - 56', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`[^Variable]: This is good foot note.`
        )

        
        expect(html).toEqual(
`<div><span id="fn:Variable">Variable:</span>This is good foot note.</div>`
        )
    })


    test('markdown - 57', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.`
        )

        
        expect(html).toEqual(
`<div><span id="fn:Variable">Variable:</span>This is good foot note.
    <div class="complementBlock">
        <p>Indent paragraphs to include them in the footnote.</p>
    </div>
</div>`
        )
    })


    test('markdown - 58', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. hello
    Apple`
        )

        
        expect(html).toEqual(
`<ol>
    <li>hello
        <div class="complementBlock">
            <p>Apple</p>
        </div>
    </li>
</ol>`
        )
    })


    test('markdown - 59', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. hello
    `
        )

        
        expect(html).toEqual(
`<ol>
    <li>hello
        <div class="complementBlock">
            <br/>
        </div>
    </li>
</ol>`
        )
    })


    test('markdown - 60', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. hello
    
    `
        )

        
        expect(html).toEqual(
`<ol>
    <li>hello
        <div class="complementBlock">
            <br/>
        </div>
    </li>
</ol>`
        )

    })

    test('markdown - 61', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`[^Variable]: This is good foot note.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    
    Add as many paragraphs as you like.`
        )

        
        expect(html).toEqual(
`<div><span id="fn:Variable">Variable:</span>This is good foot note.
    <div class="complementBlock">
        <p>Indent paragraphs to include them in the footnote.<br/><code>{ my code }</code></p>
        <br/>
        <p>Add as many paragraphs as you like.</p>
    </div>
</div>`
        )
    })


    test('markdown - 62', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > <code>{ my code }</code>
    
    > Add as many paragraphs as you like.`
        )

        
        expect(html).toEqual(
`<div><span id="fn:Variable">Variable:</span>This is good foot note.
    <div class="complementBlock">
        <blockquote>
            <p>Indent paragraphs to include them in the footnote.</p>
&lt;code&gt;{ my code }&lt;/code&gt;
        </blockquote>
        <br/>
        <blockquote>
            <p>Add as many paragraphs as you like.</p>
        </blockquote>
    </div>
</div>`
        )
    })


    test('markdown - 63', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`[^Variable]: This is good foot note.
    > Indent paragraphs to include them in the footnote.
    > \`{ my code }\`
    > 
    > Add as many paragraphs as you like.`
        )

        
        expect(html).toEqual(
`<div><span id="fn:Variable">Variable:</span>This is good foot note.
    <div class="complementBlock">
        <blockquote>
            <p>Indent paragraphs to include them in the footnote.<br/><code>{ my code }</code></p>
            <br/>
            <p>Add as many paragraphs as you like.</p>
        </blockquote>
    </div>
</div>`
        )
    })


    test('markdown - inputing-0', () => {
        var html : string = markdownToHtmlConverter.toHtml(
``
        )

        
        expect(html).toEqual(
`<br/>`
        )
    })


    test('markdown - inputing-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`▮`
        )

        
        expect(html).toEqual(
`<p><span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`#`
        )

        
        expect(html).toEqual(
`<p>#</p>`
        )
    })


    test('markdown - inputing-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`#▮`
        )

        
        expect(html).toEqual(
`<p>#<span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-4', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`# ▮`
        )

        
        expect(html).toEqual(
`<h1><span class="cursor">|</span></h1>`
        )
    })


    test('markdown - inputing-5', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`#▮ `
        )

        
        expect(html).toEqual(
`<h1></h1>`
        )
    })


    test('markdown - inputing-6', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`▮# `
        )

        
        expect(html).toEqual(
`<h1></h1>`
        )
    })


    test('markdown - inputing-7', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`#▮# `
        )

        
        expect(html).toEqual(
`<h2></h2>`
        )
    })


    test('markdown - inputing-8', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`-`
        )

        
        expect(html).toEqual(
`<p>-</p>`
        )
    })


    test('markdown - inputing-9', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- `
        )

        
        expect(html).toEqual(
`<ul>
    <li></li>
</ul>`
        )
    })


    test('markdown - inputing-10', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+`
        )

        
        expect(html).toEqual(
`<p>+</p>`
        )
    })


    test('markdown - inputing-11', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ `
        )

        
        expect(html).toEqual(
`<ul>
    <li></li>
</ul>`
        )
    })


    test('markdown - inputing-12', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`-▮`
        )

        
        expect(html).toEqual(
`<p>-<span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-13', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`- ▮`
        )

        
        expect(html).toEqual(
`<ul>
    <li><span class="cursor">|</span></li>
</ul>`
        )
    })


    test('markdown - inputing-14', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+▮`
        )

        
        expect(html).toEqual(
`<p>+<span class="cursor">|</span></p>`
        )
    })


    test('markdown - inputing-15', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ ▮`
        )

        
        expect(html).toEqual(
`<ul>
    <li><span class="cursor">|</span></li>
</ul>`
        )
    })

    test('markdown - inputing-16', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+▮ `
        )

        
        expect(html).toEqual(
`<ul>
    <li></li>
</ul>`
        )
    })

    test('markdown - inputing-16-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ + ▮`
        )

        
        expect(html).toEqual(
`+ + ▮`
        )
    })

    test('markdown - inputing-16-2', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ hello`
        )

        
        expect(html).toEqual(
`<ul>
    <li>hello</li>
</ul>`
        )
    })

    test('markdown - inputing-16-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ +`
        )

        
        expect(html).toEqual(
`<ul>
    <li>+</li>
</ul>`
        )
    })

    test('markdown - inputing-16-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ +▮`
        )

        
        expect(html).toEqual(
`<ul>
    <li>+<span class="cursor">|</span></li>
</ul>`
        )
    })

    test('markdown - inputing-16-3', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`+ + ▮`
        )

        
        expect(html).toEqual(
`+ + ▮`
        )
    })

    test('markdown - inputing-17', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1`
        )

        
        expect(html).toEqual(
`<p>1</p>`
        )
    })

    test('markdown - inputing-18', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1.`
        )

        
        expect(html).toEqual(
`<p>1.</p>`
        )
    })

    test('markdown - inputing-19', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. `
        )

        
        expect(html).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-20', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1▮`
        )

        
        expect(html).toEqual(
`<p>1<span class="cursor">|</span></p>`
        )
    })

    test('markdown - inputing-21', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1.▮`
        )

        
        expect(html).toEqual(
`<p>1.<span class="cursor">|</span></p>`
        )
    })

    test('markdown - inputing-22', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. `
        )

        
        expect(html).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-23', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. a`
        )

        
        expect(html).toEqual(
`<ol>
    <li>a</li>
</ol>`
        )
    })

    test('markdown - inputing-24', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. ▮`
        )

        
        expect(html).toEqual(
`<ol>
    <li><span class="cursor">|</span></li>
</ol>`
        )
    })

    test('markdown - inputing-25', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1.▮ `
        )

        
        expect(html).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-26', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1▮. `
        )

        
        expect(html).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-27', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`▮1. `
        )

        
        expect(html).toEqual(
`<ol>
    <li></li>
</ol>`
        )
    })

    test('markdown - inputing-28', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`▮1.`
        )

        
        expect(html).toEqual(
`<p><span class="cursor">|</span>1.</p>`
        )
    })

    test('markdown - inputing-29', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`▮`
        )

        
        expect(html).toEqual(
`<p><span class="cursor">|</span></p>`
        )
    })

    test('markdown - inputing-30', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`\\*`
        )

        
        expect(html).toEqual(
`<p>*</p>`
        )
    })

    test('markdown - inputing-30-1', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`\\\\*`
        )

        
        expect(html).toEqual(
`\\*`
        )
    })

    test('markdown - inputing-31', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`\\\\\\*`
        )

        
        expect(html).toEqual(
`<p>\\*</p>`
        )
    })


    test('markdown - inputing-32', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`> #### The quarterly results look great!
> 
> - Revenue was off the chart.
> - Profits were higher than ever.
> 
>  *Everything* is going according to **plan**.`
        )

        
        expect(html).toEqual(
`<blockquote>
    <h4>The quarterly results look great!</h4>
    <br/>
    <ul>
        <li>Revenue was off the chart.</li>
        <li>Profits were higher than ever.</li>
    </ul>
    <br/>
    <p> <em>Everything</em> is going according to <strong>plan</strong>.</p>
</blockquote>`
        )
    })

    test('markdown - inputing-33', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"At the command prompt, type `nano`."
        )

        
        expect(html).toEqual(
"<p>At the command prompt, type <code>nano</code>.</p>"
        )
    })
    
    test('markdown - inputing-34', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"``Use `code` in your Markdown file.``"
        )

        
        expect(html).toEqual(
"<p><code>Use <code>code</code> in your Markdown file.</code></p>"
        )
    })


    
    test('markdown - inputing-35', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"My favorite search engine is [Duck Duck Go](https://duckduckgo.com)."
        )

        
        expect(html).toEqual(
"<p>My favorite search engine is <a href=\"https://duckduckgo.com\">Duck Duck Go</a>.</p>"
        )
    })
    
    test('markdown - inputing-36', () => {
        var html : string = markdownToHtmlConverter.toHtml(
"My favorite search engine is [Duck Duck Go](https://duckduckgo.com \"The best search engine for privacy\")."
        )

        
        expect(html).toEqual(
"<p>My favorite search engine is <a href=\"https://duckduckgo.com\" title=\"The best search engine for privacy\">Duck Duck Go</a>.</p>"
        )
    })

    test('markdown - inputing-37', () => {
        var html : string = markdownToHtmlConverter.toHtml(
            `![The San Juan Mountains Image](/assets/images/san-juan-mountains.jpg "San Juan Mountains")`
        )

        
        expect(html).toEqual(
`<p><img src="/assets/images/san-juan-mountains.jpg" title="San Juan Mountains" alt="The San Juan Mountains Image"></p>`
        )
    })

    test('markdown - inputing-38', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |`
        )

        
        expect(html).toEqual(
`<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Header</td>
            <td>Title</td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>`
        )
    })

    test('markdown - inputing-39', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`| Syntax      | Left Left Left | Center Center Center | Right Right Right |
| ----------- | :----------- | :-----------: | -----------: |
| Header      | Title       | Title       | ![The San Juan Mountains Image](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "San Juan Mountains")       |
| Paragraph   | Text        | Text        | T**ex**t        |`
        )

        
        expect(html).toEqual(
`<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th class="TableCellAlignLeft">Left Left Left</th>
            <th class="TableCellAlignCenter">Center Center Center</th>
            <th class="TableCellAlignRight">Right Right Right</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Header</td>
            <td class="TableCellAlignLeft">Title</td>
            <td class="TableCellAlignCenter">Title</td>
            <td class="TableCellAlignRight"><img src="https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080" title="San Juan Mountains" alt="The San Juan Mountains Image"></td>
        </tr>
        <tr>
            <td>Paragraph</td>
            <td class="TableCellAlignLeft">Text</td>
            <td class="TableCellAlignCenter">Text</td>
            <td class="TableCellAlignRight">T<strong>ex</strong>t</td>
        </tr>
    </tbody>
</table>`
        )
    })


    test('markdown - inputing-39', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\``
        )

        
        expect(html).toEqual(
`<pre><code class="">
{
  &quot;firstName&quot;: &quot;John&quot;,
  &quot;lastName&quot;: &quot;Smith&quot;,
  &quot;age&quot;: 25
}
</code></pre>`
        )
    })

    test('markdown - inputing-40', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`Here's a simple footnote,[^goo]

[^goo]: This is the first footnote.`
        )

        
        expect(html).toEqual(
`<p>Here&apos;s a simple footnote,<sup><a href="#fn:goo" class="footnote" rel="footnote">goo</a></sup></p>
<br/>
<div><span id="fn:goo">goo:</span>This is the first footnote.</div>`
        )
    })

    test('markdown - inputing-41', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.
    Indent paragraphs to include them in the footnote.
    \`{ my code }\`
    Add as many paragraphs as you like.`
        )

        
        expect(html).toEqual(
`<p>Here&apos;s a simple footnote,<sup><a href="#fn:1" class="footnote" rel="footnote">1</a></sup> and here&apos;s a longer one.<sup><a href="#fn:bignote" class="footnote" rel="footnote">bignote</a></sup></p>
<br/>
<div><span id="fn:1">1:</span>This is the first footnote.</div>
<br/>
<div><span id="fn:bignote">bignote:</span>Here&apos;s one with multiple paragraphs and code.
    <div class="complementBlock">
        <p>Indent paragraphs to include them in the footnote.<br/><code>{ my code }</code><br/>Add as many paragraphs as you like.</p>
    </div>
</div>`
        )
    })

    test('markdown - inputing-42', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruit
    Apple
    Boy
2. Animal`
        )

        expect(html).toEqual(
`<ol>
    <li>Fruit
        <div class="complementBlock">
            <p>Apple<br/>Boy</p>
        </div>
    </li>
    <li>Animal</li>
</ol>`
        )
    })

    test('markdown - inputing-42', () => {
        var html : string = markdownToHtmlConverter.toHtml(
`1. Fruit
    Ap**pl**e
    Boy
2. Animal`
        )

        expect(html).toEqual(
`<ol>
    <li>Fruit
        <div class="complementBlock">
            <p>Ap<strong>pl</strong>e<br/>Boy</p>
        </div>
    </li>
    <li>Animal</li>
</ol>`
        )
    })
})

