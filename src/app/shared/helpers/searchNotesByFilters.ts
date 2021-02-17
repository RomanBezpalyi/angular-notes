import { Note } from '../../notes/models';

export const searchNotesByFilters = (
  notes: Note[],
  query: string,
  status: string,
  label: any
) => {
  let filteredNotes = [...notes];

  if (query) {
    filteredNotes = filteredNotes.filter((note: Note) => {
      return (
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  if (label !== 'all') {
    const { id } = label;
    filteredNotes = filteredNotes.filter((note: Note) => note.label === id);
  }

  switch (status) {
    case 'true':
      return filteredNotes.filter((note: Note) => !!note.isDone);
    case 'false':
      return filteredNotes.filter((note: Note) => !note.isDone);
    case 'all':
    default:
      return filteredNotes;
  }
};
