# motes-md

Markdown parser for Motes.in.

## Usage

```javascript
const md = require('motes-md')({
  hashtag: '/tags/', // default prefix for hashtag url
  mention: '/users/', // default prefix for mention url
  tocLevel: [1,2], // default level for table-of-content
  containers: [ // default container classes
    'container',
  ],
});

console.log(md.render('# Markdown'));

// you can pass an object to get the some values from the parsing
const env = {};
const html = md.render('# Markdown', env);
console.log(html, env);
```

It returns an instance of `markdown-it`, so it's possible to to add more plugins.

## Credits

@motes/md uses the following packages:

- [markdown-it](https://www.npmjs.com/package/markdown-it)
- [markdown-it-abbr](https://www.npmjs.com/package/markdown-it-abbr)
- [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor)
- [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs)
- [markdown-it-block-embed](https://www.npmjs.com/package/markdown-it-block-embed)
- [markdown-it-block-image](https://www.npmjs.com/package/markdown-it-block-image)
- [markdown-it-center-text](https://www.npmjs.com/package/markdown-it-center-text)
- [markdown-it-checkbox](https://www.npmjs.com/package/markdown-it-checkbox)
- [markdown-it-container](https://www.npmjs.com/package/markdown-it-container)
- [markdown-it-custom-block](https://www.npmjs.com/package/markdown-it-custom-block)
- [markdown-it-deflist](https://www.npmjs.com/package/markdown-it-deflist)
- [markdown-it-emoji](https://www.npmjs.com/package/markdown-it-emoji)
- [markdown-it-expand-tabs](https://www.npmjs.com/package/markdown-it-expand-tabs)
- [markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote)
- [markdown-it-hashmention](https://www.npmjs.com/package/markdown-it-hashmention)
- [markdown-it-highlighted](https://www.npmjs.com/package/markdown-it-highlighted)
- [markdown-it-highlightjs](https://www.npmjs.com/package/markdown-it-highlightjs)
- [markdown-it-imsize](https://www.npmjs.com/package/markdown-it-imsize)
- [markdown-it-ins](https://www.npmjs.com/package/markdown-it-ins)
- [markdown-it-kbd](httpls://www.npmjs.com/package/markdown-it-kbd)
- [markdown-it-mark](https://www.npmjs.com/package/markdown-it-mark)
- [markdown-it-math](https://www.npmjs.com/package/markdown-it-math)
- [markdown-it-multimd-table](httpls://www.npmjs.com/package/markdown-it-multimd-table)
- [markdown-it-plantuml](httpls://www.npmjs.com/package/markdown-it-plantuml)
- [markdown-it-playground](https://www.npmjs.com/package/markdown-it-playground)
- [markdown-it-smartarrows](https://www.npmjs.com/package/markdown-it-smartarrows)
- [markdown-it-sub](https://www.npmjs.com/package/markdown-it-sub)
- [markdown-it-sup](https://www.npmjs.com/package/markdown-it-sup)
- [markdown-it-table-of-contents](https://www.npmjs.com/package/markdown-it-table-of-contents)
- [markdown-it-task-checkbox](https://www.npmjs.com/package/markdown-it-task-checkbox)
- [markdown-it-title](https://www.npmjs.com/package/markdown-it-title)
- [markdown-it-underline](https://www.npmjs.com/package/markdown-it-underline)

## License

[MIT License](LICENSE)
