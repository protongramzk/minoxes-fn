import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';

export class UiCard extends LitElement {
  static properties = {
    note: { type: Object },
    selected: { type: Boolean },
    index: { type: Number }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: block;
      }

      .card {
        background: var(--surface);
        padding: 16px;
        border-radius: var(--radius-m);
        cursor: pointer;
        user-select: none;
        transition: background 0.2s, transform 0.2s;
        animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
      }

      @keyframes popIn {
        0% { opacity: 0; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
      }

      .card:active {
        transform: scale(0.97);
      }

      .card.selected {
        background: var(--p-container);
        color: var(--on-p-container);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        align-items: center;
      }

      .card-title {
        font-weight: 600;
        font-size: 1.05rem;
      }

      .card-tag {
        font-family: monospace;
        background: var(--surf-hi);
        padding: 4px 8px;
        border-radius: var(--radius-s);
        font-size: 0.75rem;
        letter-spacing: 0.5px;
      }

      .card.selected .card-tag {
        background: var(--primary);
        color: var(--on-primary);
      }

      .card-snippet {
        font-size: 0.9rem;
        color: var(--text-sec);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
      }
    `
  ];

  constructor() {
    super();
    this.longPressTimer = null;
    this.isLongPress = false;
  }

  startLongPress(e) {
    this.isLongPress = false;
    this.longPressTimer = setTimeout(() => {
      this.isLongPress = true;
      if (navigator.vibrate) navigator.vibrate(50);
      this.dispatchEvent(new CustomEvent('card-select', {
        detail: { id: this.note.id },
        bubbles: true,
        composed: true
      }));
    }, 500);
  }

  cancelLongPress() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  handleClick(e) {
    if (this.isLongPress) {
      this.isLongPress = false;
      return;
    }
    this.dispatchEvent(new CustomEvent('card-click', {
      detail: { id: this.note.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.note) return html``;
    const title = this.note.title || 'Tanpa Judul';
    const content = this.note.content || 'Kosong...';
    const delay = `${(this.index || 0) * 0.05}s`;

    return html`
      <div
        class="card ${this.selected ? 'selected' : ''}"
        style="animation-delay: ${delay};"
        @touchstart="${this.startLongPress}"
        @touchend="${this.cancelLongPress}"
        @mousedown="${this.startLongPress}"
        @mouseup="${this.cancelLongPress}"
        @mouseleave="${this.cancelLongPress}"
        @click="${this.handleClick}"
      >
        <div class="card-header">
          <span class="card-title">${title}</span>
          <span class="card-tag">#${this.note.tag}</span>
        </div>
        <div class="card-snippet">${content}</div>
      </div>
    `;
  }
}

customElements.define('ui-card', UiCard);
