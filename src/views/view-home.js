import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';
import { notesStore } from '../services/notes.store.js';
import '../components/ui-card.js';
import '../components/floating-dock.js';

export class ViewHome extends LitElement {
  static properties = {
    notes: { type: Array },
    selectedIds: { type: Object },
    searchQuery: { type: String }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;
        padding: 0 16px 100px 16px;
        width: 100%;
        position: relative;
        animation: fadeSlide 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      @keyframes fadeSlide {
        from { opacity: 0; transform: translateY(10px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
    `
  ];

  handleCardClick(e) {
    const { id } = e.detail;
    if (this.selectedIds && this.selectedIds.size > 0) {
      notesStore.toggleSelectNote(id);
    } else {
      notesStore.openReadView(id);
    }
  }

  handleCardSelect(e) {
    const { id } = e.detail;
    notesStore.toggleSelectNote(id);
  }

  handleSearchChange(e) {
    notesStore.setSearchQuery(e.detail.query);
  }

  handleCreateNote() {
    notesStore.createNote();
  }

  handleSelectAll() {
    notesStore.selectAllNotes();
  }

  handleDeleteSelected() {
    notesStore.deleteSelectedNotes();
  }

  handleClearSelection() {
    notesStore.clearSelection();
  }

  render() {
    const filteredNotes = this.notes || [];

    return html`
      <div class="grid">
        ${filteredNotes.map((note, index) => html`
          <ui-card
            .note="${note}"
            .selected="${this.selectedIds ? this.selectedIds.has(note.id) : false}"
            .index="${index}"
            @card-click="${this.handleCardClick}"
            @card-select="${this.handleCardSelect}"
          ></ui-card>
        `)}
      </div>

      <floating-dock
        .selectedCount="${this.selectedIds ? this.selectedIds.size : 0}"
        .searchQuery="${this.searchQuery || ''}"
        @search-change="${this.handleSearchChange}"
        @create-note="${this.handleCreateNote}"
        @select-all="${this.handleSelectAll}"
        @delete-selected="${this.handleDeleteSelected}"
        @clear-selection="${this.handleClearSelection}"
      ></floating-dock>
    `;
  }
}

customElements.define('view-home', ViewHome);
