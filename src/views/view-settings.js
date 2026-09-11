import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';
import { notesStore } from '../services/notes.store.js';
import { zipService } from '../services/zip.service.js';
import '../components/ui-icon.js';
import '../components/ui-button.js';

export class ViewSettings extends LitElement {
  static properties = {
    theme: { type: String },
    noteView: { type: String }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 20px;
        width: 100%;
        overflow-y: auto;
        animation: fadeSlide 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      @keyframes fadeSlide {
        from { opacity: 0; transform: translateY(10px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--surface);
        padding: 16px 20px;
        border-radius: var(--radius-m);
        margin-bottom: 12px;
      }

      .back-btn {
        width: 100%;
        margin-top: 16px;
      }

      .setting-item select {
        background: var(--surf-low);
        color: var(--text);
        border: 1px solid var(--outline);
        border-radius: var(--radius-s);
        padding: 10px 12px;
        font: inherit;
      }

      .view-options {
        display: flex;
        gap: 6px;
      }

      .view-options button {
        border: 1px solid var(--outline);
        background: var(--surf-low);
        color: var(--text);
        border-radius: var(--radius-s);
        padding: 10px 14px;
        cursor: pointer;
      }

      .view-options button.active {
        background: var(--primary);
        color: var(--on-primary);
      }
    `
  ];

  handleToggleTheme() {
    notesStore.toggleTheme();
  }

  handleThemeChange(e) {
    notesStore.setTheme(e.target.value);
  }

  handleViewChange(view) {
    notesStore.setNoteView(view);
  }

  handleExportZip() {
    zipService.exportNotes(notesStore.notes);
  }

  handleBack() {
    notesStore.navTo('home');
  }

  render() {
    return html`
      <div class="setting-item">
        <span>Tema</span>
        <select aria-label="Pilih tema" .value="${this.theme}" @change="${this.handleThemeChange}">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="nord">Nord</option>
          <option value="orange-dark">Orange Dark</option>
          <option value="violet-dark">Violet Dark</option>
          <option value="emerald-dark">Emerald Dark</option>
        </select>
      </div>
      <div class="setting-item">
        <span>Tampilan Notes</span>
        <div class="view-options">
          <button class="${this.noteView === 'list' ? 'active' : ''}" @click="${() => this.handleViewChange('list')}">List</button>
          <button class="${this.noteView === 'grid' ? 'active' : ''}" @click="${() => this.handleViewChange('grid')}">Grid</button>
        </div>
      </div>
      <div class="setting-item">
        <span>Ekspor ZIP Backup</span>
        <ui-button variant="primary" @click="${this.handleExportZip}">
          <ui-icon name="download"></ui-icon> Ekspor
        </ui-button>
      </div>
      <div class="back-btn">
        <ui-button @click="${this.handleBack}">
          <ui-icon name="arrow_back"></ui-icon> Kembali
        </ui-button>
      </div>
    `;
  }
}

customElements.define('view-settings', ViewSettings);
