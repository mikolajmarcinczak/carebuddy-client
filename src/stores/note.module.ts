import {defineStore} from "pinia";
import {Note} from "@/types/note.model";
import NoteDataService from "@/services/note.service";
import {SendNoteParameters} from "@/types/send-note.parameters.model";
import {useUserDataStore} from "@/stores/user-data.module";

export const useNoteStore = defineStore('note', {
  state: () => ({
    loading: true,
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
        this.notes[index] = updatedNote;
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
    async sendNote(sendParameters: SendNoteParameters) {
      try {
        const response = await NoteDataService.sendNote(sendParameters);
        this.errorMessage = '';
        return response;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async initStore() {
      const userDataStore = useUserDataStore();

      if (userDataStore.get?.user?.user_id) {
        await this.getNotesByUser(userDataStore.getUserProfile.user.user_id);

        if (this.notes) {
          this.loading = false;
        }
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