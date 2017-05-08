'use strict';

module.exports = exports = ({
  hashtag     = '/tags/',
  mention     = '/users/',
  tocLevel    = [1,2]
} = {}) => {
  const md = require('markdown-it')({
      html:        true,
      xhtmlOut:    false,
      breaks:      true,
      langPrefix:  'language-',
      linkify:     true,
      linkTarget:  '',
      typographer: true,
      quotes:      '“”‘’'
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
    .use(require('markdown-it-block-image'), {
      outputContainer: 'div',
      containerClassName: "block-embed block-embed-image"
    })
    .use(require('markdown-it-center-text'))
    .use(require('markdown-it-checkbox'), {
      divWrap: true,
      divClass: 'checkbox',
      idPrefix: 'checkbox-'
    })
    .use(require('markdown-it-container'), 'container')
    .use(require('markdown-it-custom-block'), {
      video (url) {
        return `<div class="block-embed block-embed-video">
        <video src="${url}"></video>
      </div>`;
      }
    })
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-expand-tabs'), {tabWidth: 2})
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-hashmention'), {
      hashtags: {
        href: hashtag,
      },
      mentions: {
        href: mention,
      },
    })
    .use(require('markdown-it-highlighted'))
    .use(require('markdown-it-highlightjs'), {
      auto: true,
      code: true
    })
    .use(require('markdown-it-imsize'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-math'))
    .use(require('markdown-it-playground'))
    .use(require('markdown-it-smartarrows'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-table-of-contents'), {
      includeLevel: tocLevel
    })
    .use(require('markdown-it-task-checkbox'), {
      disabled: false,
      divWrap: true,
      divClass: 'checkbox',
      idPrefix: 'task-checkbox-',
      ulClass: 'task-list',
      liClass: 'task-list-item'
    })
    .use(require('markdown-it-title'), 0)
    .use(require('markdown-it-underline'));

  return (input, env = {}) => {
    return md.render(input, env);
  };
};
