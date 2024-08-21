import axios from "axios";
import {Note} from "@/types/note.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class NoteDataService {
  async createNote(noteData: any) {
    const response = await axios.post(`${API_URL}/note/create`, noteData);
    return new Note(response);
  }

  async getNoteById(noteId: string) {
    const response = await axios.get(`${API_URL}/note/get/${noteId}`);
    return new Note(response);
  }

  async getNotesByUser(userId: string) {
    const response = await axios.get(`${API_URL}/note/get-many/${userId}`);
    return response.data.map((note: any) => new Note(note));
  }

  async updateNote(noteId: string, noteData: any) {
    const response = await axios.put(`${API_URL}/note/update/${noteId}`, noteData);
    return new Note(response);
  }

  async deleteNoteById(noteId: string) {
    const response = await axios.delete(`${API_URL}/note/remove/${noteId}`);
    return response.data;
  }

  async sendNote(sendParameters: any) {
    const response = await axios.put(`${API_URL}/note/send`, sendParameters);
    return response.data;
  }
}

export default new NoteDataService();