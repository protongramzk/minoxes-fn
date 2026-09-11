import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';
import './ui-icon.js';
import './ui-button.js';

export class FloatingDock extends LitElement {
  static properties = {
    selectedCount: { type: Number },
    searchQuery: { type: String }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: block;
        position: absolute;
        bottom: 24px;
        left: 16px;
        right: 16px;
        z-index: 20;
      }

      .floating-dock {
        background: var(--surf-low);
        padding: 8px;
        border-radius: var(--radius-l);
        display: flex;
        gap: 8px;
        align-items: center;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      }

      .dock-default {
        display: flex;
        width: 100%;
        gap: 8px;
        align-items: center;
      }

      .input {
        border: none;
        background: transparent;
        padding: 12px;
        color: var(--text);
        font-family: inherit;
        font-size: 1rem;
        outline: none;
        width: 100%;
      }

      .dock-select {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;
      }

      .select-count {
        font-weight: 600;
        font-size: 0.9rem;
      }

      .action-group {
        display: flex;
        gap: 8px;
      }

      .hidden {
        display: none !important;
      }
    `
  ];

  handleSearchInput(e) {
    this.dispatchEvent(new CustomEvent('search-change', {
      detail: { query: e.target.value },
      bubbles: true,
      composed: true
    }));
  }

  handleCreateNew() {
    this.dispatchEvent(new CustomEvent('create-note', {
      bubbles: true,
      composed: true
    }));
  }

  handleSelectAll() {
    this.dispatchEvent(new CustomEvent('select-all', {
      bubbles: true,
      composed: true
    }));
  }

  handleDeleteSelected() {
    this.dispatchEvent(new CustomEvent('delete-selected', {
      bubbles: true,
      composed: true
    }));
  }

  handleClearSelection() {
    this.dispatchEvent(new CustomEvent('clear-selection', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const isSelecting = this.selectedCount > 0;

    return html`
      <div class="floating-dock">
        ${!isSelecting ? html`
          <div class="dock-default">
            <ui-icon name="search" style="padding-left:12px; color:var(--text-sec)"></ui-icon>
            <input
              type="text"
              class="input"
              placeholder="Cari catatan..."
              .value="${this.searchQuery || ''}"
              @input="${this.handleSearchInput}"
            >
            <ui-button variant="primary" style="padding: 0;" @click="${this.handleCreateNew}">
              <ui-icon name="edit_square"></ui-icon> Baru
            </ui-button>
          </div>
        ` : html`
          <div class="dock-select">
            <span class="select-count">${this.selectedCount} terpilih</span>
            <div class="action-group">
              <ui-button @click="${this.handleSelectAll}">
                <ui-icon name="done_all"></ui-icon>
              </ui-button>
              <ui-button variant="danger" @click="${this.handleDeleteSelected}">
                <ui-icon name="delete"></ui-icon>
              </ui-button>
              <ui-button @click="${this.handleClearSelection}">
                <ui-icon name="close"></ui-icon>
              </ui-button>
            </div>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('floating-dock', FloatingDock);
