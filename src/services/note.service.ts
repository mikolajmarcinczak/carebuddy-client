import apiClient from "@/utility/http-common";
import {Note} from "@/types/note.model";

const axios = apiClient;
const API_URL = import.meta.env.VITE_API_URL as string;

class NoteDataService {
  async createNote(noteData: Note) {
    const response = await axios.post(`${API_URL}/note/create`, noteData);
    return new Note(response.data.data);
  }

  async getNoteById(noteId: string) {
    const response = await axios.get(`${API_URL}/note/get/${noteId}`);
    return new Note(response.data.data);
  }

  async getNotesByUser(userId: string) {
    const response = await axios.get(`${API_URL}/note/get-many/${userId}`);
    return response.data.data.map((note: any) => new Note(note));
  }

  async updateNote(noteId: string, noteData: Note) {
    const response = await axios.put(`${API_URL}/note/update/${noteId}`, noteData);
    return new Note(response.data.data);
  }

  async deleteNoteById(noteId: string) {
    const response = await axios.delete(`${API_URL}/note/remove/${noteId}`);
    return response.data.data;
  }

  async sendNote(sendParameters: any) {
    const response = await axios.put(`${API_URL}/note/send`, sendParameters);
    return response.data.data;
  }
}

export default new NoteDataService();