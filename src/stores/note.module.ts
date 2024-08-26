import {defineStore} from "pinia";
import {Note} from "@/types/note.model";
import NoteDataService from "@/services/note.service";

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [] as Array<Note>,
    errorMessage: ''
  }),
  actions: {
    async createNote(noteData: Note) {
      try {
        const note = await NoteDataService.createNote(noteData);
        this.notes.push(note);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getNoteById(noteId: string) {
      try {
        const note = await NoteDataService.getNoteById(noteId);
        this.errorMessage = '';
        return note;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async getNotesByUser(userId: string) {
      try {
        const notes = await NoteDataService.getNotesByUser(userId);
        this.notes = notes;
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async updateNote(noteId: string, noteData: Note) {
      try {
        const updatedNote = await NoteDataService.updateNote(noteId, noteData);
        const index = this.notes.findIndex(note => note.id === noteId);
        if (index !== -1) {
          this.notes.splice(index, 1, updatedNote);
        }
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async deleteNote(noteId: string) {
      try {
        await NoteDataService.deleteNoteById(noteId);
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async sendNote(sendParameters: {noteId: string, userIds: Array<string>}) {
      try {
        const response = await NoteDataService.sendNote(sendParameters);
        this.errorMessage = '';
        return response;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    }
  },
  getters: {
    getNotes(state) {
      return state.notes;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    }
  }
});