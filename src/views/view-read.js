import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { tokenStyles } from '../styles/tokens.js';
import { notesStore } from '../services/notes.store.js';
import { parserService } from '../services/parser.service.js';
import '../components/ui-icon.js';
import '../components/ui-button.js';

export class ViewRead extends LitElement {
  static properties = {
    note: { type: Object },
    zoom: { type: Number }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg);
        z-index: 20;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: fadeSlide 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      @keyframes fadeSlide {
        from { opacity: 0; transform: translateY(10px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .read-header {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        background: var(--bg);
        align-items: center;
        box-shadow: 0 1px 0 var(--outline);
        z-index: 25;
        flex-shrink: 0;
      }

      .action-group {
        display: flex;
        gap: 8px;
      }

      .read-container {
        flex: 1;
        overflow: auto;
        padding: 24px;
        touch-action: pan-x pan-y;
        width: 100%;
      }

      #read-compiled {
        line-height: 1.6;
        transform-origin: top left;
        transition: font-size 0.1s ease-out;
        overflow-wrap: break-word;
        word-wrap: break-word;
        max-width: 100%;
      }

      #read-compiled h1 {
        font-size: 1.8em;
        margin-bottom: 8px;
      }

      #read-compiled hr {
        border: none;
        border-top: 1px solid var(--outline);
        margin: 16px 0;
      }

      #read-compiled p {
        margin-bottom: 12px;
      }

      #read-compiled pre {
        max-width: 100%;
        overflow-x: auto;
        padding: 12px;
        border-radius: 8px;
      }

      .katex-display {
        max-width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
      }

      #read-compiled code {
        font-family: monospace;
        background: var(--surf-low);
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 0.9em;
        word-break: break-all;
      }

      .reader-link {
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        padding: 2px 4px;
        background: var(--p-container);
        border-radius: 4px;
      }
    `
  ];

  constructor() {
    super();
    this.zoom = 1.0;
    this.initialDistance = 0;
  }

  handleBack() {
    notesStore.navTo('home');
  }

  handleResetZoom() {
    this.zoom = 1.0;
  }

  handleEdit() {
    if (this.note) {
      notesStore.openWriteView(this.note.id);
    }
  }

  handleTouchStart(e) {
    if (e.touches.length === 2) {
      this.initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    }
  }

  handleTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const diff = currentDistance - this.initialDistance;
      this.zoom = Math.max(0.6, Math.min(3.0, this.zoom + (diff * 0.005)));
      this.initialDistance = currentDistance;
    }
  }

  handleContainerClick(e) {
    const linkEl = e.target.closest('.reader-link');
    if (linkEl) {
      const tagOrId = linkEl.getAttribute('data-tag');
      const target = notesStore.notes.find(n => n.tag === tagOrId || n.id === tagOrId);
      if (target) {
        notesStore.openReadView(target.id);
      } else {
        alert("Catatan tidak ditemukan!");
      }
    }
  }

  render() {
    const title = this.note ? parserService.escapeHtml(this.note.title || 'Tanpa Judul') : 'Tanpa Judul';
    const parsedBody = this.note ? parserService.parse(this.note.content || '') : '';
    const compiledContent = `<h1>${title}</h1><hr><br>${parsedBody}`;

    return html`
      <div class="read-header">
        <ui-button variant="icon" @click="${this.handleBack}">
          <ui-icon name="arrow_back"></ui-icon>
        </ui-button>
        <div class="action-group">
          <ui-button @click="${this.handleResetZoom}">
            <ui-icon name="search"></ui-icon>
          </ui-button>
          <ui-button variant="primary" @click="${this.handleEdit}">
            <ui-icon name="edit"></ui-icon> Edit
          </ui-button>
        </div>
      </div>
      <div
        class="read-container"
        @touchstart="${this.handleTouchStart}"
        @touchmove="${this.handleTouchMove}"
        @click="${this.handleContainerClick}"
      >
        <div id="read-compiled" style="font-size: calc(1rem * ${this.zoom});">
          ${unsafeHTML(compiledContent)}
        </div>
      </div>
    `;
  }
}

customElements.define('view-read', ViewRead);
