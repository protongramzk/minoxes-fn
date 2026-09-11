import { storageService } from './storage.service.js';

class NotesStore extends EventTarget {
  constructor() {
    super();
    this.notes = storageService.getNotes();
    this.activeView = 'home'; // 'home' | 'write' | 'read' | 'settings'
    this.currentNoteId = null;
    this.selectedIds = new Set();
    this.searchQuery = '';
    this.theme = storageService.getTheme();
    this.noteView = storageService.getNoteView();
    this.ready = storageService.loadNotes().then(notes => {
      this.notes = notes;
      this.notify();
    });
  }

  notify() {
    this.dispatchEvent(new CustomEvent('change'));
  }

  generateId() {
    return Math.random().toString(36).substring(2, 7);
  }

  setTheme(theme) {
    this.theme = theme;
    storageService.saveTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.notify();
  }

  toggleTheme() {
    const themes = ['dark', 'light', 'nord', 'orange-dark', 'violet-dark', 'emerald-dark'];
    const nextTheme = themes[(themes.indexOf(this.theme) + 1) % themes.length];
    this.setTheme(nextTheme);
  }

  setNoteView(view) {
    this.noteView = view === 'grid' ? 'grid' : 'list';
    storageService.saveNoteView(this.noteView);
    this.notify();
  }

  initTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  navTo(viewName) {
    this.activeView = viewName;
    if (viewName === 'home') {
      this.clearSelection();
    }
    this.notify();
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    this.notify();
  }

  createNote() {
    const newNote = {
      id: Date.now().toString(),
      tag: this.generateId(),
      title: '',
      content: '',
      updated: Date.now()
    };
    this.notes.unshift(newNote);
    this.save();
    this.openWriteView(newNote.id);
  }

  openWriteView(id) {
    this.currentNoteId = id;
    this.navTo('write');
  }

  openReadView(id) {
    this.currentNoteId = id;
    this.navTo('read');
  }

  saveNote({ id, title, tag, content }) {
    const note = this.notes.find(n => n.id === id);
    if (note) {
      note.title = title;
      note.tag = tag || this.generateId();
      note.content = content;
      note.updated = Date.now();
      this.save();
      this.openReadView(note.id);
    }
  }

  save() {
    storageService.saveNotes(this.notes);
    this.notify();
  }

  toggleSelectNote(id) {
    if (id) {
      if (this.selectedIds.has(id)) {
        this.selectedIds.delete(id);
      } else {
        this.selectedIds.add(id);
      }
    }
    this.notify();
  }

  selectAllNotes() {
    this.notes.forEach(n => this.selectedIds.add(n.id));
    this.notify();
  }

  clearSelection() {
    this.selectedIds.clear();
    this.notify();
  }

  deleteSelectedNotes() {
    this.notes = this.notes.filter(n => !this.selectedIds.has(n.id));
    this.save();
    this.clearSelection();
  }

  getFilteredNotes() {
    const query = this.searchQuery.toLowerCase();
    if (!query) return this.notes;
    return this.notes.filter(n =>
      (n.title && n.title.toLowerCase().includes(query)) ||
      (n.content && n.content.toLowerCase().includes(query)) ||
      (n.tag && n.tag.toLowerCase().includes(query))
    );
  }

  getCurrentNote() {
    return this.notes.find(n => n.id === this.currentNoteId) || null;
  }
}

export const notesStore = new NotesStore();
