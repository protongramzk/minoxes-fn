import { LitElement, html, css } from 'lit';
import { tokenStyles } from '../styles/tokens.js';
import { notesStore } from '../services/notes.store.js';
import { zipService } from '../services/zip.service.js';
import '../components/ui-icon.js';
import '../components/ui-button.js';

export class ViewSettings extends LitElement {
  static properties = {
    theme: { type: String }
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
    `
  ];

  handleToggleTheme() {
    notesStore.toggleTheme();
  }

  handleExportZip() {
    zipService.exportNotes(notesStore.notes);
  }

  handleBack() {
    notesStore.navTo('home');
  }

  render() {
    const isDark = this.theme === 'dark';

    return html`
      <div class="setting-item">
        <span>Mode Tampilan</span>
        <ui-button @click="${this.handleToggleTheme}">
          <ui-icon name="${isDark ? 'light_mode' : 'dark_mode'}"></ui-icon>
          ${isDark ? 'Terang' : 'Gelap'}
        </ui-button>
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
