import { LitElement, html, css } from 'lit';
import { tokenStyles } from './styles/tokens.js';
import { notesStore } from './services/notes.store.js';
import './components/ui-icon.js';
import './components/ui-button.js';
import './views/view-home.js';
import './views/view-write.js';
import './views/view-read.js';
import './views/view-settings.js';

export class AppRoot extends LitElement {
  static properties = {
    activeView: { type: String },
    notes: { type: Array },
    selectedIds: { type: Object },
    searchQuery: { type: String },
    theme: { type: String },
    noteView: { type: String },
    currentNote: { type: Object }
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }

      header {
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
        flex-shrink: 0;
      }

      header h1 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0;
      }
    `
  ];

  constructor() {
    super();
    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    notesStore.initTheme();
    notesStore.addEventListener('change', this.handleStoreChange);
    this.updateFromStore();
  }

  disconnectedCallback() {
    notesStore.removeEventListener('change', this.handleStoreChange);
    super.disconnectedCallback();
  }

  handleStoreChange() {
    this.updateFromStore();
  }

  updateFromStore() {
    this.activeView = notesStore.activeView;
    this.notes = notesStore.getFilteredNotes();
    this.selectedIds = new Set(notesStore.selectedIds);
    this.searchQuery = notesStore.searchQuery;
    this.theme = notesStore.theme;
    this.noteView = notesStore.noteView;
    this.currentNote = notesStore.getCurrentNote();
  }

  handleSettingsToggle() {
    notesStore.navTo('settings');
  }

  renderHeader() {
    const showHeader = this.activeView === 'home' || this.activeView === 'settings';
    if (!showHeader) return null;

    return html`
      <header id="main-header">
        <h1>MINOXES</h1>
        <ui-button variant="icon" @click="${this.handleSettingsToggle}">
          <ui-icon name="settings"></ui-icon>
        </ui-button>
      </header>
    `;
  }

  renderView() {
    switch (this.activeView) {
      case 'home':
        return html`
          <view-home
            .notes="${this.notes}"
            .selectedIds="${this.selectedIds}"
            .searchQuery="${this.searchQuery}"
            .noteView="${this.noteView}"
          ></view-home>
        `;
      case 'write':
        return html`
          <view-write
            .note="${this.currentNote}"
          ></view-write>
        `;
      case 'read':
        return html`
          <view-read
            .note="${this.currentNote}"
          ></view-read>
        `;
      case 'settings':
        return html`
          <view-settings
            .theme="${this.theme}"
            .noteView="${this.noteView}"
          ></view-settings>
        `;
      default:
        return html`<view-home .notes="${this.notes}"></view-home>`;
    }
  }

  render() {
    return html`
      ${this.renderHeader()}
      ${this.renderView()}
    `;
  }
}

customElements.define('app-root', AppRoot);
