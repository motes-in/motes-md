'use strict';

module.exports = exports = ({
  hashtag     = '/tags/',
  mention     = '/users/',
  tocLevel    = [1,2],
  containers  = [
    'container',
  ]
} = {}) => {
  const temp = {
    customElement: {},
  };
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
    .use(require('markdown-it-underline'))
    .use(require('markdown-it-custom-block'), {
      video(url) {
        return `<div class="block-embed block-embed-video">
          <video src="${url}" preload="auto"></video>
        </div>`;
      },
      'video-controls'(url) {
        return `<div class="block-embed block-embed-video">
          <video src="${url}" preload="auto" controls></video>
        </div>`;
      },
      audio(url) {
        return `<div class="block-embed block-embed-audio">
          <audio src="${url}" preload="auto" controls></audio>
        </div>`;
      }
    })
    .use(require('markdown-it-container'), 'custom', {
      validate: function(params) {
        return params.trim().match(/^custom/);
      },
      render: function (tokens, idx) {
        const parts = tokens[idx].info.replace(/custom/, '').trim().split(' ');
        temp.customElement[tokens[idx].level] = parts.shift() || temp.customElement[tokens[idx].level] || 'div';

        if (tokens[idx].nesting === 1) {
          let id;
          let classes = [];
          let attributes = '';

          for (let part of parts) {
            if (/^\#/.test(part)) {
              id = part.replace(/^\#/, '');
            }
            if (/^\./.test(part)) {
              classes.push(part.replace(/^\./, ''));
            }
          }

          if (id) {
            attributes += ` id="${id}"`;
          }

          if (classes.length) {
            attributes += ` class="${classes.join(' ')}"`;
          }

          // opening tag
          return `<${temp.customElement[tokens[idx].level]}${attributes}>\n`;
        }
        else {
          // closing tag
          return `</${temp.customElement[tokens[idx].level]}>\n`;
        }
      }
    });

  for (let container of containers) {
    md.use(require('markdown-it-container'), container);
  }

  return md;
};
