import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';

export class UiIcon extends LitElement {
  static properties = {
    name: { type: String }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
      }
      .icon {
        font-family: 'Material Symbols Rounded';
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
      }
    `
  ];

  render() {
    return html`<span class="icon">${this.name ? this.name : html`<slot></slot>`}</span>`;
  }
}

customElements.define('ui-icon', UiIcon);
