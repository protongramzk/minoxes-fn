import { marked } from 'marked';
import katex from 'katex';

export const parserService = {
  escapeHtml(str = '') {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  parse(content = '') {
    let parsed = marked.parse(content || '');

    // LaTeX render ($$ display mode and $ inline mode)
    parsed = parsed.replace(/\$\$(.*?)\$\$/gs, (_, tex) => {
      try {
        return katex.renderToString(tex, { displayMode: true });
      } catch (e) {
        return tex;
      }
    });

    parsed = parsed.replace(/\$(.*?)\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex, { displayMode: false });
      } catch (e) {
        return tex;
      }
    });

    // Custom Syntax: link(id).name()
    parsed = parsed.replace(/link\(([a-zA-Z0-9_-]+)\)\.name\(([^)]+)\)/g, (_, tagId, name) => {
      return `<a class="reader-link" data-tag="${tagId}">${name}</a>`;
    });

    return parsed;
  }
};
