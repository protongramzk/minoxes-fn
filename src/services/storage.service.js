const NOTES_KEY = 'minoxes_notes';
const THEME_KEY = 'minoxes_theme';

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
  },

  getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  },

  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }
};
