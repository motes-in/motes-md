'use strict';

module.exports = exports = ({
  hashtag     = '/tags/',
  mention     = '/users/'
} = {}) => {
  const hljs       = require('highlight.js')
  const md = require('markdown-it')({
      html:        true,
      xhtmlOut:    false,
      breaks:      true,
      langPrefix:  'language-',
      linkify:     true,
      linkTarget:  '',
      typographer: true,
      quotes:      '“”‘’',

      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return '';
      }
    })
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-anchor'), {
      level: 1,
      slugify: (str, md) => {
        return str.toLowerCase().replace(/\&[a-z0-9A-Z]+\;/g, '').replace(/[^\w]/g, '-');
      },
      permalink: true,
      permalinkClass: 'heading-anchor',
      permalinkSymbol: '',
      permalinkBefore: false,
    })
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-block-embed'))
    .use(require('markdown-it-block-image'))
    .use(require('markdown-it-center-text'))
    .use(require('markdown-it-checkbox'), {
      divWrap: true,
      divClass: 'checkbox',
      idPrefix: 'checkbox-'
    })
    .use(require('markdown-it-container'), 'container')
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-hashmention'), {
      hashtags: {
        href: hashtag,
      },
      mentions: {
        href: mention,
      },
    })
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-table-of-contents'))
    .use(require('markdown-it-task-checkbox'), {
      disabled: false,
      divWrap: true,
      divClass: 'checkbox',
      idPrefix: 'task-checkbox-',
      ulClass: 'task-list',
      liClass: 'task-list-item'
    });

  return (input) => {
    return md.render(input);
  };
};
