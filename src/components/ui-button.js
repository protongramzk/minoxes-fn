import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';

export class UiButton extends LitElement {
  static properties = {
    variant: { type: String }, // 'primary' | 'danger' | 'icon' | undefined
    disabled: { type: Boolean }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: inline-block;
      }

      .btn {
        border: none;
        background: var(--surf-hi);
        color: var(--text);
        padding: 12px 20px;
        border-radius: var(--radius-l);
        cursor: pointer;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-family: inherit;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;

        /* Disable select text pada button */
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;

        /* Transisi cool-down (cepat balik normal saat dilepas) */
        transition: transform 0.61s cubic-bezier(0.4, 0, 0.2, 1), filter 0.75s ease-out, background-color 0.3s ease-out;
      }

      .btn:active {
        transform: scale(0.93);
        /* Visual pas nge-charge: makin vibrant dan terang */
        filter: blur(5px) saturate(7.5) brightness(1.2);
        /* Transisi charging (lambat 1.5 detik saat ditahan) */
        transition: transform 0.02s cubic-bezier(0.4, 0, 0.2, 1), filter 2s ease-in, background-color 1.5s ease-in;
      }

      .btn-primary {
        background: var(--primary);
        color: var(--on-primary);
      }

      .btn-danger {
        background: var(--error);
        color: var(--on-error);
      }

      .btn-icon {
        padding: 12px;
        border-radius: 50%;
      }
    `
  ];

  render() {
    const classes = ['btn'];
    if (this.variant === 'primary') classes.push('btn-primary');
    if (this.variant === 'danger') classes.push('btn-danger');
    if (this.variant === 'icon') classes.push('btn-icon');

    return html`
      <button class="${classes.join(' ')}" ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ui-button', UiButton);
