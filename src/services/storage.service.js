const NOTES_KEY = 'minoxes_notes';
const THEME_KEY = 'minoxes_theme';
const NOTE_VIEW_KEY = 'minoxes_note_view';
const DB_NAME = 'minoxes';
const DB_VERSION = 1;
const NOTES_STORE = 'notes';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(NOTES_STORE)) {
        request.result.createObjectStore(NOTES_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const storageService = {
  getNotes() {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
    } catch (e) {
      console.error('Error reading notes from localStorage:', e);
      return [];
    }
  },

  saveNotes(notes) {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving notes to localStorage:', e);
    }
    return openDatabase().then(db => new Promise((resolve, reject) => {
      const transaction = db.transaction(NOTES_STORE, 'readwrite');
      transaction.objectStore(NOTES_STORE).clear();
      notes.forEach(note => transaction.objectStore(NOTES_STORE).put(note));
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    })).catch(error => console.error('Error saving notes to IndexedDB:', error));
  },

  async loadNotes() {
    try {
      const db = await openDatabase();
      const notes = await new Promise((resolve, reject) => {
        const request = db.transaction(NOTES_STORE, 'readonly').objectStore(NOTES_STORE).getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      db.close();
      if (notes.length > 0) return notes.sort((a, b) => b.updated - a.updated);

      const legacyNotes = this.getNotes();
      if (legacyNotes.length > 0) await this.saveNotes(legacyNotes);
      return legacyNotes;
    } catch (e) {
      console.error('Error reading notes from IndexedDB:', e);
      return this.getNotes();
    }
  },

  getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  },

  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  },

  getNoteView() {
    return localStorage.getItem(NOTE_VIEW_KEY) || 'list';
  },

  saveNoteView(view) {
    localStorage.setItem(NOTE_VIEW_KEY, view);
  }
};
