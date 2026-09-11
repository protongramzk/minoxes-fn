import JSZip from 'jszip';

export const zipService = {
  async exportNotes(notes = []) {
    const zip = new JSZip();
    notes.forEach(note => {
      const safeTitle = (note.title || '').replace(/[^a-z0-9]/gi, '_');
      const filename = `${note.tag}_${safeTitle}.md`;
      const fileContent = `---\nid: ${note.id}\ntag: ${note.tag}\n---\n\n${note.content || ''}`;
      zip.file(filename, fileContent);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MINOXES_Backup.zip';
    a.click();
    URL.revokeObjectURL(url);
  }
};
