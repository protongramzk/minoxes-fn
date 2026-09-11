import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';
import { notesStore } from '../services/notes.store.js';

export class ViewWrite extends LitElement {
  static properties = {
    note: { type: Object }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 100px;
        grid-template-rows: 64px 1fr 64px;
        background: var(--outline);
        gap: 1px;
        z-index: 30;
        overflow: hidden;
        animation: fadeSlide 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      @keyframes fadeSlide {
        from { opacity: 0; transform: translateY(10px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      :host > * {
        background: var(--bg);
        border: none;
        outline: none;
        padding: 16px;
        font-family: inherit;
        font-size: 1rem;
        color: var(--text);
        width: 100%;
        height: 100%;
      }

      #write-title {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        font-weight: 700;
        font-size: 1.1rem;
      }

      #write-tag {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        font-family: monospace;
        text-align: center;
        color: var(--primary);
      }

      #write-content {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
        resize: none;
        font-family: monospace;
        line-height: 1.5;
        padding: 20px;
        overflow-y: auto;
      }

      .write-actions {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
        display: flex;
        gap: 1px;
        padding: 0 !important;
        background: var(--outline) !important;
      }

      .write-actions button {
        flex: 1;
        border: none;
        border-radius: 0;
        background: var(--bg);
        color: var(--text);
        font-size: 1rem;
        font-weight: 600;
        height: 100%;
        cursor: pointer;
        transition: transform 0.61s cubic-bezier(0.4, 0, 0.2, 1), filter 0.75s ease-out, background-color 0.3s ease-out;
      }

      .write-actions button:active {
        background: var(--surf-low);
        transform: none;
        filter: saturate(2) brightness(1.2);
        transition: filter 1s ease-in, background 1s ease-in;
      }

      .write-actions button.primary {
        color: var(--primary);
      }
    `
  ];

  handleCancel() {
    notesStore.navTo('home');
  }

  handleSave() {
    const titleInput = this.shadowRoot.getElementById('write-title');
    const tagInput = this.shadowRoot.getElementById('write-tag');
    const contentInput = this.shadowRoot.getElementById('write-content');

    if (this.note) {
      notesStore.saveNote({
        id: this.note.id,
        title: titleInput.value,
        tag: tagInput.value,
        content: contentInput.value
      });
    }
  }

  render() {
    const title = this.note ? this.note.title : '';
    const tag = this.note ? this.note.tag : '';
    const content = this.note ? this.note.content : '';

    return html`
      <input type="text" id="write-title" placeholder="Judul Catatan" .value="${title}">
      <input type="text" id="write-tag" placeholder="ID" .value="${tag}">
      <textarea id="write-content" placeholder="Ketik idemu... Markdown, $LaTeX$, atau link(id).nama() disupport penuh." .value="${content}"></textarea>
      <div class="write-actions">
        <button @click="${this.handleCancel}">Batal</button>
        <button class="primary" @click="${this.handleSave}">Simpan</button>
      </div>
    `;
  }
}

customElements.define('view-write', ViewWrite);
